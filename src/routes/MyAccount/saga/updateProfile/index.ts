/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import { UpdateProfileInfo } from 'types';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { callUpdateProfile, updateProfileError, updateProfileSuccess } from 'routes/MyAccount/slice/updateProfile';

function* updateProfile(
  action: PayloadAction<UpdateProfileInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'PATCH',
      url: `user/${userPayload?.id}`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
        'Content-Type': 'multipart/form-data',
      },
      params: userPayload?.data,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(updateProfileSuccess(response.data));
    } else {
      yield put(updateProfileError(response.data));
    }
  } catch (error) {
    yield put(
      updateProfileError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}
export default function* watchUpdateProfile() {
  yield takeLatest(callUpdateProfile, updateProfile);
}
