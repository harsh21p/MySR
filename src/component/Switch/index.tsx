import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Colors} from '../../style';
import styles from './style';

const TextInputComponent = ({setType, type,titleSecond,titleFirst}) => {
  return (
    <>
      <View style={styles.buttonHolder}>
        <Pressable
          onPress={() => {
            setType(true);
          }}
          style={[
            styles.press,
            {
              backgroundColor:
                type
                  ? Colors.Button.primary
                  : Colors.Button.secondary,
            },
          ]}>
          <Text
            style={[
              styles.text,
              {
                color:
                  type
                    ? Colors.Button.secondary
                    : Colors.Button.primary,
              },
            ]}>
            {titleFirst}
          </Text>
        </Pressable>
        <View style={styles.spacerButton} />
        <Pressable
          onPress={() => {
            setType(false);
          }}
          style={[
            styles.press2,
            {
              backgroundColor:
                type 
                  ? Colors.Button.secondary
                  : Colors.Button.primary,
            },
          ]}>
          <Text
            style={[
              styles.text2,
              {
                color:
                  type 
                    ? Colors.Button.primary
                    : Colors.Button.secondary,
              },
            ]}>
            {titleSecond}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default TextInputComponent;
