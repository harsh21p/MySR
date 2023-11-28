import watchDeleteDonation from 'routes/Dashboard/saga/deleteDonation';
import {all, fork} from 'redux-saga/effects';
import watchGetAddress from 'routes/AddAddress/saga/getAddresses';
import watchUpdateAddress from 'routes/AddAddress/saga/updateAddress';
import watchAddDonationRequest from 'routes/Dashboard/saga/AddDonation';
import watchGetAllNgo from 'routes/Dashboard/saga/GetAllNGO';
import watchGetDonationRequest from 'routes/Dashboard/saga/GetDonations';
import watchLogin from 'routes/LoginScreen/saga';
import watchAddAddressRequest from 'routes/Maps/saga/addAddress';
import watchDeleteAddressRequest from 'routes/Maps/saga/deleteAddress';
import watchGetProfile from 'routes/MyAccount/saga';
import watchDeleteProfile from 'routes/MyAccount/saga/deleteAccount';
import watchUpdateProfile from 'routes/MyAccount/saga/updateProfile';
import watchEmailExistsRequest from 'routes/SignUpScreen/saga/checkEmailAlreadyExists';
import watchPhoneExistsRequest from 'routes/SignUpScreen/saga/checkPhoneAlreadyExists';
import watchGetAllRoles from 'routes/SignUpScreen/saga/getRoles';
import watchResendOtpRequest from 'routes/SignUpScreen/saga/resendOtp';
import watchSendOtpRequest from 'routes/SignUpScreen/saga/sendOtp';
import watchSignUpNGORequest from 'routes/SignUpScreen/saga/signUpNGO';
import watchSignUpRequest from 'routes/SignUpScreen/saga/signUpVolunteer';
import watchVerifyOtpREquest from 'routes/SignUpScreen/saga/verifyOtp';
import watchUpdateDonation from 'routes/Dashboard/saga/updateDonation';
import watchUploadCertificateRequest from 'routes/History/saga/uploadCertificate';
import watchDeleteCertificateRequest from 'routes/History/saga/deleteCertificate';
import watchNearByNgo from 'routes/Dashboard/saga/NearByNGO';
import watchGetRequests from 'routes/Dashboard/saga/GetRequests';
import watchUpdateRequest from 'routes/Dashboard/saga/UpdateRequest';
import watchgetAddressesByLatLong from 'routes/AddAddress/saga/getAddressByLatLong';
import watchGetHistoryByUserId from 'routes/History/saga/getHistoryByUserId';
import watchGetHistoryByOrder from 'routes/History/saga/getHistoryByOrder';
import watchGetHistoryByNgoId from 'routes/History/saga/getHistoryByNgoId';
import watchUpdateHistory from 'routes/History/saga/updateHistory';
import watchNearByVolunteers from 'routes/Dashboard/saga/NearByVolunteers';
import watchForgetPasswordRequest from 'routes/ForgetPassword/saga/SendEmail';
import watchChangePasswordRequest from 'routes/MyAccount/changePasswordSaga';
import watchGetAddressById from 'routes/Dashboard/saga/GetAddressById';
import watchSendNotificationByNgoId from 'routes/Dashboard/saga/sendNotificationByNgoId';
import watchSendNotificationByUserId from 'routes/Dashboard/saga/sendNotificationByUserId';

export default function* rootSaga() {
  yield all([
    fork(watchEmailExistsRequest),
    fork(watchPhoneExistsRequest),
    fork(watchGetAllRoles),
    fork(watchSignUpRequest),
    fork(watchSignUpNGORequest),
    fork(watchSendOtpRequest),
    fork(watchResendOtpRequest),
    fork(watchVerifyOtpREquest),
    fork(watchLogin),
    fork(watchGetProfile),
    fork(watchDeleteProfile),
    fork(watchUpdateAddress),
    fork(watchUpdateProfile),
    fork(watchGetAddress),
    fork(watchAddAddressRequest),
    fork(watchDeleteAddressRequest),
    fork(watchAddDonationRequest),
    fork(watchGetDonationRequest),
    fork(watchGetAllNgo),
    fork(watchDeleteDonation),
    fork(watchUpdateDonation),
    fork(watchUploadCertificateRequest),
    fork(watchDeleteCertificateRequest),
    fork(watchNearByNgo),
    fork(watchGetRequests),
    fork(watchUpdateRequest),
    fork(watchgetAddressesByLatLong),
    fork(watchGetHistoryByUserId),
    fork(watchGetHistoryByOrder),
    fork(watchGetHistoryByNgoId),
    fork(watchUpdateHistory),
    fork(watchNearByVolunteers),
    fork(watchForgetPasswordRequest),
    fork(watchChangePasswordRequest),
    fork(watchGetAddressById),
    fork(watchSendNotificationByNgoId),
    fork(watchSendNotificationByUserId),
  ]);
}
