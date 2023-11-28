/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import {ForgetPasswordInfo} from 'types';
import {
  callForgetPassword,
  callForgetPasswordError,
  callForgetPasswordSuccess,
} from '../../slice/SendEmail';

function* forgetPassword(
  action: PayloadAction<ForgetPasswordInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'POST',
      url: 'user/forgot-password',
      params: userPayload,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callForgetPasswordSuccess(response.data));
    } else {
      yield put(callForgetPasswordError(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      callForgetPasswordError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchForgetPasswordRequest() {
  yield takeLatest(callForgetPassword, forgetPassword);
}
