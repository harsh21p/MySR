/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import styles from './style';
import images from 'assets/images';

const HistoryComp = ({
  status,
  title,
  subTitle,
  last = false,
  length,
  isCertified = false,
  onView = () => {},
}: any): JSX.Element => {
  let x;

  switch (status) {
    case 'Shipped':
      x = images.shipped;
      break;
    case 'Collected':
      x = images.packed;
      break;
    case 'Distributed':
      x = images.greenTik;
      break;
    case 'Distribution pending':
      x = images.notGreenTik;
      break;
    case 'Collection pending':
      x = images.notReceived;
      break;
    case '':
      x = images.notCollected;
      break;
    case 'Received':
      x = images.notDelayed;
      break;
    case 'Delayed':
      x = images.delayed;
      break;
    default:
      x = images.cancel;
  }
  return (
    <View style={styles.cardItem}>
      <View style={styles.colFirst}>
        <Image source={x} style={styles.statusIcon} />
        {last === true ? <></> : <View style={styles.line} />}
      </View>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text style={styles.title}>{title}</Text>
          {subTitle === null || subTitle === undefined || subTitle === '' ? (
            <></>
          ) : (
            <Text
              style={[
                styles.subTitle,
                {
                  paddingLeft: length === 1 ? 0 : 10,
                  paddingTop: length === 1 ? 5 : 10,
                  paddingRight: length === 1 ? 5 : 0,
                },
              ]}>
              {subTitle}
            </Text>
          )}
        </View>
        {last === true && status !== 'Cancelled' && status !== 'Canceled(Donor)'  ? (
          <Pressable style={styles.certFlex} onPress={isCertified ? onView : () => {}}>
            <Image
              resizeMode="contain"
              source={
                isCertified === false ? images.notCertified : images.certified
              }
              style={styles.certificate}
            />
          </Pressable>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default HistoryComp;
