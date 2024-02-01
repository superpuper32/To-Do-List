import { ReactNode, useEffect, useState } from 'react'
import axios from 'axios'

import './App.scss'

import Task from './components/Task/Task'
import { TaskT } from './types'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:3000/tasks");
      setTasks(response.data)
    }

    fetchTasks()
  }, [])

  return (
    <div className="container md:w-1/2 w-full">
      <h1 className='mb-3'>To Do List</h1>

      {tasks && tasks.map((task: TaskT): ReactNode => {
        return <Task key={task.id} task={task} />
      })}

    </div>
  )
}

export default App
