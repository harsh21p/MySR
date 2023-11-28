import styles from './styles';
import icons from '../../assets/icons';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
  Pressable,
  Platform
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SVGIcon from '../../component/SVGIcon';
import CustomButton from '../../component/CustomButton';
import {CustomInputText} from '../../component/CustomInputText';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {callLogin, loginInfo} from './slice';
import {Colors, Spacing} from '../../style';
import * as RootNavigation from 'navigation/rootNavigation';
import routes from 'routes';
import Icon from 'react-native-vector-icons/Feather';
import { useAuthContext } from 'context/use-auth-context';

const LoginScreen = () => {
  const {t} = useTranslation();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const {isLoginLoading, loginSuccess, loginError} = useAppSelector(loginInfo);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {updateAuthData} = useAuthContext();

  useEffect(() => {
    if (
      email !== undefined &&
      email !== '' &&
      password !== '' &&
      password !== undefined
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [isDisable, email, password]);

  useEffect(() => {
    if (loginSuccess !== undefined && loginSuccess?.jwt) {
      const payload = {
        jwt: loginSuccess?.jwt,
        userId: loginSuccess?.userId,
        roleName: loginSuccess?.roleName,
      };
      updateAuthData(payload);
      RootNavigation.navigate(routes.TabBar);
    } else if (loginError !== undefined) {
      Alert.alert(t('common:errorUsernamePassword'));
    }
  }, [loginSuccess, loginError, updateAuthData]);

  const callLoginFunction = () => {
    const payload = {
      email: email,
      password: password,
    };
    dispatch(callLogin(payload));
  };
  return (
    <SafeAreaView style={styles.mainBody}>

      <StatusBar
          backgroundColor={Colors.Generic.white}
          barStyle={'dark-content'}
        />
      {isLoginLoading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.Button.primary}
          style={styles.loader}
        />
      ) : (

        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.scroll}>
            <View style={styles.svg}>
              
              <SVGIcon
                style={styles.loginIconEl}
                icon={icons.loginEl}
                key={'icon'}
              />
            </View>
            
            <View style={styles.login}>
              <Text style={styles.loginText}>{t('common:login')}</Text>
              <CustomInputText
                holder={t('common:placeholderEmail')}
                value={email}
                onChangeText={e => setEmail(e)}
              />
              <View style={styles.rowIcon}>
                <CustomInputText
                  holder={t('common:placeholderPassword')}
                  value={password}
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  onChangeText={e => setPassword(e)}
                />
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={Spacing.size22}
                  style={styles.eyeIcon1}
                  color={Colors.Text.black}
                  onPress={() => setShowPassword(!showPassword)}
                />
              </View>
              <Pressable onPress={() => RootNavigation.navigate(routes.ForgetPassword)}>
                <Text style={styles.forgetpass}>
                  {t('common:forgetPassword')}
                </Text>
              </Pressable>
              <CustomButton
                title={t('common:login')}
                isDisable={isDisable}
                buttonStyle={styles.button}
                onPress={callLoginFunction}
              />
              <Pressable onPress={()=> RootNavigation.navigate(routes.SignUpScreen)}>
                <Text style={styles.signup}>
                  {t('common:dontHaveAnAccount')}
                  <Text style={styles.signupBold}>{' '}{t('common:signup')}</Text>{' '}
                </Text>
              </Pressable>
              
              {/* <View style={styles.loginwithView}>
                <View style={styles.line} />
                <Text style={styles.loginwith}>
                  {t('common:login')} {t('common:with')}
                </Text>
                <View style={styles.line} />
              </View>
              <View style={styles.iconLogin}>
                <View style={styles.iconBackground}>
                  <Text style={styles.google}>G</Text>
                </View>
                <View style={styles.iconBackground}>
                  <Text style={styles.other}>...</Text>
                </View>
              </View> */}
              
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
