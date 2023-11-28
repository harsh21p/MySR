import {
  SignUpError,
  SignUpNGOPayload,
  SignUpSuccess,
  SignUpUserInfo,
} from 'types';
import {RootState} from '../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export const initialState: SignUpUserInfo = {
  isSignupLoading: false,
  signUpPayload: undefined,
  signUpSuccess: undefined,
  signUpError: undefined,
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    callSignUp: (state, action: PayloadAction<SignUpNGOPayload>) => {
      state.signUpPayload = action.payload;
      state.isSignupLoading = true;
    },
    signUpSuccessRequest: (state, action: PayloadAction<SignUpSuccess>) => {
      state.signUpSuccess = action.payload;
      state.isSignupLoading = false;
    },
    signUpErrorRequest: (state, action: PayloadAction<SignUpError>) => {
      state.signUpError = action.payload;
      state.isSignupLoading = false;
    },
    clearSignUp: state => {
      state.isSignupLoading = false;
      state.signUpPayload = undefined;
      state.signUpSuccess = undefined;
      state.signUpError = undefined;
    },
  },
});

export const {
  callSignUp,
  signUpSuccessRequest,
  signUpErrorRequest,
  clearSignUp,

} = signUpSlice.actions;

export const signUpInfo = (state: RootState) => state.signUp;

const signUpReducer = signUpSlice.reducer;
export default signUpReducer;
