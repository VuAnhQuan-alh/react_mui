import { NotificationContext, type NotificationContextValue } from '@/contexts/Notification';
import { useContext } from 'react';

const useNotification: NotificationContextValue = () => {
  const notificationContext = useContext(NotificationContext);
  if (notificationContext) throw new Error('Forgot to warp component in NotificationContext');

  return notificationContext;
};

export default useNotification;
