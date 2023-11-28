import React from 'react';
import {TextInput} from 'react-native-paper';
import {
  KeyboardType,
  ReturnKeyTypeOptions,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../style';
import styles from './style';

interface Props {
  disabled?: boolean;
  editable?: boolean;
  error?: string;
  errorStyle?: ViewStyle;
  inputStyle?: ViewStyle | ViewStyle[];
  keyboardType?: KeyboardType;
  label: string;
  maxLength?: number;
  onBlur?: () => void;
  onChangeText: (e: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  ref?: any;
  returnKeyType?: ReturnKeyTypeOptions;
  value?: string;
  variant: 'outlined' | 'flat';
  autoFocus?: boolean;
  outlineColor?: string;
  selection?: any;
  secureTextEntry?: boolean;
}

const TextInputComponent = ({
  disabled = false,
  editable,
  error = '',
  errorStyle,
  inputStyle,
  keyboardType,
  label,
  onBlur,
  onChangeText,
  onFocus,
  placeholder,
  ref,
  returnKeyType,
  value,
  variant,
  maxLength,
  autoFocus,
  outlineColor,
  selection,
  secureTextEntry = false,
}: Props): JSX.Element => {
  return (
    <View style={styles.flex}>
      <TextInput
        outlineColor={outlineColor}
        mode={variant}
        ref={ref}
        maxLength={maxLength}
        keyboardType={keyboardType}
        label={label}
        placeholder={placeholder}
        error={error !== ''}
        value={value}
        style={inputStyle}
        returnKeyType={returnKeyType}
        onChangeText={onChangeText}
        onBlur={onBlur}
        onFocus={onFocus}
        editable={editable}
        selectionColor={Colors.Button.primary}
        activeOutlineColor={Colors.Button.primary}
        placeholderTextColor={Colors.Text.gray}
        disabled={disabled}
        autoFocus={autoFocus}
        autoCapitalize="none"
        selection={selection}
        numberOfLines={1}
        multiline={false}
        secureTextEntry={secureTextEntry}
      />
      {error !== '' && (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      )}
    </View>
  );
};

export default TextInputComponent;
