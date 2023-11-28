/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../apiConfig/axios';
import { ReSendOtpInfo } from 'types';
import { callResendOtp, resendOtpErrorRequest, resendOtpSuccessRequest } from '../slice/resendOtp';


function* resendOtp(action: PayloadAction<ReSendOtpInfo>): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'POST',
      url: 'otp/resendOtp',
      params: userPayload,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(resendOtpSuccessRequest(response.data));
    } else {
      yield put(resendOtpErrorRequest(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      resendOtpErrorRequest({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchResendOtpRequest() {
  yield takeLatest(callResendOtp, resendOtp);
}
