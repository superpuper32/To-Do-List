import { ReactNode, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useImmer } from "use-immer";
import { toast } from 'react-toastify';

import Task from '../Task/Task';
import { TTask, TModalType, TModal, TComponentProps } from '../../types';
import { Button, Heading } from '../';

import getModal from '../modals';
import { fetchTasks } from '../../api';

import './main.scss';

const renderModal = ({
  modal,
  hideModal,
  updateTasks
}: TComponentProps) => {
  if (!modal.type) {
    return null;
  }
  const Component = getModal(modal.type);
  return <Component modal={modal} hideModal={hideModal} updateTasks={updateTasks} />;
};

function Main() {
  const [tasks, updateTasks] = useImmer([]);

  const [modal, setModal] = useState<TModal | null>(null);

  const hideModal = () => setModal(null);

  const showModal = useCallback((type: TModalType, task: TTask) => setModal({ type, task }), []);  

  const addTask = useCallback(() => showModal('adding', {id: '', title: '', description: '', created: ''}), [showModal]);

  useEffect(() => {
    fetchTasks().then(result => {
      updateTasks((tasks: TTask[]) => {

        result.forEach((task: TTask ) => {
            tasks.push(task);
        })

      })
    }).catch((error) => {
      toast.error(error.message);
    });
  }, []);

  const renderTasks = (task: TTask): ReactNode => (
    <Task key={task.id} task={task} showModal={showModal} />
  );

  return (
    <>
      <div className="main-page">
        <Heading>To Do List</Heading>

        <div className='main-page__body'>
          {tasks.map(renderTasks)}
        </div>

        <div className='main-page__footer'>
          <div className="">
            <Button type="button" className="btn btn--primary" handleClick={addTask}>Add Task</Button>
          </div>
        </div>
      </div>

      {modal && createPortal(renderModal({ modal, hideModal, updateTasks }), document.body)}
    </>
  );
}

export default Main;
