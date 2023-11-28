import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';
import { wp } from 'utils/commonFunctions';

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor:Colors.Generic.white
  },
  loginIconEl: {
    alignSelf: 'center',
  },
  svg: {
    alignSelf: 'center',
  },
  loginText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.Text.primary,
    marginBottom: 10,
  },
  login: {
    padding: 50,
  },
  forgetpass: {
    alignSelf: 'flex-end',
    color: Colors.Text.primary,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginVertical: 3,
    marginBottom: 24,
  },
  scroll: {
    justifyContent: 'center',
    alignContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  signup: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.primary,
    textAlign: 'center',
    marginVertical: 20,
  },
  signupBold: {
    fontFamily: 'Poppins-Bold',
  },
  loginwith: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.primary,
    textAlign: 'center',
    flex: 1,
  },
  loginwithView: {
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    backgroundColor: Colors.Text.primary,
    height: 1,
    width: '100%',
    alignSelf: 'center',
  },
  iconLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  iconBackground: {
    width: 30,
    height: 30,
    borderColor: '',
    borderWidth: 0,
    borderRadius: 50,
    backgroundColor: Colors.Social.background,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  other: {
    fontSize: 12,
    color: Colors.Text.primary,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: -6,
  },
  google: {
    fontSize: 11,
    color: Colors.Text.primary,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
  },
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
    backgroundColor: Colors.Generic.white,
  },
  rowIcon: {
    flexDirection: 'row',
    justifyContent:'flex-end'
  },
  eyeIcon1: {
    position: 'absolute',
    alignSelf:'center',
    paddingHorizontal:14
  },
  input: {
    flex: Spacing.size1,
  },
});

export default styles;
