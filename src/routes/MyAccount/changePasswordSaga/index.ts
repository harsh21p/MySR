/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../apiConfig/axios';
import {ChangePasswordInfo} from 'types';
import {
  callChangePassword,
  callChangePasswordError,
  callChangePasswordSuccess,
} from 'routes/MyAccount/changePasswordSlice';

function* changeUserPassword(
  action: PayloadAction<ChangePasswordInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'PATCH',
      url: `user/change-password/${userPayload?.id}`,
      params: userPayload?.payload,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callChangePasswordSuccess(response.data));
    } else {
      yield put(callChangePasswordError(response.data));
    }
  } catch (error) {
    yield put(
      callChangePasswordError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchChangePasswordRequest() {
  yield takeLatest(callChangePassword, changeUserPassword);
}
