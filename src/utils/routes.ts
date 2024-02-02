const apiPath = 'http://localhost:3000';

export default {
  tasksPath: () => [apiPath, 'tasks'].join('/'),
};
