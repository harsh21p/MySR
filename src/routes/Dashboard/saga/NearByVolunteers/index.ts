import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosProps, requestApi } from "apiConfig/axios";
import { AxiosResponse } from "axios";
import { SagaReturnType, call, put, takeLatest } from "redux-saga/effects";
import { callNearByVolunteers, callNearByVolunteersError, callNearByVolunteersSuccess } from "../../slice/NearByVolunteers";
import { NearByVolunteersInfo } from "types";


function* nearByVolunteers(
  action: PayloadAction<NearByVolunteersInfo>,
): SagaReturnType<any>{
    try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'GET',
      url: `user/getNearbyVolunteers/${userPayload?.lat}/${userPayload?.long}/${userPayload?.radius}`,
      headers: {
        Authorization: `Bearer ${userPayload?.jwt}`,
      },
      
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callNearByVolunteersSuccess(response.data));
    } else {
      yield put(callNearByVolunteersError(response.data));
    }
  } catch (error) {
    yield put(
      callNearByVolunteersError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchNearByVolunteers() {
  yield takeLatest(callNearByVolunteers, nearByVolunteers);
}
