import { forwardRef } from 'react';

import { Ref, InputProps } from './Input.types';
import './input.scss';

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const { label, handleChange, handleBlur, ...otherProps } = props;

  return (
    <label className='modal-label'>
      <span className='modal-label__span'>{label}</span>
      <input
        ref={ref}
        onChange={handleChange}
        onBlur={handleBlur}
        className='modal-label__input form-input rounded'
        {...otherProps}
      />
    </label>
  );
});

export default Input;
