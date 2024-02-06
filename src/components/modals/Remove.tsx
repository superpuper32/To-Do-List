import { FC } from 'react';

import { TComponentProps } from '../../types';
import { Button, Modal } from '../';
import { useTasks } from '../../hooks';

const Remove: FC<TComponentProps> = ({ modal, hideModal }) => {
  const { removeTask } = useTasks();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const taskId = modal?.task?.id;
    await removeTask(taskId);
    hideModal();
  }

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
