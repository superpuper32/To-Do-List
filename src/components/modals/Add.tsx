import React from 'react'

import Modal from '../Modal/Modal'

import { TItem, TComponentProps, Values} from '../../types';

const Add: React.FC<TComponentProps> = (props) => {
    const { hideModal } = props;
  return (
    <Modal hideModal={hideModal} />
  )
}

export default Add
