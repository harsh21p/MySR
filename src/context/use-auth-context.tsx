import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {keys} from 'constants/async-storage-keys';
import {getStorageItem, removeItem, setItem} from 'hooks/use-async-storage';
import {UserAuthType} from 'types';

interface Props {
  children: React.ReactChild | React.ReactChild[] | JSX.Element;
}

interface AuthManager {
  authData: UserAuthType;
  updateAuthData: (arg0: UserAuthType) => void;
  resetAuthData: () => void;
}

const initialState: UserAuthType = {
  jwt: '',
  userId: '',
  roleName: '',
};

const LogoutState: UserAuthType = {
  jwt: '',
  userId: '',
  roleName: '',
};

export const AuthContext = React.createContext<AuthManager>({
  authData: initialState,
  updateAuthData: (): void => {},
  resetAuthData: (): void => {},
});
export const useAuthContext = (): AuthManager => React.useContext(AuthContext);

const AuthProvider = ({children}: Props): JSX.Element => {
  const [authData, setAuthData] = useState<UserAuthType>(initialState);
  const _getAsyncStorageData = async () => {
    const userData = await getStorageItem(keys.userLoginData);
    if (userData) {
      setAuthData(userData);
    }
  };

  useEffect(() => {
    _getAsyncStorageData();
  }, []);

  const updateAuthData = useCallback((data: UserAuthType) => {
    setAuthData(data);
    setItem(keys.userLoginData, data);
  }, []);

  const resetAuthData = useCallback(() => {
    removeItem(keys.userLoginData);
    setAuthData(LogoutState);
  }, []);

  const authManager = useMemo((): AuthManager => {
    return {authData, updateAuthData, resetAuthData};
  }, [authData, resetAuthData, updateAuthData]);
  return (
    <AuthContext.Provider value={authManager}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
