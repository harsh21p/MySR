import {
  GetHistoryByNgoError,
  GetHistoryByNgoInfo, GetHistoryByNgoPaylod, GetHistoryByNgoSuccess
} from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: GetHistoryByNgoInfo = {
  isGetHistoryByNgoLoading: false,
  getHistoryByNgoPayload: undefined,
  getHistoryByNgoSuccess: undefined,
  getHistoryByNgoError: undefined,
};

export const getHistoryByNgoIdSlice = createSlice({
  name: 'getHistoryByNgoId',
  initialState,
  reducers: {
    callGetHistoryByNgoId: (
      state,
      action: PayloadAction<GetHistoryByNgoPaylod>,
    ) => {
      state.getHistoryByNgoPayload = action.payload;
      state.isGetHistoryByNgoLoading = true;
    },
    callGetHistoryByNgoIdSuccess: (
      state,
      action: PayloadAction<GetHistoryByNgoSuccess>,
    ) => {
      state.getHistoryByNgoSuccess = action.payload;
      state.isGetHistoryByNgoLoading = false;
    },
    callGetHistoryByNgoIdError: (
      state,
      action: PayloadAction<GetHistoryByNgoError>,
    ) => {
      state.getHistoryByNgoError = action.payload;
      state.isGetHistoryByNgoLoading = false;
    },
    clearGetHistoryByNgoId: state => {
      state.isGetHistoryByNgoLoading = false;
      state.getHistoryByNgoPayload = undefined;
      state.getHistoryByNgoSuccess = undefined;
      state.getHistoryByNgoError = undefined;
    },
  },
});

export const {
  callGetHistoryByNgoId,
  callGetHistoryByNgoIdSuccess,
  callGetHistoryByNgoIdError,
  clearGetHistoryByNgoId,
} = getHistoryByNgoIdSlice.actions;

export const getHistoryByNgoIdInfo = (state: RootState) => state.getHistoryByNgoId;

const getHistoryByNgoIdReducer = getHistoryByNgoIdSlice.reducer;
export default getHistoryByNgoIdReducer;
