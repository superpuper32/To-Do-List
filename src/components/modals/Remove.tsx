import React from 'react'

import Modal from '../Modal/Modal'
import { TComponentProps } from '../../types'
import { removeTask } from '../../api';

const generateOnSubmit = ({ modal, hideModal, updateTasks }: TComponentProps) => (e: React.SyntheticEvent) => {
  e.preventDefault()
  try {
      const id = modal?.task?.id
      removeTask(id).then((response) => {
        updateTasks(tasks => tasks.filter(task => task.id !== response.id))
        hideModal()
      })
  } catch (e) {
    throw Error('remove task failed')
  }
};

const Remove: React.FC<TComponentProps> = (props) => {
  const { hideModal } = props
  const onSubmit = generateOnSubmit(props)

  return (
    <Modal hideModal={hideModal}>
      <Modal.Header hideModal={hideModal}>
        Remove Task
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onSubmit}>
            <input className="btn btn--primary" type="submit" value="Remove" />
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default Remove
