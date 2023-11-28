import {View, Text, Image, ScrollView, SafeAreaView, Alert, ActivityIndicator, Linking, Pressable, Platform} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';

import {Colors, Spacing} from '../../style';
import {useTranslation} from 'react-i18next';
import images from '../../assets/images';
import CustomButton from '../../component/CustomButton';
import AccordianView from '../../component/AccordianView';
import {BackButton} from '../../component/BackButton';
import { callGetProfile, clearProfile, getProfileInfo, getProfileSuccess } from 'routes/MyAccount/slice';
import {useAuthContext} from 'context/use-auth-context';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import * as RootNavigation from 'navigation/rootNavigation';
import { callGetAddressById, clearGetAddressById, getAddressByIdInfo } from 'routes/Dashboard/slice/GetAddressById';

const NGOProfile = prop  => {
  const NData = prop.route.params?.data;

  function getAddressById(id:any){
    const payload = {
      id: id,
      jwt: authData?.jwt
    };
    dispatch(callGetAddressById(payload));
  }

  const {isAddressByIdLoading, getAddressByIdSuccess, getAddressByIdError} = useAppSelector(getAddressByIdInfo);
  
  const handlePressOnLink = (value:any,type:any) => {

    let dialerUrl = '';

    if(type==='phone'){
      if (Platform.OS !== 'android') {
        dialerUrl = `telprompt:${phone}`;
      }
      else  {
        dialerUrl = `tel:${phone}`;
      }
    }else{
      if(type==='email'){
        dialerUrl=`mailto:${value}`;
      }else{
        if(type==='web'){
          dialerUrl=`${value}`;
        }
      }
    }

    Linking.canOpenURL(dialerUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(dialerUrl);
        } else {
          throw new Error(`Dialing is not supported on this device.`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

 
  useEffect(() => {
    if(getAddressByIdSuccess && getAddressByIdSuccess?.data){
      setLat(getAddressByIdSuccess?.data[0]?.latitude);
      setLong(getAddressByIdSuccess?.data[0]?.longitude);
    }
  }, [getAddressByIdSuccess])
  

  const dispatch = useAppDispatch();
  const {isProfileLoading, profileSuccess, profileError} = useAppSelector(getProfileInfo);
  const {t} = useTranslation();
  const [openInformation, setOpenInformation] = useState(false);
  const [openAboutUs, setOpenAboutUs] = useState(false);
  const [openGetInTouch, setOpenGetInTouch] = useState(false);
  // const [openBlogsPosted, setOpenBlogsPosted] = useState(false);

  const {authData} = useAuthContext();

  const toggleInformationOpen = useCallback(() => {
    setOpenInformation(!openInformation);
  }, [openInformation]);

  const toggleOpenAboutUs = useCallback(() => {
    setOpenAboutUs(!openAboutUs);
  }, [openAboutUs]);

  const toggleOpenGetInTouch = useCallback(() => {
    setOpenGetInTouch(!openGetInTouch);
  }, [openGetInTouch]);

  // const toggleBlogsPosted = useCallback(() => {
  //   setOpenBlogsPosted(!openBlogsPosted);
  // }, [openBlogsPosted]);

  const [name, setName] = useState<any>();
  const [uid, setUid] = useState<any>();
  const [year, setyear] = useState<any>();
  const [email, setemail] = useState<any>();
  const [profile, setProfile] = useState();
  const [profileName, setProfileName] = useState();
  const[phone,setPhone]=useState<any>();
  const[web,setWeb]=useState<any>();
  const[about,setAbout]=useState<any>();

  useEffect(() => {
    if (profileSuccess) {
      if (authData?.roleName === 'NGO') {
        setName(profileSuccess?.firstName + ' ' + profileSuccess?.lastName);
        const names =
          profileSuccess?.firstName?.charAt(0).toLocaleUpperCase() +
          profileSuccess?.lastName?.charAt(0).toLocaleUpperCase();
        setProfileName(names);
      } else {
        setName(profileSuccess?.organizationName);
        setAbout(profileSuccess?.about);
        setUid(profileSuccess?.uid);
        setyear(profileSuccess?.establishedYear);
        setWeb(profileSuccess?.additionalDetails);
       
        const names =
          profileSuccess?.organizationName?.charAt(0).toUpperCase() +
          profileSuccess?.organizationName?.charAt(1).toUpperCase() ;
        setProfileName(names);
      }
      setemail(profileSuccess?.email);
      setProfile(profileSuccess?.profilePic);
      setPhone(profileSuccess?.phoneNumber);
      getAddressById(profileSuccess?.primaryAddressId);
    } else {

      if (profileSuccess?.error !== undefined || profileError) {
        Alert.alert('Error! Try again.');
      }

    }
  }, [profileSuccess, profileError]);

  useEffect(() => {

    const payload = {
      userId: NData,
      jwt: authData?.jwt,
    };
    dispatch(callGetProfile(payload));

  }, []);

  const [back,setBack]=useState(false);

  useEffect(() => {
    if(back){
      RootNavigation.goBack();
    } 
  }, [profileSuccess])
  
  const [lat,setLat]=useState();
  const [long,setLong]=useState();

  const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${lat},${long}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });


  return (
    <SafeAreaView style={styles.maincontainer}>
      <ScrollView style={styles.mainView} showsVerticalScrollIndicator={false}>
        <View style={styles.paddingV}>
   
          <BackButton 
          isTitle={true} 
          title={t('common:profile')} 
          isPresseble={false} 
          click={()=>{
              setBack(true);
              dispatch(clearProfile());
              const payload = {
                userId: authData?.userId,
                jwt: authData?.jwt,
              };
              dispatch(callGetProfile(payload));
              dispatch(clearGetAddressById());
           
          }}/>

          {  isProfileLoading || profileSuccess === undefined || isAddressByIdLoading || getAddressByIdSuccess === undefined ?(
                 <ActivityIndicator
                    size={'large'}
                    color={Colors.Button.primary}
                    style={styles.loader}
                  />):(
                  
            <>
              <View style={styles.ngoLogo}>
                {profile === undefined || profile == 'null' || profile === null  ? (
                   <Text style={styles.profileName}>{profileName}</Text>
                ) : (
                  <Image style={styles.profilePic} source={{uri: profile}} />
                )}
              </View>

              <View style={[styles.row, styles.marginTop]}>
                <Text style={styles.nameOfOrg}>{name}</Text>
                <Image source={images.success} style={styles.verified} />
              </View>

              <View style={styles.marginTop1}>
                <Text style={styles.nonProfit}>
                  {authData?.roleName === 'NGO'
                    ? 'Volunteer'
                    : 'Non profit organization'}
                </Text>
              </View>
              {authData?.roleName === 'NGO' ? (
                <View style={styles.spacer} />
              ) : (
                <>
                  {/* <View style={[styles.rowFollow, styles.marginTop]}>
                    <CustomButton
                      title={t('common:follow')}
                      buttonStyle={styles.btnStyle}
                      isDisable={false}
                      titleStyle={styles.titleStyle}
                      onPress={() => {}}
                    />
                    <View style={styles.leftView}>
                      <Icon
                        name="group"
                        size={Spacing.size20}
                        style={styles.grpIcon}
                        color={Colors.Text.black}
                      />
                      <Text style={styles.followersCount}>{'213'}</Text>
                      <Text style={styles.followerst}>
                        {t('common:followers')}
                      </Text>
                    </View>
                  </View> */}

                  <View style={styles.spacer} />

                  <View style={styles.holder}>
                    <AccordianView
                      isOpen={openInformation}
                      title={'Information'}
                      toggleOpen={toggleInformationOpen}
                      children={
                        <View style={styles.holderFirst}>
                          <View style={styles.row3}>
                            <Icon2
                              name="check-circle"
                              size={Spacing.size20}
                              color={Colors.Text.black}
                              style={styles.center}
                            />
                            <Text style={styles.text}>{'Verified'}</Text>
                          </View>

                          <View style={styles.row3}>
                            <Icon
                              name="id-card"
                              size={Spacing.size20}
                              color={Colors.Text.black}
                              style={styles.center}
                            />
                            <Text style={styles.text}>{uid}</Text>
                          </View>

                          <View style={styles.row3}>
                            <Icon
                              name="bank"
                              size={Spacing.size20}
                              color={Colors.Text.black}
                              style={styles.center}
                            />
                            <Text style={styles.text}>
                              {'Non Profit Organization'}
                            </Text>
                          </View>

                          <View style={styles.row3}>
                            <Icon
                              name="clock-o"
                              size={Spacing.size20}
                              color={Colors.Text.black}
                              style={styles.center}
                            />
                            <Text style={styles.text}>{year}</Text>
                          </View>
                        </View>
                      }
                    />
                  </View>

                  <View style={styles.holder}>
                    <AccordianView
                      isOpen={openAboutUs}
                      title={'About us'}
                      toggleOpen={toggleOpenAboutUs}
                      children={
                        <Text style={styles.text}>
                          { about !== null && about !== undefined && about !== 'null' && about }
                        </Text>
                      }
                    />
                  </View>
                </>
              )}

              <View style={styles.holder}>
                <AccordianView
                  isOpen={openGetInTouch}
                  title={'Get in touch'}
                  toggleOpen={toggleOpenGetInTouch}
                  children={
                    <View style={styles.paddingView}>
                      <View style={styles.row}>
                        <Icon1
                          name={'location-outline'}
                          size={Spacing.size20}
                          color={Colors.Text.black}
                          style={styles.iconLocation}
                        />
                        <Text style={styles.text}>
                         { getAddressByIdSuccess?.data[0]?.city}
                        </Text>
                      </View>
                      <Pressable onPress={()=>{Linking.openURL(url)}}>
                        <Text style={styles.grayText}>
                        {getAddressByIdSuccess?.data[0]?.firstLine+", "+getAddressByIdSuccess?.data[0]?.lastLine+", "+getAddressByIdSuccess?.data[0]?.zipCode+", "+getAddressByIdSuccess?.data[0]?.city+", "+getAddressByIdSuccess?.data[0]?.lastLine+", "+getAddressByIdSuccess?.data[0]?.country}
                        </Text>
                      </Pressable>
                      <Pressable style={styles.padding} onPress={()=>handlePressOnLink(phone,'phone')}>
                        <Text style={styles.textBlack}>Phone : <Text style={styles.blueText}>
                         {phone}
                        </Text></Text>
                      </Pressable>
                      <Pressable style={styles.padding} onPress={()=>handlePressOnLink(email,'email')}>
                        <Text style={styles.textBlack}>Email : <Text style={styles.blueText}>{email}</Text></Text>
                      </Pressable>
                      {authData?.roleName !== 'NGO' && web !== null && web !== undefined && web !== 'null' &&  <Pressable style={styles.padding} onPress={()=>handlePressOnLink(web,'web')}>
                      <Text style={styles.textBlack}>Web Page : <Text style={styles.blueText}>{web}</Text></Text>
                      </Pressable>}
                    </View>
                  }
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NGOProfile;
