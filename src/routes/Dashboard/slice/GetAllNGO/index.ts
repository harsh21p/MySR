import {
  GetAllNGOError,
  GetAllNGOInfo,
  GetAllNGOSuccess,
  GetAllNgoPayload,
} from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: GetAllNGOInfo = {
  isGetAllNGOLoading: false,
  getAllNGOSuccess: undefined,
  getAllNGOPayload: undefined,
  getAllNGOError: undefined,
};

export const getAllNGOSlice = createSlice({
  name: 'getAllNGO',
  initialState,
  reducers: {
    callGetAllNgo: (state, action: PayloadAction<GetAllNgoPayload>) => {
      state.getAllNGOPayload = action.payload;
      state.isGetAllNGOLoading = true;
    },
    callGetAllNgoSuccess: (state, action: PayloadAction<GetAllNGOSuccess>) => {
      state.getAllNGOSuccess = action.payload;
      state.isGetAllNGOLoading = false;
    },
    callGetAllNgoError: (state, action: PayloadAction<GetAllNGOError>) => {
      state.getAllNGOError = action.payload;
      state.isGetAllNGOLoading = false;
    },
    clearGetAllNgo: state => {
      state.isGetAllNGOLoading = false;
      state.getAllNGOPayload = undefined;
      state.getAllNGOSuccess = undefined;
      state.getAllNGOError = undefined;
    },
  },
});

export const {
  callGetAllNgo,
  callGetAllNgoSuccess,
  callGetAllNgoError,
  clearGetAllNgo,
} = getAllNGOSlice.actions;

export const getAllNGOInfo = (state: RootState) => state.getAllNGO;

const getAllNGOReducer = getAllNGOSlice.reducer;
export default getAllNGOReducer;
