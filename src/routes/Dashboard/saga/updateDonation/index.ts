import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosProps, requestApi } from "apiConfig/axios";
import { AxiosResponse } from "axios";
import { SagaReturnType, call, put, takeLatest } from "redux-saga/effects";
import { callUpdateDonation, callUpdateDonationError, callUpdateDonationSuccess } from "../../slice/updateDonation";
import { UpdateDonationInfo } from "types";


function* updateDonation(
  action: PayloadAction<UpdateDonationInfo>,
): SagaReturnType<any>{
    try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'PATCH',
      url: `donation/${userPayload?.id}`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
      params: userPayload.data
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callUpdateDonationSuccess(response.data));
    } else {
      yield put(callUpdateDonationError(response.data));
    }
  } catch (error) {
    yield put(
      callUpdateDonationError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchUpdateDonation() {
  yield takeLatest(callUpdateDonation, updateDonation);
}
