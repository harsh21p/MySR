export interface EmailExistsInfo {
  isEmailLoading: boolean;
  payload?: EmailExistsProp;
  emailSuccess?: EmailExistsSuccess;
  emailError?: EmailExistsError;
}
export interface EmailExistsProp {
  email: string;
}
export interface EmailExistsSuccess {
  exists: boolean;
}
export interface EmailExistsError {
  error: string;
}
export interface PhoneExistsInfo {
  isPhoneLoading: boolean;
  payload?: PhoneExistsProp;
  phoneSuccess?: PhoneExistsSuccess;
  phoneError?: PhoneExistsError;
}
export interface PhoneExistsProp {
  phoneNumber: string;
}
export interface PhoneExistsSuccess {
  exists: boolean;
}
export interface PhoneExistsError {
  error: string;
}

export interface GetallRolesInfo {
  isRolesLoading: boolean;
  getRolesSuccess?: GetallRolesSuccess;
  getRolesError?: GetallRolesError;
}
export interface GetallRolesSuccess {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
}
export interface GetallRolesError {
  error: string;
}
export interface SignUpUserInfo {
  isSignupLoading: boolean;
  signUpPayload?: SignUpNGOPayload;
  signUpSuccess?: SignUpSuccess;
  signUpError?: SignUpError;
}

export interface SignUpSuccess {
  id: string;
}
export interface SignUpError {
  error: string;
}
export interface SignUpNGOInfo {
  isNGOSignupLoading: boolean;
  signUpNGOPayload?: SignUpNGOPayload;
  signUpNGOSuccess?: SignUpNGOSuccess;
  signUpNGOError?: SignUpNGOError;
}

export interface SignUpNGOPayload {
  profileImage?: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  password: string;
  roleId: string;
  organizationName?: string;
  uid?: string;
  certificate?: string;
  certificateVerified?: boolean;
  about?: string;
  establishedYear?: string;
  additionalDetails?: string;
}
export interface SignUpNGOSuccess {
  id: string;
}
export interface SignUpNGOError {
  error: string;
}

export interface SendOtpInfo {
  isSendOtpLoading: boolean;
  sendOtpPayload?: SendOtpPayload;
  sendOtpSuccess?: SendOtpSuccess;
  sendOtpError?: SendOtpError;
}
export interface SendOtpPayload {
  emailId?: string;
  phoneNumber?: string;
}
export interface SendOtpSuccess {
  message: string;
}

export interface SendOtpError {
  error: string;
}

export interface ReSendOtpInfo {
  isReSendOtpLoading: boolean;
  reSendOtpPayload?: ReSendOtpPayload;
  reSendOtpSuccess?: ReSendOtpSuccess;
  reSendOtpError?: ReSendOtpError;
}
export interface ReSendOtpPayload {
  emailId?: string;
  phoneNumber?: string;
}
export interface ReSendOtpSuccess {}

export interface ReSendOtpError {}

export interface VerifyOtpInfo {
  isVerifyOtpLoading: boolean;
  verifyOtpPayload?: VerifyOtpPayload;
  verifyOtpSuccess?: VerifyOtpSuccess;
  verifyOtpError?: VerifyOtpError;
}
export interface VerifyOtpPayload {
  emailId: string;
  emailOtp: string;
  phoneNumber: string;
  phoneOtp: string;
}
export interface VerifyOtpSuccess {
  statusCode: number;
  message: string;
  data: {
    phoneNumber?: string;
    phoneOtp?: string;
    email?: string;
    emailOtp?: string;
  };
}

export interface VerifyOtpError {}

export interface LoginInfo {
  isLoginLoading: boolean;
  loginPayload?: LoginPayload;
  loginSuccess?: LoginSuccess;
  loginError?: LoginError;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginSuccess {
  jwt?: string;
  error?: string;
  name?: string;
  statusCode?: string;
}
export interface LoginError {
  error: string;
}
export interface UserAuthType {
  jwt: string;
  userId: string;
  roleName?: string;
}

export interface UserAddressType
{
  id:string;
  firstLine: string;
  lastLine: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  type: string;
}

export interface GetProfileInfo {
  isProfileLoading: boolean;
  profilePayload?: GetProfilePayload;
  profileSuccess?: GetProfileSuccess;
  profileError?: GetProfileError;
}

export interface GetProfilePayload {
  email: string;
  password: string;
}
export interface GetProfileError {
  error?: string;
}
export interface GetProfileSuccess {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  profilePic: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  primaryAddressId: any;
  phoneNumber: string;
  device:string,
  token:string,
  phoneNumberVerified: boolean;
  role: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    name: string;
  };
  organizationName?: string;
  uid?: string;
  certificate?: object;
  certificateVerified: boolean;
  about?: string;
  establishedYear?: string;
  additionalDetails?: string;
}
export interface LoginError {
  error: string;
}

export interface DeleteProfileInfo {
  isDeleteLoading: boolean;
  deleteProfilePayload?: DeletePayload;
  deleteProfileSuccess?: DeleteSuccess;
  deleteProfileError?: DeleteError;
}

export interface DeletePayload {
  userId: string;
}
export interface DeleteSuccess {
  message?: string;
  error?: string;
  name?: string;
  statusCode?: string;
}
export interface DeleteError {
  error: string;
}
export interface UpdateProfileInfo {
  isUpdateLoading: boolean;
  updatePayload?: UpdateProfilePaylod;
  updateProfileSuccess?: UpdateProfileSuccess;
  updateProfileError?: UpdateProfileError;
}

export interface UpdateProfilePaylod {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  profilePic: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  role: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    name: string;
  };
  organizationName?: string;
  uid?: string;
  certificate?: object;
  certificateVerified: boolean;
  about?: string;
  establishedYear?: string;
  additionalDetails?: string;
}

export interface UpdateProfileSuccess {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  organizationName: string;
  uid: string;
  device:string,
  token:string,
  establishedYear: string;
  message: string;
  error: string;
}

export interface UpdateProfileError {
  error: string;
}

export interface AddAddressInfo {
  isAddAddressLoading: boolean;
  addAddressPayload?: AddAddressPayload;
  addAddressSuccess?: AddAddressSuccess;
  addAddressError?: AddAddressError;
}

export interface AddAddressPayload {
  id:string;
  firstLine: string;
  lastLine: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  type: string;
  userId: string;
}
export interface AddAddressSuccess {
  message: string;
  id: string;
}
export interface AddAddressError {
  error: string;
}

export interface DeleteAddressInfo {
  isDeleteAddressLoading: boolean;
  deleteAddressPayload?: DeleteAddressPayload;
  deleteAddressSuccess?: DeleteAddressSuccess;
  deleteAddressError?: DeleteAddressError;
}
export interface DeleteAddressPayload {
  addressId: string;
}
export interface DeleteAddressSuccess {
  message: string;
}
export interface DeleteAddressError {
  error: string;
}


export interface GetAddressInfo {
  isAddressLoading: boolean;
  getAddressPayload?: GetAddressPayload;
  getAddressSuccess?: GetAddressSuccess;
  getAddressError?: GetAddressError;
}

export interface GetAddressPayload {
  userId: string;
}

export interface GetAddressSuccess {
  data: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: any;
      firstLine: string;
      lastLine: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
      type: string;
      latitude: string;
      longitude: string;
      userId: string;
    },
  ];
  error: string;
}

export interface GetAddressError {
  error: string;
}

export interface GetAddressesByLatLongInfo {
  isAddressLoading: boolean;
  getAddressesByLatLongPayload?: GetAddressesByLatLongPayload;
  getAddressesByLatLongSuccess?: GetAddressesByLatLongSuccess;
  getAddressesByLatLongError?: GetAddressesByLatLongError;
}

export interface GetAddressesByLatLongPayload {
  userId: string;
}

export interface GetAddressesByLatLongSuccess {
  data: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: any;
      firstLine: string;
      lastLine: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
      type: string;
      latitude: string;
      longitude: string;
      userId: string;
    },
  ];
  error: string;
}

export interface GetAddressesByLatLongError {
  error: string;
}


export interface UpdateAddressInfo {
  isUpdateLoading: boolean;
  updatePayload?: UpdateAddressPaylod;
  updateAddressSuccess?: UpdateAddressSuccess;
  updateAddressError?: UpdateAddressError;
}

export interface UpdateAddressPaylod {
  firstLine: string;
  lastLine: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  type: string;
  latitude: string;
  longitude: string;
}

export interface UpdateAddressSuccess {
  message: string;
  error: string;
}

export interface UpdateAddressError {
  error: string;
}

export interface AddDonationInfo {
  isAddDonationLoading: boolean;
  addDonationPayload?: AddDonationPayload;
  addDonationSuccess?: AddDonationSuccess;
  addDonationError?: AddDonationError;
}

export interface AddDonationPayload {
  userId: string;
}

export interface DeleteDonationInfo {
  isDeleteLoading: boolean;
  deletePayload?: DeleteDonationPaylod;
  deleteDonationSuccess?: DeleteDonationSuccess;
  deleteDonationError?: DeleteDonationError;
}

export interface DeleteDonationPaylod {
  id: string;
  jwt: string;
}

export interface DeleteDonationSuccess {
  message: string;
  error: string;
}

export interface DeleteDonationError {
  error: string;
}

export interface UpdateDonationInfo {
  isUpdateLoading: boolean;
  updatePayload?: UpdateDonationPaylod;
  updateDonationSuccess?: UpdateDonationSuccess;
  updateDonationError?: UpdateDonationError;
}

export interface UpdateDonationPaylod {
  fullName: string;
  ngoId: string;
  addressId: string;
  donationType: string;
  donationTypeUom: string;
  contactNumber: string;
  description: string;
}
export interface AddDonationSuccess {
  message: string;
  error: string;
}
export interface AddDonationError {
  error: string;
}

export interface GetDonationsInfo {
  isGetDonationLoading: boolean;
  getDonationPayload?: GetDonationPayload;
  getDonationSuccess?: GetDonationSuccess;
  getDonationError?: GetDonationError;
}
export interface GetDonationPayload {
  id: string;
}

export interface GetDonationSuccess {
  data: [];
  error?: string;
}

export interface GetDonationError {
  error: string;
}

export interface GetAllNGOInfo {
  isGetAllNGOLoading: boolean;
  getAllNGOPayload?: GetAllNgoPayload;
  getAllNGOSuccess?: GetAllNGOSuccess;
  getAllNGOError?: GetAllNGOError;
}

export interface GetAllNgoPayload {
  jwt: string;
}
export interface GetAllNGOSuccess {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  organizationName: string;
  uid: string;
  certificate: object;
  certificateVerified: boolean;
  establishedYear: string;
  about: string;
  additionalDetails: string;
  error?: string;
}

export interface GetAllNGOError {
  error: string;
}

export interface UpdateDonationInfo {
  isUpdateLoading: boolean;
  updatePayload?: UpdateDonationPaylod;
  updateDonationSuccess?: UpdateDonationSuccess;
  updateDonationError?: UpdateDonationError;
}

export interface UpdateDonationPaylod {
  fullName: string;
  ngoId: string;
  pickupLatitude: string;
  pickupLongitude: string;
  donationType: string;
  donationTypeUom: string;
  contactNumber: string;
  description: string;
}

export interface UpdateDonationSuccess {
  id: string;
  message: string;
  error: string;
}

export interface UpdateDonationError {
  error: string;
}

export interface UploadCertificate {
  isUploadCertificateLoading: boolean;
  uploadCertificatePayload?: UploadCertificatePayload;
  uploadCertificateSuccess?: UploadCertificateSuccess;
  uploadCertificateError?: UploadCertificateError;
}

export interface UploadCertificatePayload {
  certificate: string;
}
export interface UploadCertificateSuccess {
  message?: string;
  error?: string;
}
export interface UploadCertificateError {
  error: string;
}

export interface DeleteCertificateInfo {
  isDeleteCertificateLoading: boolean;
  deleteCertificatePayload?: DeleteCertificatePayload;
  deleteCertificateSuccess?: DeleteCertificateSuccess;
  deleteCertificateError?: DeleteCertificateError;
}

export interface DeleteCertificatePayload {
  certificate: string;
}
export interface DeleteCertificateSuccess {
  message?: string;
  error?: string;
}
export interface DeleteCertificateError {
  error: string;
}
export interface NearByNGOInfo {
  isNearByNGOsLoading: boolean;
  nearByNGOsPayload?: NearByNGOsPaylod;
  nearByNGOsSuccess?: NearByNGOsSuccess;
  nearByNGOsError?: NearByNGOsError;
}

export interface NearByNGOsPaylod {
  id: string;
  jwt: string;
  lat: string;
  long: string;
  radius: string;
}

export interface NearByNGOsSuccess {
  data: [
    {
      ngo_id: string;
      user_id: string;
      organization_name: string;
      distance: number;
      latlong: {
        address_latitude: string;
        address_longitude: string;
      };
      profilePic: any;
    },
  ];
  message: string;
  error: string;
}

export interface NearByNGOsError {
  error: string;
}



export interface NearByVolunteersInfo {
  isNearByVolunteersLoading: boolean;
  nearByVolunteersPayload?: NearByVolunteersPaylod;
  nearByVolunteersSuccess?: NearByVolunteersSuccess;
  nearByVolunteersError?: NearByVolunteersError;
}

export interface NearByVolunteersPaylod {
  id: string;
  jwt: string;
  lat: string;
  long: string;
  radius: string;
}

export interface NearByVolunteersSuccess {
  data: [
    {
      users_id: string;
      first_name: string;
      last_name: string;
      profilePic: any;
    },
  ];
  message: string;
  error: string;
}

export interface NearByVolunteersError {
  error: string;
}

export interface GetRequestsInfo {
  isGetRequestsLoading: boolean;
  getRequestsPayload?: GetRequestsPaylod;
  getRequestsSuccess?: GetRequestsSuccess;
  getRequestsError?: GetRequestsError;
}

export interface GetRequestsPaylod {
  id: string;
}

export interface GetRequestsSuccess {
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    userId: string;
    fullName: string;
    ngoIds: string;
    addressId: string;
    donationType: string;
    donationTypeUom: string;
    donationQuantity: string;
    deliveryType: string;
    deliveryTime: string;
    contactNumber: string;
    description: string;
    status: string;
  }[];
  error: string;
  message: string;
}

export interface GetRequestsError {
  error: string;
}

export interface UpdateRequest {
  isUpdateRequestLoading: boolean;
  updateRequestPayload?: UpdateRequestPayload;
  updateRequestSuccess?: UpdateRequestSuccess;
  updateRequestError?: UpdateRequestError;
}
export interface UpdateRequestPayload {
  ngoId: string;
  status: string;
}

export interface UpdateRequestSuccess {
  message: string;
  error?: string;
}
export interface UpdateRequestError {
  error?: string;
}
export interface GetHistoryInfo{
  isGetHistoryLoading: boolean;
  getHistoryPayload?: GetHistoryPaylod;
  getHistorySuccess?: GetHistorySuccess;
  getHistoryError?: GetHistoryError;
}

export interface GetHistoryPaylod{
  id: string;
  jwt: string;
}

export interface GetHistorySuccess{
  data:[];
  error: string;
  message: string;
}

export interface GetHistoryError{
  error: string;
}

export interface UpdateHistoryInfo{
  isUpdateHistoryLoading: boolean;
  updateHistoryPayload?: UpdateHistoryPaylod;
  updateHistorySuccess?: UpdateHistorySuccess;
  updateHistoryError?: UpdateHistoryError;
}

export interface UpdateHistoryPaylod{
  id: string;
  jwt: string;
}

export interface UpdateHistorySuccess{
  data:[];
  error: string;
  message: string;
}

export interface UpdateHistoryError{
  error: string;
}
export interface GetLatLongByAddressInfo {
  isAddressLoading: boolean;
  getLatLongByAddressPayload?: GetLatLongByAddressPayload;
  getLatLongByAddressSuccess?: GetLatLongByAddressSuccess;
  getLatLongByAddressError?: GetLatLongByAddressError;
}

export interface GetLatLongByAddressPayload {
  userId: string;
}

export interface GetLatLongByAddressSuccess {
  data:any;
  error: string;
}

export interface GetLatLongByAddressError {
  error: string;
}

export interface GetHistoryByOrderInfo{
  isHistoryByOrderLoading: boolean;
  getHistoryByOrderPayload?: GetHistoryByOrderPayload;
  getHistoryByOrderSuccess?: GetHistoryByOrderSuccess;
  getHistoryByOrderError?: GetHistoryByOrderError;
}

export interface GetHistoryByOrderPayload{
  id:string;
}

export interface GetHistoryByOrderSuccess{
  data:any;
  error: string;
  message: string;
}

export interface GetHistoryByOrderError{
  error: string;

}

export interface GetHistoryByNgoInfo{
  isGetHistoryByNgoLoading: boolean;
  getHistoryByNgoPayload?: GetHistoryByNgoPaylod;
  getHistoryByNgoSuccess?: GetHistoryByNgoSuccess;
  getHistoryByNgoError?: GetHistoryByNgoError;
}

export interface GetHistoryByNgoPaylod{
  id: string;
  jwt: string;
}

export interface GetHistoryByNgoSuccess{
  data:[];
  error: string;
  message: string;
}

export interface GetHistoryByNgoError{
  error: string;
}

export interface UpdateHistoryInfo{
  isUpdateHistoryLoading: boolean;
  updateHistoryPayload?: UpdateHistoryPayload;
  updateHistorySuccess?: UpdateHistorySuccess;
  updateHistoryError?: UpdateHistoryError;
}
export interface UpdateHistoryPayload{
  id:string;
  jwt:string;
}
export interface UpdateHistorySuccess{
  data:[];
  error: string;
  message: string;
}

export interface UpdateHistoryError{
  error: string;
}

export interface ForgetPasswordInfo {
  isForgetPasswordLoading: boolean;
  forgetPasswordPayload?: ForgetPasswordPayload;
  forgetPasswordSuccess?: ForgetPasswordSuccess;
  forgetPasswordError?: ForgetPasswordError;
}
export interface ForgetPasswordPayload {
  email?: string;
}
export interface ForgetPasswordSuccess {
  message: string;
  error?: string;
}
export interface ForgetPasswordError {
  error?: string;
}
export interface ChangePasswordInfo {
  isChangePasswordLoading: boolean;
  changePasswordPayload?: ChangePasswordPayload;
  changePasswordSuccess?: ChangePasswordSuccess;
  changePasswordError?: ChangePasswordError;
}
export interface ChangePasswordPayload {
  currentPassword?: string;
  newPassword?: string;
}
export interface ChangePasswordSuccess {
  message: string;
  error?: string;
}
export interface ChangePasswordError {
  error?: string;
}

export interface GetAddressByIdInfo {
  isAddressByIdLoading: boolean;
  getAddressByIdPayload?: GetAddressByIdPayload;
  getAddressByIdSuccess?: GetAddressByIdSuccess;
  getAddressByIdError?: GetAddressByIdError;
}

export interface GetAddressByIdPayload{
  id:string;
}

export interface GetAddressByIdSuccess
{
  data:[{id:string;
  firstLine: string;
  lastLine: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  type: string;}];
}


export interface GetAddressByIdError {
  message: string;
  error?: string;
}

export interface SendNotificationByUserIdInfo {
  isSendNotificationByUserIdLoading: boolean;
  sendNotificationByUserIdPayload?: SendNotificationByUserIdPayload;
  sendNotificationByUserIdSuccess?: SendNotificationByUserIdSuccess;
  sendNotificationByUserIdError?: SendNotificationByUserIdError;
}

export interface SendNotificationByUserIdPayload{
  id:string;
  jwt:string;
  data:any;
}

export interface SendNotificationByUserIdSuccess
{
  message: string;
  error?: string;
}

export interface SendNotificationByUserIdError {
  message: string;
  error?: string;
}



export interface SendNotificationByNgoIdInfo {
  isSendNotificationByNgoIdLoading: boolean;
  sendNotificationByNgoIdPayload?: SendNotificationByNgoIdPayload;
  sendNotificationByNgoIdSuccess?: SendNotificationByNgoIdSuccess;
  sendNotificationByNgoIdError?: SendNotificationByNgoIdError;
}

export interface SendNotificationByNgoIdPayload{
  id:string;
  jwt:string;
  data:any;
}

export interface SendNotificationByNgoIdSuccess
{
  message: string;
  error?: string;
}

export interface SendNotificationByNgoIdError {
  message: string;
  error?: string;
}

export interface UserNotificationType {
  title: string;
  message: string;
  endpoint: string;
  read: boolean;
}[]