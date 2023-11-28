import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { SendNotificationByUserIdError, SendNotificationByUserIdInfo, SendNotificationByUserIdPayload, SendNotificationByUserIdSuccess } from "types";

export const initialState: SendNotificationByUserIdInfo = {
  isSendNotificationByUserIdLoading: false,
  sendNotificationByUserIdPayload: undefined,
  sendNotificationByUserIdSuccess: undefined,
  sendNotificationByUserIdError: undefined,
};

export const sendNotificationByUserIdSlice = createSlice({
  name: 'sendNotificationByUserId',
  initialState,
  reducers: {
    callSendNotificationByUserId: (state, action: PayloadAction<SendNotificationByUserIdPayload>) => {
      state.sendNotificationByUserIdPayload = action.payload;
      state.isSendNotificationByUserIdLoading = true;
    },
    callSendNotificationByUserIdSuccess: (state, action: PayloadAction<SendNotificationByUserIdSuccess>) => {
      state.sendNotificationByUserIdSuccess = action.payload;
      state.isSendNotificationByUserIdLoading = false;
    },
    callSendNotificationByUserIdError: (state, action: PayloadAction<SendNotificationByUserIdError>) => {
      state.sendNotificationByUserIdError = action.payload;
      state.isSendNotificationByUserIdLoading = false;
    },
    sendNotificationByUserIdClear: state => {
      state.isSendNotificationByUserIdLoading = false;
      state.sendNotificationByUserIdPayload = undefined;
      state.sendNotificationByUserIdSuccess = undefined;
      state.sendNotificationByUserIdError = undefined;
    },
  },
});

export const {callSendNotificationByUserId, callSendNotificationByUserIdSuccess, callSendNotificationByUserIdError, sendNotificationByUserIdClear} =
    sendNotificationByUserIdSlice.actions;

export const sendNotificationByUserIdInfo = (state: RootState) => state.sendNotificationByUserId;

const sendNotificationByUserIdReducer = sendNotificationByUserIdSlice.reducer;
export default sendNotificationByUserIdReducer;
