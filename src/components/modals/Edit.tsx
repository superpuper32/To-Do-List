import React, { useEffect, useRef } from 'react'
import { useFormik } from 'formik'

import { TComponentProps, TValues} from '../../types'
import Modal from '../Modal/Modal';

const generateOnSubmit = ({
    modal,
    hideModal,
    updateTasks
}: TComponentProps) => (values: TValues) => {
  updateTasks((tasks) => {
    const task = tasks.find((task) => task.id === modal?.task?.id)
    task!.title = values.title
    task!.description = values.description
    task!.created = values.created
  });
  hideModal()
}

const Edit: React.FC<TComponentProps> = (props) => {
  const { hideModal, modal } = props
  const { task } = modal

  const formik = useFormik({
    initialValues: task,
    onSubmit: generateOnSubmit(props),
  })

  const inputRef = useRef<HTMLInputElement>(null!)
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <Modal hideModal={hideModal}>
      <Modal.Header hideModal={hideModal}>Rename</Modal.Header>

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
          <input className="btn btn--primary" type="submit" value="submit" />
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default Edit