import {RootState} from '../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  EmailExistsError,
  EmailExistsProp,
  EmailExistsInfo,
  EmailExistsSuccess,
} from '../../../types';

export const initialState: EmailExistsInfo = {
  isEmailLoading: false,
  payload: undefined,
  emailSuccess: undefined,
  emailError: undefined,
};

export const emailExistsSlice = createSlice({
  name: 'emailExists',
  initialState,
  reducers: {
    callEmailExists: (state, action: PayloadAction<EmailExistsProp>) => {
      state.payload = action.payload;
      state.isEmailLoading = true;
    },
    emailExistsSuccess: (state, action: PayloadAction<EmailExistsSuccess>) => {
      state.emailSuccess = action.payload;
      state.isEmailLoading = false;
    },
    emailExistsError: (state, action: PayloadAction<EmailExistsError>) => {
      state.emailError = action.payload;
      state.isEmailLoading = false;
    },
    clearEmailExists: (state) => {
      state.payload = undefined;
      state.isEmailLoading = false;
      state.emailSuccess = undefined;
      state.emailError = undefined;
    },
  },
});

export const {
  callEmailExists,
  emailExistsSuccess,
  emailExistsError,
  clearEmailExists,
} = emailExistsSlice.actions;

export const emailExistsInfo = (state: RootState) => state.emailExists;

const emailExistsReducer = emailExistsSlice.reducer;
export default emailExistsReducer;
