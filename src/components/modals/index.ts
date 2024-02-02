import { ReactNode } from 'react';
import Add from './Add.tsx';

const modals = {
  adding: Add,
};

export default (modalName: ReactNode) => modals[modalName];
