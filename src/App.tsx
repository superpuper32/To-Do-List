import Main from "./components/Main/Main";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';

function App() {

  return (
    <>
      <Main />
      <ToastContainer />
    </>
  );
}

export default App;
