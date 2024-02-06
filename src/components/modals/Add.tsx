import { FC, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import _ from 'lodash';

import { TTask, TComponentProps, TNewTask } from '../../types';
import { Modal, Input, Button } from '../';
import { useTasks } from '../../hooks';

const Add: FC<TComponentProps> = ({ hideModal }) => {
  const { addTask } = useTasks();
  
  const formik = useFormik({
    initialValues: { title: '', description: '', created: '' },
    onSubmit: async (values: TNewTask) => {
      const newTask = { ...values, id: _.uniqueId() } as TTask;
      await addTask(newTask);
      hideModal();
    }
  });

  const inputRef = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal>
      <Modal.Header hideModal={hideModal}>Add Task</Modal.Header>

      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
            <Input
              label="Title"
              required
              type="text"
              ref={inputRef}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.title}
              data-testid="input-title"
              name="title"
            />
            <Input
              label="Description"
              required
              type="text"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.description}
              data-testid="input-description"
              name="description"
            />
            <Input
              label="Date creation"
              required
              type="date"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.created}
              data-testid="input-created"
              name="created"
            />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn--primary" type="submit">Add</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Add;
