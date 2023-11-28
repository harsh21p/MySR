import {StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';
import {hp, wp} from '../../utils/commonFunctions';
const styles = StyleSheet.create({
  close:{alignSelf:'flex-end'},
  mainView: {
    width: '90%',
    padding: Spacing.size20,
    alignSelf: 'center',
    backgroundColor: Colors.Generic.white,
    borderRadius: 10,
    shadowOffset: {
      height: 10 ,
      width: 5,
    },
    shadowOpacity: 0.2,
    shadowColor: Colors.Text.disable,
    zIndex: Spacing.size9,
    elevation: 5
  },
  mainTitle: {
    alignSelf: 'center',
    fontSize: Spacing.size20,
    fontWeight: '700',
    color: Colors.Text.primary,
    marginTop: Spacing.size5,
  },
  spacer:{
    height:10,
  }
 
});
export default styles;
