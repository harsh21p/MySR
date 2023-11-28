import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    paddingTop: Platform.OS === 'ios' ? 0 : 4,
    color: Colors.Button.secondary,
    paddingLeft: 12,
  },
  icon: {
    width: 18,
    height: 18,
  },
  holder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Button.primary,
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
});
export default styles;
