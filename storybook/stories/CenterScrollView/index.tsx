import React from 'react';
import {ScrollView, View} from 'react-native';

import styles from './styles';

interface Props {
  children: JSX.Element[];
  backgroundColor?: string;
}

const CenterScrollView = ({children, backgroundColor}: Props): JSX.Element => (
  <View style={[styles.main, {backgroundColor}]}>
    <ScrollView bounces={false}>{children}</ScrollView>
  </View>
);

export default CenterScrollView;
