/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../apiConfig/axios';
import {
  callEmailExists,
  emailExistsSuccess,
  emailExistsError,
} from '../slice/checkEmailAlreadyExists';
import { EmailExistsInfo } from 'types';

function* emailExists(
  action: PayloadAction<EmailExistsInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `user/email/exists?email=${userPayload.email}`,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(emailExistsSuccess(response.data));
    } else {
      yield put(emailExistsError(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      emailExistsError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchEmailExistsRequest() {
  yield takeLatest(callEmailExists, emailExists);
}
