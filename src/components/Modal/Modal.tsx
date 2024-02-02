import { FC } from 'react'

import './modal.scss'
import Form from '../Form/Form'

interface ModalProps {
    hideModal: () => void
}

const Modal: FC<ModalProps> = ({
    hideModal
}) => {
  return (
    <>
        <div className='fade modalback'></div>

        <div className='fade modal show'>
            <div className='modal--dialog'>
                <div className='modal--content'>
                    <div className='modal--header'>
                        <h4 className='modal--title'>Add</h4>
                        <button className='btn--close bg-close' onClick={hideModal}></button>
                    </div>
                    <div className='w-full h-px bg-gray-200 my-4'></div>
                    <div className='modal--body'>
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Modal
