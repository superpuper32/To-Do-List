import axios from 'axios'

import routes from './routes.ts';

export const fetchTasks = async () => {
  const response = await axios.get(routes.tasksPath())
  return response.data;
};