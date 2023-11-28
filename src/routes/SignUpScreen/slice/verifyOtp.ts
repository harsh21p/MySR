import { VerifyOtpError, VerifyOtpInfo, VerifyOtpPayload, VerifyOtpSuccess } from 'types';
import {RootState} from '../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: VerifyOtpInfo = {
  isVerifyOtpLoading: false,
  verifyOtpPayload: undefined,
  verifyOtpSuccess: undefined,
  verifyOtpError: undefined,
};

export const verifyOtpSlice = createSlice({
  name: 'verifyOtp',
  initialState,
  reducers: {
    callVerifyOtp: (state, action: PayloadAction<VerifyOtpPayload>) => {
      state.verifyOtpPayload = action.payload;
      state.isVerifyOtpLoading = true;
    },
    verifyOtpSuccessRequest: (state, action: PayloadAction<VerifyOtpSuccess>) => {
      state.verifyOtpSuccess = action.payload;
      state.isVerifyOtpLoading = false;
    },
    verifyOtpErrorRequest: (state, action: PayloadAction<VerifyOtpError>) => {
      state.verifyOtpError = action.payload;
      state.isVerifyOtpLoading = false;
    },
    clearVerifyOtp: state => {
      state.isVerifyOtpLoading = false;
      state.verifyOtpPayload = undefined;
      state.verifyOtpSuccess = undefined;
      state.verifyOtpError = undefined;
    },
  },
});

export const {callVerifyOtp, verifyOtpErrorRequest, verifyOtpSuccessRequest, clearVerifyOtp} =
  verifyOtpSlice.actions;

export const verifyOtpInfo = (state: RootState) => state.verifyOtp;

const verifyOtpReducer = verifyOtpSlice.reducer;
export default verifyOtpReducer;
