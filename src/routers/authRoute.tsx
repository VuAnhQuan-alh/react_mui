import useAuth from '@/hooks/useAuth';
import { Fragment, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const PublicRoute = (props: Props) => {
  const { children } = props;
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Fragment>{children}</Fragment>;
};

const ProtectedRoute = (props: Props) => {
  const { children } = props;
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/index" />;
  }

  return <Fragment>{children}</Fragment>;
};

const AdminRoute = (props: Props) => {
  const { children } = props;
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user?.role.type === 'authenticated') {
    return <Fragment>{children}</Fragment>;
  }

  return <Navigate to="/index" />;
};

export { PublicRoute, ProtectedRoute, AdminRoute };
