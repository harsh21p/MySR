/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { GetAddressByIdInfo } from 'types';
import { callGetAddressById, callGetAddressByIdError, callGetAddressByIdSuccess } from 'routes/Dashboard/slice/GetAddressById';


function* getAddressById(
  action: PayloadAction<GetAddressByIdInfo>,
): SagaReturnType<any> {
    const userPayload = action.payload;
  try {
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `user/getAddressByAddressId/${userPayload.id}`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callGetAddressByIdSuccess(response.data));
    } else {
      yield put(callGetAddressByIdError(response.data));
    }
  } catch (error) {
    yield put(
      callGetAddressByIdError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchGetAddressById() {
  yield takeLatest(callGetAddressById, getAddressById);
}
