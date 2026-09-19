import React from 'react';
import './TaskFilters.css';

export const TaskFilters = ({ filters, users = [], onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange(e.target.name, e.target.value);
  };

  return (
    <div className="task-filters">
      <input
        type="text"
        name="search"
        className="task-filters-input"
        placeholder="Search tasks..."
        value={filters?.search || ''}
        onChange={handleChange}
      />

      <select className="task-filters-select" name="completed" value={filters?.completed || 'all'} onChange={handleChange}>
        <option value="all">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="done">Completed</option>
      </select>

      <select className="task-filters-select" name="userId" value={filters?.userId || 'all'} onChange={handleChange}>
        <option value="all">All Users</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>

      <select className="task-filters-select" name="sortBy" value={filters?.sortBy || 'default'} onChange={handleChange}>
        <option value="default">Default Sort</option>
        <option value="title-asc">Title ↑</option>
        <option value="title-desc">Title ↓</option>
      </select>
    </div>
  );
};

export default TaskFilters;