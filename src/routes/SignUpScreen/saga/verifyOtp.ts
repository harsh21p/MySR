/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../apiConfig/axios';
import { VerifyOtpInfo } from 'types';
import { callVerifyOtp, verifyOtpErrorRequest, verifyOtpSuccessRequest } from '../slice/verifyOtp';



function* verifyOtp(action: PayloadAction<VerifyOtpInfo>): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'POST',
      url: 'otp/verifyOtp',
      params: userPayload,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(verifyOtpSuccessRequest(response.data));
    } else {
      yield put(verifyOtpErrorRequest(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      verifyOtpErrorRequest({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchVerifyOtpREquest() {
  yield takeLatest(callVerifyOtp, verifyOtp);
}
