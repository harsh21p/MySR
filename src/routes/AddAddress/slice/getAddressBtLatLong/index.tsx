import { GetAddressesByLatLongError, GetAddressesByLatLongInfo, GetAddressesByLatLongPayload, GetAddressesByLatLongSuccess,} from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: GetAddressesByLatLongInfo = {
  isAddressLoading: false,
  getAddressesByLatLongPayload: undefined,
  getAddressesByLatLongSuccess: undefined,
 getAddressesByLatLongError: undefined,
};

export const getAddressesByLatLongSlice = createSlice({
  name: 'getAddressesByLatLong',
  initialState,
  reducers: {
    callGetAddressesByLatLong: (state, action: PayloadAction<GetAddressesByLatLongPayload>) => {
      state.getAddressesByLatLongPayload = action.payload;
      state.isAddressLoading = true;
    },
    callGetAddressesByLatLongSuccess: (state, action: PayloadAction<GetAddressesByLatLongSuccess>) => {
      state.getAddressesByLatLongSuccess = action.payload;
      state.isAddressLoading = false;
    },
    callGetAddressesByLatLongError: (state, action: PayloadAction<GetAddressesByLatLongError>) => {
      state.getAddressesByLatLongError = action.payload;
      state.isAddressLoading = false;
    },
    clearGetAddressesByLatLong: (state) => {
      state.getAddressesByLatLongError = undefined;
      state.isAddressLoading = false;
      state.getAddressesByLatLongSuccess =undefined;
      state.getAddressesByLatLongPayload = undefined;
    },
  },
});

export const {callGetAddressesByLatLong, callGetAddressesByLatLongSuccess, callGetAddressesByLatLongError,clearGetAddressesByLatLong} =
    getAddressesByLatLongSlice.actions;

export const getAddressesByLatLongInfo = (state: RootState) => state.getAddressByLatLong;

const getAddressesByLatLongReducer = getAddressesByLatLongSlice.reducer;
export default getAddressesByLatLongReducer;
