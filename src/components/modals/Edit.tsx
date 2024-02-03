import { FC, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { TComponentProps, TTask } from '../../types';
import { Modal, Input, Button } from '../';

import { updateTask } from '../../api';

const generateOnSubmit = ({
    hideModal,
    updateTasks
}: TComponentProps) => (values: TTask) => {
    updateTask(values).then((response) => {
      updateTasks((tasks) => {
        const task = tasks.find((task) => task.id === response.id)
        task!.title = response.title
        task!.description = response.description
        task!.created = response.created
      });
      hideModal();
      toast("Task successfully edited!");
    }).catch((error) => {
      hideModal();
      toast.error(error.message);
    });
}

const Edit: FC<TComponentProps> = (props) => {
  const { hideModal, modal } = props;
  const { task } = modal;

  const formik = useFormik({
    initialValues: task,
    onSubmit: generateOnSubmit(props),
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
          <Button className="btn btn--primary" type="submit">Submit</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default Edit;
