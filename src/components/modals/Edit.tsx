import { FC, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { TComponentProps, TTask } from '../../types';
import { Modal, Input, Button } from '../';
import { useTasks } from '../../hooks';

import { updateTask } from '../../api';

type SubmitProps = {
  hideModal: () => void;
  editTask: (task: TTask) => void;
};

const generateOnSubmit = ({ hideModal, editTask }: SubmitProps) => (values: TTask) => {
    updateTask(values).then((response) => {
      editTask(response);
      hideModal();
      toast("Task successfully edited!");
    }).catch((error) => {
      hideModal();
      toast.error(error.message);
    });
}

const Edit: FC<TComponentProps> = ({ hideModal, modal }) => {
  const { editTask } = useTasks();
  const { task } = modal;

  const formik = useFormik({
    initialValues: task,
    onSubmit: generateOnSubmit({ hideModal, editTask }),
  });

  const inputRef = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal>
      <Modal.Header hideModal={hideModal}>Edit Task</Modal.Header>

      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
            <Input
              ref={inputRef}
              required
              label="Title"
              type="text"
              name="title"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.title}
              data-testid="input-title"
            />
            <Input
              required
              label="Description"
              type="text"
              name="description"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.description}
              data-testid="input-description"
            />
            <Input
              required
              label="Date creation"
              type="date"
              name="created"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.created}
              data-testid="input-created"
            />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn--primary" type="submit">Edit</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default Edit;
