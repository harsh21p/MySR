/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { GetAllNGOInfo } from 'types';
import { callGetAllNgo, callGetAllNgoError, callGetAllNgoSuccess } from 'routes/Dashboard/slice/GetAllNGO';


function* getAllNGO(
  action: PayloadAction<GetAllNGOInfo>,
): SagaReturnType<any> {
    const userPayload = action.payload;
  try {
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `user`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callGetAllNgoSuccess(response.data));
    } else {
      yield put(callGetAllNgoError(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      callGetAllNgoError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchGetAllNgo() {
  yield takeLatest(callGetAllNgo, getAllNGO);
}
