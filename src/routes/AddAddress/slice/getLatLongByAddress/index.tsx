import { GetLatLongByAddressError, GetLatLongByAddressInfo, GetLatLongByAddressPayload, GetLatLongByAddressSuccess } from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: GetLatLongByAddressInfo = {
  isAddressLoading: false,
  getLatLongByAddressPayload: undefined,
  getLatLongByAddressSuccess: undefined,
 getLatLongByAddressError: undefined,
};

export const getLatLongByAddressesSlice = createSlice({
  name: 'getByAddressesLatLong',
  initialState,
  reducers: {
    callGetLatLongByAddress: (state, action: PayloadAction<GetLatLongByAddressPayload>) => {
      state.getLatLongByAddressPayload = action.payload;
      state.isAddressLoading = true;
    },
    callGetLatLongByAddressSuccess: (state, action: PayloadAction<GetLatLongByAddressSuccess>) => {
      state.getLatLongByAddressSuccess = action.payload;
      state.isAddressLoading = false;
    },
    callGetLatLongByAddressError: (state, action: PayloadAction<GetLatLongByAddressError>) => {
      state.getLatLongByAddressError = action.payload;
      state.isAddressLoading = false;
    },
  },
});

export const { callGetLatLongByAddress,   callGetLatLongByAddressSuccess,   callGetLatLongByAddressError} =
    getLatLongByAddressesSlice.actions;

export const getLatLongByAddressInfo = (state: RootState) => state.getLatLongByAddress;

const getLatLongByAddressesReducer = getLatLongByAddressesSlice.reducer;
export default getLatLongByAddressesReducer;
