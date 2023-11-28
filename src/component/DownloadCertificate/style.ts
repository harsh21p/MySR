import { StyleSheet } from "react-native";
import { Spacing,Colors } from "../../style";
import { hp, wp } from "utils/commonFunctions";
const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: Spacing.size10,
  },
  backArrow: {
    backgroundColor: Colors.Button.secondary,
    borderRadius: Spacing.size50,
    width: wp(Spacing.size11),
    height: hp(Spacing.size5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  mainTitle: {
    fontSize: Spacing.size22,
    fontWeight: 'bold',
    marginLeft: Spacing.size20,
    alignSelf: 'center',
  },
  congrats: {
    color: Colors.Text.blue,
    fontSize: Spacing.size27,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: hp(Spacing.size6),
  },
  imageView: {
    padding: Spacing.size10,
    height: hp(Spacing.size45),
    marginHorizontal: Spacing.size10,
    marginTop: hp(Spacing.size8),
    backgroundColor: Colors.Generic.lightGray,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  marginTop: {
    marginTop: hp(Spacing.size10),
    alignSelf: 'center',
  },
});
export default styles;