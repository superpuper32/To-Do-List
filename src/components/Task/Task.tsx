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
    <div className='group mb-4 cursor-pointer rounded-md p-4 bg-white ring-1 ring-slate-200 shadow-sm'>
        <dl className='grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center'>
            <div>
                <dt className='sr-only'>title</dt>
                <dd className='text-xl font-semibold text-slate-900'>{title}</dd>
            </div>
            <div className='m-3'>
                <dt className='sr-only'>description</dt>
                <dd>{description}</dd>
            </div>
            <div className='mb-3'>
                <dt className='sr-only text-slate-500'>created</dt>
                <dd className='text-slate-500'>{created}</dd>
            </div>
        </dl>
        <div className='w-full h-px bg-gray-200 my-7'></div>
        <div className='flex flex-wrap justify-around'>
            <button className='btn btn--secondary basis-1/4'>Edit</button>
            <button className='btn btn--secondary basis-1/4'>Remove</button>
        </div>
    </div>
  )
}

export default Task
