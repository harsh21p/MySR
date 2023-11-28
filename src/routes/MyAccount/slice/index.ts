import {RootState} from '../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  GetProfileError,
  GetProfileInfo,
  GetProfilePayload,
  GetProfileSuccess,
} from '../../../types';

export const initialState: GetProfileInfo = {
  isProfileLoading: false,
  profilePayload: undefined,
  profileSuccess: undefined,
  profileError: undefined,
};

export const getProfileSlice = createSlice({
  name: 'getProfile',
  initialState,
  reducers: {
    callGetProfile: (state, action: PayloadAction<GetProfilePayload>) => {
      state.profilePayload = action.payload;
      state.isProfileLoading = true;
    },
    getProfileSuccess: (state, action: PayloadAction<GetProfileSuccess>) => {
      state.profileSuccess = action.payload;
      state.isProfileLoading = false;
    },
    getProfileError: (state, action: PayloadAction<GetProfileError>) => {
      state.profileError = action.payload;
      state.isProfileLoading = false;
    },
    clearProfile: state => {
      state.isProfileLoading = false,
      state.profilePayload = undefined,
      state.profileSuccess = undefined,
      state.profileError = undefined
    },
  },
});

export const {callGetProfile, getProfileSuccess, getProfileError,clearProfile} =
  getProfileSlice.actions;

export const getProfileInfo = (state: RootState) => state.getProfile;

const getProfileReducer = getProfileSlice.reducer;
export default getProfileReducer;
