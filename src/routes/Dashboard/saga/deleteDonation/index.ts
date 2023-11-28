import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosProps, requestApi } from "apiConfig/axios";
import { AxiosResponse } from "axios";
import { callDeleteDonation, deleteDonationError, deleteDonationSuccess } from "../../slice/deleteDonation";
import { SagaReturnType, call, put, takeLatest } from "redux-saga/effects";
import {DeleteDonationInfo} from 'types'

function* deleteDonation(
  action: PayloadAction<DeleteDonationInfo>,
): SagaReturnType<any>{
    try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'DELETE',
      url: `donation/${userPayload?.id}`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(deleteDonationSuccess(response.data));
    } else {
      yield put(deleteDonationError(response.data));
    }
  } catch (error) {
    yield put(
      deleteDonationError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchDeleteDonation() {
  yield takeLatest(callDeleteDonation, deleteDonation);
}
