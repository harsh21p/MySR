/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { GetHistoryByOrderInfo } from 'types';
import { callGetHistoryByOrder, callGetHistoryByOrderSuccess, callGetHistoryByOrderError } from 'routes/History/slice/getHistoryByOrder';


function* getHistoryByOrder(
  action: PayloadAction<GetHistoryByOrderInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `donation/getHistoryByOrder/${userPayload?.id}`,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callGetHistoryByOrderSuccess(response.data));
    } else {
      yield put(callGetHistoryByOrderError(response.data));
    }
  } catch (error) {

    yield put(
      callGetHistoryByOrderError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchGetHistoryByOrder() {
  yield takeLatest(callGetHistoryByOrder, getHistoryByOrder);
}
