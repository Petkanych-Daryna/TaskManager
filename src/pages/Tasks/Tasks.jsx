import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTask, updateTask, deleteTask } from '../../redux/tasksSlice';

import TaskForm from '../../components/TaskForm/TaskForm';
import TaskFilters from '../../components/TaskFilters/TaskFilters';
import TaskCard from '../../components/TaskCard/TaskCard';
import './Tasks.css';

export const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const users = useSelector((state) => state.users.items);
  
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ search: '', completed: 'all', userId: 'all', sortBy: 'default' });

  const handleCreate = (newTask) => {
    dispatch(createTask(newTask));
    setShowForm(false);
  };

  const handleUpdate = (updatedTask) => dispatch(updateTask(updatedTask));
  const handleDelete = (id) => dispatch(deleteTask(id));
  const handleToggle = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) dispatch(updateTask({ id, completed: !task.completed }));
  };

  const filteredTasks = tasks
    .filter((t) => {
      const title = (t.title || t.name || '').toLowerCase();
      const matchSearch = title.includes(filters.search.toLowerCase());
      const matchStatus = filters.completed === 'all' || (filters.completed === 'done' ? t.completed : !t.completed);
      const matchUser = filters.userId === 'all' || t.userId === filters.userId;
      return matchSearch && matchStatus && matchUser;
    })
    .sort((a, b) => {
      const titleA = a.title || a.name || '';
      const titleB = b.title || b.name || '';
      if (filters.sortBy === 'title-asc') return titleA.localeCompare(titleB);
      if (filters.sortBy === 'title-desc') return titleB.localeCompare(titleA);
      return 0;
    });

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close Form' : '+ Create Task'}</button>
      <br /><br />

      {showForm && <TaskForm users={users} onSave={handleCreate} onClose={() => setShowForm(false)} />}
      <TaskFilters filters={filters} users={users} onFilterChange={(n, v) => setFilters(p => ({ ...p, [n]: v }))} />

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id} task={task} users={users}
            onDelete={handleDelete} onToggle={handleToggle} onUpdate={handleUpdate}
          />
        ))
      ) : <p>No tasks found.</p>}
    </div>
  );
};

export default Tasks;