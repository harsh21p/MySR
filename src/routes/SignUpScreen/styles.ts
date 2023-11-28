import {Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';
import {hp, wp} from '../../utils/commonFunctions';

const styles = StyleSheet.create({
  options:{
    paddingHorizontal:15,
    paddingVertical:10,
  },
  textStyle:{
    color:Colors.Text.black,
    fontFamily:'Poppins-Regular',
    fontSize:15,
  },
  svgHolder:{
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
  holder:{
    padding:15,
    borderRadius:5,
    marginBottom:10
  },
  textView:{
    color:Colors.Button.primary
  },
  flatListHolder:{
    paddingHorizontal: 15,
    paddingTop:17
  },
  svg:{
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  input:{
    fontSize: 15, 
    width: '90%',
  },
  mainView:{
    marginTop: 0,
    paddingBottom:5,
    borderRadius: 5,
  },
  style1:{
    borderWidth: 0.6,
    borderColor: Colors.Button.secondary,
    backgroundColor: Colors.Button.secondary,
    paddingTop: Platform.OS==='android'? 5 : 14,
    paddingBottom: Platform.OS==='android'? 0 : 14,
    paddingHorizontal: 17,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  scroll:{
    height:150,paddingBottom:50
  },
  flatList:{
   
  },
  style: {
    borderWidth: 0.6,
    borderColor: Colors.Text.primary,
    paddingTop: Platform.OS==='android'? 5 : 14,
    paddingBottom: Platform.OS==='android'? 0 : 14,
    paddingHorizontal: 17,
    borderRadius: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  addAddressName: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: Colors.Button.primary,
    paddingBottom:15,
    paddingTop:5
  },
  currentLocation: {
    flexDirection: 'row',
    verticalAlign: 'top',
    paddingBottom:10,
    paddingHorizontal:5
  },
  imageCurrentLocation: {
    paddingRight: 15,
  },
  imageLocation: {
    width: 20,
    height: 20,
  },
  nameCol: {
    flex: 1,
  },
  titleAddress: {
    fontFamily: 'Poppins-Medium',
    color: Colors.Text.black,
    paddingBottom: 5,
    fontSize:13
  },
  subTitleAddress:{
    fontFamily:'Poppins-Medium',
    fontSize:9,
    color:Colors.Text.gray
  },
  buttonHolder:{
    paddingTop:20
  },

  signup: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.primary,
    textAlign: 'center',
    marginVertical: 20,
  },
  signupBold: {
    fontFamily: 'Poppins-Bold',
  },
  loginwith: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.primary,
    textAlign: 'center',
    flex: 1,
  },
  loginwithView: {
    flexDirection: 'row',
    paddingTop:30
  },
  line: {
    flex: 1,
    backgroundColor: Colors.Text.primary,
    height: 1,
    width: '100%',
    alignSelf: 'center',
  },
  iconLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  iconBackground: {
    width: 30,
    height: 30,
    borderColor: '',
    borderWidth: 0,
    borderRadius: 50,
    backgroundColor: Colors.Social.background,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  other: {
    fontSize: 12,
    color: Colors.Text.primary,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: -6,
  },
  google: {
    fontSize: 11,
    color: Colors.Text.primary,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
    backgroundColor: Colors.Generic.white,
  },

  maincontainer: {
    flex: 1,
    backgroundColor: Colors.Generic.white,
  },

  scroll:{
    alignContent: 'center',
    paddingHorizontal: 23,
    paddingTop: 36,
    paddingBottom:20,
  },

  welcomeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.Text.primary,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.Text.primary,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  imageView: {
    marginVertical: 30,
    justifyContent: 'center',
  },
  img: {
    alignSelf: 'center',
  },
  inputFirstname:{
    flex:1,
    backgroundColor:Colors.Generic.white,
    marginVertical:5
  },
  spacer:{
    width:20
  },
  rowIcon: {
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
  eyeIcon1: {
    position: 'absolute',
    alignSelf:'center',
    paddingHorizontal:14,
    paddingTop:5,
    zIndex:1,
  },

  padding:{
    paddingTop:10,
    paddingBottom:15
  },

  errorText: {color: 'red',paddingHorizontal:5},

  container: {
    paddingBottom: 20,
  },
  keyboard: {
    flex: Spacing.size1,
  },

  signUpText: {
    fontSize: Spacing.size13,
    lineHeight: Spacing.size22,
    color: Colors.Text.primary,
    marginLeft: Spacing.size20,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
 


  asterisk: {
    color: Colors.Text.error,
  },
  backgroundWhite: {backgroundColor: Colors.Generic.white},
  marginTop: {
    marginTop: Spacing.size14,
  },
  fieldStyle: {
    padding: Spacing.size2,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: Spacing.size15,
  },
  formContainer: {
    marginTop: Spacing.size25,
  },
  row: {
    flexDirection: 'row',
    flex:1,
  },
  flex1: {
    flex: 0.5,
  },
  flex2: {
    flex: 0.5,
  },
  roles: {
    marginHorizontal: Spacing.size20,
    borderWidth: 0.9,
    borderColor: Colors.Generic.textInputBorder,
    borderRadius: Spacing.size5,
    height: Platform.OS === 'android' ? 0 : hp(Spacing.size6),
    marginTop: Spacing.size20,
    width: '90%',
    color: Colors.Text.black,
    fontWeight: '500',
  },
  dropdownIcon: {
    position: 'absolute',
    marginLeft: wp(Spacing.size81),
    marginTop: hp(Spacing.size4),
  },
  btnView: {
    marginTop: hp(Spacing.size2),
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(Spacing.size2),
  },
  alreadyAccount: {
    fontSize: Spacing.size13,
    fontWeight: '400',
    fontFamily: 'Poppins',
    color: Colors.Text.primary,
  },
  login: {
    fontSize: Spacing.size13,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: Colors.Text.primary,
  },
  dropdownView: {
    borderRadius: Spacing.size5,
    padding: Spacing.size10,
    marginHorizontal: Spacing.size20,
    shadowColor: Colors.Text.black,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: Spacing.size15,
      height: Spacing.size10,
    },
    backgroundColor: Colors.Generic.backgroundPopup,
    shadowRadius: Spacing.size10,
  },
  items: {
    fontSize: Spacing.size17,
    alignSelf: 'center',
    color: Colors.Text.black,
    fontWeight: '500',
    marginTop: Spacing.size10,
    marginBottom: Spacing.size10,
  },
  horizontalLine: {
    borderBottomColor: Colors.Text.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
 
  eyeIcon2: {
    position: 'absolute',
    marginLeft: wp(Spacing.size80),
    marginTop: wp(Spacing.size8),
    zIndex: 1,
  },
  eyeIcon3: {
    position: 'absolute',
    marginTop: hp(Spacing.size22),
    marginLeft: wp(Spacing.size80),
    zIndex: 1,
  },
  uploadIcon: {
    position: 'absolute',
    marginTop: hp(Spacing.size3),
    marginLeft: wp(Spacing.size80),
  },
  modalStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    // position: 'absolute',
    alignItems: 'center',
    top: 0,
    bottom: hp(Spacing.size5),
    left: 0,
    right: 0,
  },
  modalContainer: {
    backgroundColor: Colors.Generic.white,
    height: hp(30),
    width: wp(80),
    borderRadius: Spacing.size20,
    marginRight: Spacing.size10,
    marginLeft: Spacing.size15,
  },
  text: {
    color: Colors.Button.primary,
    fontSize: Spacing.size16,
    lineHeight: 37,
    alignSelf: 'center',
  },
  cancelText: {
    color: Colors.Text.disable,
    fontSize: Spacing.size16,
    lineHeight: 37,
    paddingBottom: Spacing.size10,
    alignSelf: 'center',
  },
  viewStyle: {
    marginTop: Spacing.size50,
  },
  uploadDocModalView: {
    position: 'relative',
    bottom: 0,
  },

});
export default styles;
