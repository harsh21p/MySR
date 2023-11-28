import {
  UpdateHistoryError,
  UpdateHistoryInfo,
  UpdateHistoryPayload,
  UpdateHistorySuccess,
} from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: UpdateHistoryInfo = {
  isUpdateHistoryLoading: false,
  updateHistoryPayload: undefined,
  updateHistorySuccess: undefined,
  updateHistoryError: undefined,
};

export const updateHistorySlice = createSlice({
  name: 'updateHistory',
  initialState,
  reducers: {
    callUpdateHistory: (
      state,
      action: PayloadAction<UpdateHistoryPayload>,
    ) => {
      state.updateHistoryPayload = action.payload;
      state.isUpdateHistoryLoading = true;
    },
    callUpdateHistorySuccess: (
      state,
      action: PayloadAction<UpdateHistorySuccess>,
    ) => {
      state.updateHistorySuccess = action.payload;
      state.isUpdateHistoryLoading = false;
    },
    callUpdateHistoryError: (
      state,
      action: PayloadAction<UpdateHistoryError>,
    ) => {
      state.updateHistoryError = action.payload;
      state.isUpdateHistoryLoading = false;
    },
    clearUpdateHistory: state => {
      state.isUpdateHistoryLoading = false;
      state.updateHistoryPayload = undefined;
      state.updateHistorySuccess = undefined;
      state.updateHistoryError = undefined;
    },
  },
});

export const {
  callUpdateHistory,
  callUpdateHistorySuccess,
  callUpdateHistoryError,
  clearUpdateHistory,
} = updateHistorySlice.actions;

export const updateHistoryInfo = (state: RootState) =>
  state.updateHistory;

const updateHistoryReducer = updateHistorySlice.reducer;
export default updateHistoryReducer;
