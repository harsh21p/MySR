import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import { GetAddressesByLatLongInfo, GetAddressInfo } from 'types';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { callGetAddressesByLatLong, callGetAddressesByLatLongError, callGetAddressesByLatLongSuccess } from 'routes/AddAddress/slice/getAddressBtLatLong';

function* getAddressesByLatLong(
    action: PayloadAction<GetAddressesByLatLongInfo>
): SagaReturnType<any> {
    
    try {
        const userPayload = action.payload;
        const requestParams: AxiosProps = {
          type: 'POST',
          url: 'donation/getAddressFromLatlong',
          params:userPayload.data,
        };
        const response: AxiosResponse = yield call(requestApi, requestParams);
        const {data} = response;
        if (data) {
          yield put(callGetAddressesByLatLongSuccess(response.data));
        } else {
          yield put(callGetAddressesByLatLongError(response.data));
        }
    } catch (error) {
        yield put(
          callGetAddressesByLatLongError({
            error:
              error?.response?.data?.message ||
              'Please check your internet connectivity and try agin after some time.',
          }),
        );
      }
}

export default function* watchgetAddressesByLatLong() {
    yield takeLatest( callGetAddressesByLatLong, getAddressesByLatLong);
}
