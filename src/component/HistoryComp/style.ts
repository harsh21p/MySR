import {StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  subTitle: {
    color: Colors.Button.primary,
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
  },
  view1: {
    flex: 1,
    flexDirection: 'row',
  },
  view2: {
    paddingLeft: 18,
    flex: 1,
  },
  cardItem: {
    flexDirection: 'row',
  },
  statusIcon: {
    width: 28,
    height: 28,
  },
  colFirst: {
    flexDirection: 'column',
  },
  title: {
    color: Colors.Text.black,
    fontSize: 15,
    paddingTop: 3,
    fontFamily: 'Poppins-Medium',
  },
  line: {
    height: 50,
    width: 2,
    backgroundColor: Colors.Text.black,
    alignSelf: 'center',
    borderRadius: 50,
    marginVertical: 6,
  },
  certificate: {
    width: 44,
    height: 44,
    alignSelf: 'center',
  },
  certFlex: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    paddingLeft:10,
  },
});
export default styles;
