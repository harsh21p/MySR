import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { NearByVolunteersInfo, NearByVolunteersError, NearByVolunteersPaylod, NearByVolunteersSuccess } from "types";

export const initialState: NearByVolunteersInfo = {
  isNearByVolunteersLoading: false,
  nearByVolunteersPayload: undefined,
  nearByVolunteersError: undefined,
  nearByVolunteersSuccess: undefined,
};

export const nearByVolunteersSlice = createSlice({
  name: 'nearByVolunteers',
  initialState,
  reducers: {
    callNearByVolunteers: (state, action: PayloadAction<NearByVolunteersPaylod>) => {
      state.nearByVolunteersPayload = action.payload;
      state.isNearByVolunteersLoading = true;
    },
    callNearByVolunteersSuccess: (state, action: PayloadAction<NearByVolunteersSuccess>) => {
      state.nearByVolunteersSuccess = action.payload;
      state.isNearByVolunteersLoading = false;
    },
    callNearByVolunteersError: (state, action: PayloadAction<NearByVolunteersError>) => {
      state.nearByVolunteersError = action.payload;
      state.isNearByVolunteersLoading = false;
    },
    callNearByVolunteersClear: state => {
      state.isNearByVolunteersLoading = false;
      state.nearByVolunteersPayload = undefined;
      state.nearByVolunteersSuccess = undefined;
      state.nearByVolunteersError = undefined;
    },
  },
});

export const {callNearByVolunteers, callNearByVolunteersSuccess, callNearByVolunteersError, callNearByVolunteersClear} = nearByVolunteersSlice.actions;

export const nearByVolunteerInfo = (state: RootState) => state.nearByVolunteers;

const nearByVolunteerReducer = nearByVolunteersSlice.reducer;

export default nearByVolunteerReducer;
