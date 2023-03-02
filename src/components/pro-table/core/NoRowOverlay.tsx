import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Overlay from './Overlay';

interface IProps {
  visible: boolean;
}

const NoRowOverlay = ({ visible }: IProps) => {
  if (!visible) return null;

  return (
    <Overlay>
      <Box
        sx={{
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HorizontalSplitIcon fontSize="large" sx={{ color: 'gray.600' }} />
        <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
          No data
        </Typography>
      </Box>
    </Overlay>
  );
};

export default NoRowOverlay;
