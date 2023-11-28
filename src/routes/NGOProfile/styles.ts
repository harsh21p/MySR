import { Platform, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../style";
import { wp, hp } from "utils/commonFunctions";

const styles = StyleSheet.create({
  textBlack:{
    color:Colors.Text.black
  },
  paddingV: {
    paddingBottom: 20,
  },
  padding:{
    paddingVertical:5,
  },
  holder: {paddingVertical: 8},
  maincontainer: {
    flex: Spacing.size1,
    backgroundColor: Colors.Generic.white,
  },
  holderFirst: {
    paddingHorizontal: 20,
  },
  spacer: {
    height: 20,
  },
  mainView: {
    paddingHorizontal: Spacing.size20,
    paddingVertical: 10,
  },
  iconLocation: {
    paddingRight: 10,
  },
  text: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.black,
    textAlignVertical: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  center: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 0.2,
    alignContent: 'center',
    alignItems: 'center',
  },
  row3: {
    flexDirection: 'row',
    paddingVertical: 10,
  },

  row: {
    flexDirection: 'row',
  },

  ngoLogo: {
    marginTop: Spacing.size20,
    backgroundColor: Colors.Button.secondary,
    height: 150,
    width: 150,
    borderRadius: 150,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  verified: {
    height: Spacing.size20,
    width: Spacing.size20,
    alignSelf: 'center',
    marginTop: 5,
  },

  nameOfOrg: {
    fontSize: Spacing.size18,
    color: Colors.Text.primary,
    fontFamily: 'Poppins-semiBold',
    paddingRight: 15,
  },
  nonProfit: {
    fontSize: Spacing.size14,
    color: Colors.Text.black,
    fontFamily: 'Poppins-Regular',
  },
  nonProfile: {
    fontSize: Spacing.size10,
  },
  marginTop: {
    marginTop: Spacing.size20,
  },
  marginTop1: {
    marginTop: Spacing.size10,
  },
  marginLeft: {
    marginLeft: Spacing.size20,
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  btnStyle: {
    width: wp(Spacing.size24),
    padding: Spacing.size7,
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: Spacing.size14,
    color: Colors.Text.black,
    justifyContent: 'center',
  },
  rowFollow: {
    flexDirection: 'row',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  grpIcon: {
    justifyContent: 'center',
    marginRight: Spacing.size10,
  },
  followersCount: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.Text.black,
    marginRight: Spacing.size5,
  },
  followerst: {
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.black,
    marginRight: Spacing.size5,
    fontSize: 15,
  },
  bodyView: {
    backgroundColor: Colors.Generic.backgroundPopup,
    marginTop: hp(Spacing.size1),
    padding: Spacing.size10,
    marginLeft: -wp(Spacing.size3),
  },
  rows: {
    flexDirection: 'row',
    padding: Spacing.size5,
  },
  idCard: {
    marginLeft: wp(Spacing.size4),
  },

  paddingView: {
    padding: Spacing.size10,
  },
  grayText: {
    color: Colors.Text.disable,
    fontSize: Spacing.size15,
    padding: Spacing.size5,
    marginLeft: wp(Spacing.size8),
  },
  blueText: {
    color: Colors.Text.blue,
    fontSize: Spacing.size15,
    padding: Spacing.size5,
    marginLeft: wp(Spacing.size8),
  },
  loader: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical:50,
  },
  profileName: {
    fontSize: 50,
    width:'100%',
    color: Colors.Button.primary,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',  
    position:'absolute',
    paddingTop:Platform.OS==='android'?7:0,
    letterSpacing:2,
    fontFamily:'Poppins-SemiBold',
    textAlign:'center',
  },
  profilePic: {
    height: 150,
    width: 150,
    backgroundColor: Colors.Button.secondary,
    borderRadius: 150,
  },
});
export default styles;
