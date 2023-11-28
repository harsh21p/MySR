/* eslint-disable no-unsafe-optional-chaining */
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {keys} from 'constants/async-storage-keys';
import {Alert} from 'react-native';
// import {clearValidateOTPResponse} from 'routes/OTPScreen/slice/verifyOTP';
// import {clearSignUpData} from 'routes/TermsAndConditions/slice';
// import {store} from '../redux/store';
import {
  getStorageItem,
  removeItem,
  setItem,
} from './../hooks/use-async-storage';
// import Toast from 'react-native-simple-toast';
import axiosUtils from 'utils/axiosUtils';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const config: AxiosRequestConfig = {
  // baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    source: 'mobile',
  },
};

const instance = axios.create(config);

instance.interceptors.request.use(
  async config => {
    const envBase = await getStorageItem(keys.savedEnv);
    config.baseURL = envBase.baseUrl;
    return config;
  },
  error => Promise.reject(error),
);

const requestInterceptorId: number = instance.interceptors.request.use(
  (configs: AxiosRequestConfig) => configs,
  (error: any) => Promise.reject(error),
);
export interface AxiosProps {
  type: any;
  url: any;
  params?: any;
  headers?: any;
  transformRequest?: any;
}

/** function that returns an axios call */
export const requestApi = ({
  type,
  url,
  params,
  headers,
  transformRequest,
}: AxiosProps): Promise<AxiosResponse> => {
//   const SessionExpired = async () => {
//     Toast.show('Your session has expired. Kindly login again.', Toast.LONG);

    // await removeItem(keys.errorDisplayed);
    // store.dispatch(clearValidateOTPResponse());
    // store.dispatch(clearSignUpData());
    // removeItem(keys.userLoginData);
//   };

  instance.interceptors.request.eject(requestInterceptorId);

  instance.interceptors.request.use(
    async (configs: AxiosRequestConfig) => {
      const userData = await getStorageItem(keys.userLoginData);
      const envBase = axiosUtils.getBaseUrl();
      // if (userData?.accessToken) {
        // console.log('accessToken,', userData?.accessToken);
        configs = {
          ...configs,
          baseURL: envBase,
          headers: {
            ...configs.headers,
            // Authorization: `Bearer ${userData?.accessToken}`,
          },
        };
      // }

      return Promise.resolve(configs);
      // }
    },
    (error: any) => Promise.reject(error),
  );
  instance.interceptors.request.eject(requestInterceptorId);

  instance.interceptors.request.use(
    (configs: AxiosRequestConfig) => Promise.resolve(configs),
    (error: any) => Promise.reject(error),
  );

  instance.interceptors.request.use((configs: AxiosRequestConfig) => configs);
  instance.interceptors.request.use((configs: AxiosRequestConfig) =>
    Promise.resolve(configs),
  );

  const responseInterceptorId: number = axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: any) => Promise.reject(error),
  );

  axios.interceptors.response.eject(responseInterceptorId);

  axios.interceptors.response.use(
    (response: AxiosResponse) => Promise.resolve(response),
    (error: any) => Promise.reject(error),
  );

  axios.interceptors.response.use((response: AxiosResponse) => response);
  axios.interceptors.response.use((response: AxiosResponse) =>
    Promise.resolve(response),
  );

  return instance.request({
    method: type,
    url: url,
    data: params,
    headers: headers,
    transformRequest: transformRequest,
  });
};

export default instance;
