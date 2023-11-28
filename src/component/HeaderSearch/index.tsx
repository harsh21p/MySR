import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import images from '../../assets/images';
import {Colors} from '../../style';
import { getProfileInfo } from 'routes/MyAccount/slice';
import {useAppSelector} from '../../redux/hooks';
import {useAuthContext} from 'context/use-auth-context';
import { useNotificationContext } from 'context/app-notification-context';
import { VoiceRecognitionComponent } from '../VoiceRecognitionComponent';


export const HeaderSearch = ({
  address,
  onPressNotification,
  onPress,
  isLoading,
  setSearch,
  search
}: any) => {

  const {authData} = useAuthContext();
  const place = authData?.roleName === 'NGO'?"Search Nearby Donor's":"Search Nearby Organization's"
  const {profileSuccess} = useAppSelector(getProfileInfo);
  const {notificationData} = useNotificationContext();
  const [recognizedText,setRecognizedText] = useState('');

  const setValue = (val:any) => {
    setRecognizedText(val);
  }
  
  useEffect(() => {
    setSearch(recognizedText);
  }, [recognizedText])
  

  return (
    <View style={styles.header}>
      <View style={styles.firstRow}>
        <Image
          style={styles.locationIcon}
          resizeMode="contain"
          source={images.locationIcon}
        />

        <Pressable onPress={onPress} style={styles.column}>
          {isLoading || address === undefined || profileSuccess?.primaryAddressId === undefined || profileSuccess?.primaryAddressId === null || profileSuccess?.primaryAddressId === ' ' ? (
            <View style={{flexDirection:'row'}}>
              <ActivityIndicator
                size={'small'}
                color={Colors.Button.primary}
                style={styles.loader}
              />
              <View>  
                <Text style={styles.addressTitle}> </Text>
                <Text numberOfLines={1} style={styles.addressSubTitle}> </Text>
              </View>
            </View>
          ) : (
                          <>
                <Text style={styles.addressTitle}>{address?.type}</Text>
                <Text numberOfLines={1} style={styles.addressSubTitle}>
                              {address?.firstLine +
                                ', ' +
                                address?.lastLine +
                                ', ' +
                                address?.city +
                                ', ' +
                                address?.state +
                                ', ' +
                                address?.country +
                                ', ' +
                                address?.zipCode}
                </Text>
            </>
          )}
       
        </Pressable>

        <Pressable onPress={onPressNotification}>
          { notificationData?.filter((e:any)=>e.read === false && e.title !=='').length !== 0 && <View style={{backgroundColor:'red',width:9,height:9,borderRadius:8,position:'absolute',zIndex:1,alignSelf:'flex-end'}} />}
          <Image
            resizeMode="contain"
            style={styles.notificationIcon}
            source={images.notificationIcon}
          />
        </Pressable>
      </View>
      <View style={styles.searchBar}>
        <Image
          resizeMode="contain"
          style={styles.searchIcon}
          source={images.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={place}
          placeholderTextColor={Colors.Text.primary}
          onChangeText={(e) => {
            setSearch(e);
          }}
          value={search}
        />
        <View style={styles.spacer} />
        <Pressable style={styles.speechIcon} onPress={()=>{
          
        }}>
          <VoiceRecognitionComponent setRecognizedText={setValue}/>
        </Pressable>        
      </View>
    </View>
  );
};
