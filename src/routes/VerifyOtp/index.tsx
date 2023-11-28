/* eslint-disable react/react-in-jsx-scope */
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
} from 'react-native';
import SVGIcon from '../../component/SVGIcon';
import {SingleInputText} from '../../component/SingleInputText';
import CustomButton from '../../component/CustomButton';
import {useTranslation} from 'react-i18next';
import {useEffect, useRef, useState} from 'react';
import {useSignUpContext} from 'context/sign-up-context';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {callVerifyOtp, clearVerifyOtp, verifyOtpInfo} from 'routes/SignUpScreen/slice/verifyOtp';
import {
  callResendOtp,
  resendOtpInfo,
} from 'routes/SignUpScreen/slice/resendOtp';
import {Colors} from '../../style';
import routes from 'routes';
import * as RootNavigation from '../../navigation/rootNavigation';
import { callSignUp, clearSignUp, signUpInfo } from 'routes/SignUpScreen/slice/signUpVolunteer';
import { callNGOSignUp } from 'routes/SignUpScreen/slice/signUpNGO';

const VerifyOtp = () => {
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
  const {signUpData, setData} = useSignUpContext();
  let mobile = signUpData?.phoneNumber;
  mobile = mobile.substring(0, 3) + '*******' + mobile.slice(-2);
  const [timer, setTimer] = useState(120);
  const [timerValue, setTimerValue] = useState('in 02:00');
  const [isDisable, setDisable] = useState<boolean>(true);
  const {isReSendOtpLoading, reSendOtpSuccess} = useAppSelector(resendOtpInfo);
  const dispatch = useAppDispatch();
  const {isVerifyOtpLoading, verifyOtpSuccess} = useAppSelector(verifyOtpInfo);
const {isSignupLoading, signUpSuccess} = useAppSelector(signUpInfo);
  useEffect(() => {
    if (digit1 && digit2 && digit3 && digit4 && digit5 && digit6) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [isDisable, digit1, digit2, digit3, digit4, digit5, digit6]);

  useEffect(() => {
    if (timer !== 0) {
      timeCounter();
    } else {
      setTimerValue('');
    }
  }, [timerValue]);
  useEffect(() => {
    if (signUpSuccess && signUpSuccess?.id) {
      RootNavigation.navigate(routes.Dashboard);
      Alert.alert('Successfully Signed up');
      dispatch(clearSignUp());
    }
    if (signUpSuccess !== undefined && signUpSuccess?.id === undefined) {
      Alert.alert('Error! Please try again');
    }
  }, [signUpSuccess]);
  
  const callSignUpApi = () => {
    setData({...signUpData, emailVerified: true, phoneNumberVerified: true});
      
    if (
      signUpData?.organizationName !== undefined
    ) {
      dispatch(callNGOSignUp(signUpData));
    } else {
      dispatch(callSignUp(signUpData));
    }
  }
  useEffect(() => {
    if (reSendOtpSuccess?.statusCode === 200) {
      setTimer(120);
    }
    if (
      verifyOtpSuccess?.statusCode === 200 &&
      verifyOtpSuccess?.message !== 'OTP expired' &&
      verifyOtpSuccess?.message !== 'Invalid OTP'
    ) {
      callSignUpApi();
      RootNavigation.navigate(routes.Dashboard);
      dispatch(clearVerifyOtp());
    }
    if (
      reSendOtpSuccess !== undefined &&
      reSendOtpSuccess?.message !== 'OTP Sent'
    ) {
      Alert.alert('Error! Resend OTP Again');
    }
  }, [reSendOtpSuccess, verifyOtpSuccess]);

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
  const callVerifyOtpFunction = () => {
    const enteredOtp = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
    const phoneNumber = signUpData?.phoneNumber;
    const payload = {
      phoneOtp: enteredOtp,
      phoneNumber: phoneNumber,
    };
      RootNavigation.navigate(routes.TabBar);
    // dispatch(callVerifyOtp(payload));
  };
  const resendOtpFunction = () => {
    const payload = {
      phoneNumber: signUpData?.phoneNumber,
    };
    // dispatch(callResendOtp(payload));
  };
  return (
    <SafeAreaView style={styles.mainBody}>
       <StatusBar
          backgroundColor={Colors.Generic.white}
          barStyle={'dark-content'}
        />
      {isReSendOtpLoading || isVerifyOtpLoading || isSignupLoading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.Button.primary}
          style={styles.loader}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}> 
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
                {t('common:otpRequest') +
                  `${mobile}` +
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
                
                <SingleInputText
                  onChange={setDigit2}
                  value={digit2}
                  reference={secondRef}
                  referenceNext={thirdRef}
                />
              
                <SingleInputText
                  onChange={setDigit3}
                  value={digit3}
                  reference={thirdRef}
                  referenceNext={fourthRef}
                />
                <SingleInputText
                  onChange={setDigit4}
                  value={digit4}
                  reference={fourthRef}
                  referenceNext={fifthRef}
                />
                <SingleInputText
                  onChange={setDigit5}
                  value={digit5}
                  reference={fifthRef}
                  referenceNext={sixthRef}
                />
                <SingleInputText
                  onChange={setDigit6}
                  value={digit6}
                  reference={sixthRef}
                  referenceNext={sixthRef}
                />
              </View>
              {/* <Text style={styles.message}>{t('common:errorMessage')}</Text> */}
              <CustomButton
                title={t('common:verifyOtp')}
                isDisable={isDisable}
                onPress={callVerifyOtpFunction}
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

export default VerifyOtp;
