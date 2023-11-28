import { UpdateProfileInfo, UpdateProfilePaylod, UpdateProfileSuccess, UpdateProfileError } from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: UpdateProfileInfo = {
  isUpdateLoading: false,
  updatePayload: undefined,
  updateProfileSuccess: undefined,
  updateProfileError: undefined,
};

export const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {
    callUpdateProfile: (state, action: PayloadAction<UpdateProfilePaylod>) => {
      state.updatePayload = action.payload;
      state.isUpdateLoading = true;
    },
    updateProfileSuccess: (state, action: PayloadAction<UpdateProfileSuccess>) => {
      state.updateProfileSuccess = action.payload;
      state.isUpdateLoading = false;
    },
    updateProfileError: (state, action: PayloadAction<UpdateProfileError>) => {
      state.updateProfileError = action.payload;
      state.isUpdateLoading = false;
    },
    clearUpdateProfile: state => {
      state.isUpdateLoading = false;
      state.updatePayload = undefined;
      state.updateProfileSuccess = undefined;
      state.updateProfileError = undefined;
    },
  },
});

export const {callUpdateProfile, updateProfileSuccess, updateProfileError, clearUpdateProfile} = updateProfileSlice.actions;

export const updateProfileInfo = (state: RootState) => state.updateProfile;

const updateProfileReducer = updateProfileSlice.reducer;
export default updateProfileReducer;
