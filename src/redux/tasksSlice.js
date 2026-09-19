import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => await api.fetchTasks());
export const createTask = createAsyncThunk('tasks/createTask', async (task) => await api.createTask(task));
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, ...data }) => await api.updateTask(id, data));
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => await api.deleteTask(id));

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;