import { FC } from 'react';
import { toast } from 'react-toastify';

import { Button, Modal } from '../';
import { TComponentProps } from '../../types';
import { removeTask } from '../../api';

const generateOnSubmit = ({
  modal,
  hideModal,
  updateTasks
}: TComponentProps) => (e: React.SyntheticEvent) => {
  e.preventDefault();

  const id = modal?.task?.id;
  removeTask(id).then((response) => {
    updateTasks(tasks => tasks.filter(task => task.id !== response.id));
    
    hideModal();
    toast("Task successfully removed!");
  }).catch((error) => {
    hideModal();
    toast.error(error.message);
  });
};

const Remove: FC<TComponentProps> = (props) => {
  const { hideModal } = props;
  const onSubmit = generateOnSubmit(props);

  return (
    <Modal>
      <Modal.Header hideModal={hideModal}>Remove Task</Modal.Header>
      <Modal.Footer>
        <form onSubmit={onSubmit}>
            <Button className="btn btn--primary" type="submit">Submit</Button>
        </form>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
