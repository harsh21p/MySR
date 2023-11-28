import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from './style';

const TabSelected = ({image, label}: any) => {
  return (
    <View style={styles.holder}>
      <Image source={image} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default TabSelected;
