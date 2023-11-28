import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { DeleteDonationError, DeleteDonationInfo, DeleteDonationPaylod, DeleteDonationSuccess } from "types";

export const initialState: DeleteDonationInfo = {
  isDeleteLoading: false,
  deletePayload: undefined,
  deleteDonationSuccess: undefined,
  deleteDonationError: undefined,
};

export const deleteDonationSlice = createSlice({
  name: 'deleteDonation',
  initialState,
  reducers: {
    callDeleteDonation: (state, action: PayloadAction<DeleteDonationPaylod>) => {
      state.deletePayload = action.payload;
      state.isDeleteLoading = true;
    },
    deleteDonationSuccess: (state, action: PayloadAction<DeleteDonationSuccess>) => {
      state.deleteDonationSuccess = action.payload;
      state.isDeleteLoading = false;
    },
    deleteDonationError: (state, action: PayloadAction<DeleteDonationError>) => {
      state.deleteDonationError = action.payload;
      state.isDeleteLoading = false;
    },
    deleteDonationClear: state => {
      state.isDeleteLoading = false;
      state.deletePayload = undefined;
      state.deleteDonationSuccess = undefined;
      state.deleteDonationError = undefined;
    },
  },
});

export const {callDeleteDonation, deleteDonationSuccess, deleteDonationError, deleteDonationClear} =
  deleteDonationSlice.actions;

export const deleteDonationInfo = (state: RootState) => state.deleteDonation;

const deleteDonationReducer = deleteDonationSlice.reducer;
export default deleteDonationReducer;
