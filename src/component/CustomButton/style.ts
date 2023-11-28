import {Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({
  text: {
    color: Colors.Button.primary,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    paddingTop: Platform.OS === 'android'? 4 : 0 ,
  },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: Colors.Button.secondary,
    padding: 10,
    width: '100%',
  },
  disableButton: {
    borderRadius: 5,
    backgroundColor: Colors.Button.disable,
    padding: 10,
    width: '100%',
  },
  disableText: {
    color: Colors.Text.disable,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    paddingTop: Platform.OS === 'android'? 4 : 0 ,
  },
});
export default styles;
