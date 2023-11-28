import {Pressable, Text} from 'react-native';
import React from 'react';
import {Colors} from '../../style';
import styles from './styles';
export const ColoredButton = ({colorType, title,onClick}: any) => {
  return (
    <Pressable
      onPress={onClick}
      style={[
        styles.press,
        {
          backgroundColor:
            colorType === 1 ? Colors.Generic.success : Colors.Text.error,
        },
      ]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
