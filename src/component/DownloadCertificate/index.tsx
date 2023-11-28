import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import styles from './style'
import {useTranslation} from 'react-i18next';
import CustomButton from '../CustomButton';
import Header from '../../component/Header';

export interface DocumentProp {
imageUrl: string;
doDownload: () => void;
onBackPress?: () => void;
}
const DownloadCertificate = (
    {
        imageUrl,
        doDownload,
        onBackPress
    }: DocumentProp
) => {
    const {t} = useTranslation();
  return (
    <ScrollView style={styles.mainView} showsVerticalScrollIndicator={false}>
     <Text style={styles.congrats}>{t('common:congratulations')}</Text>
      <View style={styles.imageView}>
        <Image source={imageUrl} style={styles.image} />
      </View>
      <CustomButton
        title={t('common:downloadCertificate')}
        onPress={() => {}}
        isDisable={false}
        buttonStyle={styles.marginTop}
      />
    </ScrollView>
  );
}

export default DownloadCertificate