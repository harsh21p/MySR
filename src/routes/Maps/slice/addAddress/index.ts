import { AddAddressError, AddAddressInfo, AddAddressPayload, AddAddressSuccess } from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: AddAddressInfo = {
  isAddAddressLoading: false,
  addAddressPayload: undefined,
  addAddressSuccess: undefined,
  addAddressError: undefined,
};

export const addAddressSlice = createSlice({
  name: 'addAddress',
  initialState,
  reducers: {
    callAddAddress: (state, action: PayloadAction<AddAddressPayload>) => {
      state.addAddressPayload = action.payload;
      state.isAddAddressLoading = true;
    },
    callAddAddressSuccess: (
      state,
      action: PayloadAction<AddAddressSuccess>,
    ) => {
      state.addAddressSuccess = action.payload;
      state.isAddAddressLoading = false;
    },
    callAddAddressError: (state, action: PayloadAction<AddAddressError>) => {
      state.addAddressError = action.payload;
      state.isAddAddressLoading = false;
    },
    clearAddAddress: state => {
      state.isAddAddressLoading = false;
      state.addAddressPayload = undefined;
      state.addAddressSuccess = undefined;
      state.addAddressError = undefined;
    },
  },
});

export const {
  callAddAddress,
  callAddAddressSuccess,
  callAddAddressError,
  clearAddAddress,
} = addAddressSlice.actions;

export const addAddressInfo = (state: RootState) => state.addAddress;

const addAddressReducer = addAddressSlice.reducer;
export default addAddressReducer;
