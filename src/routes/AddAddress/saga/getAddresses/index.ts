import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import { GetAddressInfo } from 'types';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { callGetAddressSuccess, callGetAddressError, callGetAddresses} from 'routes/AddAddress/slice/getAddresses';

function* getAddresses(
    action: PayloadAction<GetAddressInfo>
): SagaReturnType<any> {
    
    try {
        const userPayload = action.payload;
        const requestParams: AxiosProps = {
          type: 'GET',
          url: `user/getAddress/${userPayload?.userId}`,
          headers: {
            Authorization: `Bearer ${userPayload?.jwt}`,
          },
        };
        const response: AxiosResponse = yield call(requestApi, requestParams);
        const {data} = response;
        if (data) {
          yield put(callGetAddressSuccess(response.data));
        } else {
          yield put(callGetAddressError(response.data));
        }
    } catch (error) {
        yield put(
          callGetAddressError({
            error:
              error?.response?.data?.message ||
              'Please check your internet connectivity and try agin after some time.',
          }),
        );
      }
}

export default function* watchGetAddress() {
    yield takeLatest( callGetAddresses , getAddresses);
}
