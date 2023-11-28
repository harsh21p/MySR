/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../apiConfig/axios';
import {GetProfileInfo} from 'types';
import { callGetProfile, getProfileError, getProfileSuccess } from '../slice';
import { useAuthContext } from 'context/use-auth-context';


function* getProfile(
  action: PayloadAction<GetProfileInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `user/${userPayload.userId}`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(getProfileSuccess(response.data));
    } else {
      yield put(getProfileError(response.data));
    }
  } catch (error) {
    yield put(
      getProfileError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchGetProfile() {
  yield takeLatest(callGetProfile, getProfile);
}
