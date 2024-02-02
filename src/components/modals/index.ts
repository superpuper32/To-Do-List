import Add from './Add.tsx';
import Remove from './Remove.tsx';
import Edit from './Edit.tsx';

import { TModalType, TComponentProps } from '../../types';

const modals = {
  adding: Add,
  removing: Remove,
  editing: Edit,
};

export default (modalType: TModalType): React.FC<TComponentProps> => modals[modalType];
