/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../apiConfig/axios';
import {SendOtpInfo} from 'types';
import {
  callSendOtp,
  sendOtpErrorRequest,
  sendOtpSuccessRequest,
} from '../slice/sendOtp';

function* sendOtp(action: PayloadAction<SendOtpInfo>): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'POST',
      url: 'otp/send',
      params: userPayload,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(sendOtpSuccessRequest(response.data));
    } else {
      yield put(sendOtpErrorRequest(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      sendOtpErrorRequest({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchSendOtpRequest() {
  yield takeLatest(callSendOtp, sendOtp);
}
