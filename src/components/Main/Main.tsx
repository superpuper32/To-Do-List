import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Balance, Button, Heading, Task } from '../';
import { TTask, TModalType, TModal, TComponentProps } from '../../types';
import { useTasks } from '../../hooks';
import getModal from '../modals';

import './main.scss';

import { fetchTasks } from '../../api';

function Main() {
  const [ modal, setModal ] = useState<TModal | null>(null);
  const { tasks, addTask } = useTasks();

  const hideModal = () => setModal(null);
  const showModal = (type: TModalType) => (task: TTask) => setModal({ type, task });
  const showAddModal = () => setModal({ type: "adding", task: {} as TTask });

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
    <Task
      key={task.id}
      task={task}
      showEditModal={showModal("editing")}
      showRemoveModal={showModal("removing")}
    />
  );

  const renderModal = ({ modal, hideModal }: TComponentProps): ReactElement => {
    const Component = getModal(modal.type);
    return <Component modal={modal} hideModal={hideModal} />;
  };

  return (
    <>
      <div className="main-page">
        <Balance />
        <Heading>To Do List</Heading>

        <div className='main-page__body'>
          {tasks.map(renderTasks)}
        </div>

        <div className="main-page__footer">
            <Button type="button" className="btn btn--primary" handleClick={showAddModal}>Add Task</Button>
        </div>
      </div>

      {modal && renderModal({ modal, hideModal })}
    </>
  );
}

export default Main;
