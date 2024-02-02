import { FC } from 'react'

import './input.scss'

interface InputProps {
    type: string
    span: string
}

const Input: FC<InputProps> = ({ type, span }) => {
    const handleChange = (e: { target: { value: any } }) => {
        console.log(e.target.value);
    }
  return (
    <label className='block'>
        <span className='text-gray-700'>{span}</span>
        <input type={type} className='input--text' onChange={handleChange} />
    </label>
  )
}

export default Input
