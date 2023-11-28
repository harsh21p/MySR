/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../apiConfig/axios';
import {
  callPhoneExists,
  phoneExistsError,
  phoneExistsSuccess,
} from '../slice/checkPhoneAlreadyExists';
import { PhoneExistsInfo } from 'types';

function* phoneExists(
  action: PayloadAction<PhoneExistsInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `user/phoneNumber/exists?phoneNumber=${userPayload.phoneNumber}`,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(phoneExistsSuccess(response.data));
    } else {
      yield put(phoneExistsError(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      phoneExistsError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchPhoneExistsRequest() {
  yield takeLatest(callPhoneExists, phoneExists);
}
