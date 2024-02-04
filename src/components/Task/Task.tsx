import { FC } from 'react';

import { TRenderTask } from '../../types';
import { Button } from '../';
import { formatDate } from '../../utils';
import './task.scss';

const Task: FC<TRenderTask> = ({
    showModal,
    task
}): JSX.Element => {
  const {  title, description, created } = task;
  const date = formatDate(created);

  return (
    <div className='task'>
        <div className='task__content content'>
            <div className='content__header'>
                <h3>{title}</h3>
                <span className='content__date'>{date}</span>
            </div>

            <div className='content__description'>
                <p>{description}</p>
            </div>
        </div>

        <div className='task__footer'>
            <Button
              type="button"
              className="btn btn--secondary basis-1/4"
              handleClick={() => showModal('editing', task)}
            >
              Edit
            </Button>
            <Button
              type="button"
              className='btn btn--secondary task__button'
              handleClick={() => showModal('removing', task)}
            >
              Remove
            </Button>
        </div>
    </div>
  );
}

export default Task;
