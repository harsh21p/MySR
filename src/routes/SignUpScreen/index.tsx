import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Alert,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  StatusBar,
} from 'react-native';

import {TextInput} from 'react-native';
import React, {useCallback, useState, useEffect, useRef} from 'react';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import InputComponent from '../../component/InputComponent';
import {
  validateEmail,
  validateIsEmpty,
  validateNumber,
  validatePassword,
} from 'utils/validators';
import {Colors, Spacing} from '../../style';
import Icon from 'react-native-vector-icons/Feather';
import CustomButton from '../../component/CustomButton';
import VectorIcon from 'react-native-vector-icons/Feather';
import {Modalize} from 'react-native-modalize';
import {bytesToMB} from '../../utils/file';
import Constants from '../../constants/file-size';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import CustomModal from '../../component/Modal';
import {hp} from '../../utils/commonFunctions';
import routes from 'routes';
import * as RootNavigation from '../../navigation/rootNavigation';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  callEmailExists,
  clearEmailExists,
  emailExistsInfo,
} from './slice/checkEmailAlreadyExists';
import {
  callPhoneExists,
  clearPhoneExists,
  phoneExistsInfo,
} from './slice/checkPhoneAlreadyExists';
import {callGetAllRoles, getAllRolesInfo} from './slice/getRoles';
import {useSignUpContext} from 'context/sign-up-context';
import {callSendOtp, clearSendOtp, sendOtpInfo} from './slice/sendOtp';
import SVGIcon from '../../component/SVGIcon';
import icons from 'assets/icons';
import {MobileText} from '../../component/MobileText';
import {callNGOSignUp} from './slice/signUpNGO';
import {callSignUp, clearSignUp, signUpInfo} from './slice/signUpVolunteer';
import {signUpNGOInfo} from './slice/signUpNGO';
import {clearSignUpNGO} from './slice/signUpNGO';

const SignUpScreen = () => {
  const {t} = useTranslation();
  const [selection, setSelection] = useState(0);

  const [firstName, setFirstName] = useState<string>();
  const [firstNameError, setFirstNameError] = useState<any>();
  const [lastName, setLastName] = useState<string>();
  const [lastNameError, setLastNameError] = useState<any>();
  const [email, setEmail] = useState<string>();
  const [emailErrorMessage, setEmailError] = useState<any>();
  const [password, setPassword] = useState<string>();
  const [passwordError, setPasswordError] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<any>();
  const [selectedRole, setSelectedRole] = useState<string>();
  const [selectedDocError, setSelectedDocError] = useState<any>();
  const [inputPhone, setInputPhone] = useState<string>();
  const [inputPhoneError, setInputPhoneError] = useState<any>();
  const [orgName, setOrgName] = useState<string>();
  const [orgNameError, setOrgNameError] = useState<any>();
  const [certificate, setCertificate] = useState<string>();
  const [uidNumber, setUidNumber] = useState<string>();
  const [uidNumberError, setUidNumberError] = useState<any>();
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const input = useRef(null);
  const [click, setClick] = useState(false);
  const [holder, setHolder] = useState('Select Role');
  const [showConfirmShowPassword, setShowConfirmShowPassword] =
    useState<boolean>(false);
  const pickerRef = useRef<Modalize>(null);
  const {emailError, emailSuccess} = useAppSelector(emailExistsInfo);
  const {phoneError, phoneSuccess} = useAppSelector(phoneExistsInfo);
  const [selectedDocName, setSelectedDocName] = useState<string>('');
  const dispatch = useAppDispatch();
  const {isRolesLoading, getRolesSuccess} = useAppSelector(getAllRolesInfo);
  const {sendOtpSuccess, isSendOtpLoading} = useAppSelector(sendOtpInfo);
  const {setData} = useSignUpContext();
  const {isSignupLoading, signUpSuccess, signUpError} =
    useAppSelector(signUpInfo);
  const {isNGOSignupLoading, signUpNGOSuccess, signUpNGOError} =
    useAppSelector(signUpNGOInfo);

  useEffect(() => {
    if (
      email &&
      (emailErrorMessage === '' || emailErrorMessage === undefined)
    ) {
      const payload = {
        email: email,
      };
      dispatch(callEmailExists(payload));
    }
    if (email && emailSuccess !== undefined) {
      if (emailSuccess?.exists) {
        setEmailError(t('common:emailExists'));
      } else {
        setEmailError('');
      }
    }
    if (emailError !== undefined) {
      Alert.alert('Error! Please try again');
    }
    if (inputPhone?.length === 10) {
      const payload = {
        phoneNumber: '+91' + inputPhone,
      };
      dispatch(callPhoneExists(payload));
    }
    if (phoneSuccess !== undefined) {
      if (phoneSuccess?.exists) {
        setInputPhoneError(t('common:phoneExists'));
      } else {
        setInputPhoneError('');
      }
    }
    if (phoneError !== undefined) {
      Alert.alert('Error! Please try again');
    }
  }, [inputPhone, dispatch, email, phoneSuccess, emailSuccess]);
  useEffect(() => {
    if (
      (signUpSuccess !== undefined && signUpSuccess?.id) ||
      (signUpNGOSuccess !== undefined && signUpNGOSuccess?.id)
    ) {
      RootNavigation.navigate(routes.LoginScreen);
      Alert.alert('Successfully Signed up, Please login');
      dispatch(clearSignUp());
      dispatch(clearSignUpNGO());
      dispatch(clearEmailExists());
      dispatch(clearPhoneExists());
    }
    if (
      (signUpSuccess !== undefined && signUpSuccess?.error) ||
      signUpNGOError ||
      signUpError ||
      (signUpNGOSuccess !== undefined && signUpNGOSuccess?.error)
    ) {
      Alert.alert(
        signUpSuccess?.error
          ? signUpSuccess?.error
          : signUpNGOSuccess?.error
          ? signUpNGOSuccess?.error
          : 'Error! Please try again',
      );
      dispatch(clearEmailExists());
      dispatch(clearPhoneExists());

    console.log(
      'yyyy',
      signUpSuccess,
      signUpNGOSuccess,
      signUpError,
      signUpNGOError,
    );
    }
  }, [signUpSuccess, signUpNGOSuccess, signUpError, signUpNGOError]);
  // useEffect(() => {
  //   if (
  //     sendOtpSuccess !== undefined &&
  //     sendOtpSuccess?.message === 'OTP Sent'
  //   ) {
  //     RootNavigation.navigate(routes.VerifyEmail);
  //     dispatch(clearSendOtp());
  //   }
  //   if (
  //     sendOtpSuccess !== undefined &&
  //     sendOtpSuccess?.message !== 'OTP Sent'
  //   ) {
  //     Alert.alert('Error! Please try again');
  //   }
  // }, [sendOtpSuccess]);

  useEffect(() => {
    if (selectedRole === 'NGO' || selectedRole === 'VOLUNTEER') {
      if (selectedRole === 'VOLUNTEER') {
        if (
          firstName !== undefined &&
          (firstNameError === undefined || firstNameError === '') &&
          lastName !== undefined &&
          (lastNameError === undefined || lastNameError === '') &&
          email !== undefined &&
          (emailErrorMessage === undefined || emailErrorMessage === '') &&
          password !== undefined &&
          (passwordError === undefined || passwordError === '') &&
          confirmPassword !== undefined &&
          (confirmPasswordError === undefined || confirmPasswordError === '') &&
          inputPhone !== undefined &&
          (inputPhoneError === undefined || inputPhoneError === '')
        ) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      } else if (selectedRole === 'NGO') {
        if (
          uidNumber !== undefined &&
          (uidNumberError === undefined || uidNumberError === '') &&
          firstName !== undefined &&
          (firstNameError === undefined || firstNameError === '') &&
          lastName !== undefined &&
          (lastNameError === undefined || lastNameError === '') &&
          orgName !== undefined &&
          (orgNameError === undefined || orgNameError === '') &&
          email !== undefined &&
          (emailErrorMessage === undefined || emailErrorMessage === '') &&
          password !== undefined &&
          (passwordError === undefined || passwordError === '') &&
          confirmPassword !== undefined &&
          (confirmPasswordError === undefined || confirmPasswordError === '') &&
          inputPhone !== undefined &&
          (inputPhoneError === undefined || inputPhoneError === '') &&
          certificate !== undefined
        ) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      } else {
        setIsDisable(true);
      }
    }
  }, [
    selectedRole,
    firstName,
    lastName,
    email,
    orgName,
    password,
    confirmPassword,
    inputPhone,
    certificate,
    uidNumber,
  ]);

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };
  const uploadDoc = () => {
    pickerRef.current?.open();
  };
  useEffect(() => {}, [isOpenDropdown]);
  useEffect(() => {
    if (getRolesSuccess === undefined) {
      dispatch(callGetAllRoles());
    }
  }, []);

  const handleValues = useCallback(
    (type: string, value: string) => {
      if (type === 'mobile') {
        if (validateIsEmpty(value)) {
          setInputPhoneError(t('common:requiredField'));
          setInputPhone(value);
        } else if (!validateNumber(value.replace(/ /g, ''))) {
          setInputPhoneError(t('common:validMobileNumber'));
          setInputPhone(value);
        } else {
          setInputPhoneError('');
          setInputPhone(value);
        }
      } else if (type === 'firstName') {
        if (validateIsEmpty(value)) {
          setFirstNameError(t('common:requiredField'));
          setFirstName(value);
        } else {
          setFirstNameError('');
          setFirstName(value);
        }
      } else if (type === 'lastName') {
        if (validateIsEmpty(value)) {
          setLastName(value);
          setLastNameError(t('common:requiredField'));
        } else {
          setLastNameError('');
          setLastName(value);
        }
      } else if (type === 'password') {
        if (validateIsEmpty(value)) {
          setPassword(value);
          setPasswordError(t('common:requiredField'));
        } else if (!validatePassword(value)) {
          setPasswordError(t('common:validPassword'));
          setPassword(value);
        } else {
          setPassword(value);
          setPasswordError('');
        }
      } else if (type === 'confirmPassword') {
        if (validateIsEmpty(value)) {
          setConfirmPassword(value);
          setConfirmPasswordError(t('common:requiredField'));
        } else if (password !== value) {
          setConfirmPassword(value);
          setConfirmPasswordError(t('common:validateConfirmPassword'));
        } else {
          setConfirmPassword(value);
          setConfirmPasswordError('');
        }
      } else if (type === 'email') {
        if (validateIsEmpty(value)) {
          setEmail(value);
          setEmailError(t('common:requiredField'));
        } else if (!validateEmail(value)) {
          setEmail(value);
          setEmailError(t('common:validEmail'));
        } else {
          setEmail(value);
          setEmailError('');
        }
      } else if (type === 'uid') {
        if (validateIsEmpty(value)) {
          setUidNumber(value);
          setUidNumberError(t('common:requiredField'));
        } else {
          setUidNumberError('');
          setUidNumber(value);
        }
      } else if (type === 'orgName') {
        if (validateIsEmpty(value)) {
          setOrgName(value);
          setOrgNameError(t('common:requiredField'));
        } else {
          setOrgName(value);
          setOrgNameError('');
        }
      } else if (type === 'document') {
        if (validateIsEmpty(value)) {
          setSelectedDocError(t('common:requiredField'));
        } else {
          setSelectedDocError('');
        }
      }
    },
    [t, password],
  );
  const closeModal = () => {
    pickerRef.current?.close();
  };

  const getDocument = async (type: string) => {
    if (type === 'cameraPhoto') {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 1,
      }).then(file => {
        const sizeInMB = bytesToMB(file.size);
        if (sizeInMB <= Constants.maxFileSize1) {
          setCertificate(file.path);
          setSelectedDocName(
            Platform.OS === 'ios' ? file.filename : 'temp.jpg',
          );
        } else {
          Alert.alert('Photo size cannot be greater than 10 MB');
        }
      });
    } else if (type === 'libraryPhoto') {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        const sizeInMB = bytesToMB(image.size);
        if (sizeInMB <= Constants.maxFileSize1) {
          setCertificate(image.path);
          setSelectedDocName(
            Platform.OS === 'ios' ? image.filename : 'temp.jpg',
          );
        } else {
          Alert.alert('Document size cannot be greater than 10 MB');
        }
      });
    } else if (type === 'documents') {
      const document = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        presentationStyle: undefined,
      });
      if (document?.size) {
        const sizeInMB = bytesToMB(document.size);
        if (sizeInMB <= Constants.maxFileSize1) {
          setCertificate(document.uri);
          setSelectedDocName(
            Platform.OS === 'ios' ? document.name : 'temp.jpg',
          );
        } else {
          Alert.alert('Document size cannot be greater than 10 MB');
        }
      }
    }
    closeModal();
  };
  const onClickSignUp = () => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      emailVerified: true,
      phoneNumber: '+91' + inputPhone,
      phoneNumberVerified: true,
      password: password,
      roleId: getRolesSuccess[0]?.id,
    };
    let formDataPayload = new FormData();
    formDataPayload.append('firstName', firstName);
    formDataPayload.append('lastName', lastName);
    formDataPayload.append('email', email);
    formDataPayload.append('emailVerified', true);
    formDataPayload.append('phoneNumber', '+91' + inputPhone);
    formDataPayload.append('phoneNumberVerified', true);
    formDataPayload.append('password', password);
    formDataPayload.append('roleId', getRolesSuccess[1]?.id);
    formDataPayload.append('uid', uidNumber);
    formDataPayload.append('organizationName', orgName);
    formDataPayload.append('certificate', {
      uri: certificate,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    formDataPayload.append('certificateVerified', true);
    formDataPayload.append('establishedYear', '2023');

    // setData(payload);
    // const sendOtp = {
    //   phoneNumber: '+91' + inputPhone,
    //   emailId: email,
    // };

    if (orgName !== undefined) {
      dispatch(callNGOSignUp(formDataPayload));
    } else {
      dispatch(callSignUp(payload));
    }
    // RootNavigation.navigate(routes.VerifyEmail);
    // dispatch(callSendOtp(sendOtp));
  };
  const selectRole = (val: string) => {
    setSelectedRole(val);
    setIsOpenDropdown(!isOpenDropdown);
  };

  return (
    <>
      {isRolesLoading ||
      isSendOtpLoading ||
      isSignupLoading ||
      isNGOSignupLoading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.Button.primary}
          style={styles.loader}
        />
      ) : (
        <SafeAreaView style={styles.maincontainer}>
          <StatusBar
            backgroundColor={Colors.Generic.white}
            barStyle={'dark-content'}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
            automaticallyAdjustKeyboardInsets={true}>
            <View style={styles.scroll}>
              <View>
                <Text style={styles.welcomeText}>{t('common:welcome')}</Text>
                <Text style={styles.subtitle}>
                  {t('common:signUpToContinue')}
                </Text>
              </View>

              <View style={styles.imageView}>
                <SVGIcon icon={icons.secondLogo} style={styles.img} />
              </View>

              <View>
                <View style={styles.row}>
                  <InputComponent
                    disabled={false}
                    outlineColor={Colors.Generic.textInputBorder}
                    variant="outlined"
                    maxLength={Spacing.size10}
                    label={
                      <Text style={styles.fieldStyle}>
                        {t('common:firstName')}
                        <Text style={styles.asterisk}> *</Text>
                      </Text>
                    }
                    value={firstName}
                    onChangeText={e => handleValues('firstName', e)}
                    error={firstNameError}
                    inputStyle={styles.inputFirstname}
                    returnKeyType="done"
                  />
                  <View style={styles.spacer} />
                  <InputComponent
                    disabled={false}
                    outlineColor={Colors.Generic.textInputBorder}
                    variant="outlined"
                    maxLength={Spacing.size10}
                    label={
                      <Text style={styles.fieldStyle}>
                        {t('common:lastName')}
                        <Text style={styles.asterisk}> *</Text>
                      </Text>
                    }
                    value={lastName}
                    onChangeText={e => handleValues('lastName', e)}
                    error={lastNameError}
                    inputStyle={styles.inputFirstname}
                    returnKeyType="done"
                  />
                </View>
              </View>

              <View style={styles.rowIcon}>
                <InputComponent
                  disabled={false}
                  outlineColor={Colors.Generic.textInputBorder}
                  variant="outlined"
                  maxLength={Spacing.size30}
                  label={
                    <Text style={styles.fieldStyle}>
                      {t('common:password')}
                      <Text style={styles.asterisk}> *</Text>
                    </Text>
                  }
                  value={password}
                  onChangeText={e => handleValues('password', e)}
                  errorStyle={styles.marginTop}
                  inputStyle={styles.inputFirstname}
                  returnKeyType="done"
                  secureTextEntry={showPassword ? false : true}
                />
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={Spacing.size22}
                  style={styles.eyeIcon1}
                  color={Colors.Text.black}
                  onPress={() => setShowPassword(!showPassword)}
                />
              </View>

              {passwordError !== '' && passwordError !== undefined && (
                <Text style={[styles.errorText]}>{passwordError}</Text>
              )}

              <View style={styles.rowIcon}>
                <InputComponent
                  disabled={false}
                  outlineColor={Colors.Generic.textInputBorder}
                  variant="outlined"
                  maxLength={Spacing.size30}
                  label={
                    <Text style={styles.fieldStyle}>
                      {t('common:confirmPassword')}
                      <Text style={styles.asterisk}> *</Text>
                    </Text>
                  }
                  value={confirmPassword}
                  onChangeText={e => handleValues('confirmPassword', e)}
                  inputStyle={styles.inputFirstname}
                  returnKeyType="done"
                  secureTextEntry={showConfirmShowPassword ? false : true}
                />
                <Icon
                  name={showConfirmShowPassword ? 'eye' : 'eye-off'}
                  size={Spacing.size22}
                  style={styles.eyeIcon1}
                  color={Colors.Text.black}
                  onPress={() =>
                    setShowConfirmShowPassword(!showConfirmShowPassword)
                  }
                />
              </View>
              {confirmPasswordError !== '' &&
                confirmPasswordError !== undefined && (
                  <Text style={[styles.errorText]}>{confirmPasswordError}</Text>
                )}

              <InputComponent
                disabled={false}
                outlineColor={Colors.Generic.textInputBorder}
                variant="outlined"
                label={
                  <Text style={styles.fieldStyle}>
                    {t('common:emailId')}
                    <Text style={styles.asterisk}> *</Text>
                  </Text>
                }
                keyboardType="email-address"
                value={email}
                onChangeText={e => handleValues('email', e)}
                error={emailErrorMessage}
                inputStyle={styles.inputFirstname}
                returnKeyType="done"
              />
              <View style={styles.padding}>
                <MobileText phoneNumber={inputPhone} onChangeText={e => handleValues('mobile', e)} type={1}/>
                { inputPhoneError !== undefined && inputPhoneError !== '' && <Text style={styles.errorText}>{inputPhoneError}</Text>}
              </View>

              <Pressable
                onPress={() => {
                  setClick(!click);
                }}
                style={[
                  styles.mainView,
                  {
                    backgroundColor: click
                      ? Colors.Generic.backgroundPopup
                      : null,
                  },
                ]}>
                <View style={click ? styles.style1 : styles.style}>
                  <TextInput
                    onFocus={() => {
                      setClick(!click);
                    }}
                    ref={input}
                    placeholderTextColor={
                      click ? Colors.Button.primary : Colors.Text.gray
                    }
                    placeholder={holder}
                    editable={false}
                    style={[
                      styles.input,
                      click
                        ? {fontFamily: 'Poppins-Medium'}
                        : {fontFamily: 'Poppins-Regular'},
                    ]}
                  />
                  <View style={styles.svgHolder}>
                    <SVGIcon
                      style={[
                        styles.svg,
                        {
                          transform: [
                            click ? {rotate: '90deg'} : {rotate: '-90deg'},
                          ],
                        },
                      ]}
                      icon={icons.backButton}
                    />
                  </View>
                </View>
                {getRolesSuccess && click ? (
                  <View style={styles.options}>
                    <Pressable
                      style={[
                        styles.holder,
                        {
                          backgroundColor:
                            holder === 'Volunteer'
                              ? Colors.Button.secondary
                              : null,
                        },
                      ]}
                      onPress={() => {
                        selectRole(getRolesSuccess[0]?.name);
                        setHolder('Volunteer');
                        setClick(!click);
                      }}>
                      <Text style={styles.textView}>Volunteer</Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.holder,
                        {
                          backgroundColor:
                            holder === 'Organization'
                              ? Colors.Button.secondary
                              : null,
                        },
                      ]}
                      onPress={() => {
                        selectRole(getRolesSuccess[1]?.name);
                        setHolder('Organization');
                        setClick(!click);
                      }}>
                      <Text style={styles.textView}>Organization</Text>
                    </Pressable>
                  </View>
                ) : (
                  <></>
                )}
              </Pressable>

              {selectedRole === 'NGO' && (
                <View>
                  <View>
                    <InputComponent
                      disabled={false}
                      outlineColor={Colors.Generic.textInputBorder}
                      variant="outlined"
                      label={
                        <Text style={styles.fieldStyle}>
                          {t('common:orgName')}
                          <Text style={styles.asterisk}> *</Text>
                        </Text>
                      }
                      value={orgName}
                      onChangeText={e => handleValues('orgName', e)}
                      error={orgNameError}
                      inputStyle={styles.inputFirstname}
                      returnKeyType="done"
                    />
                    <InputComponent
                      disabled={false}
                      outlineColor={Colors.Generic.textInputBorder}
                      variant="outlined"
                      label={
                        <Text style={styles.fieldStyle}>
                          {t('common:uid')}
                          <Text style={styles.asterisk}> *</Text>
                        </Text>
                      }
                      value={uidNumber}
                      onChangeText={e => handleValues('uid', e)}
                      error={uidNumberError}
                      inputStyle={[styles.inputFirstname]}
                      returnKeyType="done"
                    />
                  </View>
                  <Pressable style={styles.rowIcon} onPress={uploadDoc}>
                    <InputComponent
                      disabled={false}
                      editable={false}
                      outlineColor={Colors.Generic.textInputBorder}
                      variant="outlined"
                      maxLength={Spacing.size10}
                      label={
                        <Text style={styles.fieldStyle}>
                          {t('common:uploadCertificate')}
                          <Text style={styles.asterisk}> *</Text>
                        </Text>
                      }
                      keyboardType="number-pad"
                      value={selectedDocName}
                      onChangeText={e => handleValues('certificate', e)}
                      error={selectedDocError}
                      inputStyle={[styles.inputFirstname]}
                      returnKeyType="done"
                    />
                    <VectorIcon
                      name="upload"
                      size={25}
                      style={styles.eyeIcon1}
                    />
                  </Pressable>
                </View>
              )}
              <View style={styles.buttonHolder}>
                <CustomButton
                  title={t('common:signUp')}
                  isDisable={isDisable}
                  onPress={onClickSignUp}
                />
              </View>

              <Pressable
                onPress={() => RootNavigation.navigate(routes.LoginScreen)}>
                <Text style={styles.signup}>
                  {t('common:alreadyAccount')}
                  <Text style={styles.signupBold}>
                    {' '}
                    {t('common:login')}
                  </Text>{' '}
                </Text>
              </Pressable>

              {/* <View style={styles.loginwithView}>
                <View style={styles.line} />
                <Text style={styles.loginwith}>
                  {t('common:signup')} {t('common:with')}
                </Text>
                <View style={styles.line} />
              </View>
              <View style={styles.iconLogin}>
                <View style={styles.iconBackground}>
                  <Text style={styles.google}>G</Text>
                </View>
                <View style={styles.iconBackground}>
                  <Text style={styles.other}>...</Text>
                </View>
              </View> */}

              <CustomModal
                modalStyle={styles.modalStyle}
                children={
                  <View style={styles.uploadDocModalView}>
                    <View style={styles.modalContainer}>
                      <View style={styles.viewStyle}>
                        <Text
                          style={styles.text}
                          onPress={() => getDocument('cameraPhoto')}>
                          {t('common:photoUploadLabel')}
                        </Text>
                      </View>
                      <Text
                        style={styles.text}
                        onPress={() => getDocument('libraryPhoto')}>
                        {t('common:libraryUploadLabel')}
                      </Text>
                      <Text
                        style={styles.text}
                        onPress={() => getDocument('documents')}>
                        {t('common:documentUploadLabel')}
                      </Text>
                      <Text style={styles.cancelText} onPress={closeModal}>
                        {t('common:cancelUploadLabel')}
                      </Text>
                    </View>
                  </View>
                }
                modalizeRef={pickerRef}
                height={hp(30)}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default SignUpScreen;
