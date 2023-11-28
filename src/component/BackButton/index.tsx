import {Pressable, View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import SVGIcon from '../SVGIcon';
import icons from '../../assets/icons';
import * as RootNavigation from '../../navigation/rootNavigation';


export const BackButton = ({title, isTitle, isPresseble = true , click=()=>{console.log("Nothing passed")} }:any) => {
  return (
    <View style={styles.row}>
      <Pressable style={styles.button} onPress={() => isPresseble ? RootNavigation.goBack() : click()}>
        <SVGIcon style={styles.buttonSvg} icon={icons.backButton} />
      </Pressable>
      {isTitle && <Text style={styles.titleStyle}>{title}</Text>}
    </View>
  );
};
