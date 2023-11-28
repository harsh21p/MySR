/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { AddAddressInfo } from 'types';
import { callAddAddress, callAddAddressError, callAddAddressSuccess } from '../../slice/addAddress';



function* addAddress(action: PayloadAction<AddAddressInfo>): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'POST',
      url: 'user/addAddress',
      params: userPayload,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callAddAddressSuccess(response.data));
    } else {
      yield put(callAddAddressError(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      callAddAddressError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchAddAddressRequest() {
  yield takeLatest(callAddAddress, addAddress);
}
