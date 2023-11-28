import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from 'redux/store';
import { UpdateRequest, UpdateRequestError, UpdateRequestPayload, UpdateRequestSuccess } from 'types';


export const initialState: UpdateRequest = {
  isUpdateRequestLoading: false,
  updateRequestPayload: undefined,
  updateRequestSuccess: undefined,
  updateRequestError: undefined,
};

export const updateRequestSlice = createSlice({
  name: 'updateRequest',
  initialState,
  reducers: {
    callUpdateRequest: (
      state,
      action: PayloadAction<UpdateRequestPayload>,
    ) => {
      state.updateRequestPayload = action.payload;
      state.isUpdateRequestLoading = true;
    },
    callUpdateRequestSuccess: (
      state,
      action: PayloadAction<UpdateRequestSuccess>,
    ) => {
      state.updateRequestSuccess = action.payload;
      state.isUpdateRequestLoading = false;
    },
    callUpdateRequestError: (
      state,
      action: PayloadAction<UpdateRequestError>,
    ) => {
      state.updateRequestError = action.payload;
      state.isUpdateRequestLoading = false;
    },
    updateRequestClear: state => {
      state.isUpdateRequestLoading = false;
      state.updateRequestPayload = undefined;
      state.updateRequestSuccess = undefined;
      state.updateRequestError = undefined;
    },
  },
});

export const {
  callUpdateRequest,
  callUpdateRequestSuccess,
  callUpdateRequestError,
  updateRequestClear,
} = updateRequestSlice.actions;

export const updateRequestInfo = (state: RootState) => state.updateRequest;

const updateRequestReducer = updateRequestSlice.reducer;
export default updateRequestReducer;
