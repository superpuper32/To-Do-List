import { FC, useReducer, ReactElement } from "react";

import { TasksContext } from './';
import { TTask } from "../types";

type ActionType = "added" | 'changed' | 'deleted';
type ACTIONTYPE = {
  type: ActionType;
  task: TTask;
};

const initialState: TTask[] = [];

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

interface ITasksProvider {
    children: ReactElement[]
}

export const TasksProvider: FC<ITasksProvider> = ({ children }) => {
    const [tasks, dispatch] = useReducer(tasksReducer, initialState);

    function addTask(task: TTask) {
        dispatch({ type: 'added', task });
    }

    function editTask(task: TTask) {
        dispatch({ type: 'changed', task });
    }

    function removeTask(task: TTask) {
        dispatch({ type: 'deleted', task });
    }

    return (
      <TasksContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
        {children}
      </TasksContext.Provider>
    );
}
