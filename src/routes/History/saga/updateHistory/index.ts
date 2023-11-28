/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { UpdateHistoryInfo } from 'types';
import { callUpdateHistory, callUpdateHistorySuccess, callUpdateHistoryError } from 'routes/History/slice/updateHistory';



function* updateHistory(
  action: PayloadAction<UpdateHistoryInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'POST',
      url: `donation/createOrderHistory`,
      params: userPayload.data,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callUpdateHistorySuccess(response.data));
    } else {
      yield put(callUpdateHistoryError(response.data));
    }
  } catch (error) {
    yield put(
      callUpdateHistoryError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchUpdateHistory() {
  yield takeLatest(callUpdateHistory, updateHistory);
}
