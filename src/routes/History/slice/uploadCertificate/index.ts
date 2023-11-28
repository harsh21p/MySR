import {
  UploadCertificate,
  UploadCertificateError,
  UploadCertificatePayload,
  UploadCertificateSuccess,
} from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: UploadCertificate = {
  isUploadCertificateLoading: false,
  uploadCertificatePayload: undefined,
  uploadCertificateSuccess: undefined,
  uploadCertificateError: undefined,
};

export const uploadCertificateSlice = createSlice({
  name: 'uploadCertificate',
  initialState,
  reducers: {
    callUploadCertificate: (
      state,
      action: PayloadAction<UploadCertificatePayload>,
    ) => {
      state.uploadCertificatePayload = action.payload;
      state.isUploadCertificateLoading = true;
    },
    callUploadCertificateSuccess: (
      state,
      action: PayloadAction<UploadCertificateSuccess>,
    ) => {
      state.uploadCertificateSuccess = action.payload;
      state.isUploadCertificateLoading = false;
    },
    callUploadCertificateError: (
      state,
      action: PayloadAction<UploadCertificateError>,
    ) => {
      state.uploadCertificateError = action.payload;
      state.isUploadCertificateLoading = false;
    },
    clearUploadCertificate: state => {
      state.isUploadCertificateLoading = false;
      state.uploadCertificatePayload = undefined;
      state.uploadCertificateSuccess = undefined;
      state.uploadCertificateError = undefined;
    },
  },
});

export const {
  callUploadCertificate,
  callUploadCertificateSuccess,
  callUploadCertificateError,
  clearUploadCertificate,
} = uploadCertificateSlice.actions;

export const uploadCertificateInfo = (state: RootState) => state.uploadCertificate;

const uploadCertificateReducer = uploadCertificateSlice.reducer;
export default uploadCertificateReducer;
