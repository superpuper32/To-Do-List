import { ReactNode, useEffect, useMemo, useCallback, useState } from 'react'
// import { useImmer } from "use-immer"
import axios from 'axios'

import './App.scss'

import Task from './components/Task/Task'
import { TTask, TModalName, TModal, TRenderItem, TComponentProps } from './types'
import Button from './components/Button'
// import Modal from './components/Modal/Modal'
import routes from './utils/routes.js';
import getModal from './components/modals';

const renderModal = ({ modal, hideModal, updateTasks }: TComponentProps) => {
  if (!modal.type) {
    return null;
  }

  const Component = getModal(modal.type);

  return <Component modal={modal} hideModal={hideModal} updateTasks={updateTasks} />;
};

function App() {
  const [tasks, setTasks] = useState([])
  // const [tasks, updateTasks] = useImmer([])

  const [modal, setModal] = useState<TModal>({ type: null, task: { id: 0, title: '', description: '', created: ''} })

  const hideModal = () => setModal({ type: null, task: {id: 0, title: '', description: '', created: ''} })
  const showModal = useMemo(() => (type: TModalName, task: TTask) => setModal({ type, task }), [])

  
  const handleAdd = useCallback(() => showModal('adding', {id: 0, title: '', description: '', created: ''}), [])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(routes.tasksPath())
      console.log('effect')

      // updateTasks((tasks) => {
      //   response.data.forEach((task: TTask ) => {
      //       tasks.push(task)
      //   })
      // })
      setTasks(response.data)
    }

    fetchTasks()
  }, [])

  return (
    <>
    <div className="main--container relative h-screen">
      <h1>To Do List</h1>

      {tasks && tasks.map((task: TTask): ReactNode => {
        return <Task key={task.id} task={task} />
      })}

      <div className='fixed flex justify-center inset-x-0 bottom-0 w-full'>
        <Button handleClick={handleAdd} />
      </div>
    </div>

    {renderModal({ modal, hideModal, updateTasks: setTasks })}
    </>
  )
}

export default App
