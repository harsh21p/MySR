import {
  DeleteError,
  DeleteProfileInfo,
  DeleteSuccess,
} from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: DeleteProfileInfo = {
  isDeleteLoading: false,
  deleteProfileError: undefined,
  deleteProfilePayload: undefined,
  deleteProfileSuccess: undefined,
};

export const deleteProfileSlice = createSlice({
  name: 'deleteProfile',
  initialState,
  reducers: {
    callDeleteProfile: state => {
      state.isDeleteLoading = true;
    },
    callDeleteSuccess: (state, action: PayloadAction<DeleteSuccess>) => {
      state.deleteProfileSuccess = action.payload;
      state.isDeleteLoading = false;
    },
    callDeleteError: (state, action: PayloadAction<DeleteError>) => {
      state.deleteProfileError = action.payload;
      state.isDeleteLoading = false;
    },
    callClearDeleteProfile: (state) => {
      state.deleteProfileSuccess = undefined;
      state.deleteProfileError = undefined;
      state.isDeleteLoading = false;
    },
  },
});

export const {
  callDeleteProfile,
  callDeleteSuccess,
  callDeleteError,
  callClearDeleteProfile,
} = deleteProfileSlice.actions;

export const deleteProfileInfo = (state: RootState) => state.deleteProfile;

const deleteReducer = deleteProfileSlice.reducer;
export default deleteReducer;
