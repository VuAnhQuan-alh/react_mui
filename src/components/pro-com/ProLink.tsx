import Link from '@mui/material/Link';
import { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router-dom';

interface Props {
  to: string;
  children: ReactNode;
}

const ProLink = ({ to, children }: Props) => {
  return (
    <Link component={ReactLink} to={to} sx={{ color: 'gray.800', '&:hover': { textDecorationLine: 'none' } }}>
      {children}
    </Link>
  );
};

export default ProLink;
