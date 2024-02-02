import Input from '../Input/Input';

const Form = () => {
  return (
    <div className='grid grid-cols-1 gap-6'>
      <Input type='text' span="Heading" />
      <Input type='text' span="Description" />
      <Input type='date' span="Date creation" />
    </div>
  )
}

export default Form