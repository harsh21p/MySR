/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../apiConfig/axios';
import { SignUpNGOInfo } from 'types';
import { callNGOSignUp, signUpNGOErrorRequest, signUpNGOSuccessRequest } from '../slice/signUpNGO';


function* signUpNGO(action: PayloadAction<SignUpNGOInfo>): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'POST',
      url: 'user/ngo',
      params: userPayload,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(signUpNGOSuccessRequest(response.data));
    } else {
      yield put(signUpNGOErrorRequest(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      signUpNGOErrorRequest({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchSignUpNGORequest() {
  yield takeLatest(callNGOSignUp, signUpNGO);
}
