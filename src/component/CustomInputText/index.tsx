import {TextInput} from 'react-native';
import React from 'react';
import styles from './styles';
import { Colors } from '../../style';

export const CustomInputText = ({
  holder,
  onChangeText,
  value,
  style,
  secureTextEntry,
}: any) => {
  return (
    <TextInput
      placeholder={holder}
      placeholderTextColor={Colors.Text.gray}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      style={[style, styles.style]}
    />
  );
};
