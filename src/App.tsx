import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Main } from "./components";
import { TasksProvider } from './contexts/TasksProvider';

function App() {

  return (
    <TasksProvider>
      <Main />
      <ToastContainer />
    </TasksProvider>
  );
}

export default App;
