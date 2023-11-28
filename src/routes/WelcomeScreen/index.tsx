import styles from './styles';
import {SafeAreaView, ScrollView, View, Text, Pressable, StatusBar} from 'react-native';
import React, { useState } from 'react';
import icons from '../../assets/icons';
import SVGIcon from '../../component/SVGIcon';
import {MobileText} from '../../component/MobileText';
import {useTranslation} from 'react-i18next';
import * as RootNavigation from '../../navigation/rootNavigation';
import routes from 'routes';
import { Colors } from '../../style';

const WelcomeScreen = () => {
  const {t} = useTranslation();
  const [phone, setPhone] = useState();
  const callSetPhone = val => {
    setPhone(val);
  };

  return (
    <SafeAreaView style={styles.mainBody}>
        <StatusBar
          backgroundColor={Colors.Generic.white}
          barStyle={'dark-content'}
        />
      <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.scroll}>
          <View style={styles.textView}>
            <Text style={styles.welcomeText}>{t('common:welcome')}</Text>
            <Text style={styles.subtitle}>{t('common:welcomeSubTitle')}</Text>
          </View>
          <View style={styles.alignView}>
            <View style={styles.svg}>
              <SVGIcon
                style={styles.welcomeIconEl}
                icon={icons.welcomeEl}
                key={'icon'}
              />
            </View>
            <View style={styles.inputs}>
              <Pressable
                onPress={() => RootNavigation.navigate(routes.LoginScreen)}>
                <Text style={styles.haveEmail}>
                  {t('common:haveAnEmailAccount')}
                </Text>
              </Pressable>
              <Text style={styles.or}>or</Text>
              <MobileText type={3} phoneNumber={phone} onChangeText={callSetPhone}/>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
