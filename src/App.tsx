import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Main } from "./components";

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
