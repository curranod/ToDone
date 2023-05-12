import React, { useState, useCallback } from 'react';
import FutureTasks from './FutureTasks';
import HomeHeader from './HomeHeader';

function ParentComponent() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    const jwtToken = localStorage.getItem("jwtToken");

    const response = await fetch(`https://todone-7v51.onrender.com/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      }
    });

    const tasks = await response.json();
    setTasks(tasks);
  }, []);

  return (
    <>
      <HomeHeader fetchTasks={fetchTasks} />
      <FutureTasks tasks={tasks} fetchTasks={fetchTasks} />
    </>
  );
}

export default ParentComponent;
