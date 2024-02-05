import { createContext } from "react";

import { TTask } from "../types";

export interface TasksContextType {
  tasks: TTask[];
  addTask: (t: TTask) => void;
  editTask: (t: TTask) => void;
  removeTask: (t: TTask) => void;
}

export const TasksContext = createContext<TasksContextType | null>(null);

