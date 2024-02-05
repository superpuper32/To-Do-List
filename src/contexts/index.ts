import { createContext } from "react";

import { TTask } from "../types";

export interface TasksContextType {
  tasks: TTask[];
  addTasks: () => void;
  addTask: (task: TTask) => void;
  editTask: (tsk: TTask) => void;
  removeTask: (taskId: string) => void;
}

export const TasksContext = createContext<TasksContextType | null>(null);

