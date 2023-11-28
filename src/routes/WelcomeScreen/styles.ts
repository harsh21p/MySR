import {Dimensions, StyleSheet, Platform} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: Colors.Generic.white,
  },
  svg: {
    paddingVertical: 50,
    alignSelf: 'center',
  },
  scroll: {
    alignContent: 'center',
    paddingHorizontal: 23,
    paddingTop: 36,
    paddingBottom:20,
  },
  welcomeIconEl: {},
  textView: {},
  welcomeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.Text.primary,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.Text.primary,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  haveEmail: {
    borderWidth: 0.6,
    borderColor: Colors.Text.primary,
    paddingBottom: 10,
    paddingHorizontal: 17,
    borderRadius: 5,
    marginVertical: 10,
    paddingTop: Platform.OS === 'ios' ? 10 : 14,
    color: Colors.Text.primary,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  or: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    paddingVertical: 15,
  },
  inputs: {
    paddingHorizontal: 28,
  },
  alignView: {
    justifyContent: 'space-around',
  },
});

export default styles;
