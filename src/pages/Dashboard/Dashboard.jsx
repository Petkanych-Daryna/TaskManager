import React from 'react';
import { useSelector } from 'react-redux';
import './Dashboard.css';

export const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.items);
  const users = useSelector((state) => state.users.items);

  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">Total Tasks: {tasks.length}</div>
        <div className="dashboard-card">Completed: {completed}</div>
        <div className="dashboard-card">Pending: {tasks.length - completed}</div>
        <div className="dashboard-card">Total Users: {users.length}</div>
      </div>
    </div>
  );
};

export default Dashboard;