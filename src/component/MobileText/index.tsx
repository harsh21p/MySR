import {TextInput, Text, View, Pressable} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import icons from '../../assets/icons';
import SVGIcon from '../../component/SVGIcon';
import { Colors } from '../../style';
import { useTranslation } from 'react-i18next';

export interface MobileTextProps {
  onChangeText?: () => void;
  phoneNumber?: number;
  type?: number;
}

export const MobileText = ({
  onChangeText = () => {},
  phoneNumber,
  type = 2
}: MobileTextProps) => {
  const {t} = useTranslation();
  const reference = useRef<TextInput>(null);
  const [visible,setVisible] = useState(true);
  useEffect(() => {
    if(!visible){
      reference.current?.focus();
    }
  }, [visible])
  
  return (
    <Pressable onPress={()=>{
        setVisible(false);
      }} style={[styles.style,type === 2 && {borderColor:Colors.Text.gray}]}>
      <SVGIcon style={styles.flagIcon} icon={icons.countryFlag} />
      <Text style={[styles.code,type === 2 && {color:Colors.Text.gray}]}>+ 91</Text>
      <View style={[styles.spacer,type === 2 && {backgroundColor:Colors.Text.gray}]} />
  
      <Pressable onPress={()=>{
         setVisible(false);
      }} style={styles.placeholder}>
        <TextInput
          ref={reference}
          onFocus={()=>{
            setVisible(false);
          }}
          onBlur={()=>{
            setVisible(true);
          }}
          editable={type === 1 || type === 3}
          value={phoneNumber}
          onChangeText={onChangeText}
          keyboardType="number-pad"
          maxLength={10}
          placeholderTextColor={Colors.Text.gray}
          style={[styles.input,type === 2 && {color:Colors.Text.gray}]}
        />

        { visible && (phoneNumber?.length === 0 || phoneNumber=== undefined) && type !== 2 &&
        (<View style={styles.row}>
          <Text style={styles.placeholder1}>
            {t('common:enterMobileNo')}
            { type === 1 && 
            <Text style={styles.red}>
              {' '+'*'}
            </Text>}
          </Text>
        </View>) }

      </Pressable>
    </Pressable>
  );
};
