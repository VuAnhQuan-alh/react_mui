import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const SplashScreen = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        bgcolor: 'background.paper',
        inset: 0,
        position: 'fixed',
        zIndex: 'modal',
      }}
    >
      <Box>
        <Typography
          gutterBottom
          variant="h6"
          align="center"
          sx={{
            color: (theme) => theme.palette.getContrastText(theme.palette.background.paper),
          }}
        >
          Information IDOL
        </Typography>
        <Box
          sx={{
            width: {
              xs: 250,
              sm: 400,
            },
          }}
        >
          <LinearProgress color="success" />
        </Box>
      </Box>
    </Box>
  );
};

export default SplashScreen;
