import {RootState} from '../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  PhoneExistsError,
  PhoneExistsProp,
  PhoneExistsInfo,
  PhoneExistsSuccess,
} from '../../../types';

export const initialState: PhoneExistsInfo = {
  isPhoneLoading: false,
  payload: undefined,
  phoneSuccess: undefined,
  phoneError: undefined,
};

export const phoneExistsSlice = createSlice({
  name: 'phoneExists',
  initialState,
  reducers: {
    callPhoneExists: (state, action: PayloadAction<PhoneExistsProp>) => {
      state.payload = action.payload;
      state.isPhoneLoading = true;
    },
    phoneExistsSuccess: (state, action: PayloadAction<PhoneExistsSuccess>) => {
      state.phoneSuccess = action.payload;
      state.isPhoneLoading = false;
    },
    phoneExistsError: (state, action: PayloadAction<PhoneExistsError>) => {
      state.phoneError = action.payload;
      state.isPhoneLoading = false;
    },
    clearPhoneExists: state => {
      state.payload = undefined;
      state.isPhoneLoading = false;
      state.phoneSuccess = undefined;
      state.phoneError = undefined;
    },
  },
});

export const {
  callPhoneExists,
  phoneExistsError,
  phoneExistsSuccess,
  clearPhoneExists,
} = phoneExistsSlice.actions;

export const phoneExistsInfo = (state: RootState) => state.phoneExists;

const phoneExistsReducer = phoneExistsSlice.reducer;
export default phoneExistsReducer;
