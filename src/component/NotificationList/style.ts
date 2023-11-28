import {StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  height:{
    height:10
  },
  listItem: {
    flexDirection: 'row',
  },
  listItemMain: {
    backgroundColor: Colors.Generic.white,
    borderRadius: 5,
    padding: 15,
    shadowColor: Colors.Text.black,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingBottom: 10,
    elevation: 3,
    margin: 5,
  },
  colView: {
    paddingHorizontal: 15,
  },
  icon: {
    width: 26,
    height: 25,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: Colors.Text.black,
    paddingTop: 2,
  },
  subTitle: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 10,
    paddingRight:15,
    paddingTop: 5,
    color: Colors.Button.primary,
  },
  show: {
    fontSize: 11,
    paddingTop: 5,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.blue,
    alignSelf: 'flex-end',
  },
});
export default styles;
