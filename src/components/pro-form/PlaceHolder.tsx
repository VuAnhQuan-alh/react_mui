import { styled } from '@mui/material/styles';

const PlaceHolder = styled('span')(() => ({
  opacity: 0.75,
  textOverflow: 'ellipsis',
  userSelect: 'none',
  pointerEvents: 'none',
}));

export default PlaceHolder;
