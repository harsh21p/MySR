import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosProps, requestApi } from "apiConfig/axios";
import { AxiosResponse } from "axios";
import { SagaReturnType, call, put, takeLatest } from "redux-saga/effects";
import { callSendNotificationByUserId, callSendNotificationByUserIdError, callSendNotificationByUserIdSuccess } from "../../slice/sendNotificationByUserId";
import { SendNotificationByUserIdInfo } from "types";


function* sendNotificationByUserId(
  action: PayloadAction<SendNotificationByUserIdInfo>,
): SagaReturnType<any>{
    try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'POST',
      url: `user/sendNotificationByUserId`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
      params: userPayload.data
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callSendNotificationByUserIdSuccess(response.data));
    } else {
      yield put(callSendNotificationByUserIdError(response.data));
    }
  } catch (error) {
    yield put(
      callSendNotificationByUserIdError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchSendNotificationByUserId() {
  yield takeLatest(callSendNotificationByUserId, sendNotificationByUserId);
}
