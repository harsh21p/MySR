import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  style: {
    borderWidth: 0.6,
    borderColor: Colors.Text.primary,
    paddingTop: 14,
    paddingBottom: Platform.OS === 'ios'? 14 : 11,
    paddingHorizontal: 17,
    borderRadius: 5,
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: Colors.Text.black
  },
});

export default styles;
