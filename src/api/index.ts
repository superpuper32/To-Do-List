import axios from 'axios';

import { TTask } from '../types';

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000
});

export class TasksApi {
  static fetchTasks = async () => {
    const response = await instance.get("/tasks");
    return response.data;
  }

  static addTask = async (task: TTask) => {
    const response = await instance.post("/tasks", task);
    return response.data;
  };

  static updateTask = async (task: TTask) => {
    const response = await instance.put(`/tasks/${task.id}`, task);
    return response.data;
  };

  static removeTask = async (id: string) => {
    const response = await instance.delete(`/tasks/${id}`);
    return response.data;
  };
}
