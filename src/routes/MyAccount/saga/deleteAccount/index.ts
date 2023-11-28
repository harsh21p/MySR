/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { DeleteProfileInfo } from 'types';
import { callDeleteProfile, callDeleteSuccess, callDeleteError } from 'routes/MyAccount/slice/deleteAccount';

function* deleteProfile(
  action: PayloadAction<DeleteProfileInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'DELETE',
      url: `user/${userPayload?.userId}`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callDeleteSuccess(response.data));
    } else {
      yield put(callDeleteError(response.data));
    }
  } catch (error) {
    alert(
      error?.response?.data?.message ||
        'Please check your internet connectivity and try agin after some time.',
    );
    yield put(callDeleteError(error));
  }
}

export default function* watchDeleteProfile() {
  yield takeLatest(callDeleteProfile, deleteProfile);
}
