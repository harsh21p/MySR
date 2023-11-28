import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  text2: {
    alignSelf: 'center',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    paddingTop:Platform.OS =='android'? 4 : 0,
  },
  press2: {
    borderRadius: 5, 
    paddingVertical: 7, 
    flex: 1
  },
  text: {
    alignSelf: 'center',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    paddingTop:Platform.OS =='android'? 4 : 0,
  },
  press: {
    borderRadius: 5, 
    paddingVertical: 7, 
    flex: 1
  },
  buttonHolder: {
    width: '100%',
    backgroundColor: Colors.Button.secondary,
    borderRadius: 5,
    padding: 7,
    flexDirection: 'row',
  },

  spacerButton: {
    width: 7,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 11,
    color: Colors.Button.secondary,
    fontFamily: 'Poppins-Medium',
  },
});
export default styles;
