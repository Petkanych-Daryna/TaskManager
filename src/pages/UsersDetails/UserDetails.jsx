import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './UsersDetails.css';
import '../TasksDetails/TasksDetails.css';

export const UserDetails = ({ users = [], tasks = [] }) => {
  const { id } = useParams();
  const user = users.find((u) => u.id === id);
  const userTasks = tasks.filter((t) => t.userId === id);

  if (!user) {
    return (
      <div className="user-details-container">
        <Link to="/users" className="details-back-link">← Back to Users</Link>
        <h2 className="details-title">User not found</h2>
      </div>
    );
  }

  return (
    <div className="user-details-container">
      <Link to="/users" className="details-back-link">← Back to Users</Link>
      <h2 className="details-title">{user.name}</h2>
      <p className="details-info"><strong>Email:</strong> {user.email}</p>

      <h3>Assigned Tasks ({userTasks.length}):</h3>
      {userTasks.length > 0 ? (
        <ul className="user-task-list">
          {userTasks.map((task) => (
            <li key={task.id} className="user-task-item">
              <span>{task.title || task.name}</span>
              <strong className={task.completed ? 'task-card-status-completed' : 'task-card-status-pending'}>
                {task.completed ? 'Completed' : 'Pending'}
              </strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks assigned to this user.</p>
      )}
    </div>
  );
};

export default UserDetails;