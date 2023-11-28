import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosProps, requestApi } from "apiConfig/axios";
import { AxiosResponse } from "axios";
import { SagaReturnType, call, put, takeLatest } from "redux-saga/effects";
import { callSendNotificationByNgoId, callSendNotificationByNgoIdError, callSendNotificationByNgoIdSuccess } from "../../slice/sendNotificationByNgoId";
import { SendNotificationByNgoIdInfo } from "types";


function* sendNotificationByNgoId(
  action: PayloadAction<SendNotificationByNgoIdInfo>,
): SagaReturnType<any>{
    try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'POST',
      url: `user/sendNotificationByNgoId`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
      params: userPayload.data
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callSendNotificationByNgoIdSuccess(response.data));
    } else {
      yield put(callSendNotificationByNgoIdError(response.data));
    }
  } catch (error) {
    yield put(
      callSendNotificationByNgoIdError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchSendNotificationByNgoId() {
  yield takeLatest(callSendNotificationByNgoId, sendNotificationByNgoId);
}
