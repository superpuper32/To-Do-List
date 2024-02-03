import { FC } from 'react';

import { HeadingProps } from './Heading.types';
import './heading.scss';

const Heading: FC<HeadingProps> = ({
    children
}) => {
  return (
    <div className='heading'>
        <h1>{children}</h1>
    </div>
  );
}

export default Heading;
