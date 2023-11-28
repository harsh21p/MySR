import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Colors.Button.secondary,
    width: 47,
    height: 47,
    borderRadius: 50,
    padding: 5,
    paddingEnd: 7,
  },
  buttonSvg: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outer: {
    flexDirection: 'row',
  },
  titleStyle: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS==='android'? 3 : 0,
    color: Colors.Text.black,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 28,
  },
});

export default styles;
