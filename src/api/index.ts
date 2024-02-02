import axios from 'axios';

import routes from './routes.ts';
import { TTask } from '../types/index.ts';

export const fetchTasks = async () => {
  const response = await axios.get(routes.tasksPath());
  return response.data;
};

export const addTask = async (task: TTask) => {
  const response = await axios.post(routes.tasksPath(), task);
  return response.data;
};

export const updateTask = async (task: TTask) => {
  const response = await axios.put(routes.taskPath(task.id), task);
  return response.data;
};

export const removeTask = async (id: string) => {
  const response = await axios.delete(routes.taskPath(id));
  return response.data;
};
