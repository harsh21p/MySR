
import { GetAddressByIdError, GetAddressByIdInfo, GetAddressByIdPayload, GetAddressByIdSuccess } from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: GetAddressByIdInfo = {
  isAddressByIdLoading: false,
  getAddressByIdPayload: undefined,
  getAddressByIdSuccess: undefined,
  getAddressByIdError: undefined,
};

export const getAddressByIdSlice = createSlice({
  name: 'getAddressById',
  initialState,
  reducers: {
    callGetAddressById: (state, action: PayloadAction<GetAddressByIdPayload>) => {
      state.getAddressByIdPayload = action.payload;
      state.isAddressByIdLoading = true;
    },
    callGetAddressByIdSuccess: (
      state,
      action: PayloadAction<GetAddressByIdSuccess>,
    ) => {
      state.getAddressByIdSuccess = action.payload;
      state.isAddressByIdLoading = false;
    },
    callGetAddressByIdError: (state, action: PayloadAction<GetAddressByIdError>) => {
      state.getAddressByIdError = action.payload;
      state.isAddressByIdLoading = false;
    },
    clearGetAddressById: state => {
      state.isAddressByIdLoading = false;
      state.getAddressByIdPayload = undefined;
      state.getAddressByIdSuccess = undefined;
      state.getAddressByIdError = undefined;
    },
  },
});

export const {
  callGetAddressById,
  callGetAddressByIdError,
  callGetAddressByIdSuccess,
  clearGetAddressById,
} = getAddressByIdSlice.actions;

export const getAddressByIdInfo = (state: RootState) => state.getAddressById;

const getAddressByIdReducer = getAddressByIdSlice.reducer;
export default getAddressByIdReducer;
