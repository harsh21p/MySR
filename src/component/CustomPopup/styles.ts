import {StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';
import {hp, wp} from '../../utils/commonFunctions';
const styles = StyleSheet.create({
  mainView: {
    width:'80%',
    padding: Spacing.size20,
    alignSelf: 'center',
    backgroundColor: Colors.Generic.white,
    borderRadius: Spacing.size12,
    shadowOffset: {
      height: 4,
      width: 3,
    },
    shadowOpacity: 0.4,
    shadowColor: Colors.Text.disable,
    zIndex: Spacing.size9,
    elevation: 4,
  },
  mainTitle: {
    alignSelf: 'center',
    fontSize: Spacing.size20,
    fontWeight: '700',
    color: Colors.Text.primary,
    marginTop: Spacing.size5,
  },
  desc: {
    fontSize: Spacing.size15,
    fontWeight: '400',
    color: Colors.Text.black,
    alignSelf: 'center',
    marginTop: Spacing.size15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.size40,
  },
  btnView: {
    backgroundColor: Colors.Button.secondary,
    padding: Spacing.size10,
    width: Spacing.size90,
    alignItems: 'center',
    borderRadius: Spacing.size5,
  },
  btnView2: {
    backgroundColor: Colors.Button.secondary,
    padding: Spacing.size10,
    width: Spacing.size90,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: Spacing.size30,
    borderRadius: Spacing.size5,
  },
  btnView1: {
    backgroundColor: Colors.Text.disable,
    padding: Spacing.size10,
    width: Spacing.size90,
    alignItems: 'center',
    borderRadius: Spacing.size5,
  },
  whiteText: {
    color: Colors.Text.white,
    fontSize: Spacing.size15,
  },
  text: {
    fontSize: Spacing.size15,
    fontFamily:'Poppins-Regular',
    color:Colors.Button.primary
  },
  iconView: {
    height: Spacing.size30,
    width: Spacing.size30,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: Spacing.size20,
  },
  iconView1: {
    height: Spacing.size50,
    width: Spacing.size30,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: Spacing.size20,
  },
});
export default styles;
