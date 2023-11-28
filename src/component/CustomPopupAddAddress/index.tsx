import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import CustomButton from '../CustomButton';
import { CustomInputText } from '../CustomInputText';
import Icon from 'react-native-vector-icons/Entypo'
import { Colors } from '../../style';

export interface CustomPopupProps {
  title: string;
  buttonTitle?: string;
  closeModal: any;
  firstLane: string | undefined;
  lastLane: string | undefined;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  zipCode: string | undefined;
  addressType: string | undefined;
  setFirstLane: () => void;
  setLastLane: () => void;
  setCity: () => void;
  setState: () => void;
  setZipCode: () => void;
  setCountry: () => void;
  setAddressType: () => void;
  screenData: object | undefined;
  deleteAddress: any;
  onClose:any;
  update:any;
}
const CustomPopupAddAddress = ({
  title,
  buttonTitle,
  closeModal,
  firstLane,
  lastLane,
  city,
  state,
  country,
  zipCode,
  addressType,
  setFirstLane,
  setLastLane,
  setCity,
  setCountry,
  setZipCode,
  setState,
  setAddressType,
  screenData,
  deleteAddress,
  onClose,
}: CustomPopupProps) => {
  const {t} = useTranslation();
  const [isDisable, setIsDisable] = useState(true);
  useEffect(() => {
    if (
      firstLane !== undefined &&
      firstLane !== '' &&
      lastLane !== undefined &&
      lastLane !== '' &&
      addressType !== undefined &&
      addressType !== '' &&
      city !== undefined &&
      city !== '' &&
      state !== undefined &&
      state !== '' &&
      country !== undefined &&
      country !== '' &&
      zipCode !== undefined &&
      zipCode !== ''
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [
    isDisable,
    firstLane,
    lastLane,
    addressType,
    city,
    state,
    country,
    zipCode,
  ]);

  return (
    <View style={styles.mainView}>
      <View style={styles.close}> 
        <Icon name='cross' size={25} onPress={onClose} color={Colors.Button.primary}/>
      </View>
      <Text style={styles.mainTitle}>{title}</Text>
      <View style={styles.spacer} />
      <CustomInputText
        holder={'Enter Address Type (Office/Home)'}
        value={addressType}
        onChangeText={e => 
          {
            setAddressType(e);
          }}
      />
      <CustomInputText
        holder={'Enter Address Line 1'}
        value={firstLane}
        onChangeText={e => setFirstLane(e)}
      />
      <CustomInputText
        holder={'Enter Address Line 2'}
        value={lastLane}
        onChangeText={e => setLastLane(e)}
      />
      <CustomInputText
        holder={'City'}
        value={city}
        onChangeText={e => setCity(e)}
      />
      <CustomInputText
        holder={'State'}
        value={state}
        onChangeText={e => setState(e)}
      />
      <CustomInputText
        holder={'Pincode'}
        value={zipCode}
        onChangeText={e => setZipCode(e)}
      />
      <CustomInputText
        holder={'Country'}
        value={country}
        onChangeText={e => setCountry(e)}
      />
      <View style={styles.spacer} />

      <CustomButton
        onPress={closeModal}
        title={buttonTitle}
        isDisable={isDisable}
      />

      <View style={styles.spacer} />
      {screenData !== undefined && (
        <CustomButton
          onPress={deleteAddress}
          title={t('common:deleteAddress')}
          isDisable={false}
        />
      )}
    </View>
  );
};

export default CustomPopupAddAddress;
