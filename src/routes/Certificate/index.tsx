import styles from './style';
import {SafeAreaView, StatusBar, View, Text, Image, Alert} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../style';
import {BackButton} from '../../component/BackButton';
import CustomButton from '../../component/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';

const Certificate = (props) => {
  const {t} = useTranslation();
  const isNgo = props.route.params.isNgo;
  const isDelete = props.route.params.isDelete;
  const deletedId = props.route.params.isDeletedOrderId;
  const downloadCertificate = props.route.params.downloadCertificate;
  const renderCertificate = `data:image/jpeg;base64,${props.route.params.certificate}`;

const isDeleteFunction = () => {
  isDelete(deletedId);
};
const callDownloadCertificate = () => {
downloadCertificate(renderCertificate);
}
  return (
    <>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.mainBody}>
        <StatusBar
          backgroundColor={Colors.Generic.statusBar}
          barStyle={'dark-content'}
        />
        <ScrollView>
          <View style={styles.header}>
            <BackButton isTitle={true} title={t('common:certificate')} />
            {isNgo === false ? (
              <Text style={styles.text}>Congratulation!🎉</Text>
            ) : null}
            <View style={isNgo ? styles.imgView1 : styles.imgview}>
              <Image
                style={styles.img}
                resizeMode="contain"
                source={{uri: renderCertificate}}
              />
            </View>

            <CustomButton
              title={isNgo ? 'Delete Certificate' : t('common:Download')}
              buttonStyle={styles.button}
              onPress={isNgo ? isDeleteFunction : callDownloadCertificate}
              isDisable={false}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Certificate;
