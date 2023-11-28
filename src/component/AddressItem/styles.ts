import {StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  currentLocation: {
    flexDirection: 'row',
    verticalAlign: 'top',
    padding: 10,
  },
  imageCurrentLocation: {
    paddingRight: 21,
  },
  imageLocation: {
    width: 33,
    height: 33,
  },
  nameCol: {
    flex: 1,
  },
  titleAddress: {
    fontFamily: 'Poppins-Medium',
    color: Colors.Text.black,
    paddingBottom: 10,
  },
  subTitleAddress:{
    fontFamily:'Poppins-Medium',
  },
});

export default styles;
