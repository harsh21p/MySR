import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: Colors.Generic.white,
  },
  backButton: {
    paddingLeft: 20,
  },
  backButtonSvg: {
    flex: 1,
    paddingTop: 5,
    alignItems: 'flex-end',
  },
  scroll: {
    justifyContent: 'center',
    alignContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    paddingTop: 20,
  },
  svg: {
    flexDirection: 'row',
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 50,
    alignContent: 'center',
    flex: 1,
  },
  forgetPasswordEl: {},
  forgetPassword: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.Text.primary,
    marginBottom: 30,
    paddingTop: 40,
  },
  spacer: {
    height: 30,
  },
  message: {
    fontSize: 14,
    color: Colors.Generic.success,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
  errorMessage: {
    fontSize: 14,
    color: Colors.Text.error,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
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
