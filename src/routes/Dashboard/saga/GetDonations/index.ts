/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore

import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {call, put, SagaReturnType, takeLatest} from 'redux-saga/effects';
import {AxiosProps, requestApi} from '../../../../apiConfig/axios';
import {GetDonationsInfo} from 'types';
import {
  callGetDonation,
  callGetDonationError,
  callGetDonationSuccess,
} from 'routes/Dashboard/slice/GetDonations';

function* getDonation(
  action: PayloadAction<GetDonationsInfo>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `donation/${userPayload?.id}`,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callGetDonationSuccess(response.data));
    } else {
      yield put(callGetDonationError(response.data));
    }
  } catch (error) {
    // alert(
    //   error?.response?.data?.message ||
    //     'Please check your internet connectivity and try agin after some time.',
    // );
    yield put(
      callGetDonationError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchGetDonationRequest() {
  yield takeLatest(callGetDonation, getDonation);
}
