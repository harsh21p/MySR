import {combineReducers} from '@reduxjs/toolkit';
import loginReducer from 'routes/LoginScreen/slice';
import getProfileReducer from 'routes/MyAccount/slice';
import updateProfileReducer from 'routes/MyAccount/slice/updateProfile';
import deleteReducer from 'routes/MyAccount/slice/deleteAccount';
import emailExistsReducer from 'routes/SignUpScreen/slice/checkEmailAlreadyExists';
import phoneExistsReducer from 'routes/SignUpScreen/slice/checkPhoneAlreadyExists';
import getAllRolesReducer from 'routes/SignUpScreen/slice/getRoles';
import resendOtpReducer from 'routes/SignUpScreen/slice/resendOtp';
import sendOtpReducer from 'routes/SignUpScreen/slice/sendOtp';
import signUpNGOReducer from 'routes/SignUpScreen/slice/signUpNGO';
import signUpReducer from 'routes/SignUpScreen/slice/signUpVolunteer';
import verifyOtpReducer from 'routes/SignUpScreen/slice/verifyOtp';
import updateAddressReducer from 'routes/AddAddress/slice/updateAddress';
import getAddressesReducer from 'routes/AddAddress/slice/getAddresses';
import addAddressReducer from 'routes/Maps/slice/addAddress';
import deleteAddressReducer from 'routes/Maps/slice/deleteAddress';
import addDonationReducer from 'routes/Dashboard/slice/AddDonation';
import getDonationReducer from 'routes/Dashboard/slice/GetDonations';
import getAllNGOReducer from 'routes/Dashboard/slice/GetAllNGO';
import updateDonationReducer from 'routes/Dashboard/slice/updateDonation';
import deleteDonationReducer from 'routes/Dashboard/slice/deleteDonation';
import uploadCertificateReducer from 'routes/History/slice/uploadCertificate';
import deleteCertificateReducer from 'routes/History/slice/deleteCertificate';
import nearByNgoReducer from 'routes/Dashboard/slice/NearByNGO';
import getRequestReducer from 'routes/Dashboard/slice/GetRequests';
import updateRequestReducer from 'routes/Dashboard/slice/UpdateRequest';
import getByAddressesLatLongReducer from 'routes/AddAddress/slice/getAddressBtLatLong';
import getLatLongByAddress from 'routes/AddAddress/slice/getLatLongByAddress';
import getHistoryByUserId from 'routes/History/slice/getHistoryByUserId';
import getHistoryByOrderReducer from 'routes/History/slice/getHistoryByOrder';
import getHistoryByNgoIdReducer from 'routes/History/slice/getHistoryByNgoId';
import updateHistoryReducer from 'routes/History/slice/updateHistory';
import nearByVolunteerReducer from 'routes/Dashboard/slice/NearByVolunteers';
import forgetPasswordReducer from 'routes/ForgetPassword/slice/SendEmail';
import changePasswordReducer from 'routes/MyAccount/changePasswordSlice';
import getAddressByIdReducer from 'routes/Dashboard/slice/GetAddressById';
import sendNotificationByNgoIdReducer from 'routes/Dashboard/slice/sendNotificationByNgoId';
import sendNotificationByUserIdReducer from 'routes/Dashboard/slice/sendNotificationByUserId';

const rootReducer = combineReducers({
  emailExists: emailExistsReducer,
  phoneExists: phoneExistsReducer,
  getAllRoles: getAllRolesReducer,
  signUp: signUpReducer,
  signUpNGO: signUpNGOReducer,
  sendOtp: sendOtpReducer,
  resendOtp: resendOtpReducer,
  verifyOtp: verifyOtpReducer,
  login: loginReducer,
  getProfile: getProfileReducer,
  updateProfile: updateProfileReducer,
  deleteProfile: deleteReducer,
  updateAddress: updateAddressReducer,
  getAddresses: getAddressesReducer,
  getAddressByLatLong: getByAddressesLatLongReducer,
  addAddress: addAddressReducer,
  deleteAddress: deleteAddressReducer,
  addDonation: addDonationReducer,
  getDonation: getDonationReducer,
  getAllNGO: getAllNGOReducer,
  updateDonation: updateDonationReducer,
  deleteDonation: deleteDonationReducer,
  uploadCertificate: uploadCertificateReducer,
  deleteCertificate: deleteCertificateReducer,
  nearByNgos: nearByNgoReducer,
  getRequests: getRequestReducer,
  updateRequest: updateRequestReducer,
  getLatLongByAddress: getLatLongByAddress,
  getHistoryByUserId: getHistoryByUserId,
  getHistoryByOrder: getHistoryByOrderReducer,
  getHistoryByNgoId: getHistoryByNgoIdReducer,
  updateHistory: updateHistoryReducer,
  nearByVolunteers: nearByVolunteerReducer,
  forgetPassword: forgetPasswordReducer,
  changeUserPassword: changePasswordReducer,
  getAddressById: getAddressByIdReducer,
  sendNotificationByNgoId:sendNotificationByNgoIdReducer,
  sendNotificationByUserId: sendNotificationByUserIdReducer,
});



export default rootReducer;
