import React, { useState } from 'react';
import './HomeHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'

function HomeHeader() {
  const navigate = useNavigate()
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('incomplete');

  const handleToggleForm = () => {
    setIsFormOpen(prevState => !prevState);
  };
  const handleLogin = () => {
    navigate('/login');
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(`http://localhost:8080/${userId}/addtasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description, time, status })
    });

    const result = await response.json();

    if (response.status === 201) {
      setName('');
      setDescription('');
      setTime('');
      setStatus('incomplete');
      console.log('Task added:', result);
      setIsFormOpen(false);
      fetchTasks();
      navigate('/');
    }
    
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="navbar-icon-button" onClick={handleToggleForm}>
          <FontAwesomeIcon icon={faPlus} className="navbar-icon" />
        </button>
      </div>
      {/* <div className="navbar-center"> */}
        <h1 className="navbar-logo">ToDone</h1>
      {/* </div> */}
      <div className="navbar-right">
        <button className="navbar-icon-button navbar-profile-button" onClick={handleLogin}>
          <FontAwesomeIcon icon={faUser} className="navbar-icon" />
        </button>
      </div>

      {isFormOpen && (
        <div className="form-overlay">
          <form className="form-container" onSubmit={handleAddTask}>
            <label>Name:</label>
            <input type="text" placeholder = "What do you need to do?" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Description:</label>
            <input type="text" placeholder = "Describe you task in detail here." value={description} onChange={(e) => setDescription(e.target.value)} />
            <label>Time:</label>
            <input type="text" placeholder = "Enter the minimum time needed to do this task." value={time} onChange={(e) => setTime(e.target.value)} />
            <button type="submit" className="addTask-button">Add Task</button>
            <button className="close-button" onClick={handleToggleForm}>
              Close
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}

export default HomeHeader;
