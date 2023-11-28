import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import style from './styles';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Spacing} from '../../style';
import Constants from 'constants/MySettings';
import Icons from 'react-native-vector-icons/FontAwesome';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import Icons1 from 'react-native-vector-icons/Feather';
import CustomPopup from '../../component/CustomPopup';
import * as RootNavigation from '../../navigation/rootNavigation';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import NotificationList from '../../component/NotificationList';
import images from 'assets/images';
import SVGIcon from '../../component/SVGIcon';
import icons from 'assets/icons';
import routes from 'routes';
import {useAuthContext} from 'context/use-auth-context';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {clearLogin} from 'routes/LoginScreen/slice';
import { removeItem } from 'hooks/use-async-storage';
import {keys} from 'constants/async-storage-keys';
import { callUpdateProfile, clearUpdateProfile, updateProfileInfo } from 'routes/MyAccount/slice/updateProfile';
import { clearProfile, getProfileInfo } from 'routes/MyAccount/slice';
import { clearGetHistoryByNgoId } from 'routes/History/slice/getHistoryByNgoId';
import { clearGetHistoryByOrder } from 'routes/History/slice/getHistoryByOrder';
import { clearGetHistoryByUserId } from 'routes/History/slice/getHistoryByUserId';
import { clearGetRequests } from 'routes/Dashboard/slice/GetRequests';
import { clearGetDonation } from 'routes/Dashboard/slice/GetDonations';
import { clearAddAddress } from 'routes/Maps/slice/addAddress';
import { clearGetAddressById } from 'routes/Dashboard/slice/GetAddressById';
import { clearGetAddresss } from 'routes/AddAddress/slice/getAddresses';
import { clearGetAddressesByLatLong } from 'routes/AddAddress/slice/getAddressBtLatLong';
import { useNotificationContext } from 'context/app-notification-context';

const MySetting = () => {
  const {t} = useTranslation();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['89%', '89%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const {authData} = useAuthContext();

  const {isProfileLoading, profileSuccess, profileError} = useAppSelector(getProfileInfo);

  const onSaveChanges = () => {
    var formDataPayload = new FormData();
    formDataPayload.append('token', null);
    formDataPayload.append('device', null);
    let payload = {
        id: authData?.userId,
        jwt: authData?.jwt,
        data: formDataPayload,
      };
    dispatch(callUpdateProfile(payload));
  }
  const {notificationData,updateNotificationData} = useNotificationContext();

  const logOutAction = () =>{
    dispatch(clearLogin());
    const userDetails = {
      jwt: undefined,
      userId: undefined,
      roleName: undefined,
    };
    updateAuthData(userDetails);

    removeItem(keys.userLoginData);

    const notificationDatas = [{
      title: undefined,
      message: undefined,
      endpoint: undefined,
      read: undefined
    }];
    updateNotificationData(notificationDatas);
    removeItem(keys.userNotificationData);
    dispatch(clearUpdateProfile());
    dispatch(clearProfile());
    dispatch(clearGetHistoryByNgoId());
    dispatch(clearGetHistoryByOrder());
    dispatch(clearGetHistoryByUserId());
    dispatch(clearGetRequests());
    dispatch(clearGetDonation());
    dispatch(clearAddAddress());
    dispatch(clearGetAddressById());
    dispatch(clearGetAddresss());
    dispatch(clearGetAddressesByLatLong());
    dispatch(clearGetAddressesByLatLong());
    toggleModal();  
  }

  const {isUpdateLoading, updateProfileSuccess,updateProfileError} = useAppSelector(updateProfileInfo);

  useEffect(() => {
    if(updateProfileSuccess && updateProfileSuccess?.email){
        // logOutAction();
    }
    if(updateProfileError && updateProfileError?.error){
      Alert.alert('Something went wrong!');
    }

  }, [updateProfileSuccess,updateProfileError])
  

  const handleSheetChanges = () => {};
  const toggleModal = () => {
    setOpenLogoutModal(!openLogoutModal);
  };
  const {updateAuthData} = useAuthContext();
  const dispatch = useAppDispatch();

  const logOut = useCallback(() => {
    onSaveChanges();
    logOutAction();
  }, [updateAuthData, openLogoutModal]);

  const renderItem = useCallback((item: any) => {
    return (
      <Pressable
        onPress={() => {
          switch (item?.item?.navigate) {
            case 'Notification':
              handlePresentModalPress();
              break;
            case 'LogOut':
              toggleModal();
              break;
            default:
              RootNavigation.navigate(item?.item?.navigate);
          }
        }}
        style={style.yellowView}>
        <View style={style.rowStyle}>
          <View style={[style.rowStyle, {flex: 1}]}>
            {item?.item?.title === 'Logout' ? (
              <VectorIcon
                name={item?.item?.icon}
                size={Spacing.size28}
                style={style.vectorIcon}
                color={Colors.Text.black}
              />
            ) : (
              <Icons
                name={item?.item?.icon}
                size={Spacing.size28}
                style={style.vectorIcon}
                color={Colors.Text.black}
              />
            )}
            <Text style={style.mainText1}>{item?.item?.title}</Text>
          </View>

          <SVGIcon icon={icons.longArrow} style={style.vectorIcon} />
        </View>
        <Text style={style.desc}>{item?.item?.description}</Text>
      </Pressable>
    );
  }, []);

  return (
    <SafeAreaView style={style.maincontainer}>
      <StatusBar
        backgroundColor={Colors.Generic.statusBar}
        barStyle={'dark-content'}
      />

      {
      isUpdateLoading ?(
          <ActivityIndicator
                size={'large'}
                color={Colors.Button.primary}
                style={style.loader}
            />):( <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <View style={style.row}>
            <Icon
              name="md-settings"
              size={Spacing.size30}
              style={style.settingIcon}
              color={Colors.Text.black}
            />
            <Text style={style.mainText}>{t('common:mySettings')}</Text>
          </View>
          <Text style={style.desc}>{t('common:mySettingDescription')}</Text>
          <View style={style.marginTop50}>
            <FlatList data={Constants.mySettings} renderItem={renderItem} />
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            enablePanDownToClose
            backgroundStyle={style.backgroundNotification}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View style={style.contentContainer}>
                  <Text style={style.notification}>Notification's</Text>

                  <FlatList
                    data={notificationData?.filter((e:any)=>e.read === false && e.title !=='')}
                    style={style.scrollNotification}
                    renderItem={({item}) => (
                        <NotificationList
                          icon={images.greenTik}
                          title={item.title}
                          press={()=>
                            {
                              console.log(item.endpoint);
                            }
                          }
                          subTitle={item.message}
                        />
                      )}
                    />

                </View>
          </BottomSheetModal>
        </View>
      </ScrollView>)}


      <Modal
        animationType="fade"
        transparent={true}
        visible={openLogoutModal}
        onRequestClose={toggleModal}>
        <View style={style.center}>
          <CustomPopup
            title={t('common:logout')}
            description={t('common:logoutDesc')}
            closeModal={toggleModal}
            isDelete={true}
            type={'logout'}
            yesClicked={logOut}
            noClicked={toggleModal}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MySetting;
