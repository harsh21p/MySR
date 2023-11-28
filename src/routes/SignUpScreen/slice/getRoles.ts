import {RootState} from '../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { GetallRolesError, GetallRolesInfo, GetallRolesSuccess } from '../../../types';

export const initialState: GetallRolesInfo = {
  isRolesLoading : false,
  getRolesSuccess: undefined,
  getRolesError: undefined,
};

export const getAllRolesSlice = createSlice({
  name: 'getAllRoles',
  initialState,
  reducers: {
    callGetAllRoles: (state) => {
      state.isRolesLoading = true;
    },
    getAllRolesSuccess: (state, action: PayloadAction<GetallRolesSuccess>) => {
      state.getRolesSuccess = action.payload;
      state.isRolesLoading = false;
    },
    getAllRolesError: (state, action: PayloadAction<GetallRolesError>) => {
      state.getRolesError = action.payload;
      state.isRolesLoading = false;
    },
  },
});

export const {
  callGetAllRoles, getAllRolesSuccess, getAllRolesError
} = getAllRolesSlice.actions;

export const getAllRolesInfo = (state: RootState) => state.getAllRoles;

const getAllRolesReducer = getAllRolesSlice.reducer;
export default getAllRolesReducer;
