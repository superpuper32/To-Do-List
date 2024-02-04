import { ReactNode, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';

import { Button, Heading, Task } from '../';
import { TTask, TModalType, TModal, TComponentProps } from '../../types';
import { useTasks } from '../../hooks';
import getModal from '../modals';

import './main.scss';

import { fetchTasks } from '../../api';

const renderModal = ({ modal, hideModal }: TComponentProps) => {
  const Component = getModal(modal.type);
  return <Component modal={modal} hideModal={hideModal} />;
};

function Main() {
  const [ modal, setModal ] = useState<TModal | null>(null);
  const { tasks, addTask } = useTasks();

  const hideModal = () => setModal(null);
  const showModal = useCallback((type: TModalType, task: TTask) => setModal({ type, task }), []);
  const showAddTask = useCallback(() => showModal('adding', {id: '', title: '', description: '', created: ''}), [showModal]);

  useEffect(() => {

    fetchTasks().then(result => {
      result.forEach((task: TTask ) => {
        addTask(task);
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
            <Button type="button" className="btn btn--primary" handleClick={showAddTask}>Add Task</Button>
        </div>
      </div>

      {modal && createPortal(renderModal({ modal, hideModal }), document.body)}
    </>
  );
}

export default Main;
