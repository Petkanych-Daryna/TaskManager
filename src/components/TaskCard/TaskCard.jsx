import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from '../TaskForm/TaskForm';
import './TaskCard.css';

export const TaskCard = ({ task, users = [], onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <TaskForm
        initialData={task}
        users={users}
        onSave={(updated) => {
          onUpdate(updated);
          setIsEditing(false);
        }}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  const assignedUser = users.find((u) => u.id === task.userId);

  return (
    <div className="task-card">
      <h3>{task?.title || task?.name || 'Untitled Task'}</h3>
      <p><strong>Assigned to:</strong> {assignedUser ? assignedUser.name : 'N/A'}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span className={task?.completed ? 'task-card-status-completed' : 'task-card-status-pending'}>
          {task?.completed ? 'Completed' : 'Pending'}
        </span>
      </p>

      <div className="task-card-actions">
        <button type="button" onClick={() => onToggle(task.id)}>Toggle Status</button>
        <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        <button type="button" onClick={() => onDelete(task.id)}>Delete</button>
        <Link to={`/tasks/${task?.id}`}>Details</Link>
      </div>
    </div>
  );
};

export default TaskCard;