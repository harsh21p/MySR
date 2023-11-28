import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { NearByNGOInfo, NearByNGOsError, NearByNGOsPaylod, NearByNGOsSuccess } from "types";

export const initialState: NearByNGOInfo = {
  isNearByNGOsLoading: false,
  nearByNGOsPayload: undefined,
  nearByNGOsError: undefined,
  nearByNGOsSuccess: undefined,
};

export const nearByNgoSlice = createSlice({
  name: 'nearByNgo',
  initialState,
  reducers: {
    callNearByNgo: (state, action: PayloadAction<NearByNGOsPaylod>) => {
      state.nearByNGOsPayload = action.payload;
      state.isNearByNGOsLoading = true;
    },
    callNearByNgoSuccess: (state, action: PayloadAction<NearByNGOsSuccess>) => {
      state.nearByNGOsSuccess = action.payload;
      state.isNearByNGOsLoading = false;
    },
    callNearByNgoError: (state, action: PayloadAction<NearByNGOsError>) => {
      state.nearByNGOsError = action.payload;
      state.isNearByNGOsLoading = false;
    },
    callNearByNgoClear: state => {
      state.isNearByNGOsLoading = false;
      state.nearByNGOsPayload = undefined;
      state.nearByNGOsSuccess = undefined;
      state.nearByNGOsError = undefined;
    },
  },
});

export const {callNearByNgo, callNearByNgoSuccess, callNearByNgoError, callNearByNgoClear} =
    nearByNgoSlice.actions;

export const nearByNgoInfo = (state: RootState) => state.nearByNgos;

const nearByNgoReducer = nearByNgoSlice.reducer;
export default nearByNgoReducer;
