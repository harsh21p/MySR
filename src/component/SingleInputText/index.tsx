/* eslint-disable react/react-in-jsx-scope */
import {TextInput} from 'react-native';
import styles from './styles';

export const SingleInputText = ({onChange, reference, referenceNext}: any) => {
  return (
    <TextInput
      ref={reference}
      numberOfLines={1}
      maxLength={1}
      keyboardType="number-pad"
      secureTextEntry={true}
      style={styles.style}
      onChangeText={text => {
        onChange(text);
        if (text.length === 1) {
          referenceNext?.current.focus();
        }
      }}
    />
  );
};
