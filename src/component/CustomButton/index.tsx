import {Text, ViewStyle, Pressable} from 'react-native';
import React from 'react';
import styles from './style';

export interface CustomButtonProps {
  title: string;
  titleStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  onPress: () => void;
  isDisable: boolean;
}
const CustomButton = ({
  title,
  titleStyle,
  buttonStyle,
  onPress,
  isDisable,
}: CustomButtonProps) => {
  return (
    <Pressable
      onPress={!isDisable? onPress:()=>{} }
      style={[
        isDisable ? styles.disableButton : styles.buttonStyle,
        buttonStyle,
      ]}>
      <Text style={[isDisable ? styles.disableText : styles.text, titleStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
