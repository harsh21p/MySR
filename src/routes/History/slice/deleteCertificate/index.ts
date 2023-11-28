import {
  DeleteCertificateError,
  DeleteCertificateInfo,
  DeleteCertificatePayload,
  DeleteCertificateSuccess,
} from 'types';
import {RootState} from '../../../../redux/store/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState: DeleteCertificateInfo = {
  isDeleteCertificateLoading: false,
  deleteCertificatePayload: undefined,
  deleteCertificateSuccess: undefined,
  deleteCertificateError: undefined,
};

export const deleteCertificateSlice = createSlice({
  name: 'deleteCertificate',
  initialState,
  reducers: {
    callDeleteCertificate: (
      state,
      action: PayloadAction<DeleteCertificatePayload>,
    ) => {
      state.deleteCertificatePayload = action.payload;
      state.isDeleteCertificateLoading = true;
    },
    callDeleteCertificateSuccess: (
      state,
      action: PayloadAction<DeleteCertificateSuccess>,
    ) => {
      state.deleteCertificateSuccess = action.payload;
      state.isDeleteCertificateLoading = false;
    },
    callDeleteCertificateError: (
      state,
      action: PayloadAction<DeleteCertificateError>,
    ) => {
      state.deleteCertificateError = action.payload;
      state.isDeleteCertificateLoading = false;
    },
    clearDeleteCertificate: state => {
      state.isDeleteCertificateLoading = false;
      state.deleteCertificatePayload = undefined;
      state.deleteCertificateSuccess = undefined;
      state.deleteCertificateError = undefined;
    },
  },
});

export const {
  callDeleteCertificate,
  callDeleteCertificateSuccess,
  callDeleteCertificateError,
  clearDeleteCertificate,
} = deleteCertificateSlice.actions;

export const deleteCertificateInfo = (state: RootState) =>
  state.deleteCertificate;

const deleteCertificateReducer = deleteCertificateSlice.reducer;
export default deleteCertificateReducer;
