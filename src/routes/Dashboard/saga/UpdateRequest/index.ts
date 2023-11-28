import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosProps, requestApi} from 'apiConfig/axios';
import {AxiosResponse} from 'axios';
import {SagaReturnType, call, put, takeLatest} from 'redux-saga/effects';
import { callUpdateRequest, callUpdateRequestError, callUpdateRequestSuccess } from 'routes/Dashboard/slice/UpdateRequest';
import { UpdateRequest } from 'types';


function* updateRequest(
  action: PayloadAction<UpdateRequest>,
): SagaReturnType<any> {
  try {
    const userPayload = action.payload;
    const requestParams: AxiosProps = {
      type: 'PATCH',
      url: `donation/${userPayload?.id}`,
      params: userPayload?.data,
    };
    const response: AxiosResponse = yield call(requestApi, requestParams);
    const {data} = response;
    if (data) {
      yield put(callUpdateRequestSuccess(response.data));
    } else {
      yield put(callUpdateRequestError(response.data));
    }
  } catch (error) {
    yield put(
      callUpdateRequestError({
        error:
          error?.response?.data?.message ||
          'Please check your internet connectivity and try agin after some time.',
      }),
    );
  }
}

export default function* watchUpdateRequest() {
  yield takeLatest(callUpdateRequest, updateRequest);
}
