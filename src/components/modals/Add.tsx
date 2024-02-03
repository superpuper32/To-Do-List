import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import _ from 'lodash';
import { toast } from 'react-toastify';

import { TTask, TComponentProps } from '../../types';
import { Modal, Input, Button } from '../';

import { addTask } from '../../api';

const generateOnSubmit = ({
  hideModal,
  updateTasks
}: TComponentProps) => (values: TTask) => {
  const task: TTask = { ...values, id: _.uniqueId() };

  addTask(task).then((response) => {

    updateTasks((tasks: TTask[]) => {
      tasks.push(response)
    });

    hideModal();
    toast("Task successfully created!");
  }).catch((error) => {
    hideModal();
    toast.error(error.message);
  });
};

const Add: React.FC<TComponentProps> = (props) => {
  const { hideModal } = props;

  const formik = useFormik({
    initialValues: { id: '', title: '', description: '', created: ''},
    onSubmit: generateOnSubmit(props),
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
          <Button className="btn btn--primary" type="submit">Submit</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Add;
