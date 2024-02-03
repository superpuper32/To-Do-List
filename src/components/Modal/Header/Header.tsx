import { FC } from 'react';

import { HeaderProps } from './Header.types';
import './header.scss'

const Header: FC<HeaderProps> = ({
    children,
    hideModal
}) => (
  <div className='header'>
    <h4 className='header__title'>{children}</h4>
    <button
      type="button"
      className='header__btn bg-close'
      onClick={hideModal}
    />
  </div>
);

export default Header;
