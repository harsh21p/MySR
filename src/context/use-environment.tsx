/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {keys} from 'constants/async-storage-keys';
import {getStorageItem, removeItem, setItem} from 'hooks/use-async-storage';

interface Props {
  children: React.ReactChild | React.ReactChild[] | JSX.Element;
}

export enum Envs {
  DEV = 'DEV',
  QA = 'QA',
  UAT = 'UAT',
  PROD = 'PROD',
}

export const DEFAULT_ENVIRONMENT = Envs.DEV;

export const BaseURL = {
  DEV: {
    envName: Envs.DEV,
    baseUrl:
      'apiurl',
  },
  QA: {
    envName: Envs.QA,
    baseUrl:
      'apiurl',
  },
};

interface EnvManager {
  currentEnv: any | null;
  updateEnv: (arg0: Envs) => void;
  resetEnv: () => void;
}

export const EnvironmentContext = React.createContext<EnvManager>({
  currentEnv: BaseURL[DEFAULT_ENVIRONMENT],
  updateEnv: (): void => {},
  resetEnv: (): void => {},
});

export const useEnvironmentContext = (): EnvManager =>
  React.useContext(EnvironmentContext);

const useEnvironmentProvider = ({children}: Props): JSX.Element => {
  const [currentEnv, setCurrentEnv] = useState(BaseURL[DEFAULT_ENVIRONMENT]);

  const _getAsyncStorageData = async () => {
    const isEnvSaved = await getStorageItem(keys.savedEnv);
    if (!isEnvSaved && DEFAULT_ENVIRONMENT.valueOf() !== Envs.PROD) {
      setItem(keys.savedEnv, BaseURL[DEFAULT_ENVIRONMENT]);
    } else if (DEFAULT_ENVIRONMENT.valueOf() === Envs.PROD) {
      removeItem(keys.savedEnv);
      setItem(keys.savedEnv, BaseURL[DEFAULT_ENVIRONMENT]);
    }
    if (isEnvSaved) {
      const curEnv = isEnvSaved.envName;
      setCurrentEnv(BaseURL[curEnv as Envs]);
    }
  };

  useEffect(() => {
    _getAsyncStorageData();
  }, [_getAsyncStorageData]);

  const updateEnv = useCallback((envName: Envs) => {
    setCurrentEnv(BaseURL[envName]);
    removeItem(keys.savedEnv);
    setItem(keys.savedEnv, BaseURL[envName]);
  }, []);

  const resetEnv = useCallback(() => {
    removeItem(keys.savedEnv);
    setCurrentEnv(BaseURL[DEFAULT_ENVIRONMENT]);
  }, []);

  const envManager = useMemo((): EnvManager => {
    return {currentEnv, updateEnv, resetEnv};
  }, [currentEnv, updateEnv, resetEnv]);

  return (
    <EnvironmentContext.Provider value={envManager}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export default useEnvironmentProvider;
