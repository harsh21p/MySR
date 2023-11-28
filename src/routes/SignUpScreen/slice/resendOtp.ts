import { ReSendOtpError, ReSendOtpInfo, ReSendOtpPayload, ReSendOtpSuccess } from 'types';
import {RootState} from '../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: ReSendOtpInfo = {
  isReSendOtpLoading: false,
  reSendOtpPayload: undefined,
  reSendOtpSuccess: undefined,
  reSendOtpError: undefined,
};

export const resendOtpSlice = createSlice({
  name: 'resendOtp',
  initialState,
  reducers: {
    callResendOtp: (state, action: PayloadAction<ReSendOtpPayload>) => {
      state.reSendOtpPayload = action.payload;
      state.isReSendOtpLoading = true;
    },
    resendOtpSuccessRequest: (
      state,
      action: PayloadAction<ReSendOtpSuccess>,
    ) => {
      state.reSendOtpSuccess = action.payload;
      state.isReSendOtpLoading = false;
    },
    resendOtpErrorRequest: (state, action: PayloadAction<ReSendOtpError>) => {
      state.reSendOtpError = action.payload;
      state.isReSendOtpLoading = false;
    },
    clearResendOtp: state => {
      state.isReSendOtpLoading = false;
      state.reSendOtpPayload = undefined;
      state.reSendOtpSuccess = undefined;
      state.reSendOtpError = undefined;
    },
  },
});

export const {
  callResendOtp, resendOtpSuccessRequest, resendOtpErrorRequest, clearResendOtp
} = resendOtpSlice.actions;

export const resendOtpInfo = (state: RootState) => state.resendOtp;

const resendOtpReducer = resendOtpSlice.reducer;
export default resendOtpReducer;
