/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import { DeleteCertificateInfo } from 'types';
import { callDeleteCertificate, callDeleteCertificateError, callDeleteCertificateSuccess } from 'routes/History/slice/deleteCertificate';



function* deleteCertificate(
  action: PayloadAction<DeleteCertificateInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'DELETE',
      url: `donation/certificate/${userPayload?.id}`,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callDeleteCertificateSuccess(response.data));
    } else {
      yield put(callDeleteCertificateError(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      callDeleteCertificateError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchDeleteCertificateRequest() {
  yield takeLatest(callDeleteCertificate, deleteCertificate);
}
