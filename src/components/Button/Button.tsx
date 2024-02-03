import { FC } from 'react';

import { ButtonProps } from './Button.types';

const Button: FC<ButtonProps> = ({
    type,
    className,
    handleClick = () => {},
    children
}) => {
 
  return (
    <button
      type={type}
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
