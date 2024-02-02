const apiPath = 'http://localhost:3000';

export default {
  tasksPath: () => [apiPath, 'tasks'].join('/'),
  taskPath: (id: string) => [apiPath, `tasks/${id}`].join('/'),
};
