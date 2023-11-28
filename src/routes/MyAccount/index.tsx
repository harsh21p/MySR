import {
  View,
  Text,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Platform,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import styles from './style';
import Icon1 from 'react-native-vector-icons/Entypo';
import {Colors, Spacing} from '../../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputComponent from '../../component/InputComponent';
import {validateIsEmpty, validatePassword} from '../../utils/validators';
import IconTag from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../component/CustomButton';
import CustomPopup from '../../component/CustomPopup';
import Icons from 'react-native-vector-icons/Feather';
import {BackButton} from '../../component/BackButton';
import {MobileText} from '../../component/MobileText';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {callGetProfile, getProfileError, getProfileInfo} from './slice';
import {useAuthContext} from 'context/use-auth-context';
import {
  callUpdateProfile,
  clearUpdateProfile,
  updateProfileError,
  updateProfileInfo,
} from './slice/updateProfile';
import {
  callClearDeleteProfile,
  callDeleteProfile,
  deleteProfileInfo,
} from './slice/deleteAccount';
import * as RootNavigation from 'navigation/rootNavigation';
import routes from 'routes';
import {hp} from 'utils/commonFunctions';
import CustomModal from '../../component/Modal';
import {Modalize} from 'react-native-modalize';
import ImagePicker from 'react-native-image-crop-picker';
import {bytesToMB} from '../../utils/file';
import Constants from 'constants/file-size';
import {
  callChangePassword,
  changePasswordInfo,
  clearChangePassword,
} from './changePasswordSlice';

const MyAccount = () => {
  const {t} = useTranslation();
  const [firstTime, setFirstTime] = useState(false);
  const [firstName, setFirstName] = useState<string>();
  const [firstNameError, setFirstNameError] = useState<any>();
  const [lastName, setLastName] = useState<string>();
  const [lastNameError, setLastNameError] = useState<any>();
  const [orgName, setOrgName] = useState<string>();
  const [orgNameError, setOrgNameError] = useState<any>();
  const [uid, setUid] = useState<string>();
  const [uidError, setUidError] = useState<any>();
  const [establishedYear, setEstablishedYear] = useState<string>();
  const [establishedYearError, setEstablishedYearError] = useState<any>();
  const [isFirstNameEnabled, setFirstEnable] = useState<boolean>(false);
  const [isLastNameEnabled, setLastEnable] = useState<boolean>(false);
  const [establishedYearEnable, setEstablishedYearEnable] =
    useState<boolean>(false);
  const [orgNameEnable, setOrgNameEnabled] = useState<boolean>(false);
  const [uidEnable, setUidEnable] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [changePasswordModal, setChangePasswordModal] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmShowPassword, setShowConfirmShowPassword] =
    useState<boolean>(false);
  const [showNewShowPassword, setNewConfirmShowPassword] =
    useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<any>();
  const [password, setPassword] = useState<string>();
  const [passwordError, setPasswordError] = useState<any>();
  const [newPassword, setNewPassword] = useState<string>();
  const [newPasswordError, setNewPasswordError] = useState<any>();
  const [selectedDocName, setSelectedDocName] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string>();
  const {updateProfileSuccess, updateProfileError, isUpdateLoading} =
    useAppSelector(updateProfileInfo);
  const {authData, resetAuthData} = useAuthContext();
  const dispatch = useAppDispatch();
  const pickerRef = useRef<Modalize>(null);
  const {isDeleteLoading, deleteProfileSuccess, deleteProfileError} =
    useAppSelector(deleteProfileInfo);

  const {isProfileLoading, profileSuccess, profileError} =
    useAppSelector(getProfileInfo);
  const [isDisable, setIsDisable] = useState(true);
  const {isChangePasswordLoading, changePasswordSuccess, changePasswordError} =
    useAppSelector(changePasswordInfo);
  const [about, setAbout] = useState<any>();
  const [additionalDetails, setAdditionalDetails] = useState<any>();
  const [aboutEnable, setAboutEnable] = useState<boolean>(false);
  const [additionalDetailsEnable, setAdditionalDetailsEnable] =
    useState<boolean>(false);
  const [aboutError, setAboutError] = useState<any>();
  const [additionalDetailsError, setAdditionalDetailsError] = useState<any>();

  const onPasswordChange = () => {
    const userPayload = {
      id: authData?.userId,
      payload: {
        currentPassword: password,
        newPassword: confirmPassword,
      },
    };
    dispatch(callChangePassword(userPayload));
  };

  const onSaveChanges = () => {
    let payload;
    var formDataPayload = new FormData();

    if (authData.roleName === 'NGO') {
      formDataPayload.append('firstName', firstName);
      formDataPayload.append('lastName', lastName);
      formDataPayload.append('organizationName', orgName);
      formDataPayload.append('uid', uid);
      formDataPayload.append('establishedYear', establishedYear);
      formDataPayload.append('phoneNumberVerified', true);
      formDataPayload.append('emailVerified', true);
      formDataPayload.append('certificateVerified', true);
      formDataPayload.append('profilePic', profilePic);
      formDataPayload.append('about', about);
      formDataPayload.append('additionalDetails', additionalDetails);
      payload = {
        id: authData?.userId,
        jwt: authData?.jwt,
        data: formDataPayload,
      };
    } else {
      formDataPayload.append('firstName', firstName);
      formDataPayload.append('lastName', lastName);
      formDataPayload.append('phoneNumberVerified', true);
      formDataPayload.append('emailVerified', true);
      formDataPayload.append('profilePic', profilePic);
      payload = {
        id: authData?.userId,
        jwt: authData?.jwt,
        data: formDataPayload,
      };
    }
    dispatch(callUpdateProfile(payload));
  };

  useEffect(() => {
    if (
      !passwordError &&
      !confirmPasswordError &&
      !newPasswordError &&
      password &&
      newPassword &&
      confirmPassword
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [
    isDisable,
    passwordError,
    confirmPasswordError,
    newPasswordError,
    password,
    newPassword,
    confirmPassword,
  ]);

  useEffect(() => {
    if (changePasswordSuccess !== undefined && changePasswordSuccess?.message) {
      Alert.alert(changePasswordSuccess?.message);
      if (changePasswordSuccess?.message !== 'Password is incorrect') {
        toggleChangePasswordModal();
      }
    }
    if (
      (changePasswordSuccess !== undefined && changePasswordSuccess?.error) ||
      changePasswordError
    ) {
      Alert.alert(
        changePasswordSuccess?.error
          ? changePasswordSuccess?.error
          : 'Error! Please try again',
      );
    }
    dispatch(clearChangePassword());
  }, [changePasswordSuccess, changePasswordError]);

  useEffect(() => {
    if (deleteProfileSuccess !== undefined && deleteProfileSuccess?.message) {
      Alert.alert('Account delete successfully!');
      resetAuthData();
      RootNavigation.navigate(routes.LoginScreen);
      dispatch(callClearDeleteProfile());
    }
    if (
      (deleteProfileSuccess !== undefined && deleteProfileSuccess?.error) ||
      deleteProfileError
    ) {
      Alert.alert('Error! Please try again');
    }
  }, [deleteProfileSuccess, deleteProfileError]);
  useEffect(() => {
    if (updateProfileSuccess !== undefined) {
      if (firstTime) {
        Alert.alert('Details updated successfully!');
      }
      setFirstTime(true);
      const payload = {
        userId: authData?.userId,
        jwt: authData?.jwt,
      };
      dispatch(callGetProfile(payload));
      dispatch(clearUpdateProfile());
    } else {
      if (updateProfileSuccess?.error !== undefined || updateProfileError) {
        Alert.alert('Error! Try again.');
      }
    }
  }, [updateProfileSuccess, updateProfileError]);

  useEffect(() => {
    if (profileSuccess !== undefined && profileSuccess?.id) {
      setFirstName(profileSuccess?.firstName);
      setLastName(profileSuccess?.lastName);
      setProfilePic(profileSuccess?.profilePic);
      if (authData?.roleName === 'NGO') {
        setOrgName(profileSuccess?.organizationName);
        setUid(profileSuccess?.uid);
        setEstablishedYear(profileSuccess?.establishedYear);
        setAbout(profileSuccess?.about);
        setAdditionalDetails(profileSuccess?.additionalDetails);
      }
    } else {
      if (profileSuccess?.error !== undefined || profileError) {
        Alert.alert('Error! Try again.');
      }
    }
  }, [profileSuccess, profileError]);

  const handleValues = useCallback(
    (type: string, value: string) => {
      if (type === 'password') {
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
      } else if (type === 'newPassword') {
        if (validateIsEmpty(value)) {
          setNewPassword(value);
          setNewPasswordError(t('common:requiredField'));
        } else if (!validatePassword(value)) {
          setNewPasswordError(t('common:validPassword'));
          setNewPassword(value);
        } else if (password === value) {
          setNewPasswordError(t('common:newEqual'));
          setNewPassword(value);
        } else {
          setNewPassword(value);
          setNewPasswordError('');
        }
      } else if (type === 'confirmPassword') {
        if (validateIsEmpty(value)) {
          setConfirmPassword(value);
          setConfirmPasswordError(t('common:requiredField'));
        } else if (newPassword !== value) {
          setConfirmPassword(value);
          setConfirmPasswordError(t('common:validateConfirmPassword'));
        } else {
          setConfirmPassword(value);
          setConfirmPasswordError('');
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
      } else if (type === 'orgName') {
        if (validateIsEmpty(value)) {
          setOrgName(value);
          setOrgNameError(t('common:requiredField'));
        } else {
          setOrgNameError('');
          setOrgName(value);
        }
      } else if (type === 'uid') {
        if (validateIsEmpty(value)) {
          setUid(value);
          setUidError(t('common:requiredField'));
        } else {
          setUidError('');
          setUid(value);
        }
      } else if (type === 'establishedYear') {
        if (validateIsEmpty(value)) {
          setEstablishedYear(value);
          setEstablishedYearError(t('common:requiredField'));
        } else {
          setEstablishedYearError('');
          setEstablishedYear(value);
        }
      } else if (type === 'about') {
        setAbout(value);
      } else if (type === 'additionalDetails') {
        setAdditionalDetails(value);
      }
    },
    [t, newPassword],
  );

  const toggleDeleteClose = () => {
    setOpenDeleteModal(!openDeleteModal);
  };
  const deleteAccount = () => {
    const payload = {
      userId: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callDeleteProfile(payload));
    toggleDeleteClose();
  };

  useEffect(() => {
    const payload = {
      userId: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetProfile(payload));
  }, []);

  const toggleChangePasswordModal = () => {
    setChangePasswordModal(!changePasswordModal);
  };
  const closeModal = () => {
    pickerRef.current?.close();
  };
  const getDocument = async (type: string) => {
    if (type === 'cameraPhoto') {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: 'photo',
        includeBase64: true,
        compressImageQuality: 1,
      }).then(file => {
        const sizeInMB = bytesToMB(file.size);
        if (sizeInMB <= Constants.maxFileSize1) {
          setProfilePic(`data:${file?.mime};base64,${file?.data}`);
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
        height: 300,
        mediaType: 'photo',
        includeBase64: true,
        cropping: true,
      }).then(image => {
        const sizeInMB = bytesToMB(image.size);
        if (sizeInMB <= Constants.maxFileSize1) {
          setProfilePic(`data:${image.mime};base64,${image.data}`);
          setSelectedDocName(
            Platform.OS === 'ios' ? image.filename : 'temp.jpg',
          );
        } else {
          Alert.alert('Document size cannot be greater than 10 MB');
        }
      });
    }
    closeModal();
  };
  const uploadDoc = () => {
    pickerRef.current?.open();
  };
  return (
    <SafeAreaView style={styles.maincontainer}>
      {isDeleteLoading ||
      isProfileLoading ||
      isUpdateLoading ||
      isChangePasswordLoading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.Button.primary}
          style={styles.loader}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.mainView}>
            <BackButton isTitle={true} title={t('common:myAccount')} />
            <Text style={styles.description}>{t('common:myAccountDesc')}</Text>

            <View style={styles.profileView}>
              <Image style={styles.profilePic} source={{uri: profilePic}} />
              <View style={styles.cameraIcon}>
                <Icon
                  name="camera"
                  size={18}
                  color={Colors.Text.black}
                  onPress={uploadDoc}
                />
              </View>
              {profilePic === undefined ||
                profilePic == 'null' ||
                (profilePic === null && (
                  <View style={styles.centerText}>
                    <Text style={styles.profileName}>
                      {firstName?.charAt(0)?.toLocaleUpperCase() +
                        lastName?.charAt(0)?.toLocaleUpperCase()}
                    </Text>
                  </View>
                ))}
            </View>
            <View>
              <View style={styles.row}>
                <InputComponent
                  disabled={false}
                  editable={isFirstNameEnabled}
                  outlineColor={Colors.Generic.textInputBorder}
                  variant="outlined"
                  maxLength={Spacing.size10}
                  label={
                    <Text style={styles.fieldStyle}>
                      {t('common:firstName')}
                    </Text>
                  }
                  value={firstName}
                  onChangeText={e => handleValues('firstName', e)}
                  error={firstNameError}
                  inputStyle={styles.input}
                  returnKeyType="done"
                />
                <IconTag
                  name="edit"
                  style={styles.editIcon}
                  size={20}
                  color={Colors.Text.black}
                  onPress={() => {
                    setFirstEnable(true);
                  }}
                />
              </View>
              <View style={styles.row}>
                <InputComponent
                  disabled={false}
                  editable={isLastNameEnabled}
                  outlineColor={Colors.Generic.textInputBorder}
                  variant="outlined"
                  maxLength={Spacing.size10}
                  label={
                    <Text style={styles.fieldStyle}>
                      {t('common:lastName')}
                    </Text>
                  }
                  value={lastName}
                  onChangeText={e => handleValues('lastName', e)}
                  error={lastNameError}
                  inputStyle={styles.input}
                  returnKeyType="done"
                />
                <IconTag
                  name="edit"
                  style={styles.editIcon}
                  size={20}
                  color={Colors.Text.black}
                  onPress={() => {
                    setLastEnable(true);
                  }}
                />
              </View>
              {authData?.roleName === 'NGO' && (
                <>
                  <View style={styles.row}>
                    <InputComponent
                      disabled={false}
                      editable={orgNameEnable}
                      outlineColor={Colors.Generic.textInputBorder}
                      variant="outlined"
                      maxLength={Spacing.size10}
                      label={
                        <Text style={styles.fieldStyle}>
                          {t('common:orgName')}
                        </Text>
                      }
                      value={orgName}
                      onChangeText={e => handleValues('orgName', e)}
                      error={orgNameError}
                      inputStyle={styles.input}
                      returnKeyType="done"
                    />
                    <IconTag
                      name="edit"
                      style={styles.editIcon}
                      size={20}
                      color={Colors.Text.black}
                      onPress={() => setOrgNameEnabled(true)}
                    />
                  </View>
                  <View style={styles.row}>
                    <InputComponent
                      disabled={false}
                      editable={uidEnable}
                      outlineColor={Colors.Generic.textInputBorder}
                      variant="outlined"
                      maxLength={Spacing.size10}
                      label={
                        <Text style={styles.fieldStyle}>{t('common:uid')}</Text>
                      }
                      value={uid}
                      onChangeText={e => handleValues('uid', e)}
                      error={uidError}
                      inputStyle={styles.input}
                      returnKeyType="done"
                    />
                    <IconTag
                      name="edit"
                      style={styles.editIcon}
                      size={20}
                      color={Colors.Text.black}
                      onPress={() => setUidEnable(true)}
                    />
                  </View>
                  <View style={styles.row}>
                    <InputComponent
                      disabled={false}
                      editable={establishedYearEnable}
                      outlineColor={Colors.Generic.textInputBorder}
                      variant="outlined"
                      maxLength={Spacing.size10}
                      label={
                        <Text style={styles.fieldStyle}>
                          {t('common:establishedYear')}
                        </Text>
                      }
                      value={establishedYear}
                      onChangeText={e => handleValues('establishedYear', e)}
                      error={establishedYearError}
                      inputStyle={styles.input}
                      returnKeyType="done"
                    />
                    <IconTag
                      name="edit"
                      style={styles.editIcon}
                      size={20}
                      color={Colors.Text.black}
                      onPress={() => setEstablishedYearEnable(true)}
                    />
                  </View>
                  <View style={styles.row}>
                    <InputComponent
                      disabled={false}
                      editable={aboutEnable}
                      outlineColor={Colors.Generic.textInputBorder}
                      variant="outlined"
                      maxLength={Spacing.size50}
                      value={additionalDetails}
                      onChangeText={e => handleValues('additionalDetails', e)}
                      error={aboutError}
                      label={
                        <Text style={styles.fieldStyle}>
                          {t('common:additionalDetails')}
                        </Text>
                      }
                      inputStyle={styles.input}
                      returnKeyType="done"
                    />
                    <IconTag
                      name="edit"
                      style={styles.editIcon}
                      size={20}
                      color={Colors.Text.black}
                      onPress={() => setAboutEnable(true)}
                    />
                  </View>
                  <View style={styles.row}>
                    <TextInput
                      placeholder={t('common:about')}
                      value={about}
                      onChangeText={e => handleValues('about', e)}
                      disabled={false}
                      editable={additionalDetailsEnable}
                      numberOfLines={10}
                      maxLength={400}
                      multiline
                      style={styles.description1}
                      placeholderTextColor={Colors.Text.gray}
                    />
                    <IconTag
                      name="edit"
                      style={styles.editIcon1}
                      size={20}
                      color={Colors.Text.black}
                      onPress={() => setAdditionalDetailsEnable(true)}
                    />
                  </View>
                </>
              )}
              <View style={styles.spacer}>
                <MobileText
                  phoneNumber={profileSuccess?.phoneNumber?.slice(3)}
                />
              </View>
              <InputComponent
                disabled={true}
                outlineColor={Colors.Generic.textInputBorder}
                variant="outlined"
                maxLength={Spacing.size10}
                label={
                  <Text style={styles.fieldStyle}>
                    {t('common:emailIdTitle')}
                  </Text>
                }
                value={profileSuccess?.email}
                inputStyle={[styles.backgroundWhite, styles.marginTop]}
                returnKeyType="done"
              />
              <View style={styles.spacer} />
              <CustomButton
                title={t('common:saveChanges')}
                onPress={onSaveChanges}
                isDisable={false}
                buttonStyle={styles.btnView}
              />
              <CustomButton
                title={t('common:changePassword')}
                onPress={toggleChangePasswordModal}
                isDisable={false}
                buttonStyle={styles.btnView}
              />
              <CustomButton
                title={t('common:deleteAccount')}
                onPress={toggleDeleteClose}
                isDisable={false}
                buttonStyle={styles.btnView}
              />
              <Modal
                animationType="fade"
                transparent={true}
                visible={openDeleteModal}
                onRequestClose={toggleDeleteClose}>
                <View style={styles.center}>
                  <CustomPopup
                    title={t('common:delete')}
                    description={t('common:deleteDesc')}
                    closeModal={toggleDeleteClose}
                    isDelete={true}
                    type={'delete'}
                    yesClicked={deleteAccount}
                    noClicked={toggleDeleteClose}
                  />
                </View>
              </Modal>

              <Modal
                animationType="fade"
                transparent={true}
                visible={changePasswordModal}
                onRequestClose={toggleChangePasswordModal}>
                <View style={styles.center}>
                  <View style={styles.mainView1}>
                    <View style={styles.close}>
                      <Icon1
                        name="cross"
                        size={25}
                        onPress={toggleChangePasswordModal}
                        color={Colors.Button.primary}
                      />
                    </View>
                    {
                      <Text style={styles.mainTitle}>
                        {t('common:changePassword')}
                      </Text>
                    }
                    <View style={styles.rowIcon}>
                      <InputComponent
                        disabled={false}
                        outlineColor={Colors.Generic.textInputBorder}
                        variant="outlined"
                        maxLength={Spacing.size30}
                        label={
                          <Text style={styles.fieldStyle}>
                            {t('common:enterOldPassword')}
                          </Text>
                        }
                        value={password}
                        onChangeText={e => handleValues('password', e)}
                        //   error={passwordError}
                        errorStyle={styles.marginTop}
                        inputStyle={[
                          styles.backgroundWhite,
                          styles.marginTop,
                          styles.flexOne,
                        ]}
                        returnKeyType="done"
                        secureTextEntry={showPassword ? false : true}
                      />
                      <Icons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={Spacing.size22}
                        style={styles.eyeIcon}
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
                            {t('common:enterNewPassword')}
                          </Text>
                        }
                        value={newPassword}
                        onChangeText={e => handleValues('newPassword', e)}
                        //   error={passwordError}
                        errorStyle={styles.marginTop}
                        inputStyle={[
                          styles.backgroundWhite,
                          styles.marginTop,
                          styles.flexOne,
                        ]}
                        returnKeyType="done"
                        secureTextEntry={showNewShowPassword ? false : true}
                      />
                      <Icons
                        name={showNewShowPassword ? 'eye' : 'eye-off'}
                        size={Spacing.size22}
                        color={Colors.Text.black}
                        style={styles.eyeIcon}
                        onPress={() =>
                          setNewConfirmShowPassword(!showNewShowPassword)
                        }
                      />
                    </View>
                    {newPasswordError !== '' &&
                      newPasswordError !== undefined && (
                        <Text style={[styles.errorText]}>
                          {newPasswordError}
                        </Text>
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
                          </Text>
                        }
                        value={confirmPassword}
                        onChangeText={e => handleValues('confirmPassword', e)}
                        //   error={passwordError}
                        errorStyle={styles.marginTop}
                        inputStyle={[
                          styles.backgroundWhite,
                          styles.marginTop,
                          styles.flexOne,
                        ]}
                        returnKeyType="done"
                        secureTextEntry={showConfirmShowPassword ? false : true}
                      />
                      <Icons
                        name={showConfirmShowPassword ? 'eye' : 'eye-off'}
                        size={Spacing.size22}
                        style={styles.eyeIcon}
                        color={Colors.Text.black}
                        onPress={() =>
                          setShowConfirmShowPassword(!showConfirmShowPassword)
                        }
                      />
                    </View>
                    {confirmPasswordError !== '' &&
                      confirmPasswordError !== undefined && (
                        <Text style={[styles.errorText]}>
                          {confirmPasswordError}
                        </Text>
                      )}
                    <CustomButton
                      title={t('common:save')}
                      onPress={onPasswordChange}
                      isDisable={isDisable}
                      buttonStyle={styles.button}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
      )}
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
              <Text style={styles.cancelText} onPress={closeModal}>
                {t('common:cancelUploadLabel')}
              </Text>
            </View>
          </View>
        }
        modalizeRef={pickerRef}
        height={hp(30)}
      />
    </SafeAreaView>
  );
};

export default MyAccount;
