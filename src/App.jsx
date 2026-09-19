import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './redux/tasksSlice';
import { fetchUsers } from './redux/usersSlice';

import Dashboard from './pages/Dashboard/Dashboard';
import Tasks from './pages/Tasks/Tasks';
import TaskDetails from './pages/TasksDetails/TaskDetails';
import Users from './pages/Users/Users';
import UserDetails from './pages/UsersDetails/UserDetails';

import './App.css';

export function App() {
  const dispatch = useDispatch();
  const tasksStatus = useSelector((state) => state.tasks.status);
  const usersStatus = useSelector((state) => state.users.status);

  useEffect(() => {
    if (tasksStatus === 'idle') dispatch(fetchTasks());
    if (usersStatus === 'idle') dispatch(fetchUsers());
  }, [tasksStatus, usersStatus, dispatch]);

  if (tasksStatus === 'loading' || usersStatus === 'loading') {
    return <div className="app-container"><h2>Loading application data...</h2></div>;
  }

  return (
    <Router basename="/TaskManager">
      <div className="app-container">
        <nav className="app-nav">
          <Link to="/">Dashboard</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/users">Users</Link>
        </nav>

        <Routes>
          {/* Пропси більше не передаємо, компоненти самі братимуть дані з Redux */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;