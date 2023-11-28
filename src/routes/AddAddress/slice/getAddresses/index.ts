import { GetAddressError, GetAddressInfo, GetAddressPayload, GetAddressSuccess } from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: GetAddressInfo = {
  isAddressLoading: false,
  getAddressPayload: undefined,
  getAddressSuccess: undefined,
  getAddressError: undefined,
};

export const getAddressesSlice = createSlice({
  name: 'getAddresses',
  initialState,
  reducers: {
    callGetAddresses: (state, action: PayloadAction<GetAddressPayload>) => {
      state.getAddressPayload = action.payload;
      state.isAddressLoading = true;
    },
    callGetAddressSuccess: (state, action: PayloadAction<GetAddressSuccess>) => {
      state.getAddressSuccess = action.payload;
      state.isAddressLoading = false;
    },
    callGetAddressError: (state, action: PayloadAction<GetAddressError>) => {
      state.getAddressError = action.payload;
      state.isAddressLoading = false;
    },
    clearGetAddresss: state => {
      state.getAddressError = undefined;
      state.isAddressLoading = false;
      state.getAddressSuccess = undefined;
      state.getAddressPayload = undefined
    },
  },
});

export const {callGetAddresses, callGetAddressSuccess, callGetAddressError,clearGetAddresss} =
    getAddressesSlice.actions;

export const getAddressInfo = (state: RootState) => state.getAddresses;

const getAddressesReducer = getAddressesSlice.reducer;
export default getAddressesReducer;
