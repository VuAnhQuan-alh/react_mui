import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import viLocale from 'date-fns/locale/vi';
import enLocale from 'date-fns/locale/en-US';
// import { DateTimeLocaleText } from './constants/locale';
import { ColorModeContext, useMode } from './theme';
import { HomePage } from './views';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={enLocale}
          // localeText={DateTimeLocaleText}
        >
          <CssBaseline enableColorScheme />
          <Container maxWidth="lg">
            <Typography variant="h5" color="blue.800">
              hello world!
            </Typography>

            <HomePage />
          </Container>
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
