import { schema } from 'normalizr';

export const userSchema = new schema.Entity('users');

export const taskSchema = new schema.Entity('tasks', {
  user: userSchema,
});