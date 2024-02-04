import { FC } from 'react';
import { toast } from 'react-toastify';

import { TComponentProps, TTask, TModal } from '../../types';
import { Button, Modal } from '../';
import { useTasks } from '../../hooks';

import { removeTask as remTask } from '../../api';

type SubmitProps = {
  modal: TModal; 
  hideModal: () => void;
  removeTask: (task: TTask) => void;
};

const generateOnSubmit = ({ modal, hideModal, removeTask }: SubmitProps) => (e: React.SyntheticEvent) => {
  e.preventDefault();

  const id = modal?.task?.id;
  remTask(id).then((response) => {
    removeTask(response);
    
    hideModal();
    toast("Task successfully removed!");
  }).catch((error) => {
    hideModal();
    toast.error(error.message);
  });
};

const Remove: FC<TComponentProps> = ({ modal, hideModal }) => {
  const { removeTask } = useTasks();

  const onSubmit = generateOnSubmit({ modal, hideModal, removeTask});

  return (
    <Modal>
      <Modal.Header hideModal={hideModal}>Remove Task</Modal.Header>
      <Modal.Footer>
        <form onSubmit={onSubmit}>
            <Button className="btn btn--primary" type="submit">Remove</Button>
        </form>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
