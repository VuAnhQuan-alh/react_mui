import Alert, { type AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { createContext, forwardRef, ReactNode, SyntheticEvent, useCallback, useState } from 'react';
import { Await } from '@/hooks/useAwait';

interface Props {
  children: ReactNode;
}

interface Notifications {
  message: string | null;
  error: string | null;
  severity?: AlertProps['severity'];
}

type NotificationContextValue = (config: Notifications) => void;
const NotificationContext = createContext<NotificationContextValue | null>(null);

if (process.env.NODE_ENV === 'develop') {
  NotificationContext.displayName = 'NotificationContext';
}

const initialNotification: Notifications = {
  message: null,
  error: null,
};

const AlertMessage = forwardRef<HTMLDivElement, AlertProps>((props, ref) => <Alert ref={ref} {...props} />);

const NotificationProvider = (props: Props) => {
  const { children } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<Notifications>(initialNotification);

  const { message, error, severity = 'success' } = settings;

  const setNotification = useCallback((settings: Notifications) => {
    setSettings((state) => ({
      ...state,
      ...settings,
    }));
    setOpen(true);
  }, []);

  const handleReset = async () => {
    setOpen(false);
    await Await(350);
    setSettings(initialNotification);
  };

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    handleReset();
  };

  return (
    <NotificationContext.Provider value={setNotification}>
      {children}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <AlertMessage onClose={handleClose} security={error ? 'error' : severity}>
          {error || message}
        </AlertMessage>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext, type NotificationContextValue };
