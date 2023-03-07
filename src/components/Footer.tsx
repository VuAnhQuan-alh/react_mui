import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as ReactLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: 'gray.100', py: 1 }}>
      <Container maxWidth="lg">
        <Typography textAlign="center" fontWeight={600} fontSize={13}>
          &copy;&nbsp;2023{' '}
          <Link
            component={ReactLink}
            to="/auth/register"
            sx={{ color: 'gray.800', '&:hover': { textDecorationLine: 'none' } }}
          >
            Vu Anh Quan
          </Link>
          . Rights All Copy.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
