import {RootState} from 'redux/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ChangePasswordError,
  ChangePasswordInfo,
  ChangePasswordPayload,
  ChangePasswordSuccess,
} from 'types';

export const initialState: ChangePasswordInfo = {
  isChangePasswordLoading: false,
  changePasswordPayload: undefined,
  changePasswordSuccess: undefined,
  changePasswordError: undefined,
};

export const changePasswordSlice = createSlice({
  name: 'changeUserPassword',
  initialState,
  reducers: {
    callChangePassword: (
      state,
      action: PayloadAction<ChangePasswordPayload>,
    ) => {
      state.changePasswordPayload = action.payload;
      state.isChangePasswordLoading = true;
    },
    callChangePasswordSuccess: (
      state,
      action: PayloadAction<ChangePasswordSuccess>,
    ) => {
      state.changePasswordSuccess = action.payload;
      state.isChangePasswordLoading = false;
    },
    callChangePasswordError: (
      state,
      action: PayloadAction<ChangePasswordError>,
    ) => {
      state.changePasswordError = action.payload;
      state.isChangePasswordLoading = false;
    },
    clearChangePassword: state => {
      state.isChangePasswordLoading = false;
      state.changePasswordError = undefined;
      state.changePasswordPayload = undefined;
      state.changePasswordSuccess = undefined;
    },
  },
});

export const {
  callChangePassword,
  callChangePasswordError,
  callChangePasswordSuccess,
  clearChangePassword,
} = changePasswordSlice.actions;

export const changePasswordInfo = (state: RootState) => state.changeUserPassword;

const changePasswordReducer = changePasswordSlice.reducer;
export default changePasswordReducer;
