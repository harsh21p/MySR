import styles from './styles';
import icons from '../../assets/icons';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SVGIcon from '../../component/SVGIcon';
import CustomButton from '../../component/CustomButton';
import {CustomInputText} from '../../component/CustomInputText';
import {BackButton} from '../../component/BackButton';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../style';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {callForgetPassword, clearForgetPassword, forgetPasswordInfo} from './slice/SendEmail';
import {validateEmail, validateIsEmpty} from 'utils/validators';

const ForgetPassword = () => {
  const {t} = useTranslation();
  const [email, setEmail] = useState();
  const {isForgetPasswordLoading, forgetPasswordSuccess, forgetPasswordError} =
    useAppSelector(forgetPasswordInfo);
  const dispatch = useAppDispatch();
  const [emailErrorMessage, setEmailError] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (forgetPasswordSuccess !== undefined && forgetPasswordSuccess?.message) {
      Alert.alert(t('common:successMessage'));
    }
    if (
      (forgetPasswordSuccess !== undefined && forgetPasswordSuccess?.error) ||
      forgetPasswordError
    ) {
      Alert.alert(
        forgetPasswordSuccess?.error
          ? forgetPasswordSuccess?.error
          : 'Email id doest not exists!',
      );
      dispatch(clearForgetPassword());
    }
     }, [forgetPasswordSuccess, forgetPasswordError]);

  const handleEmail = value => {
    if (validateIsEmpty(value)) {
      setEmail(value);
      setIsDisable(true);
      setEmailError(t('common:requiredField'));
    } else if (!validateEmail(value)) {
      setEmail(value);
      setEmailError(t('common:validEmail'));
      setIsDisable(true);
    } else {
      setEmail(value);
      setEmailError('');
      setIsDisable(false);
    }
  };
  const sendEmailCall = () => {
    const payload = {
      email: email,
    };
    dispatch(callForgetPassword(payload));
  };
  return (
    <SafeAreaView style={styles.mainBody}>
      <StatusBar
        backgroundColor={Colors.Generic.white}
        barStyle={'dark-content'}
      />
      {isForgetPasswordLoading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.Button.primary}
          style={styles.loader}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.scroll}>
            <View style={styles.svg}>
              <View style={styles.backButton}>
                <BackButton isTitle={false} />
              </View>
              <View style={styles.backButtonSvg}>
                <SVGIcon
                  style={styles.forgetPasswordEl}
                  icon={icons.forgetPasswordEl}
                  key={'icon'}
                />
              </View>
            </View>
            <View style={styles.mainContainer}>
              <Text style={styles.forgetPassword}>
                {t('common:forgetPassword')}
              </Text>
              <CustomInputText
                holder={'Enter Email ID *'}
                value={email}
                onChangeText={e => handleEmail(e)}
              />
              {emailErrorMessage ? (
                <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
              ) : null}
              <View style={styles.spacer} />
              <CustomButton
                title={t('common:sendLinkToEmailAccount')}
                isDisable={isDisable}
                onPress={sendEmailCall}
                buttonStyle={styles.button}
              />
              {forgetPasswordSuccess?.message ? (
                <Text style={styles.message}>
                  {forgetPasswordSuccess?.message}
                </Text>
              ) : forgetPasswordSuccess?.error ? (
                <Text style={styles.errorMessage}>
                  {forgetPasswordSuccess?.error}
                </Text>
              ) : forgetPasswordError && (
                <Text style={styles.errorMessage}>
                  {'Email id doest not exists!'}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ForgetPassword;
