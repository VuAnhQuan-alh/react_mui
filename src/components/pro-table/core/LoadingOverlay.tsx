import { Box, CircularProgress } from '@mui/material';
import Overlay from './Overlay';

interface IProps {
  visible?: boolean;
}

const LoadingOverlay = ({ visible }: IProps) => {
  if (!visible) return null;

  return (
    <Overlay above backdrop>
      <Box
        sx={{
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    </Overlay>
  );
};

export default LoadingOverlay;
