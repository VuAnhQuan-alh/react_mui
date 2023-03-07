import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import viLocale from 'date-fns/locale/vi';
import enLocale from 'date-fns/locale/en-US';
// import { DateTimeLocaleText } from './constants/locale';
import { ColorModeContext, useMode } from './theme';
import { HelmetProvider } from 'react-helmet-async';
import { AuthConsumer, AuthProvider } from './contexts/Auth';
import routes from '@/routers';
import { RouterProvider } from 'react-router-dom';
import SplashScreen from '@/components/SplashScreen';
import { UsersProvider } from './contexts/Users';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// const queryClient = new QueryClient();

function App() {
  const [theme, colorMode] = useMode();

  return (
    // <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enLocale}
              // localeText={DateTimeLocaleText}
            >
              <CssBaseline enableColorScheme />

              <UsersProvider>
                <AuthConsumer>
                  {(auth) => (!auth || !auth.isInitiallized ? <SplashScreen /> : <RouterProvider router={routes} />)}
                </AuthConsumer>
              </UsersProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AuthProvider>
    </HelmetProvider>
    // <ReactQueryDevtools initialIsOpen />
    // </QueryClientProvider>
  );
}

export default App;
