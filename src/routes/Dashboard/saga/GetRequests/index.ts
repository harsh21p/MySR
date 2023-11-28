/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import {GetRequestsInfo} from 'types';
import {
  callGetRequests,
  callGetRequestsSuccess,
  callGetRequestsError,
} from 'routes/Dashboard/slice/GetRequests';

function* getRequests(
  action: PayloadAction<GetRequestsInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `donation/getDonationsRequestsForNgo/${userPayload?.id}`,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callGetRequestsSuccess(response.data));
    } else {
      yield put(callGetRequestsError(response.data));
    }
  } catch (error) {
    yield put(
      callGetRequestsError({
        error:
          error?.response?.data?.error ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchGetRequests() {
  yield takeLatest(callGetRequests, getRequests);
}
