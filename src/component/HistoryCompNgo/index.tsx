/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Image, Text, TextInput, Pressable} from 'react-native';
import styles from './style';
import images from 'assets/images';
import {ColoredButton} from '../ColoredButton';
import {Colors} from '../../style';

const HistoryCompNgo = ({
  status,
  title,
  subTitle,
  last = false,
  length,
  none,
  isCertified = false,
  update,
  onView = () => {},
  uploadCertificate =()=>{},
}: any): JSX.Element => {
  let accepted = 'Accepted';
  let rejected = 'Reject';

  let x;

  switch (status) {
    case 'Shipped':
      accepted = 'Distribution pending';
      rejected = 'Cancelled';
      x = images.shipped;
      break;
    case 'Collected':
      accepted = 'Shipped';
      rejected = 'Cancelled';
      x = images.packed;
      break;
    case 'Distributed':
      x = images.greenTik;
      break;
    case 'Distribution pending':
      accepted = 'Distributed';
      rejected = 'Cancelled';
      x = images.notGreenTik;
      break;
    case 'Collection pending':
      accepted = 'Collected';
      rejected = 'Cancelled';
      x = images.notReceived;
      break;
    case '':
      accepted = 'Collected';
      rejected = 'Cancelled';
      x = images.notCollected;
      break;
    case 'Received':
      accepted = 'Distribution pending';
      rejected = 'Cancelled';
      x = images.notDelayed;
      break;
    case 'Delayed':
      accepted = 'Received';
      rejected = 'Cancelled';
      x = images.delayed;
      break;
    default:
      x = images.cancel;
  }

  const [subTitleThis, setSubTitle] = useState<string>();
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
                  paddingBottom: length === 1 ? 0 : 20,
                },
              ]}>
              {subTitle}
            </Text>
          )}

          {status !== 'Cancelled' &&
          status !== 'Distributed' &&
          status !== 'Canceled(Donor)' &&
          none === false ? (
            <View style={{}}>
              <View style={styles.buttonHolder}>
                <ColoredButton
                  onClick={() => update(accepted, subTitleThis)}
                  colorType={1}
                  title={accepted}
                />
                <View style={styles.spacer} />
                <ColoredButton
                  onClick={() => update(rejected, subTitleThis)}
                  colorType={2}
                  title={rejected}
                />
              </View>
              <View style={{}}>
                <TextInput
                  numberOfLines={10}
                  maxLength={400}
                  placeholder="Description"
                  onChangeText={e => {
                    setSubTitle(e);
                  }}
                  placeholderTextColor={Colors.Text.gray}
                  multiline
                  style={styles.description}
                />
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
        {last === true && status === 'Distributed' ? (
          <Pressable
            style={styles.certFlex}
            onPress={isCertified === false ? uploadCertificate : onView}>
            <Image
              resizeMode="contain"
              source={isCertified === false ? images.upload : images.certified}
              style={isCertified === false ? styles.if : styles.ifNot}
            />
          </Pressable>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default HistoryCompNgo;
