import React from 'react'

import Modal from '../Modal/Modal'
import { TComponentProps } from '../../types'

const generateOnSubmit = ({ modal, hideModal, updateTasks }: TComponentProps) => (e: React.SyntheticEvent) => {
  e.preventDefault()
  updateTasks(tasks => tasks.filter(task => task.id !== modal?.task?.id))
  hideModal()
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
