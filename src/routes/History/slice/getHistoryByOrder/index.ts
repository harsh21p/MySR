import {
  DeleteCertificateError,
  DeleteCertificateInfo,
  DeleteCertificatePayload,
  DeleteCertificateSuccess,
  GetHistoryByOrderError,
  GetHistoryByOrderInfo,
  GetHistoryByOrderPayload,
  GetHistoryByOrderSuccess,
} from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: GetHistoryByOrderInfo = {
  isHistoryByOrderLoading: false,
  getHistoryByOrderPayload: undefined,
  getHistoryByOrderSuccess: undefined,
  getHistoryByOrderError: undefined,
};

export const getHistoryByOrderSlice = createSlice({
  name: 'getHistoryByOrder',
  initialState,
  reducers: {
    callGetHistoryByOrder: (
      state,
      action: PayloadAction<GetHistoryByOrderPayload>,
    ) => {
      state.getHistoryByOrderPayload = action.payload;
      state.isHistoryByOrderLoading = true;
    },
    callGetHistoryByOrderSuccess: (
      state,
      action: PayloadAction<GetHistoryByOrderSuccess>,
    ) => {
      state.getHistoryByOrderSuccess = action.payload;
      state.isHistoryByOrderLoading = false;
    },
    callGetHistoryByOrderError: (
      state,
      action: PayloadAction<GetHistoryByOrderError>,
    ) => {
      state.getHistoryByOrderError = action.payload;
      state.isHistoryByOrderLoading = false;
    },
    clearGetHistoryByOrder: state => {
      state.isHistoryByOrderLoading = false;
      state.getHistoryByOrderPayload = undefined;
      state.getHistoryByOrderSuccess = undefined;
      state.getHistoryByOrderError = undefined;
    },
  },
});

export const {
  callGetHistoryByOrder,
  callGetHistoryByOrderSuccess,
  callGetHistoryByOrderError,
  clearGetHistoryByOrder,
} = getHistoryByOrderSlice.actions;

export const getHistoryByOrderInfo = (state: RootState) => state.getHistoryByOrder;

const getHistoryByOrderReducer = getHistoryByOrderSlice.reducer;
export default getHistoryByOrderReducer;
