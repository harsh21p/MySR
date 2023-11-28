import {
  GetHistoryError,
  GetHistoryInfo, GetHistoryPaylod, GetHistorySuccess
} from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: GetHistoryInfo = {
  isGetHistoryLoading: false,
  getHistoryPayload: undefined,
  getHistorySuccess: undefined,
  getHistoryError: undefined,
};

export const getHistoryByUserIdSlice = createSlice({
  name: 'getHistoryByUserIdSlice',
  initialState,
  reducers: {
    callGetHistoryByUserId: (
      state,
      action: PayloadAction<GetHistoryPaylod>,
    ) => {
      state.getHistoryPayload = action.payload;
      state.isGetHistoryLoading = true;
    },
    callGetHistoryByUserIdSuccess: (
      state,
      action: PayloadAction<GetHistorySuccess>,
    ) => {
      state.getHistorySuccess = action.payload;
      state.isGetHistoryLoading = false;
    },
    callGetHistoryByUserIdError: (
      state,
      action: PayloadAction<GetHistoryError>,
    ) => {
      state.getHistoryError = action.payload;
      state.isGetHistoryLoading = false;
    },
    clearGetHistoryByUserId: state => {
      state.isGetHistoryLoading = false;
      state.getHistoryPayload = undefined;
      state.getHistorySuccess = undefined;
      state.getHistoryError = undefined;
    },
  },
});

export const {
  callGetHistoryByUserId,
  callGetHistoryByUserIdSuccess,
  callGetHistoryByUserIdError,
  clearGetHistoryByUserId,
} = getHistoryByUserIdSlice.actions;

export const getHistoryByUserIdInfo = (state: RootState) =>
  state.getHistoryByUserId;

const getHistoryByUserIdReducer = getHistoryByUserIdSlice.reducer;
export default getHistoryByUserIdReducer;
