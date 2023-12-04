import {
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import icons from 'assets/icons';
import CustomButton from '../CustomButton';
import SVGIcon from '../SVGIcon';
import {CustomInputText} from '../CustomInputText';
import {DropDownSelectNgo} from '../DropDownSelectNgo';
import {DropDownPickupLocation} from '../DropDownPickupLocation';
import {MobileText} from '../MobileText';
import {DropDownTypeOfDonation} from '../DropDownTypeOfDonation';
import {Colors, Spacing} from '../../style';
import {
  addDonationInfo,
  callAddDonation,
  clearAddDonation,
} from 'routes/Dashboard/slice/AddDonation';
import * as RootNavigation from 'navigation/rootNavigation';
import routes from 'routes';
import {DropDownTypeOfDelivery} from '../../component/DropDownTypeOfDelivery';
import Icon from 'react-native-vector-icons/FontAwesome';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getAddressInfo} from 'routes/AddAddress/slice/getAddresses';
import {
  callUpdateDonation,
  updateDonationClear,
  updateDonationInfo,
} from 'routes/Dashboard/slice/updateDonation';
import {useAuthContext} from 'context/use-auth-context';
import {callGetDonation} from 'routes/Dashboard/slice/GetDonations';
import {callSendNotificationByNgoId} from 'routes/Dashboard/slice/sendNotificationByNgoId';
import {getProfileInfo} from 'routes/MyAccount/slice';
import {callSendNotificationByUserId} from 'routes/Dashboard/slice/sendNotificationByUserId';

export const DonationForm = ({
  type = undefined,
  item = undefined,
  latPrimary,
  longPrimary,
  close = () => {},
}: any) => {
  const [selectedDonationType, setSelectedDonationType] = useState();
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(
    item && item.deliveryType,
  );
  const [selectedNgos, setSelectedNgos] = useState(item && item.ngoDetails);
  const [selectedAddress, setSelectedAddress] = useState(
    item && item.addressId,
  );
  const [fullName, setFullName] = useState(item && item.fullName);
  const [contactNumber, setContactNumber] = useState(
    item && item.contactNumber,
  );
  const [description, setDescription] = useState(item && item.description);
  const {authData} = useAuthContext();
  const dispatch = useAppDispatch();
  const {isAddDonationLoading, addDonationSuccess, addDonationError} =
    useAppSelector(addDonationInfo);
  const [myDate, setDate] = useState(item ? item.deliveryTime : new Date());
  const [openPicker, setOpenPicker] = useState(false);

  const changeSelectedDate = selectedDate => {
    const currentDate = selectedDate || myDate;
    const formatedDate = dayjs(currentDate).format('YYYY-MM-DD hh:mm A');
    setDate(formatedDate);
    setOpenPicker(false);
  };

  const [lat, setLat] = useState(latPrimary);
  const [long, setLong] = useState(longPrimary);

  const callSelectedDonationType = val => {
    setSelectedDonationType(val);
  };
  const callSelectedDeliveryType = val => {
    setSelectedDeliveryType(val);
  };
  const callSelectedNgos = val => {
    setSelectedNgos(val);
  };
  const callSelectedAddress = val => {
    setSelectedAddress(val);
  };
  const callSetPhone = val => {
    setContactNumber(val);
  };

  const getDonation = () => {
    const payload = {
      id: authData?.userId,
    };
    dispatch(callGetDonation(payload));
  };

  function sendNotificationByNgoId(ngoId: string, title: string, body: string) {
    const payload = {
      jwt: authData?.jwt,
      data: {
        ngoId: ngoId,
        title: title,
        body: body,
      },
    };
    dispatch(callSendNotificationByNgoId(payload));
  }

  ///////////////////////// API CALL /////////////////////////////

  const {isAddressLoading, getAddressSuccess} = useAppSelector(getAddressInfo);

  const {updateDonationSuccess, updateDonationError, isUpdateLoading} =
    useAppSelector(updateDonationInfo);
  const {isProfileLoading, profileSuccess} = useAppSelector(getProfileInfo);

  function sendNotificationByUserId(
    userId: string,
    title: string,
    body: string,
  ) {
    const payload = {
      jwt: authData?.jwt,
      data: {
        userId: userId,
        title: title,
        body: body,
      },
    };
    dispatch(callSendNotificationByUserId(payload));
  }

  useEffect(() => {
    if (addDonationSuccess && addDonationSuccess?.message) {
      Alert.alert('Donation request sent successfully');

      selectedNgos?.map((e: any) => {
        sendNotificationByNgoId(
          e,
          'Donation request',
          'You have new donation request from ' + profileSuccess?.firstName,
        );
      });

      getDonation();
      dispatch(clearAddDonation());
    }
    if (addDonationSuccess?.error || addDonationError) {
      Alert.alert('Error! Please try again');
      RootNavigation.goBack();
      dispatch(clearAddDonation());
    }
    if (updateDonationSuccess && updateDonationSuccess?.message) {
      selectedNgos?.map((e: any) => {
        sendNotificationByNgoId(
          e,
          'New update on donation',
          profileSuccess?.firstName + ' Updated a donation request.',
        );
      });

      Alert.alert(updateDonationSuccess?.message);
      dispatch(updateDonationClear());
      close();
      getDonation();
    }
    if (
      (updateDonationSuccess && updateDonationSuccess?.error) ||
      updateDonationError
    ) {
      Alert.alert('Error! Please try again');
      dispatch(updateDonationClear());
    }
  }, [
    addDonationSuccess,
    addDonationError,
    updateDonationSuccess,
    updateDonationError,
  ]);

  const createRequest = () => {
    if (
      (selectedAddress?.id !== '' &&
        selectedAddress?.id !== undefined &&
        selectedNgos.length > 0 &&
        fullName !== '',
      fullName !== undefined &&
        contactNumber !== '' &&
        contactNumber !== undefined &&
        selectedDeliveryType?.selectedType !== '' &&
        selectedDeliveryType?.selectedType !== undefined &&
        selectedDeliveryType?.selectedType !== 0 &&
        myDate !== '' &&
        myDate !== undefined &&
        description !== undefined &&
        description !== '' &&
        selectedDonationType?.selectedType !== undefined &&
        selectedDonationType?.selectedQuantity !== undefined &&
        selectedDonationType?.selectedUnit !== undefined &&
        selectedDonationType?.selectedType !== '' &&
        selectedDonationType?.selectedQuantity !== '' &&
        selectedDonationType?.selectedUnit !== '')
    ) {
      const payload = {
        userId: authData?.userId,
        fullName: fullName,
        ngoId: selectedNgos,
        addressId: selectedAddress?.id,
        donationType: selectedDonationType?.selectedType,
        donationQuantity: selectedDonationType?.selectedQuantity,
        donationTypeUom: selectedDonationType?.selectedUnit,
        contactNumber: contactNumber,
        description: description,
        deliveryType: selectedDeliveryType?.selectedType,
        deliveryTime: myDate,
        status: 'pending',
      };
      dispatch(callAddDonation(payload));
      setFullName();
      setDate();
      setContactNumber();
      setDescription();
    } else {
      Alert.alert('Please select all the required fields');
    }
  };

  const updateDonation = () => {
    const payload = {
      id: item.id,
      jwt: authData?.jwt,
      data: {
        userId: authData?.userId,
        fullName: fullName,
        ngoId: selectedNgos,
        addressId: selectedAddress?.id,
        donationType: selectedDonationType?.selectedType,
        donationQuantity: selectedDonationType?.selectedQuantity,
        donationTypeUom: selectedDonationType?.selectedUnit,
        contactNumber: contactNumber,
        description: description,
        deliveryType: selectedDeliveryType?.selectedType,
        deliveryTime: myDate,
        status: 'pending',
      },
    };
    dispatch(callUpdateDonation(payload));
  };

  return (
    <View style={type === undefined ? styles.scroll : {}}>
      {isAddDonationLoading || isUpdateLoading || isAddressLoading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.Button.primary}
          style={styles.loader}
        />
      ) : (
        <>
          <View style={{marginHorizontal: type ? 0 : 45}}>
            <CustomInputText
              holder={'Enter Full Name'}
              x
              value={fullName}
              onChangeText={e => {
                setFullName(e);
              }}
            />

            <DropDownPickupLocation
              addressId={selectedAddress}
              onSelectedAddress={callSelectedAddress}
              setLat={setLat}
              setLong={setLong}
            />

            <DropDownSelectNgo
              selectedNgos={callSelectedNgos}
              item={selectedNgos}
              lat={lat}
              long={long}
            />

            <DropDownTypeOfDonation
              onTypeSelect={callSelectedDonationType}
              value={item ? item.donationType : undefined}
              qat={item ? parseInt(item.donationQuantity) : undefined}
              unit={item ? item.donationTypeUom : undefined}
            />
            <DropDownTypeOfDelivery
              onTypeSelect={callSelectedDeliveryType}
              value={selectedDeliveryType}
            />

            <View style={styles.padding}>
              <Pressable
                style={openPicker ? styles.view2 : styles.style}
                onPress={() => setOpenPicker(!openPicker)}>
                <TextInput
                  placeholderTextColor={
                    openPicker ? Colors.Button.primary : Colors.Text.gray
                  }
                  placeholder={'Select Delivery Time'}
                  value={myDate}
                  style={openPicker ? styles.input1 : styles.input2}
                />

                <Icon
                  name="calendar"
                  size={Spacing.size20}
                  color={Colors.Text.gray}
                  style={{alignSelf: 'center'}}
                  onPress={() => setOpenPicker(true)}
                />
              </Pressable>
            </View>
            <DatePicker
              modal
              open={openPicker}
              minimumDate={new Date()}
              date={new Date()}
              onConfirm={changeSelectedDate}
              onCancel={() => {
                setOpenPicker(false);
              }}
            />

            <View style={styles.mobile}>
              <MobileText
                phoneNumber={contactNumber}
                onChangeText={callSetPhone}
                type={3}
                change={contactNumber}
              />
            </View>
            <TextInput
              numberOfLines={10}
              maxLength={400}
              placeholder="Description"
              multiline
              value={description}
              onChangeText={e => setDescription(e)}
              style={styles.description}
              placeholderTextColor={Colors.Text.gray}
            />

            <CustomButton
              buttonStyle={styles.button}
              title={type ? 'Update' : 'Submit'}
              onPress={type ? updateDonation : createRequest}
              isDisable={false}
            />
          </View>

          {type ? (
            <></>
          ) : (
            <View>
              <SVGIcon
                style={styles.donateNowEl}
                icon={icons.donateNowEl}
                key={'icon'}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};
