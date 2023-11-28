import styles from './styles';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Pressable,
  Platform,
  Modal,Image, FlatList
} from 'react-native';

import { NativeModules } from 'react-native';
import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {HeaderSearch} from '../../component/HeaderSearch';
import Switch from '../../component/Switch';
import {Colors} from '../../style';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import NotificationList from '../../component/NotificationList';
import images from 'assets/images';
import Feed from '../../component/Feed';
import {DonationForm} from '../../component/DonationForm';
import * as RootNavigation from 'navigation/rootNavigation';
import routes from 'routes';
import Requests from '../../component/Requests';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useAuthContext} from 'context/use-auth-context';
import {nearByNgoInfo} from './slice/NearByNGO';
import {callNearByNgo} from './slice/NearByNGO';
import {callGetRequests, getRequestsInfo} from './slice/GetRequests';
import { updateRequestInfo } from './slice/UpdateRequest';
import SearchDropdown from '../../component/SearchDropdown';
import { callNearByVolunteers, nearByVolunteerInfo } from './slice/NearByVolunteers';
import { callGetAddressById, getAddressByIdInfo } from './slice/GetAddressById';
import { callGetProfile, getProfileInfo } from 'routes/MyAccount/slice';
import { callGetAddresses, getAddressInfo } from 'routes/AddAddress/slice/getAddresses';
import { callUpdateProfile, clearUpdateProfile, updateProfileInfo } from 'routes/MyAccount/slice/updateProfile';
import messaging from '@react-native-firebase/messaging';
import { callSendNotificationByUserId, sendNotificationByUserIdInfo } from './slice/sendNotificationByUserId';
import { callSendNotificationByNgoId, sendNotificationByNgoIdInfo } from './slice/sendNotificationByNgoId';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useNotificationContext } from 'context/app-notification-context';


const Dashboard = () => {

  const [token,setToken] = useState<string>();
  const [device,setDevice]= useState<string>();

const getFCMToken = async () => {
  try {
    const tempToken = await messaging().getToken();
      if( profileSuccess?.token !== tempToken ){
        setDevice(
          // profileSuccess?.device
          //  +","+
           Platform.OS
          );
        setToken(
          // profileSuccess?.token
          // +","+
          tempToken
          );
      }else{
        setToken(tempToken);
        setDevice(Platform.OS);
      }
      if(token !== undefined && token !== null && profileSuccess?.token !== tempToken){
        onSaveChanges();
      }
  } catch (error) {
    console.log('Error retrieving FCM token:', error);
  }
};

  function getNearByNgo(radius: string, long: string, lat: string) {
    const payload = {
      jwt: authData?.jwt,
      radius: radius,
      long: long,
      lat: lat,
    };
    dispatch(callNearByNgo(payload));
  }

  function getAddressById(id:any){
    const payload = {
      id: id,
      jwt: authData?.jwt
    };
    dispatch(callGetAddressById(payload));
  }

  const getProfile = () =>{
    const payload = {
      userId: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetProfile(payload));
  }

  function getObject(){
    NativeModules.PushNotificationModule.requestPushNotificationSubscription()
    .then((subscription:any) => {
      const { endpoint, keys } = subscription;
      console.log("endpoint : ",endpoint,"Key : ",keys)
    })
    .catch((error:any) => {
      console.error('Error requesting push notification subscription:', error);
    });
  }

  function getNearByVolunteers(radius: string, long: string, lat: string) {
    const payload = {
      jwt: authData?.jwt,
      radius: radius,
      long: long,
      lat: lat,
    };
    dispatch(callNearByVolunteers(payload));
  }

  function getRequests() {
    const payload = {
      id: authData?.userId,
    };
    dispatch(callGetRequests(payload));
  }

  const onGetAddress = () => {
    const payload = {
      userId: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetAddresses(payload));
  };

  const [search,setSearch] = useState('');
  const [lat,setLat] = useState();
  const [long,setLong] = useState();
  const [dataAddress,setDataAddress] = useState();
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['89%', '89%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const {t} = useTranslation();
  const [type, setType] = useState(true);
  const dispatch = useAppDispatch();
  const {authData} = useAuthContext();

  const {isNearByNGOsLoading, nearByNGOsSuccess} =
    useAppSelector(nearByNgoInfo);
  const {isGetRequestsLoading, getRequestsSuccess, getRequestsError} =
    useAppSelector(getRequestsInfo);
  const {isNearByVolunteersLoading, nearByVolunteersSuccess, nearByVolunteersError} = useAppSelector(nearByVolunteerInfo);
  const {isProfileLoading, profileSuccess, profileError} = useAppSelector(getProfileInfo);
  const {isAddressByIdLoading, getAddressByIdSuccess, getAddressByIdError} = useAppSelector(getAddressByIdInfo);
  const {isAddressLoading, getAddressSuccess} = useAppSelector(getAddressInfo);
  const {isSendNotificationByUserIdLoading, sendNotificationByUserIdSuccess,sendNotificationByUserIdError} = useAppSelector(sendNotificationByUserIdInfo);
  const {isSendNotificationByNgoIdLoading, sendNotificationByNgoIdError,sendNotificationByNgoIdSuccess} = useAppSelector(sendNotificationByNgoIdInfo);

  function sendNotificationByUserId(userId:string,title:string,body:string) {
    const payload = {
      jwt: authData?.jwt,
      data:{
          userId : userId,
          title : title,
          body : body
      }
    };
    dispatch(callSendNotificationByUserId(payload));
  }

  function sendNotificationByNgoId(ngoId:string,title:string,body:string) {
    const payload = {
      jwt: authData?.jwt,
      data:{
        ngoId : ngoId,
          title : title,
          body : body
      }
    };
    dispatch(callSendNotificationByNgoId(payload));
  }
  
  useEffect(() => {
    if(sendNotificationByNgoIdSuccess){
      // Alert.alert('send');
    }
    if(sendNotificationByNgoIdError){
      // Alert.alert('error');

    }
  }, [sendNotificationByNgoIdSuccess,sendNotificationByNgoIdError])
  

  useEffect(() => {
    if(sendNotificationByUserIdSuccess){
      // Alert.alert('error');
    }
    if(sendNotificationByUserIdError){
      // Alert.alert('error');
    }
  }, [sendNotificationByUserIdSuccess,sendNotificationByUserIdError])
  
  const onSaveChanges = () => {
    let payload;
    var formDataPayload = new FormData();

      formDataPayload.append('token', token);
      formDataPayload.append('device', device);
      payload = {
        id: authData?.userId,
        jwt: authData?.jwt,
        data: formDataPayload,
      };
    dispatch(callUpdateProfile(payload));
  };
  

  useEffect(() => {
    if(profileSuccess === undefined && isProfileLoading === false){
      getProfile();
    }
    if (nearByNGOsSuccess === undefined && isNearByNGOsLoading === false && authData?.roleName !== 'NGO') {
      getNearByNgo('10', '78.388088', '17.435562');
    }
    if (nearByVolunteersSuccess === undefined && isNearByVolunteersLoading === false && authData?.roleName === 'NGO') {
      getNearByVolunteers('10', '78.388088', '17.435562');
    }
    if (getRequestsSuccess === undefined && isGetRequestsLoading === false) {
      getRequests();
    }
    if(getAddressSuccess === undefined && isAddressLoading === false){
      onGetAddress();
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
       getProfile();
    }, [])
  );

  useEffect(() => {
      getFCMToken();

    if(profileSuccess){
      if(profileSuccess.primaryAddressId === null || profileSuccess.primaryAddressId === undefined || profileSuccess?.primaryAddressId === ' '){
        setOpenAddressModal(true);
      }else{
        setOpenAddressModal(false);
        getAddressById(profileSuccess?.primaryAddressId);
      }
    }
    if(profileError){
      Alert.alert("Error!");
    }
  }, [profileSuccess])

  useEffect(() => {
    if(getAddressByIdSuccess && getAddressByIdSuccess?.data){
      if(getAddressByIdSuccess.data.length > 0){
        setLat(getAddressByIdSuccess?.data[0]?.latitude);
        setLong(getAddressByIdSuccess?.data[0]?.longitude);
        setDataAddress(getAddressByIdSuccess?.data[0]);
      }
    }
  }, [getAddressByIdSuccess])
  
  const {updateRequestSuccess,isUpdateRequestLoading} = useAppSelector(updateRequestInfo);
  
  useEffect(() => {
    if (updateRequestSuccess?.message !== undefined) {
      getRequests();
    }
  }, [updateRequestSuccess])

  const {isUpdateLoading, updateProfileSuccess,updateProfileError} = useAppSelector(updateProfileInfo);

  useEffect(() => {
    if(updateProfileSuccess && updateProfileSuccess?.email){
      dispatch(clearUpdateProfile());
    }
    if(updateProfileError && updateProfileError?.error){
      // Alert.alert('Something went wrong!');
    }

  }, [updateProfileSuccess,updateProfileError])
  
  const {notificationData,updateNotificationData} = useNotificationContext();

  return (
    <>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.mainBody}>
        <StatusBar
          backgroundColor={Colors.Generic.statusBar}
          barStyle={'dark-content'}
        />

   { isProfileLoading || profileSuccess === undefined ?(     
            <ActivityIndicator
                size={'large'}
                color={Colors.Button.primary}
                style={styles.loader}
            />):(  
            <>
              <HeaderSearch
                address={dataAddress}
                setSearch={setSearch}
                search={search}
                isLoading={isAddressByIdLoading}
                onPress={() => RootNavigation.navigate(routes.AddAddress)}
                onPressNotification={handlePresentModalPress}
              />

              <View style={styles.mainHolder1}>
                <View style={styles.mainHolder}>
                  <Switch
                    titleFirst={'Feed'}
                    titleSecond={authData?.roleName === 'NGO'? `Request's`:'Donate Now'}
                    setType={setType}
                    type={type}
                  />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                {type === false ? (
                  authData?.roleName === 'NGO' ? (
                    isGetRequestsLoading || getRequestsSuccess === undefined || isUpdateRequestLoading ?
                     (   <ActivityIndicator
                          size={'large'}
                          color={Colors.Button.primary}
                          style={styles.loader}
                        />)
                      : 
                        (<Requests data={getRequestsSuccess?.data?.filter(e => e?.donation?.status === 'pending')} />)
                  ) : (
                    (
                      <DonationForm
                        latPrimary={lat}
                        longPrimary={long}
                      />
                    )
                  )
                ) : (authData?.roleName === 'NGO' ? isNearByVolunteersLoading : isNearByNGOsLoading) || isNearByNGOsLoading ? (
                  <ActivityIndicator
                    size={'large'}
                    color={Colors.Button.primary}
                    style={styles.loader}
                  />
                ) : (
                  <Feed dataNearby={ authData?.roleName === 'NGO' ? nearByVolunteersSuccess?.data : nearByNGOsSuccess?.data} type={authData?.roleName === 'NGO'? 1 : 2} />
                )}
                </ScrollView>
                <SearchDropdown dataNearby={authData?.roleName === 'NGO' ? nearByVolunteersSuccess?.data : nearByNGOsSuccess?.data} search={search} setSearch={setSearch} ngo={authData?.roleName === 'NGO'}/>
              </View>

              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                enablePanDownToClose
                backgroundStyle={styles.backgroundNotification}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <View style={styles.contentContainer}>
                  <Text style={styles.notification}>Notification's</Text>

                  <FlatList
                    data={
                      notificationData?.filter((e:any)=>e.read === false && e.title !=='')
                    }
                    style={styles.scrollNotification}
                    renderItem={({item,index}) => (
                        <NotificationList
                          icon={images.greenTik}
                          title={item.title}
                          press={()=>
                            {
                              let temp = []
                              console.log(item.endpoint);
                              notificationData?.filter((e:any,i)=>{
                                if(e===item)
                                { 
                                  temp.push({
                                    ...e,read:true
                                  })
                                }else{
                                  temp.push(e)
                                }
                              })
                              updateNotificationData(temp);
                            
                            }
                            }
                          
                          subTitle={item.message}
                        />
                      )}
                    />

                </View>
              </BottomSheetModal>
              
              <Modal
                  animationType="fade"
                  transparent={true}
                  visible={openAddressModal}>
                    <View style={styles.center}>
                      <View style={styles.mainView}>
                          <Image resizeMode='contain' source={images.locationIcon} style={styles.iconView} />
                          <Text style={styles.mainTitle}>Add Address</Text>
                          <Text style={styles.desc}>It seems you did not enter your address. Please click on "ok" to get to the add address screen.</Text>
                          <Pressable style={styles.btnView} onPress={()=>{
                              setOpenAddressModal(false);
                              RootNavigation.navigate(routes.AddAddress)
                          }}>
                            <Text style={styles.text}>Ok</Text>
                          </Pressable>  
                        </View>
                    </View>

              </Modal>
            </>
      )}

      </SafeAreaView>
    </>
  );
};

export default Dashboard;
