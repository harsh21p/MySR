import {
  SendOtpError,
  SendOtpInfo,
  SendOtpPayload,
  SendOtpSuccess,
} from 'types';
import {RootState} from '../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: SendOtpInfo = {
  isSendOtpLoading: false,
  sendOtpPayload: undefined,
  sendOtpSuccess: undefined,
  sendOtpError: undefined,
};

export const sendOtpSlice = createSlice({
  name: 'sendOtp',
  initialState,
  reducers: {
    callSendOtp: (state, action: PayloadAction<SendOtpPayload>) => {
      state.sendOtpPayload = action.payload;
      state.isSendOtpLoading = true;
    },
    sendOtpSuccessRequest: (
      state,
      action: PayloadAction<SendOtpSuccess>,
    ) => {
      state.sendOtpSuccess = action.payload;
      state.isSendOtpLoading = false;
    },
    sendOtpErrorRequest: (state, action: PayloadAction<SendOtpError>) => {
      state.sendOtpError = action.payload;
      state.isSendOtpLoading = false;
    },
    clearSendOtp: state => {
      state.isSendOtpLoading = false;
      state.sendOtpPayload = undefined;
      state.sendOtpSuccess = undefined;
      state.sendOtpError = undefined;
    },
  },
});

export const {
  callSendOtp,
  sendOtpSuccessRequest,
  sendOtpErrorRequest,
  clearSendOtp,
} = sendOtpSlice.actions;

export const sendOtpInfo = (state: RootState) => state.sendOtp;

const sendOtpReducer = sendOtpSlice.reducer;
export default sendOtpReducer;
