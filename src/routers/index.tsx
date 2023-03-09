import Container from '@mui/material/Container';
import { Fragment } from 'react';
import { lazy } from 'react';
import Loadable from '@/components/pro-layout/Loadable';
import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';
import { PublicRoute, ProtectedRoute, AdminRoute } from './authRoute';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const LoginPage = Loadable(lazy(() => import('@/views/auth/login')));
const RegisterPage = Loadable(lazy(() => import('@/views/auth/register')));
const ProfilePage = Loadable(lazy(() => import('@/views/profile')));
const ChangePasswordPage = Loadable(lazy(() => import('@/views/profile/change-pass')));

const ManagerUsers = Loadable(lazy(() => import('@/views/users')));
const ManagerVideos = Loadable(lazy(() => import('@/views/videos')));

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Fragment>
        <Navbar />

        <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 81.5px)' }}>
          <Outlet />
        </Container>

        <Footer />
      </Fragment>
    ),
    children: [
      {
        path: 'auth',
        element: (
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        ),
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },

      {
        path: 'index',
        element: <>public page component</>,
      },

      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <>true page</> },
          { path: 'home', element: <>home page</> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'change-password', element: <ChangePasswordPage /> },
          { path: 'wallet', element: <>wallet component</> },
        ],
      },

      {
        path: 'admin',
        element: (
          <AdminRoute>
            <Outlet />
          </AdminRoute>
        ),
        children: [
          { path: 'users', element: <ManagerUsers /> },
          { path: 'videos', element: <ManagerVideos /> },
          { path: 'songs', element: <>songs component</> },
          { path: 'posts', element: <>posts component</> },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routes);
