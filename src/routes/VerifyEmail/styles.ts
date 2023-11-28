import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor:Colors.Generic.white,
  },
  otpIconEl: {
    alignSelf: 'center',
  },
  svg: {
    alignSelf: 'center',
  },
  otpRequest: {
    fontSize: 14,
    color: Colors.Text.primary,
    fontFamily: 'Poppins-Medium',
    lineHeight: 40,
  },
  container: {
    padding: 40,
  },
  scroll: {
    justifyContent: 'center',
    alignContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  otp: {
    width:'100%',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 30,
    justifyContent:'space-between',
  },
  spacer: {
    padding: 10,
  },
  message: {
    fontSize: 13,
    color: Colors.Text.error,
    fontFamily: 'Poppins-Regular',
    paddingBottom: 30,
  },
  button: {
    alignSelf: 'center',
    width: '100%',
  },
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
    backgroundColor: Colors.Generic.white,
  },
});

export default styles;
