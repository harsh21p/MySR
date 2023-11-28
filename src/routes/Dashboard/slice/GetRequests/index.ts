
import { GetRequestsError, GetRequestsInfo, GetRequestsPaylod, GetRequestsSuccess } from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: GetRequestsInfo = {
  isGetRequestsLoading: false,
  getRequestsPayload: undefined,
  getRequestsSuccess: undefined,
  getRequestsError: undefined,
};

export const getRequestSlice = createSlice({
  name: 'getRequests',
  initialState,
  reducers: {
    callGetRequests: (state, action: PayloadAction<GetRequestsPaylod>) => {
      state.getRequestsPayload = action.payload;
      state.isGetRequestsLoading = true;
    },
    callGetRequestsSuccess: (
      state,
      action: PayloadAction<GetRequestsSuccess>,
    ) => {
      state.getRequestsSuccess = action.payload;
      state.isGetRequestsLoading = false;
    },
    callGetRequestsError: (state, action: PayloadAction<GetRequestsError>) => {
      state.getRequestsError = action.payload;
      state.isGetRequestsLoading = false;
    },
    clearGetRequests: state => {
      state.isGetRequestsLoading = false;
      state.getRequestsPayload = undefined;
      state.getRequestsSuccess = undefined;
      state.getRequestsError = undefined;
    },
  },
});

export const {
  callGetRequests,
  callGetRequestsSuccess,
  callGetRequestsError,
  clearGetRequests,
} = getRequestSlice.actions;

export const getRequestsInfo = (state: RootState) => state.getRequests;

const getRequestReducer = getRequestSlice.reducer;
export default getRequestReducer;
