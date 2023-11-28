/* eslint-disable react-native/no-inline-styles */
import {Pressable, TextInput, View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {Colors} from '../../style';
import SVGIcon from '../SVGIcon';
import icons from 'assets/icons';
import { useTranslation } from 'react-i18next';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { callGetAddresses, getAddressInfo } from 'routes/AddAddress/slice/getAddresses';
import { useAppDispatch,useAppSelector } from '../../redux/hooks';
import {useAuthContext} from 'context/use-auth-context';


export const DropDownPickupLocation = ({addressId = undefined, onSelectedAddress,setLat,setLong,type=false}: any) => {
  const {t} = useTranslation();

  const input = useRef<TextInput>(null);
  const [click, setClick] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();

  const dispatch = useAppDispatch();
  const {authData} = useAuthContext();

  const {isAddressLoading, getAddressSuccess} = useAppSelector(getAddressInfo);
    
  useEffect(() => {
    if (getAddressSuccess === undefined && isAddressLoading === false) {
      const payload = {
        jwt: authData?.jwt,
        userId: authData?.userId,
      };
      dispatch(callGetAddresses(payload));
    }
  }, [])

  const [addressTitle, setAddressTitle] = useState();
  
  const [data,setData] = useState([]);

  useEffect(() => {
    if (getAddressSuccess && getAddressSuccess?.data) {
      setData(getAddressSuccess?.data);
      const current = getAddressSuccess?.data.filter(check);
      setAddressTitle(current[0]?.type);
    }
  }, [getAddressSuccess])
 
  useEffect(() => {
    if (getAddressSuccess && getAddressSuccess?.data) {
      setData(getAddressSuccess?.data);
      const current = getAddressSuccess?.data.filter(check);
      setAddressTitle(current[0]?.type);
    }
  }, [])
  
 
  function check(address:any) {
    return address.id === addressId;
  }

  
  useEffect(() => {
    if (selectedAddress !== undefined && !type) {
      onSelectedAddress(selectedAddress);
    }
    if (selectedAddress !== undefined && type) {
      onSelectedAddress(selectedAddress?.id);
    }
  }, [selectedAddress]);

  return (
    <Pressable
      onPress={() => {
        input.current?.focus();
      }}
      style={[
        styles.mainView,
        {backgroundColor: click ? Colors.Generic.backgroundPopup : null},
      ]}>
      <View style={click ? styles.style1 : styles.style}>
        <TextInput
          onFocus={() => {
            setClick(!click);
          }}
          onBlur={() => {
            setClick(!click);
          }}
          ref={input}
          placeholderTextColor={
            click ? Colors.Button.primary : Colors.Text.gray
          }
          placeholder={'Pickup Location'}
          value={addressTitle}
          style={[
            styles.input,
            click
              ? {fontFamily: 'Poppins-Medium'}
              : {fontFamily: 'Poppins-Regular'},
          ]}
        />
        <Pressable onPress={() => setClick(!click)} style={styles.svgHolder}>
          <SVGIcon
            style={[
              styles.svg,
              {
                transform: [click ? {rotate: '90deg'} : {rotate: '-90deg'}],
              },
            ]}
            icon={icons.backButton}
          />
        </Pressable>
      </View>
      {click ? (


        <View style={styles.flatListHolder}>


          {/* <View style={styles.currentLocation}>
            <View style={styles.imageCurrentLocation}>
              <Icons
                style={styles.imageLocation}
                name={'my-location'}
                color={Colors.Text.black}
                size={20}
              />
            </View>
            <View style={styles.nameCol}>
              <Text style={styles.titleAddress}>
                {t('common:currentLocation')}
              </Text>
              <Text style={styles.subTitleAddress}>
                {t('common:currentLocationAddress')}
              </Text>
            </View>
          </View> */}



{ 
      isAddressLoading || getAddressSuccess === undefined || data.length === 0?  

      <ActivityIndicator
      size={'small'}
      color={Colors.Button.primary}
      style={styles.loader}
      />
      
      :( 
      <>
        <Text style={styles.addAddressName}>Saved Address</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            style={styles.scroll}
            renderItem={({item}) => (
              <Pressable
                style={styles.currentLocation}
                onPress={() => {
                  setSelectedAddress(item),
                    setLat(item?.latitude);
                    setLong(item?.longitude);
                    setAddressTitle(item?.type),
                    setClick(!click);
                }}>
                <View style={styles.imageCurrentLocation}>
                  <Icons
                    style={styles.imageLocation}
                    name={item?.type === 'Home' ? 'home' : item?.type === 'Office' ? 'location-city' : item?.type.toLowerCase()}
                    color={Colors.Text.black}
                    size={20}
                  />
                </View>
                <View style={styles.nameCol}>
                  <Text style={styles.titleAddress}>{item.type}</Text>
                  <Text style={styles.subTitleAddress}>
                    {item.firstLine +
                      ', ' +
                      item.lastLine +
                      ', ' +
                      item.country +
                      ', ' +
                      item.state +
                      ', ' +
                      item.zipCode}
                  </Text>
                </View>
              </Pressable>
            )}
          />
     
        </>
        )}

</View>


      ) : (
        <></>
      )}
    </Pressable>
  );
};
