import {View, Text, Image, TextInput, Pressable} from 'react-native';
import React from 'react';
import styles from './styles';
import images from '../../assets/images';
import {Colors} from '../../style';
import SVGIcon from '../../component/SVGIcon';
import icons from 'assets/icons';


const Holder = ({text, image}: any) => {
  return (
    <View style={styles.holder}>
      <View style={styles.iconText}>
        <Image source={image} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export const HeaderView = ({title, date, time, rout}: any) => {
  return (
    <View style={styles.header}>
      <View style={styles.svg}>
        <SVGIcon icon={icons.backButton}/>
      </View>
      <View style={styles.columnHolder}>
        <Text style={styles.title}>Name of Ngo</Text>
        <View style={styles.firstRow}>
          <Holder text="11 Jan 2023" image={images.calender}/>
          <Holder text="12:10 PM" image={images.clockGray}/>
          <Holder text="233" image={images.eyeGray}/>
        </View>
      </View>
    </View>
  );
};
