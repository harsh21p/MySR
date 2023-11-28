/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { DeleteAddressInfo } from 'types';
import { callDeleteAddress, callDeleteAddressError, callDeleteAddressSuccess } from 'routes/Maps/slice/deleteAddress';



function* deleteAddress(action: PayloadAction<DeleteAddressInfo>): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'DELETE',
      url: `user/deleteAddress/${userPayload.addressId}`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callDeleteAddressSuccess(response.data));
    } else {
      yield put(callDeleteAddressError(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      callDeleteAddressError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchDeleteAddressRequest() {
  yield takeLatest(callDeleteAddress, deleteAddress);
}
