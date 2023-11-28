import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { UpdateDonationError, UpdateDonationInfo, UpdateDonationPaylod, UpdateDonationSuccess } from "types";

export const initialState: UpdateDonationInfo = {
  isUpdateLoading: false,
  updatePayload: undefined,
  updateDonationSuccess: undefined,
  updateDonationError: undefined,
};

export const updateDonationSlice = createSlice({
  name: 'updateDonation',
  initialState,
  reducers: {
    callUpdateDonation: (state, action: PayloadAction<UpdateDonationPaylod>) => {
      state.updatePayload = action.payload;
      state.isUpdateLoading = true;
    },
    callUpdateDonationSuccess: (state, action: PayloadAction<UpdateDonationSuccess>) => {
      state.updateDonationSuccess = action.payload;
      state.isUpdateLoading = false;
    },
    callUpdateDonationError: (state, action: PayloadAction<UpdateDonationError>) => {
      state.updateDonationError = action.payload;
      state.isUpdateLoading = false;
    },
    updateDonationClear: state => {
      state.isUpdateLoading = false;
      state.updatePayload = undefined;
      state.updateDonationSuccess = undefined;
      state.updateDonationError = undefined;
    },
  },
});

export const {callUpdateDonation, callUpdateDonationSuccess, callUpdateDonationError, updateDonationClear} =
    updateDonationSlice.actions;

export const updateDonationInfo = (state: RootState) => state.updateDonation;

const updateDonationReducer = updateDonationSlice.reducer;
export default updateDonationReducer;
