import { FC } from 'react';

import { BodyProps } from './Body.types';
import './body.scss';

const Body: FC<BodyProps> = ({ children }) => (
  <div className="body">
    <div className='body__form'>
        {children}
    </div>
  </div>
);

export default Body;
