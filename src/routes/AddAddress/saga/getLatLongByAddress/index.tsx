import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import { GetAddressInfo, GetLatLongByAddressInfo } from 'types';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { callGetLatLongByAddressSuccess, callGetLatLongByAddressError, callGetLatLongByAddress } from 'routes/AddAddress/slice/getLatLongByAddress';

function* getLatLongByAddress(
    action: PayloadAction<GetLatLongByAddressInfo>
): SagaReturnType<any> {
    
    try {
        const userPayload = action.payload;
        const requestParams: AxiosProps = {
          type: 'POST',
          url: `donation/getLatlongFromAddress`,
          params:userPayload,
        };
        const response: AxiosResponse = yield call(requestApi, requestParams);
        const {data} = response;
        if (data) {
          yield put(callGetLatLongByAddressSuccess(response.data));
        } else {
          yield put(callGetLatLongByAddressError(response.data));
        }
    } catch (error) {
        yield put(
          callGetLatLongByAddressError({
            error:
              error?.response?.data?.message ||
              'Please check your internet connectivity and try agin after some time.',
          }),
        );
      }
}

export default function* watchgetLatLongByAddress() {
    yield takeLatest( callGetLatLongByAddress, getLatLongByAddress);
}
