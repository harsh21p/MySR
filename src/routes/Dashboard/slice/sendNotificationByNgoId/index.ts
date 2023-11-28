import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { SendNotificationByNgoIdError, SendNotificationByNgoIdInfo, SendNotificationByNgoIdPayload, SendNotificationByNgoIdSuccess } from "types";

export const initialState: SendNotificationByNgoIdInfo = {
  isSendNotificationByNgoIdLoading: false,
  sendNotificationByNgoIdPayload: undefined,
  sendNotificationByNgoIdSuccess: undefined,
  sendNotificationByNgoIdError: undefined,
};

export const sendNotificationByNgoIdSlice = createSlice({
  name: 'sendNotificationByNgoId',
  initialState,
  reducers: {
    callSendNotificationByNgoId: (state, action: PayloadAction<SendNotificationByNgoIdPayload>) => {
      state.sendNotificationByNgoIdPayload = action.payload;
      state.isSendNotificationByNgoIdLoading = true;
    },
    callSendNotificationByNgoIdSuccess: (state, action: PayloadAction<SendNotificationByNgoIdSuccess>) => {
      state.sendNotificationByNgoIdSuccess = action.payload;
      state.isSendNotificationByNgoIdLoading = false;
    },
    callSendNotificationByNgoIdError: (state, action: PayloadAction<SendNotificationByNgoIdError>) => {
      state.sendNotificationByNgoIdError = action.payload;
      state.isSendNotificationByNgoIdLoading = false;
    },
    sendNotificationByNgoIdClear: state => {
      state.isSendNotificationByNgoIdLoading = false;
      state.sendNotificationByNgoIdPayload = undefined;
      state.sendNotificationByNgoIdSuccess = undefined;
      state.sendNotificationByNgoIdError = undefined;
    },
  },
});

export const {callSendNotificationByNgoId, callSendNotificationByNgoIdSuccess, callSendNotificationByNgoIdError, sendNotificationByNgoIdClear} =
    sendNotificationByNgoIdSlice.actions;

export const sendNotificationByNgoIdInfo = (state: RootState) => state.sendNotificationByNgoId;

const sendNotificationByNgoIdReducer = sendNotificationByNgoIdSlice.reducer;
export default sendNotificationByNgoIdReducer;
