import {
  SignUpNGOError,
  SignUpNGOPayload,
  SignUpNGOSuccess,
  SignUpNGOInfo,
} from 'types';
import {RootState} from '../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: SignUpNGOInfo = {
  isNGOSignupLoading: false,
  signUpNGOPayload: undefined,
  signUpNGOSuccess: undefined,
  signUpNGOError: undefined,
};

export const signUpNGOSlice = createSlice({
  name: 'signUpNGO',
  initialState,
  reducers: {
    callNGOSignUp: (state, action: PayloadAction<SignUpNGOPayload>) => {
      state.signUpNGOPayload = action.payload;
      state.isNGOSignupLoading = true;
    },
    signUpNGOSuccessRequest: (state, action: PayloadAction<SignUpNGOSuccess>) => {
      state.signUpNGOSuccess = action.payload;
      state.isNGOSignupLoading = false;
    },
    signUpNGOErrorRequest: (state, action: PayloadAction<SignUpNGOError>) => {
      state.signUpNGOError = action.payload;
      state.isNGOSignupLoading = false;
    },
    clearSignUpNGO: state => {
      state.isNGOSignupLoading = false;
      state.signUpNGOPayload = undefined;
      state.signUpNGOSuccess = undefined;
      state.signUpNGOError = undefined;
    },
  },
});

export const {
  callNGOSignUp,
  signUpNGOSuccessRequest,
  signUpNGOErrorRequest,
  clearSignUpNGO,
} = signUpNGOSlice.actions;

export const signUpNGOInfo = (state: RootState) => state.signUpNGO;

const signUpNGOReducer = signUpNGOSlice.reducer;
export default signUpNGOReducer;
