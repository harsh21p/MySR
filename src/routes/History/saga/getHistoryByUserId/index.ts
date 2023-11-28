/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { GetHistoryInfo } from 'types';
import { callGetHistoryByUserId, callGetHistoryByUserIdError, callGetHistoryByUserIdSuccess } from 'routes/History/slice/getHistoryByUserId';



function* getHistoryByUserId(
  action: PayloadAction<GetHistoryInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `donation/getOrdersForUser/${userPayload?.id}`,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callGetHistoryByUserIdSuccess(response.data));
    } else {
      yield put(callGetHistoryByUserIdError(response.data));
    }
  } catch (error) {

    yield put(
      callGetHistoryByUserIdError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchGetHistoryByUserId() {
  yield takeLatest(callGetHistoryByUserId, getHistoryByUserId);
}
