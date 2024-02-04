import { useContext } from "react";

import { TasksContext } from "../contexts";

export function useTasks() {
    const context = useContext(TasksContext);
    
    if (context === null) {
        throw new Error('useTasks must be used within a TasksProvider');
    }

    return context;
}
