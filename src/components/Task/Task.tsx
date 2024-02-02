import { FC } from 'react'

import { TRenderTask } from '../../types'

const Task: FC<TRenderTask> = ({
    showModal,
    task
}): JSX.Element => {
  const {  title, description, created } = task

  return (
    <div className='mb-4 rounded-md p-4 bg-white ring-1 ring-slate-200 shadow-sm'>
        <div className='flex flex-col'>
            <div>
                <h3>{title}</h3>
            </div>
            <div className='m-3'>
                <p>{description}</p>
            </div>
            <div className='mb-2'>
                <span className='text-slate-500'>{created}</span>
            </div>
        </div>
        <div className='w-full h-px bg-gray-200 my-4'></div>

        <div className='flex flex-wrap justify-around'>
            <button className='btn btn--secondary basis-1/4' onClick={() => showModal('editing', task)}>Edit</button>
            <button className='btn btn--secondary basis-1/4' onClick={() => showModal('removing', task)}>Remove</button>
        </div>
    </div>
  )
}

export default Task
