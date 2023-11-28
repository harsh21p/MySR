import { UpdateAddressError, UpdateAddressInfo, UpdateAddressPaylod, UpdateAddressSuccess } from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: UpdateAddressInfo = {
  isUpdateLoading: false,
  updatePayload: undefined,
  updateAddressSuccess: undefined,
  updateAddressError: undefined,
};

export const updateAddressSlice = createSlice({
  name: 'updateAddress',
  initialState,
  reducers: {
    callUpdateAddress: (state, action: PayloadAction<UpdateAddressPaylod>) => {
      state.updatePayload = action.payload;
      state.isUpdateLoading = true;
    },
    updateAddressSuccess: (state, action: PayloadAction<UpdateAddressSuccess>) => {
      state.updateAddressSuccess = action.payload;
      state.isUpdateLoading = false;
    },
    updateAddressError: (state, action: PayloadAction<UpdateAddressError>) => {
      state.updateAddressError = action.payload;
      state.isUpdateLoading = false;
    },
    updateAddressClear: state => {
      state.isUpdateLoading = false;
      state.updatePayload = undefined;
      state.updateAddressSuccess = undefined;
      state.updateAddressError = undefined;
    },
  },
});

export const {callUpdateAddress, updateAddressSuccess, updateAddressError, updateAddressClear} =
    updateAddressSlice.actions;

export const updateAddressInfo = (state: RootState) => state.updateAddress;

const updateAddressReducer = updateAddressSlice.reducer;
export default updateAddressReducer;
