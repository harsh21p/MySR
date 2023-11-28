/* eslint-disable react/react-in-jsx-scope */
import styles from './styles';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  Image,
  Pressable,
  Modal,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../style';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {AddressItem} from '../../component/AddressItem';
import images from 'assets/images';
import routes from 'routes';
import * as RootNavigation from 'navigation/rootNavigation';
import {BackButton} from '../../component/BackButton';
import CustomPopupAddAddress from '../../component/CustomPopupAddAddress';
import {useAuthContext} from 'context/use-auth-context';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  addAddressInfo,
  callAddAddress,
  clearAddAddress,
} from './slice/addAddress';
import {
  callDeleteAddress,
  clearDeleteAddress,
  deleteAddressInfo,
} from './slice/deleteAddress';

import {
  callUpdateAddress,
  updateAddressInfo,
  updateAddressClear,
} from 'routes/AddAddress/slice/updateAddress';
import {
  callGetAddresses,
  clearGetAddresss,
} from 'routes/AddAddress/slice/getAddresses';
import {
  callGetAddressesByLatLong,
  getAddressesByLatLongInfo,
} from 'routes/AddAddress/slice/getAddressBtLatLong';
import {
  callGetLatLongByAddress,
  getLatLongByAddressInfo,
} from 'routes/AddAddress/slice/getLatLongByAddress';
import {
  callUpdateProfile,
  updateProfileInfo,
  clearUpdateProfile,
} from 'routes/MyAccount/slice/updateProfile';
import {
  callGetProfile,
  getProfileInfo,
  clearProfile,
} from 'routes/MyAccount/slice';
import {clearGetAddressById} from 'routes/Dashboard/slice/GetAddressById';

const Maps = (prop: any) => {
  const getProfile = () => {
    const payload = {
      userId: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetProfile(payload));
  };

  const screenData = prop.route.params;

  const {updateAddressSuccess, updateAddressError, isUpdateLoading} =
    useAppSelector(updateAddressInfo);
  const {updateProfileSuccess} = useAppSelector(updateProfileInfo);
  const {getAddressesByLatLongSuccess, isAddressLoading} = useAppSelector(
    getAddressesByLatLongInfo,
  );
  const {profileSuccess, isProfileLoading} = useAppSelector(getProfileInfo);
  const {isAddAddressLoading, addAddressSuccess, addAddressError} =
    useAppSelector(addAddressInfo);
  const {isDeleteAddressLoading, deleteAddressSuccess, deleteAddressError} =
    useAppSelector(deleteAddressInfo);
  const {getLatLongByAddressSuccess, getLatLongByAddressError} = useAppSelector(
    getLatLongByAddressInfo,
  );

  const {t} = useTranslation();
  const {authData} = useAuthContext();
  const dispatch = useAppDispatch();

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const toggleModal = () => {
    setOpenAddAddressModal(!openAddAddressModal);
  };

  const [region, setRegion] = useState({
    latitude: screenData?.current?.lat,
    longitude: screenData?.current?.long,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selected, setSelected] = useState(true);
  const [height, setHeight] = useState(
    Platform.OS === 'android' ? '40%' : '45%',
  );

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
  const [firstLane, setFirstLane] = useState<string>(
    screenData?.data && screenData?.data.firstLine,
  );
  const [lastLane, setLastLane] = useState<string>(
    screenData?.data && screenData?.data.lastLine,
  );
  const [city, setCity] = useState<string>(
    screenData?.data && screenData?.data.city,
  );
  const [state, setState] = useState<string>(
    screenData?.data && screenData?.data.state,
  );
  const [zipCode, setZipCode] = useState<string>(
    screenData?.data && screenData?.data.zipCode,
  );
  const [country, setCountry] = useState<string>(
    screenData?.data && screenData?.data.country,
  );
  const [addressType, setAddressType] = useState<string>(
    screenData?.data && screenData?.data.type,
  );

  const [currentAddress, setCurrentAddress] = useState<any>({
    firstLine: firstLane,
    lastLine: lastLane,
    city: city,
    state: state,
    zipCode: zipCode,
    country: country,
    type: addressType,
  });

  const [currentAddressLocation, setCurrentAddressLocation] = useState<any>({
    firstLine: firstLane,
    lastLine: lastLane,
    city: city,
    state: state,
    zipCode: zipCode,
    country: country,
    type: addressType,
  });

  const onGetLatLongByAddress = () => {
    const payload = {
      userId: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetLatLongByAddress(payload));
  };

  const onUpdateAddress = () => {
    const payload: any = {
      id: screenData?.data?.id,
      jwt: authData?.jwt,
      data: {
        firstLine: firstLane,
        lastLine: lastLane,
        city: city,
        state: state,
        country: country,
        zipCode: zipCode,
        type: addressType,
      },
    };
    dispatch(callUpdateAddress(payload));
  };

  const updatePrimaryAddress = (id: any) => {
    const payload: any = {
      id: authData.userId,
      jwt: authData.jwt,
      data: {
        primaryAddressId: id,
      },
    };
    dispatch(callUpdateProfile(payload));
  };

  const onGetAddressByLatLong = () => {
    const payload: any = {
      jwt: authData?.jwt,
      data: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    };
    dispatch(callGetAddressesByLatLong(payload));
  };

  const getAddress = () => {
    const payload = {
      userId: authData?.userId,
      jwt: authData?.jwt,
    };
    dispatch(callGetAddresses(payload));
  };

  const addAddressFunction = () => {
    const payload: any = {
      firstLine: firstLane,
      lastLine: lastLane,
      city: city,
      state: state,
      zipCode: zipCode,
      country: country,
      type: addressType,
      userId: authData?.userId,
    };
    dispatch(callAddAddress(payload));
  };

  const deleteAddressFunction = () => {
    if (screenData?.data?.id != profileSuccess?.primaryAddressId) {
      const payload = {
        addressId: screenData?.data?.id,
        jwt: authData?.jwt,
      };
      dispatch(callDeleteAddress(payload));
    } else {
      Alert.alert(
        'This is your primary address. You have to first modify your primary address in order to delete this address.'
      );
    }
  };

  const snapPoints = useMemo(
    () => [Platform.OS === 'android' ? '20%' : '30%', height],
    [height],
  );

  useEffect(() => {
    onGetAddressByLatLong();
  }, [region]);

  useEffect(() => {
    if (updateProfileSuccess) {
      getProfile();
    }
  }, [updateProfileSuccess]);

  useEffect(() => {}, [getLatLongByAddressSuccess, getLatLongByAddressError]);

  useEffect(() => {
    if (getAddressesByLatLongSuccess && getAddressesByLatLongSuccess?.data) {
      setFirstLane(
        getAddressesByLatLongSuccess?.data?.results[0]?.components?.road,
      );
      setLastLane(
        getAddressesByLatLongSuccess?.data?.results[0]?.components
          ?.neighbourhood,
      );
      setCity(getAddressesByLatLongSuccess?.data?.results[0]?.components?.city);
      setCountry(
        getAddressesByLatLongSuccess?.data?.results[0]?.components.country,
      );
      setZipCode(
        getAddressesByLatLongSuccess?.data?.results[0]?.components?.postcode,
      );
      setState(
        getAddressesByLatLongSuccess?.data?.results[0]?.components?.state,
      );

      setCurrentAddress({
        firstLine:
          getAddressesByLatLongSuccess?.data?.results[0]?.components?.road,
        lastLine:
          getAddressesByLatLongSuccess?.data?.results[0]?.components
            ?.neighbourhood,
        city: getAddressesByLatLongSuccess?.data?.results[0]?.components?.city,
        state:
          getAddressesByLatLongSuccess?.data?.results[0]?.components?.state,
        zipCode:
          getAddressesByLatLongSuccess?.data?.results[0]?.components?.postcode,
        country:
          getAddressesByLatLongSuccess?.data?.results[0]?.components.country,
      });

      if (
        region.latitude === screenData?.current.lat &&
        region.longitude === screenData?.current.long
      ) {
        setCurrentAddressLocation({
          firstLine: firstLane,
          lastLine: lastLane,
          city: city,
          state: state,
          zipCode: zipCode,
          country: country,
        });
      }
      // dispatch(clearGetAddressesByLatLong());
    }
  }, [getAddressesByLatLongSuccess]);

  useEffect(() => {
    if (addAddressSuccess && addAddressSuccess?.message) {
      dispatch(clearAddAddress());
      getAddress();
      toggleModal();
      if (
        profileSuccess?.primaryAddressId === undefined ||
        profileSuccess?.primaryAddressId === null ||
        profileSuccess?.primaryAddressId === ' '
      ) {
        dispatch(clearProfile());
        dispatch(clearUpdateProfile());
        dispatch(clearGetAddressById());
        dispatch(clearGetAddresss());
        updatePrimaryAddress(addAddressSuccess?.id);
      }
      Alert.alert('Address added successfully');
      RootNavigation.goBack();
    }
    if ((addAddressSuccess && addAddressSuccess?.error) || addAddressError) {
      Alert.alert('Error! Please try again');
      dispatch(clearAddAddress());
    }

    if (deleteAddressSuccess && deleteAddressSuccess?.message) {
      if (screenData?.data?.id === profileSuccess?.primaryAddressId) {
        updatePrimaryAddress(' ');
        dispatch(clearProfile());
        dispatch(clearUpdateProfile());
        dispatch(clearGetAddressById());
        dispatch(clearGetAddresss());
        toggleModal();
        RootNavigation.goBack();
      } else {
        RootNavigation.goBack();
        getAddress();
        toggleModal();
      }
      dispatch(clearDeleteAddress());

      Alert.alert('Address deleted successfully');
    }
    if (
      (deleteAddressSuccess && deleteAddressSuccess?.error) ||
      deleteAddressError
    ) {
      Alert.alert('Error! Please try again');
      dispatch(clearDeleteAddress());
    }
    if (updateAddressSuccess && updateAddressSuccess?.message) {
      dispatch(updateAddressClear());
      getAddress();
      toggleModal();
      RootNavigation.goBack();
      Alert.alert('Address updated successfully');
    }
    if (
      (updateAddressSuccess && updateAddressSuccess?.error) ||
      updateAddressError
    ) {
      Alert.alert('Error! Please try again');
      dispatch(updateAddressClear());
    }
  }, [
    addAddressSuccess,
    addAddressError,
    deleteAddressSuccess,
    deleteAddressError,
    updateAddressSuccess,
    updateAddressError,
  ]);

  return (
    <>
      {isAddAddressLoading ||
      isProfileLoading ||
      isDeleteAddressLoading ||
      isUpdateLoading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.Button.primary}
          style={styles.loader}
        />
      ) : (
        <SafeAreaView style={styles.mainBody}>
          <StatusBar
            backgroundColor={Colors.Generic.white}
            barStyle={'dark-content'}
          />
          <View style={styles.mainView}>
            <MapView
              style={styles.map}
              initialRegion={region}
              onRegionChangeComplete={region => {
                setRegion(region);
                console.log(region);
              }}>
              <Marker coordinate={region} />
            </MapView>
          </View>
          <Pressable
            style={styles.back}
            onPress={() => RootNavigation.navigate(routes.AddAddress)}>
            <BackButton isTitle={false} />
          </Pressable>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            style={styles.backGround}>
            <View style={styles.contentContainer}>
              {selected ? (
                <>
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      setFirstLane(currentAddressLocation.firstLine);
                      setLastLane(currentAddressLocation.lastLine);
                      setCity(currentAddressLocation.city);
                      setState(currentAddressLocation.state);
                      setZipCode(currentAddressLocation.zipCode);
                      setCountry(currentAddressLocation.country);
                      setAddressType(currentAddressLocation.type);
                      toggleModal();
                    }}>
                    {currentAddressLocation?.country === undefined ? (
                      <ActivityIndicator
                        size={'small'}
                        color={Colors.Button.primary}
                        style={[styles.loader, {padding: 50}]}
                      />
                    ) : (
                      <AddressItem
                        title={t('common:currentLocation')}
                        subTitle={
                          currentAddressLocation?.firstLine +
                          ', ' +
                          currentAddressLocation?.lastLine +
                          ', ' +
                          currentAddressLocation?.city +
                          ', ' +
                          currentAddressLocation?.state +
                          ', ' +
                          currentAddressLocation?.zipCode +
                          ', ' +
                          currentAddressLocation?.country
                        }
                        icon={'my-location'}
                        color={2}
                      />
                    )}
                  </Pressable>
                  <View style={styles.spacer} />
                  <Pressable
                    onPress={() => {
                      setHeight(Platform.OS === 'android' ? '24%' : '30%');

                      setSelected(!selected);
                    }}
                    style={[styles.button, {flexDirection: 'row'}]}>
                    <View style={styles.padding}>
                      <Image
                        resizeMode="contain"
                        source={images.locationBlack}
                        style={styles.location}
                      />
                      <Text style={styles.textButton}>Select from map</Text>
                    </View>
                  </Pressable>
                  <View style={styles.spacer} />
                  <Pressable
                    onPress={() => {
                      if (screenData?.data === undefined) {
                        setFirstLane(undefined);
                        setLastLane(undefined);
                        setCity(undefined);
                        setState(undefined);
                        setZipCode(undefined);
                        setCountry(undefined);
                        setAddressType(undefined);
                      } else {
                        setLastLane(
                          screenData?.data && screenData?.data.lastLine,
                        );
                        setCity(screenData?.data && screenData?.data.city);
                        setState(screenData?.data && screenData?.data.state);
                        setZipCode(
                          screenData?.data && screenData?.data.zipCode,
                        );
                        setCountry(
                          screenData?.data && screenData?.data.country,
                        );
                        setAddressType(
                          screenData?.data && screenData?.data.type,
                        );
                      }
                      toggleModal();
                    }}
                    style={[styles.button, {flexDirection: 'row'}]}>
                    <View style={styles.padding}>
                      <Image
                        resizeMode="contain"
                        source={images.plus}
                        style={styles.location}
                      />
                      <Text style={styles.textButton}>
                        {screenData?.data
                          ? t('common:updateAddress')
                          : t('common:addAddress')}
                      </Text>
                    </View>
                  </Pressable>
                </>
              ) : (
                <>
                  <View>
                    <Text style={styles.title}>Select location</Text>
                    {isAddressLoading ? (
                      <ActivityIndicator
                        size={'small'}
                        color={Colors.Button.primary}
                        style={styles.loaderAddress}
                      />
                    ) : (
                      <Text style={styles.address}>
                        {
                          getAddressesByLatLongSuccess?.data?.results[0]
                            ?.formatted
                        }
                        )
                      </Text>
                    )}
                    <Pressable
                      onPress={() => {
                        console.log(currentAddress);
                        setFirstLane(currentAddress.firstLine);
                        setLastLane(currentAddress.lastLine);
                        setCity(currentAddress.city);
                        setState(currentAddress.state);
                        setZipCode(currentAddress.zipCode);
                        setCountry(currentAddress.country);
                        setAddressType(currentAddress.type);
                        toggleModal();
                      }}
                      style={[
                        styles.button,
                        {justifyContent: 'center', alignItems: 'center'},
                      ]}>
                      <View style={styles.padding}>
                        <Text style={styles.textButton}>Confirm location</Text>
                      </View>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
          </BottomSheet>
          <Modal
            animationType="fade"
            transparent={true}
            visible={openAddAddressModal}
            onRequestClose={toggleModal}>
            <View style={styles.center}>
              <CustomPopupAddAddress
                screenData={screenData}
                title={
                  screenData?.data
                    ? t('common:updateAddress')
                    : t('common:addAddress')
                }
                buttonTitle={t('common:submit')}
                closeModal={
                  screenData?.data ? onUpdateAddress : addAddressFunction
                }
                deleteAddress={deleteAddressFunction}
                setFirstLane={setFirstLane}
                setLastLane={setLastLane}
                setCity={setCity}
                setState={setState}
                setCountry={setCountry}
                setZipCode={setZipCode}
                setAddressType={setAddressType}
                firstLane={firstLane}
                lastLane={lastLane}
                city={city}
                state={state}
                country={country}
                zipCode={zipCode}
                addressType={addressType}
                onClose={toggleModal}
              />
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};

export default Maps;
