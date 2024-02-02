import Add from './Add.tsx';
import Remove from './Remove.tsx';
import Edit from './Edit.tsx';

import { TModalName, TComponentProps } from '../../types';

const modals = {
  adding: Add,
  removing: Remove,
  editing: Edit,
};

export default (modalName: TModalName): React.FC<TComponentProps> => modals[modalName];
