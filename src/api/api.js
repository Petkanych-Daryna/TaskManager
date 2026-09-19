import { normalize } from 'normalizr';
import { taskSchema } from './schema';

const BASE_URL = 'https://6a43f67a6dba791499abac95.mockapi.io';

export const api = {
  async fetchUsers() {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
  },

  async fetchTasks() {
    const res = await fetch(`${BASE_URL}/todos`);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return await res.json();
  },

  async createTask(newTask) {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return await res.json();
  },

  async updateTask(id, updatedFields) {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return await res.json();
  },

  async deleteTask(id) {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete task');
    return id;
  },

  async fetchNormalizedData() {
    const [tasks, users] = await Promise.all([this.fetchTasks(), this.fetchUsers()]);
    
    const nestedData = tasks.map((task) => ({
      ...task,
      user: users.find((u) => u.id === task.userId) || null,
    }));

    return normalize(nestedData, [taskSchema]).entities;
  },
};