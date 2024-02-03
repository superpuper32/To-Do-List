import { FC } from 'react';

import { FooterProps } from './Footer.types';
import './footer.scss';

const Footer: FC<FooterProps> = ({ children }) => (
  <div className="footer">{children}</div>
);

export default Footer;
