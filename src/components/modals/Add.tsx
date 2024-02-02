import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import _ from 'lodash';
import { toast } from 'react-toastify';

import Modal from '../Modal/Modal';
import './input.scss';

import { TTask, TComponentProps } from '../../types';
import { addTask } from '../../api';

const generateOnSubmit = ({
  hideModal,
  updateTasks
}: TComponentProps) => (values: TTask) => {
  const task: TTask = {
    id: _.uniqueId(),
    title: values.title,
    description: values.description,
    created: values.created,
  };

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
          <div className='grid grid-cols-1 gap-6'>
            <label className='block'>
              <span className='text-gray-700'>Title</span>
              <input
                required
                ref={inputRef}
                type="text"
                className='input--text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                data-testid="input-title"
                name="title"
              />
            </label>

            <label className='block'>
              <span className='text-gray-700'>Description</span>
              <input
                required
                type="text"
                className='input--text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                data-testid="input-description"
                name="description"
              />
            </label>

            <label className='block'>
              <span className='text-gray-700'>Date creation</span>
              <input
                required
                type="date"
                className='input--text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.created}
                data-testid="input-created"
                name="created"
              />
            </label>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button type="submit" className="btn btn--primary">Submit</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Add;
