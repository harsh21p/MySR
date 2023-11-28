import {
  ForgetPasswordError,
  ForgetPasswordInfo,
  ForgetPasswordPayload,
  ForgetPasswordSuccess,
} from 'types';
import {RootState} from 'redux/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: ForgetPasswordInfo = {
  isForgetPasswordLoading: false,
  forgetPasswordPayload: undefined,
  forgetPasswordSuccess: undefined,
  forgetPasswordError: undefined,
};

export const forgetPasswordSlice = createSlice({
  name: 'forgetPassword',
  initialState,
  reducers: {
    callForgetPassword: (
      state,
      action: PayloadAction<ForgetPasswordPayload>,
    ) => {
      state.forgetPasswordPayload = action.payload;
      state.isForgetPasswordLoading = true;
    },
    callForgetPasswordSuccess: (
      state,
      action: PayloadAction<ForgetPasswordSuccess>,
    ) => {
      state.forgetPasswordSuccess = action.payload;
      state.isForgetPasswordLoading = false;
    },
    callForgetPasswordError: (
      state,
      action: PayloadAction<ForgetPasswordError>,
    ) => {
      state.forgetPasswordError = action.payload;
      state.isForgetPasswordLoading = false;
    },
    clearForgetPassword: state => {
      state.isForgetPasswordLoading = false;
      state.forgetPasswordPayload = undefined;
      state.forgetPasswordSuccess = undefined;
      state.forgetPasswordError = undefined;
    },
  },
});

export const {
  callForgetPassword,
  callForgetPasswordSuccess,
  callForgetPasswordError,
  clearForgetPassword,
} = forgetPasswordSlice.actions;

export const forgetPasswordInfo = (state: RootState) => state.forgetPassword;

const forgetPasswordReducer = forgetPasswordSlice.reducer;
export default forgetPasswordReducer;
