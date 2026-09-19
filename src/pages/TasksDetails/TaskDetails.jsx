import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './TasksDetails.css';

export const TaskDetails = ({ tasks = [], users = [] }) => {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === id);
  const assignedUser = users.find((u) => u.id === task?.userId);

  if (!task) {
    return (
      <div className="details-container">
        <Link to="/tasks" className="details-back-link">← Back to Tasks</Link>
        <h2 className="details-title">Task not found</h2>
      </div>
    );
  }

  return (
    <div className="details-container">
      <Link to="/tasks" className="details-back-link">← Back to Tasks</Link>
      <h2 className="details-title">{task.title || task.name || 'Untitled Task'}</h2>
      <p className="details-info">
        <strong>Status:</strong>{' '}
        <span className={task.completed ? 'task-card-status-completed' : 'task-card-status-pending'}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </p>
      <p className="details-info">
        <strong>Assigned user:</strong> {assignedUser ? assignedUser.name : 'Unassigned'}
      </p>
    </div>
  );
};

export default TaskDetails;