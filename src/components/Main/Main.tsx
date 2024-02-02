import { ReactNode, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useImmer } from "use-immer";
import { toast } from 'react-toastify';

import Task from '../Task/Task';
import { TTask, TModalType, TModal, TComponentProps } from '../../types';
import Button from '../Button';

import getModal from '../modals';
import { fetchTasks } from '../../api';

const renderModal = ({ modal, hideModal, updateTasks }: TComponentProps) => {
  if (!modal.type) {
    return null;
  }

  const Component = getModal(modal.type);
  return <Component modal={modal} hideModal={hideModal} updateTasks={updateTasks} />;
};

function Main() {
  const [tasks, updateTasks] = useImmer([]);
  const [modal, setModal] = useState<TModal>({
    type: null,
    task: {
      id: '',
      title: '',
      description: '',
      created: ''
    }
  });

  const hideModal = () => setModal({ type: null, task: {id: '', title: '', description: '', created: ''} });
  const showModal = useCallback((type: TModalType, task: TTask) => setModal({ type, task }), []);
  
  const handleAdd = useCallback(() => showModal('adding', {id: '', title: '', description: '', created: ''}), [showModal]);

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

  return (
    <>
      <div className="main--container relative h-screen mb-32">
        <h1>To Do List</h1>

        {tasks.map((task: TTask): ReactNode => {
          return <Task key={task.id} task={task} showModal={showModal} />
        })}

        <div className='fixed flex justify-center inset-x-0 bottom-0 w-full'>
          <Button handleClick={handleAdd} title="Add Task" />
        </div>
      </div>

      {createPortal(renderModal({ modal, hideModal, updateTasks }), document.body)}
    </>
  );
}

export default Main;