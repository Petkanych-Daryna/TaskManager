import React, { useState } from 'react';
import './TaskForm.css';

export const TaskForm = ({ initialData, users = [], onSave, onClose }) => {
  const [title, setTitle] = useState(initialData?.title || initialData?.name || '');
  const [completed, setCompleted] = useState(initialData?.completed || false);
  const [userId, setUserId] = useState(initialData?.userId || users[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      ...(initialData || {}),
      title,
      completed,
      userId,
    });

    if (onClose) onClose();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h4 className="task-form-title">{initialData ? 'Edit Task' : 'Create Task'}</h4>
      
      <div className="task-form-field">
        <input
          type="text"
          className="task-form-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="task-form-field">
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          /> Completed
        </label>
      </div>

      <div className="task-form-field">
        <select
          className="task-form-select"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="" disabled>Select user...</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>

      <div className="task-form-actions">
        <button type="submit">Save</button>
        {onClose && <button type="button" onClick={onClose}>Cancel</button>}
      </div>
    </form>
  );
};

export default TaskForm;