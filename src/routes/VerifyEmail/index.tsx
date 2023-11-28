/* eslint-disable react/react-in-jsx-scope */
import styles from './styles';
import icons from '../../assets/icons';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import SVGIcon from '../../component/SVGIcon';
import {SingleInputText} from '../../component/SingleInputText';
import CustomButton from '../../component/CustomButton';
import {useTranslation} from 'react-i18next';
import {useEffect, useRef, useState} from 'react';
import {useSignUpContext} from 'context/sign-up-context';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  callVerifyOtp,
  clearVerifyOtp,
  verifyOtpInfo,
} from 'routes/SignUpScreen/slice/verifyOtp';
import {
  callResendOtp,
  resendOtpInfo,
} from 'routes/SignUpScreen/slice/resendOtp';
import * as RootNavigation from '../../navigation/rootNavigation';
import {Colors} from '../../style';
import routes from 'routes';

const VerifyEmail = () => {
  const {t} = useTranslation();
  const [digit1, setDigit1] = useState<number>();
  const [digit2, setDigit2] = useState<number>();
  const [digit3, setDigit3] = useState<number>();
  const [digit4, setDigit4] = useState<number>();
  const [digit5, setDigit5] = useState<number>();
  const [digit6, setDigit6] = useState<number>();

  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const fourthRef = useRef();
  const fifthRef = useRef();
  const sixthRef = useRef();
  const {signUpData} = useSignUpContext();
  let email = signUpData?.email;
  email = email.substring(0, 4) + '*****' + email.slice(-3);
  const [timer, setTimer] = useState(120);
  const [timerValue, setTimerValue] = useState('in 02:00');
  const [isDisable, setDisable] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const {isVerifyOtpLoading, verifyOtpSuccess} = useAppSelector(verifyOtpInfo);
  const {isReSendOtpLoading, reSendOtpSuccess} = useAppSelector(resendOtpInfo);

  useEffect(() => {
    if (digit1 && digit2 && digit3 && digit4 && digit5 && digit6) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [isDisable, digit1, digit2, digit3, digit4, digit5, digit6]);

  const verifyEmailFunction = () => {
    const enteredOtp = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
    const email = signUpData?.email;
    const payload = {
      emailOtp: enteredOtp,
      emailId: email,
    };
     RootNavigation.navigate(routes.VerifyOtp);
    // dispatch(callVerifyOtp(payload));
  };
  const resendOtpFunction = () => {
    const payload = {
      emailId: signUpData?.email,
    };
    // dispatch(callResendOtp(payload));
  };
  useEffect(() => {
    if (timer !== 0) {
      timeCounter();
    } else {
      setTimerValue('');
    }
  }, [timerValue]);

  const timeCounter = () => {
    setTimeout(() => {
      setTimer(timer - 1);
      console.log(timer);
      setTimerValue(() => {
        return (
          (timer <= 60 ? 'in 00:' : 'in 01:') +
          ((timer <= 60 ? timer : timer - 60).toString().length === 1
            ? '0' + (timer <= 60 ? timer : timer - 60).toString()
            : (timer <= 60 ? timer : timer - 60).toString())
        );
      });
      if (timer === 0) {
        timeCounter();
      }
    }, 1000);
  };
  useEffect(() => {
    if (reSendOtpSuccess?.message === 'OTP Sent') {
      setTimer(120);
    }
    if (verifyOtpSuccess !== undefined &&
      verifyOtpSuccess?.message !== 'OTP expired' &&
      verifyOtpSuccess?.message !== 'Invalid OTP'
    ) {
      RootNavigation.navigate(routes.VerifyOtp);
      dispatch(clearVerifyOtp());
    }
    if (
      reSendOtpSuccess !== undefined &&
      reSendOtpSuccess?.message !== 'OTP Sent'
    ) {
      Alert.alert('Error! Resend OTP Again');
    }
    if (
      verifyOtpSuccess?.message === 'OTP expired' ||
      verifyOtpSuccess?.message === 'Invalid OTP'
    ) {
      Alert.alert('Error! Invalid OTP');
    }
  }, [reSendOtpSuccess, verifyOtpSuccess]);

  return (
    <SafeAreaView style={styles.mainBody}>
       <StatusBar
          backgroundColor={Colors.Generic.white}
          barStyle={'dark-content'}
        />
      {isReSendOtpLoading || isVerifyOtpLoading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.Button.primary}
          style={styles.loader}
        />
      ) : (
        <ScrollView>
          <View style={styles.scroll}>
            <View style={styles.svg}>
              <SVGIcon
                style={styles.otpIconEl}
                icon={icons.otpVerificationEl}
                key={'icon'}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.otpRequest}>
                {t('common:otpRequestEmail') +
                  `${email}` +
                  t('common:otpRequest_1') +
                  `${timerValue}`}
              </Text>
              <View style={styles.otp}>
                <SingleInputText
                  onChange={setDigit1}
                  value={digit1}
                  reference={firstRef}
                  referenceNext={secondRef}
                />
                <View style={styles.spacer} />
                <SingleInputText
                  onChange={setDigit2}
                  value={digit2}
                  reference={secondRef}
                  referenceNext={thirdRef}
                />
                <View style={styles.spacer} />
                <SingleInputText
                  onChange={setDigit3}
                  value={digit3}
                  reference={thirdRef}
                  referenceNext={fourthRef}
                />
                <View style={styles.spacer} />
                <SingleInputText
                  onChange={setDigit4}
                  value={digit4}
                  reference={fourthRef}
                  referenceNext={fifthRef}
                />
                <View style={styles.spacer} />
                <SingleInputText
                  onChange={setDigit5}
                  value={digit5}
                  reference={fifthRef}
                  referenceNext={sixthRef}
                />
                <View style={styles.spacer} />
                <SingleInputText
                  onChange={setDigit6}
                  value={digit6}
                  reference={sixthRef}
                  referenceNext={sixthRef}
                />
              </View>
              {/* <Text style={styles.message}>{t('common:errorMessage')}</Text> */}
              <CustomButton
                title={t('common:VerifyEmail')}
                isDisable={isDisable}
                onPress={verifyEmailFunction}
                buttonStyle={styles.button}
              />
              <View style={styles.spacer} />
              <CustomButton
                title={t('common:resendOtp')}
                isDisable={false}
                onPress={resendOtpFunction}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default VerifyEmail;
