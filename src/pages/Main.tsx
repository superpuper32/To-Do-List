import { ReactNode, useEffect, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { useImmer } from "use-immer"

import Task from '../components/Task/Task'
import { TTask, TModalName, TModal, TComponentProps } from '../types'
import Button from '../components/Button'

import getModal from '../components/modals';
import { fetchTasks } from '../api/fetchTasks'

const renderModal = ({ modal, hideModal, updateTasks }: TComponentProps) => {
  if (!modal.type) {
    return null
  }

  const Component = getModal(modal.type);

  return <Component modal={modal} hideModal={hideModal} updateTasks={updateTasks} />;
};

function Main() {
  const [tasks, updateTasks] = useImmer([])
  const [modal, setModal] = useState<TModal>({
    type: null,
    task: {
      id: '',
      title: '',
      description: '',
      created: ''}
    })

  const hideModal = () => setModal({ type: null, task: {id: '', title: '', description: '', created: ''} })
  const showModal = useCallback((type: TModalName, task: TTask) => setModal({ type, task }), [])
  
  const handleAdd = useCallback(() => showModal('adding', {id: '', title: '', description: '', created: ''}), [])

  useEffect(() => {
    fetchTasks().then(result => {
      updateTasks((tasks: TTask[]) => {
        result.forEach((task: TTask ) => {
            tasks.push(task)
        })
      })
    })
  }, [])

  return (
    <>
    <div className="main--container relative h-screen">
      <h1>To Do List</h1>

      {tasks.map((task: TTask): ReactNode => {
        return <Task key={task.id} task={task} showModal={showModal} />
      })}

      <div className='fixed flex justify-center inset-x-0 bottom-0 w-full'>
        <Button handleClick={handleAdd} />
      </div>
    </div>

    {createPortal(renderModal({ modal, hideModal, updateTasks }), document.body)}
    </>
  )
}

export default Main
