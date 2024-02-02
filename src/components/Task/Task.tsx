import { FC } from 'react'

import { TaskT } from '../../types'

interface TaskProps {
    key: number
    task: TaskT
}

const Task: FC<TaskProps> = ({
    task: {
        title,
        description,
        created
    }
}): JSX.Element => {
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
            <button className='btn btn--secondary basis-1/4'>Edit</button>
            <button className='btn btn--secondary basis-1/4'>Remove</button>
        </div>
    </div>
  )
}

export default Task
