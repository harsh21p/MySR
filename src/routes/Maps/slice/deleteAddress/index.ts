import { DeleteAddressError, DeleteAddressInfo, DeleteAddressPayload, DeleteAddressSuccess } from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: DeleteAddressInfo = {
  isDeleteAddressLoading: false,
  deleteAddressPayload: undefined,
  deleteAddressSuccess: undefined,
  deleteAddressError: undefined,
};

export const deleteAddressSlice = createSlice({
  name: 'deleteAddress',
  initialState,
  reducers: {
    callDeleteAddress: (state, action: PayloadAction<DeleteAddressPayload>) => {
      state.deleteAddressPayload = action.payload;
      state.isDeleteAddressLoading = true;
    },
    callDeleteAddressSuccess: (
      state,
      action: PayloadAction<DeleteAddressSuccess>,
    ) => {
      state.deleteAddressSuccess = action.payload;
      state.isDeleteAddressLoading = false;
    },
    callDeleteAddressError: (state, action: PayloadAction<DeleteAddressError>) => {
      state.deleteAddressError = action.payload;
      state.isDeleteAddressLoading = false;
    },
    clearDeleteAddress: state => {
      state.isDeleteAddressLoading = false;
      state.deleteAddressPayload = undefined;
      state.deleteAddressSuccess = undefined;
      state.deleteAddressError = undefined;
    },
  },
});

export const {
  callDeleteAddress,
  callDeleteAddressSuccess,
  callDeleteAddressError,
  clearDeleteAddress
} = deleteAddressSlice.actions;

export const deleteAddressInfo = (state: RootState) => state.deleteAddress;

const deleteAddressReducer = deleteAddressSlice.reducer;
export default deleteAddressReducer;
