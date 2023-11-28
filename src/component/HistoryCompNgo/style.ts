import {StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  if: {
    width: 30,
    height: 44,
    alignSelf: 'center',
  },
  ifNot: {
    width: 44,
    height: 44,
    alignSelf: 'center',
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
  description: {
    borderWidth: 0.6,
    borderColor: Colors.Text.primary,
    height: 80,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingTop: 10,
    fontSize: 12,
    marginVertical: 10,
    textAlignVertical: 'top',
    textAlign: 'left',
    color:Colors.Text.black,
    justifyContent: 'flex-start',
  },
  spacer: {
    width: 14,
  },
  buttonHolder: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10,
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
  subTitle: {
    color: Colors.Button.primary,
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.Text.black,
    alignSelf: 'center',
    borderRadius: 50,
    marginVertical: 6,
  },
  certFlex: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
});
export default styles;
