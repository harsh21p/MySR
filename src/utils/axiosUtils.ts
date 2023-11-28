import {getStorageItem} from './../hooks/use-async-storage';
/* eslint-disable @typescript-eslint/no-explicit-any */

import {BaseURL, Envs} from '../context/use-environment';
import {keys} from 'constants/async-storage-keys';

const isValidResponse = (data: any) => {
  if (data && !data?.error && data.status === 200) {
    return true;
  } else {
    return false;
  }
};

const getBaseUrl = async () => {
  const baseUrl = BaseURL[Envs.DEV];

  const selectedEnvironment = await getStorageItem(keys.savedEnv);
  if (selectedEnvironment !== null) {
    return selectedEnvironment.baseUrl;
  }
  return baseUrl.baseUrl;
};

export default {isValidResponse, getBaseUrl};
