/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';

import { callUploadCertificate, callUploadCertificateError, callUploadCertificateSuccess } from 'routes/History/slice/uploadCertificate';
import { UploadCertificate } from 'types';

function* uploadCertificate(
  action: PayloadAction<UploadCertificate>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'PATCH',
      url: `donation/uploadOrderCertificate/${userPayload?.id}`,
      params: userPayload?.data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userPayload?.accessToken}`,
      },
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callUploadCertificateSuccess(response.data));
    } else {
      yield put(callUploadCertificateError(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      callUploadCertificateError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchUploadCertificateRequest() {
  yield takeLatest(callUploadCertificate, uploadCertificate);
}
