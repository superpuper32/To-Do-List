import { FC, useReducer, ReactElement } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

import { TasksContext } from './';
import { TTask } from "../types";

import { TasksApi } from "../api";

type ActionType = "added" | 'changed' | 'deleted';
type ACTIONTYPE = {
  type: ActionType;
  task: TTask;
};

function tasksReducer(tasks: TTask[], action: ACTIONTYPE) {
  switch (action.type) {
    case 'added': {
      return [...tasks, action.task];
    }
    case 'changed': {
      return tasks.map((t: TTask) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.task.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialState: TTask[] = [];

interface ITasksProvider {
    children: ReactElement[]
}

export const TasksProvider: FC<ITasksProvider> = ({ children }) => {
    const [tasks, dispatch] = useReducer(tasksReducer, initialState);

    async function addTasks() {
      try {
        const tasks: TTask[] = await TasksApi.fetchTasks();
        tasks.forEach((task: TTask) => {
          dispatch({ type: 'added', task });
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.message);
        } else {
          console.error(error);
        }
      }
    }

    async function addTask(newTask: TTask) {
      try {
        const task: TTask = await TasksApi.addTask(newTask);
        dispatch({ type: 'added', task });
        toast("Task successfully created!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.message);
        } else {
          console.error(error);
        }
      }
    }

    async function editTask(newTask: TTask) {
      try {
        const task: TTask = await TasksApi.updateTask(newTask);
        dispatch({ type: 'changed', task });
        toast("Task successfully edited!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.message);
        } else {
          console.error(error);
        }
      }
    }

    async function removeTask(taskId: string) {
      try {
        const task: TTask = await TasksApi.removeTask(taskId);
        dispatch({ type: 'deleted', task });
        toast("Task successfully removed!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.message);
        } else {
          console.error(error);
        }
      }
      
    }

    return (
      <TasksContext.Provider value={{ addTasks, tasks, addTask, editTask, removeTask }}>
        {children}
      </TasksContext.Provider>
    );
}
