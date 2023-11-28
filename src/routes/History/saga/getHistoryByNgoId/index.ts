/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { GetHistoryNgoInfo } from 'types';
import { callGetHistoryByNgoId, callGetHistoryByNgoIdError, callGetHistoryByNgoIdSuccess } from 'routes/History/slice/getHistoryByNgoId';

function* getHistoryByNgoId(
  action: PayloadAction<GetHistoryNgoInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `donation/getOrdersForNgo/${userPayload?.id}`,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callGetHistoryByNgoIdSuccess(response.data));
    } else {
      yield put(callGetHistoryByNgoIdError(response.data));
    }
  } catch (error) {

    yield put(
      callGetHistoryByNgoIdError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchGetHistoryByNgoId() {
  yield takeLatest(callGetHistoryByNgoId, getHistoryByNgoId);
}
