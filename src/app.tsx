import {Alert, Platform, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import './constants/translations/IMLocalize';
import SignUpDataProvider from 'context/sign-up-context';
import EnvironmentProvider from 'context/use-environment';
import AppNavigator from 'navigation';
import AppNetInfo from './context/app-net-info';
import { useAuthContext } from 'context/use-auth-context';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import app from './firebase/firebase_config'
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { callGetDonation, getDonationInfo } from 'routes/Dashboard/slice/GetDonations';
import { callGetHistoryByNgoId } from 'routes/History/slice/getHistoryByNgoId';
import { callGetHistoryByUserId } from 'routes/History/slice/getHistoryByUserId';
import { callGetRequests } from 'routes/Dashboard/slice/GetRequests';
import RNAsyncStorageFlipper from 'rn-async-storage-flipper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotificationContext } from 'context/app-notification-context';

const App = gestureHandlerRootHOC(() => {
  const dispatch = useAppDispatch();
  const {authData} = useAuthContext();
  const {notificationData,updateNotificationData} = useNotificationContext();

  const {
    getDonationSuccess
   } = useAppSelector(getDonationInfo);
   
   const getHistoryForUser = () => {
    const payload = {
      id: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetHistoryByUserId(payload));
  };

   useEffect(() => {
    if(getDonationSuccess){
      getHistoryForUser();
    }
   }, [getDonationSuccess])
   
  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      sendNotification(notification.title,notification.message);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
      if(authData?.roleName === 'NGO'){
        dispatch(callGetRequests({id:authData?.userId}));
      }else{
        dispatch(callGetDonation({id:authData?.userId}));
      }

      if(authData?.roleName === 'NGO'){
        dispatch(callGetHistoryByNgoId({id:authData?.userId,jwt:authData?.jwt}));
      }
      let temp = [];
      notificationData?.map((e:any)=>{
        if(e.title !== '' && e.title !== undefined){
          temp.push(e)
        }
      })
      const payload = {
        title: notification.title,
        message: notification.message,
        endpoint: '',
        read: false
      };
      temp.push(payload)
      console.log(temp);
      updateNotificationData(temp);
      console.log(notificationData);
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
    senderID: '1012092516256',
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
  

  function sendNotification(title,subtitle){
    if(Platform.OS==='ios'){
      PushNotificationIOS.presentLocalNotification({
        alertTitle: title,
        alertBody: subtitle,
        applicationIconBadgeNumber: 1,
      });
    }else{
      PushNotification.localNotification({
        channelId: 'cha1',
        title: title,
        message: subtitle,
      });
    }
  }


  useEffect(() => {
    RNAsyncStorageFlipper(AsyncStorage);
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      check();
      const timer = setTimeout(() => {
        SplashScreen.hide();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

function check() {
    PushNotification.createChannel(
      {
        channelId: 'cha1',
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created:any) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      
        <SignUpDataProvider>
          <AppNetInfo>
            <EnvironmentProvider>
              <AppNavigator />
            </EnvironmentProvider>
          </AppNetInfo>
        </SignUpDataProvider>
   
    </>
  );
});

export default App;
