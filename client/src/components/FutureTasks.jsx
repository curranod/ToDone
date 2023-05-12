import { useState, useEffect } from 'react'
import './FutureTasks.css';

function FutureTasks() {
    const [futureTasks, setFutureTasks] = useState([])
    const [currentTask, setCurrentTask] = useState(null)
    const [completedTasks, setCompletedTasks] = useState([])
    const [timer, setTimer] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        const userId = localStorage.getItem("userId");
        const jwtToken = localStorage.getItem("jwtToken");
        console.log(`Fetching tasks with user ID ${userId} and JWT token ${jwtToken}`);

        const response = await fetch(`https://todone-7v51.onrender.com/tasks/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        })
        const tasks = await response.json();
        if (tasks) {
            setFutureTasks(tasks.filter(task => task.status === 'incomplete'));
            setCurrentTask(tasks.find(task => task.status === 'in-progress'));
            setCompletedTasks(tasks.filter(task => task.status === 'complete'));
        }
    }
      
      

    const startTask = async (task) => {
        setCurrentTask(task);
        setFutureTasks(futureTasks.filter((t) => t._id !== task._id));

        const durationInSeconds = task.time * 60;
        setTimer(durationInSeconds);

        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        setIntervalId(interval);

        // Save the timeout ID to state
        const timeout = setTimeout(async () => {
            clearInterval(interval);
            setCurrentTask(null);
            setCompletedTasks(prevTasks => [...prevTasks, task]);

            // Update the task status in the database
            const userId = localStorage.getItem("userId")
            const token = localStorage.getItem("jwtToken")

            await fetch(`https://todone-7v51.onrender.com/${userId}/tasks/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'complete' })
            })
        }, durationInSeconds * 1000);

        setTimeoutId(timeout);
    };

    const endTask = async () => {
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Clear the timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Check if there is a current task
        if (currentTask) {
            // Update the task status in the database
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("jwtToken");

            await fetch(`https://todone-7v51.onrender.com/${userId}/tasks/${currentTask._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'complete' })
            })

            // Move the current task to completed tasks
            setCompletedTasks(prevTasks => [...prevTasks, currentTask]);
        }

        setCurrentTask(null);
        setTimer(null);
    };

    const futureTaskItems = futureTasks.map((task) => {
        return (
            <li key={task._id} className="task-card">
                <h1>{task.name}</h1>
                <p>Time: {task.time}</p>
                <button onClick={() => startTask(task)} className="white-button">
                    Start
                </button>
            </li>
        );
    });


    const currentTaskItem = currentTask ? (
        <li key={currentTask._id} className="CurrentTask-card">
            <h1 className='ctaskh'>{currentTask.name}</h1>
            <p>{currentTask.description}</p>
            <p>Time: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
            <button onClick={() => endTask()} className="green-button">
                Done!
            </button>
        </li>
    ) : null;


    const completedTaskItems = completedTasks.map((task) => {
        return (
            <li key={task._id} className="task-card">
                <h1>{task.name}</h1>
                <p>{task.time}</p>
            </li>
        );
    });

    return (
        <>
            <div className="container">
                <div className="fcolumn">
                    <h1 className='futureh'>Future Tasks</h1>
                    <ul>{futureTaskItems}</ul>
                </div>
                <div className="ccolumn">
                    <h1 className='currenth'>Current Task</h1>
                    <ul>{currentTaskItem}</ul>
                </div>
                <div className="pcolumn">
                    <h1 className='pasth'>Completed Tasks</h1>
                    <ul>{completedTaskItems}</ul>
                </div>
            </div>
        </>
    )
}

export default FutureTasks;
