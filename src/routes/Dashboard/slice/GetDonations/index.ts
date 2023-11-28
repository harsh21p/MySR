
import { GetDonationError, GetDonationPayload, GetDonationSuccess, GetDonationsInfo } from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: GetDonationsInfo = {
  isGetDonationLoading: false,
  getDonationPayload: undefined,
  getDonationSuccess: undefined,
  getDonationError: undefined,
};

export const getDonationSlice = createSlice({
  name: 'addDonation',
  initialState,
  reducers: {
    callGetDonation: (state, action: PayloadAction<GetDonationPayload>) => {
      state.getDonationPayload = action.payload;
      state.isGetDonationLoading = true;
    },
    callGetDonationSuccess: (
      state,
      action: PayloadAction<GetDonationSuccess>,
    ) => {
      state.getDonationSuccess = action.payload;
      state.isGetDonationLoading = false;
    },
    callGetDonationError: (state, action: PayloadAction<GetDonationError>) => {
      state.getDonationError = action.payload;
      state.isGetDonationLoading = false;
    },
    clearGetDonation: state => {
      state.isGetDonationLoading = false;
      state.getDonationPayload = undefined;
      state.getDonationSuccess = undefined;
      state.getDonationError = undefined;
    },
  },
});

export const {
  callGetDonation,
  callGetDonationSuccess,
  callGetDonationError,
  clearGetDonation,
} = getDonationSlice.actions;

export const getDonationInfo = (state: RootState) => state.getDonation;

const getDonationReducer = getDonationSlice.reducer;
export default getDonationReducer;
