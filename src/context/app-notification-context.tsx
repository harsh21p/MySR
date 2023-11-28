import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {keys} from 'constants/async-storage-keys';
import {getStorageItem, removeItem, setItem} from 'hooks/use-async-storage';
import {UserNotificationType} from 'types';

interface Props {
  children: React.ReactChild | React.ReactChild[] | JSX.Element;
}

interface NotificationManager {
  notificationData: UserNotificationType;
  updateNotificationData: (arg0: UserNotificationType) => void;
  resetNotificationData: () => void;
}

const initialState: UserNotificationType = [{
  title: '',
  message: '',
  endpoint: '',
  read: false
}];

const LogoutState: UserNotificationType = [{title: '',
    message: '',
    endpoint: '',
    read: false
  }];

export const NotificationContext = React.createContext<NotificationManager>({
  notificationData: initialState,
  updateNotificationData: (): void => {},
  resetNotificationData: (): void => {},
});

export const useNotificationContext = (): NotificationManager => React.useContext(NotificationContext);

const NotificationProvider = ({children}: Props): JSX.Element => {
  const [notificationData, setNotificationData] = useState<UserNotificationType>(initialState);
  const _getAsyncStorageData = async () => {
    const notificationDataS = await getStorageItem(keys.userNotificationData);
    if (notificationDataS) {
      setNotificationData(notificationDataS);
    }
  };

  useEffect(() => {
    _getAsyncStorageData();
  }, []);

  const updateNotificationData = useCallback((data: UserNotificationType) => {
    setNotificationData(data);
    setItem(keys.userNotificationData, data);
  }, []);

  const resetNotificationData = useCallback(() => {
    removeItem(keys.userNotificationData);
    setNotificationData(LogoutState);
  }, []);

  const notificationManager = useMemo((): NotificationManager => {
    return {notificationData, updateNotificationData, resetNotificationData};
  }, [notificationData, resetNotificationData, updateNotificationData]);

  return (
    <NotificationContext.Provider value={notificationManager}>{children}</NotificationContext.Provider>
  );
};

export default NotificationProvider;
