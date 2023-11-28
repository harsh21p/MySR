/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../apiConfig/axios';
import { GetallRolesInfo } from 'types';
import { callGetAllRoles, getAllRolesError, getAllRolesSuccess } from '../slice/getRoles';


function* getAllRoles(
  action: PayloadAction<GetallRolesInfo>,
): SagaReturnType<any> {
  try {
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `roles`,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(getAllRolesSuccess(response.data));
    } else {
      yield put(getAllRolesError(response.data));
    }
  } catch (error) {
    yield put(
      getAllRolesError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchGetAllRoles() {
  yield takeLatest(callGetAllRoles, getAllRoles);
}
