import LoadingButton, { type LoadingButtonProps } from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
// import { useState } from 'react';
// import { Await } from '@/hooks/useAwait';

const icons = {
  search: SearchIcon,
  save: SaveIcon,
  delete: DeleteIcon,
  cancel: CloseIcon,
  check: CheckIcon,
  add: AddIcon,
} as const;

interface IProps extends LoadingButtonProps {
  actionType?: keyof typeof icons;
  iconPosition?: 'start' | 'end';
  onSubmit?: () => Promise<void>;
}

const ActionButton = (props: IProps) => {
  const { actionType, iconPosition = 'start', loading, ...rest } = props;
  // const [sub, setSub] = useState<boolean>(false);

  const Icon = actionType && icons[actionType];

  // const handleOnSubmit = async () => {
  //   if (!onSubmit) {
  //     setSub(true);
  //     return Await(1000).finally(() => {
  //       setSub(false);
  //     });
  //   }

  //   try {
  //     setSub(true);
  //     await onSubmit();
  //   } catch (error) {
  //     console.log('action-button', error);
  //   } finally {
  //     setSub(false);
  //   }
  // };

  return (
    <LoadingButton
      // onClick={handleOnSubmit}
      loading={loading}
      {...(actionType && {
        loadingPosition: 'start',
        startIcon: Icon && iconPosition === 'start' ? <Icon /> : void 0,
        endIcon: Icon && iconPosition === 'end' ? <Icon /> : void 0,
        variant: actionType === 'cancel' ? 'outlined' : void 0,
      })}
      {...rest}
    />
  );
};

export default ActionButton;
