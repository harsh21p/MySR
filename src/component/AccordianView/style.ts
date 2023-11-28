import { Platform, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../style";
import { hp, wp } from "utils/commonFunctions";

const styles = StyleSheet.create({
  appBar2:{
    backgroundColor:Colors.Generic.backgroundPopup,
    borderRadius:5,
  },
  row2:{
    flexDirection:'row',
    backgroundColor:Colors.Button.secondary,
    paddingTop: Platform.OS === 'android'? 13 : 14,
    paddingBottom: Platform.OS === 'android'? 8 : 14,
    paddingHorizontal:14,
    borderRadius:5,
    justifyContent:'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appBar: {
    paddingHorizontal:15,
    backgroundColor: Colors.Button.secondary,
    borderRadius: 5,
    paddingTop: Platform.OS === 'android'? 13 : 14,
    paddingBottom: Platform.OS === 'android'? 8 : 14,
  },
  titleStyle: {
    color: Colors.Button.primary,
    fontSize: 18,
    fontFamily:'Poppins-Medium'

  },
  iconView: {
    alignSelf: 'center',
  },
  bodyView: {
    padding: Spacing.size10,
  },
});
export default styles;