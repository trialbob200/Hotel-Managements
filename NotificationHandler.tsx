
import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import Alert from '../ui/Alert'; // Make sure this path is correct

const NotificationHandler: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-5 right-5 z-[1000] w-full max-w-sm space-y-3">
      {notifications.map(notif => (
        <Alert key={notif.id} notification={notif} onDismiss={removeNotification} />
      ))}
    </div>
  );
};

export default NotificationHandler;
