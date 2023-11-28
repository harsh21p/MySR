import styles from './styles';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Pressable,
  Platform,
  PermissionsAndroid,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../style';
import images from '../../assets/images';
import SVGIcon from '../../component/SVGIcon';
import icons from '../../assets/icons';
import {AddressItem} from '../../component/AddressItem';
import {BackButton} from '../../component/BackButton';
import * as RootNavigation from 'navigation/rootNavigation';
import routes from 'routes';
import {useAuthContext} from 'context/use-auth-context';
import Geolocation from '@react-native-community/geolocation';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {callGetAddresses, getAddressInfo} from './slice/getAddresses';
import { DropDownPickupLocation } from '../../component/DropDownPickupLocation';
import { callGetAddressesByLatLong, clearGetAddressesByLatLong, getAddressesByLatLongInfo } from './slice/getAddressBtLatLong';
import { callGetProfile, clearProfile, getProfileInfo } from 'routes/MyAccount/slice';
import { callUpdateProfile, updateProfileInfo } from 'routes/MyAccount/slice/updateProfile';
import { useFocusEffect } from '@react-navigation/native';
const AddAddress = () => {

  const onGetAddressByLatLong = () => {
    const payload = {
      jwt:authData?.jwt,
      data:{
      latitude: currentLocation.lat,
      longitude: currentLocation.long,
    }
    };
    dispatch(callGetAddressesByLatLong(payload));
  };

  function updatePrimaryAddress(id:any){
    const payload = {
      id: authData.userId,
      jwt: authData.jwt,
      data: {
        primaryAddressId: id
      },
    };
    dispatch(callUpdateProfile(payload));
  }

  const onGetAddress = () => {
    const payload = {
      userId: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetAddresses(payload));
  };

  const {authData} = useAuthContext();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<
    [
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
    ]
  >();

  const {t} = useTranslation();

  const {getAddressSuccess} = useAppSelector(getAddressInfo);

  const [currentLocation, setCurrentLocation] = useState({
    lat: 0.0,
    long: 0.0,
  });
  const [locationStatus, setLocationStatus] = useState('');
  const [firstLane, setFirstLane] = useState<string>('');
  const [lastLane, setLastLane] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const {profileSuccess,isProfileLoading} = useAppSelector(getProfileInfo);
  const [storeId,setStroreId] = useState(profileSuccess?.primaryAddressId);
  const [selectedAddress,setSelectedAddress] = useState(profileSuccess?.primaryAddressId);
  const {getAddressesByLatLongSuccess,getAddressesByLatLongError,isAddressLoading} = useAppSelector(getAddressesByLatLongInfo);
  const {isUpdateLoading,updateProfileSuccess,updateProfileError} = useAppSelector(updateProfileInfo);
  
  let watchID: any;

  const getProfile = () =>{
    const payload = {
      userId: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetProfile(payload));
  }

  useEffect(() => {
    if (
      (getAddressesByLatLongSuccess && getAddressesByLatLongSuccess?.error) || getAddressesByLatLongError ) {
      Alert.alert('Error! Please try again');
    }   
    if (getAddressesByLatLongSuccess && getAddressesByLatLongSuccess?.data) {

        setFirstLane(getAddressesByLatLongSuccess?.data?.results[0]?.components?.road)
        setLastLane(getAddressesByLatLongSuccess?.data?.results[0]?.components?.neighbourhood)
        setCity(getAddressesByLatLongSuccess?.data?.results[0]?.components?.state_district)
        setCountry(getAddressesByLatLongSuccess?.data?.results[0]?.components.country)
        setZipCode(getAddressesByLatLongSuccess?.data?.results[0]?.components?.postcode)
        setState(getAddressesByLatLongSuccess?.data?.results[0]?.components?.state)
    }
  }, [getAddressesByLatLongSuccess, getAddressesByLatLongError]);

  useEffect(() => {
    if(currentLocation.lat !== 0.0 && currentLocation.long !== 0.0){
      onGetAddressByLatLong();
    }
  }, [currentLocation])

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();

    if(getAddressSuccess === undefined && isAddressLoading === false){
      onGetAddress();
    }

    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);


  useEffect(() => {
    if(selectedAddress !== profileSuccess?.primaryAddressId){
      setStroreId(profileSuccess?.primaryAddressId);
      updatePrimaryAddress(selectedAddress);
      dispatch(clearProfile());
    }
  }, [selectedAddress])
  
  useEffect(() => {
    if(profileSuccess === undefined){
      getProfile();
    }
    if(profileSuccess){
      setSelectedAddress(profileSuccess?.primaryAddressId);
    }
  }, [profileSuccess])

  useEffect(() => {
    if(updateProfileSuccess){
      setStroreId(selectedAddress);
    }
    if(updateProfileError){
      setSelectedAddress(storeId);
    }
  }, [updateProfileSuccess,updateProfileError])
  
  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        setCurrentLocation({
          lat: parseFloat(currentLatitude),
          long: parseFloat(currentLongitude)
         })
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        
       setCurrentLocation({
        lat: parseFloat(currentLatitude),
        long: parseFloat(currentLongitude)
       })

      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    if (getAddressSuccess && getAddressSuccess?.data) {
      setData(getAddressSuccess?.data);
    } 
  }, [getAddressSuccess]);

  useEffect(() => {
    if(data?.length > 0 && (profileSuccess?.primaryAddressId === undefined || profileSuccess?.primaryAddressId === null || profileSuccess?.primaryAddressId === 'null' || profileSuccess?.primaryAddressId === ' ' || profileSuccess?.primaryAddressId === '')){
      updatePrimaryAddress(data[0]?.id)
    }
  }, [data])

  return (
    <>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.mainBody}>
        <StatusBar
          backgroundColor={Colors.Generic.statusBar}
          barStyle={'dark-content'}
        />
        <View style={styles.backButton}>
          <Pressable onPress={() => 
            {
              RootNavigation.navigate(routes.TabBar)}}>
            <BackButton isTitle={true} title={'Address'} />
          </Pressable>
        </View>
    
        {isUpdateLoading || isProfileLoading ?( <ActivityIndicator
                    size={'large'}
                    color={Colors.Button.primary}
                    style={styles.loader}
                  />):
       ( <ScrollView showsVerticalScrollIndicator={false}>
           
             <View style={{width:'80%',alignSelf:'center',paddingBottom:10}}>
              <Text style={styles.addAddressName}>Primary Address</Text>
             
              <DropDownPickupLocation
                addressId={selectedAddress}
                onSelectedAddress={setSelectedAddress}
                setLat={()=>{}}
                setLong={()=>{}}
                type={true}
              />
            </View>
          <View style={styles.scroll}>
           
          
            <View style={styles.mainContainer}>
           
            {  getAddressesByLatLongSuccess === undefined || country === undefined  ||  country === ''?(
                 <ActivityIndicator
                    size={'small'}
                    color={Colors.Button.primary}
                    
                  />
            ):( 
              <AddressItem
                title={t('common:currentLocation')}
                subTitle={firstLane+", "+lastLane+", "+city+", "+state+", "+zipCode+", "+country}
                icon={'my-location'}
              />
               )
            } 
              <View style={styles.lineHelper}>
                <View style={styles.line} />
              </View>
              <Pressable
                onPress={() => RootNavigation.navigate(routes.Maps,{current:currentLocation})}
                style={styles.addAddress}>
                <Image source={images.plus} style={styles.plusIcon} />
                <Text style={styles.addAddressName}>Add Address</Text>
                <SVGIcon icon={icons.arrow} style={styles.arrow} />
              </Pressable>
              <View style={styles.lineHelper}>
                <View style={styles.line} />
              </View>
              {data?.length ?
                <>
                  <Text style={styles.addAddressName}>Saved Address</Text>
                  <View style={styles.spacer} />
                  <FlatList
                    data={data}
                    style={styles.flex}
                    renderItem={({item}) => (
                      <Pressable
                        onPress={() =>
                          RootNavigation.navigate(routes.Maps, {data: item,current:currentLocation})
                        }>
                        <AddressItem
                          title={item.type}
                          subTitle={
                            item.firstLine +
                            ', ' +
                            item.lastLine +
                            ', ' +
                            item.country +
                            ', ' +
                            item.state +
                            ', ' +
                            item.zipCode
                          }
                          icon={item.type === 'Home' ? 'home' : item.type === 'Office' ? 'location-city' : item.type.toLowerCase() }
                        />
                      </Pressable>
                    )}
                    showsVerticalScrollIndicator={false}
                  />

                  {/* <View style={styles.lineHelper}>
                    <View style={styles.line} />
                  </View> */}
                </>:<></>}

              {/* <Text style={styles.addAddressName}>Nearby Address</Text>
              <View style={styles.spacer} />
              <AddressItem
                title={'Westside County'}
                subTitle={t('common:currentLocationAddress')}
                icon={'not-listed-location'}
              />
              <AddressItem
                title={'Westside County'}
                subTitle={t('common:currentLocationAddress')}
                icon={'not-listed-location'}
              /> */}
            </View>
          </View>
        </ScrollView>)
      }

      </SafeAreaView>
    </>
  );
};

export default AddAddress;

