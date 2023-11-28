import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosProps, requestApi } from "apiConfig/axios";
import { AxiosResponse } from "axios";
import { SagaReturnType, call, put, takeLatest } from "redux-saga/effects";
import { callNearByNgo, callNearByNgoError, callNearByNgoSuccess } from "../../slice/NearByNGO";
import { NearByNGOInfo } from "types";


function* nearByNgo(
  action: PayloadAction<NearByNGOInfo>,
): SagaReturnType<any>{
    try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `user/${userPayload?.lat}/${userPayload?.long}/${userPayload?.radius}`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
      
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callNearByNgoSuccess(response.data));
    } else {
      yield put(callNearByNgoError(response.data));
    }
  } catch (error) {
    yield put(
      callNearByNgoError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchNearByNgo() {
  yield takeLatest(callNearByNgo, nearByNgo);
}
