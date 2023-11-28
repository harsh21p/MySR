import { AddDonationError, AddDonationInfo, AddDonationPayload, AddDonationSuccess } from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: AddDonationInfo = {
  isAddDonationLoading: false,
  addDonationPayload: undefined,
  addDonationSuccess: undefined,
  addDonationError: undefined,
};

export const addDonationSlice = createSlice({
  name: 'addDonation',
  initialState,
  reducers: {
    callAddDonation: (state, action: PayloadAction<AddDonationPayload>) => {
      state.addDonationPayload = action.payload;
      state.isAddDonationLoading = true;
    },
    callAddDonationSuccess: (
      state,
      action: PayloadAction<AddDonationSuccess>,
    ) => {
      state.addDonationSuccess = action.payload;
      state.isAddDonationLoading = false;
    },
    callAddDonationError: (state, action: PayloadAction<AddDonationError>) => {
      state.addDonationError = action.payload;
      state.isAddDonationLoading = false;
    },
    clearAddDonation: state => {
      state.isAddDonationLoading = false;
      state.addDonationPayload = undefined;
      state.addDonationSuccess = undefined;
      state.addDonationError = undefined;
    },
  },
});

export const {
  callAddDonation,
  callAddDonationSuccess,
  callAddDonationError,
  clearAddDonation,
} = addDonationSlice.actions;

export const addDonationInfo = (state: RootState) => state.addDonation;

const addDonationReducer = addDonationSlice.reducer;
export default addDonationReducer;
