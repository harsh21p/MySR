/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { callUpdateAddress, updateAddressError, updateAddressSuccess } from 'routes/AddAddress/slice/updateAddress'

function* updateAddress(
  action: PayloadAction<UpdateAddressInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'PATCH',
      url: `user/updateAddress/${userPayload?.id}`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
      params: userPayload.data
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(updateAddressSuccess(response.data));
    } else {
      yield put(updateAddressError(response.data));
    }
  } catch (error) {
    yield put(
      updateAddressError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchUpdateAddress() {
  yield takeLatest(callUpdateAddress, updateAddress);
}
