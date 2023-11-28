import { LoginError, LoginInfo, LoginPayload, LoginSuccess } from 'types';
import {RootState} from './../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export const initialState: LoginInfo = {
  isLoginLoading: false,
  loginPayload: undefined,
  loginSuccess: undefined,
  loginError: undefined,

};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    callLogin: (state, action: PayloadAction<LoginPayload>) => {
      state.loginPayload = action.payload;
      state.isLoginLoading = true;
    },
    callLoginSuccess: (
      state,
      action: PayloadAction<LoginSuccess>,
    ) => {
      state.loginSuccess = action.payload;
      state.isLoginLoading = false;
    },
    callLoginError: (state, action: PayloadAction<LoginError>) => {
      state.loginError = action.payload;
      state.isLoginLoading = false;
    },
    clearLogin:(state) => {
      state.isLoginLoading = false;
      state.loginSuccess = undefined;
      state.loginPayload = undefined;
      state.loginError = undefined;
    }
  },
});

export const {callLogin, callLoginSuccess, callLoginError, clearLogin} =
  loginSlice.actions;

export const loginInfo = (state: RootState) => state.login;

const loginReducer = loginSlice.reducer;
export default loginReducer;
