import {Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';
import {hp, wp} from 'utils/commonFunctions';

const styles = StyleSheet.create({
  centerText:{
    height:'100%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    alignSelf: 'flex-end',
    paddingBottom: 10,
  },
  spacer: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  button: {
    marginTop: 30,
  },
  maincontainer: {
    flex: Spacing.size1,
    backgroundColor: Colors.Generic.white,
  },
  mainView: {
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  mainTitle: {
    fontSize: Spacing.size22,
    fontFamily: 'Poppins-Bold',
    marginLeft: Spacing.size20,
    color: Colors.Button.primary,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  description: {
    marginLeft: 70,
  },
  bodyView: {
    marginTop: Spacing.size20,
  },
  profileView: {
    marginVertical: 25,
    backgroundColor: Colors.Button.secondary,
    height: 150,
    width: 150,
    borderRadius: 150,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  profilePic: {
    height: 150,
    width: 150,
    backgroundColor: Colors.Button.secondary,
    borderRadius: 150,
    position:'absolute'
  },
  cameraIcon: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 
    Colors.Generic.white,
    padding: 5,
    width: 40,
    height:40,
    alignSelf: 'flex-end',
    borderColor: Colors.Generic.white,
    borderWidth: 1,
    borderRadius: 50,
    position:'absolute',
    zIndex:1
  },
  description1: {
    borderWidth: 0.6,
    borderColor: Colors.Text.primary,
    height: 100,
    width: '100%',
    paddingHorizontal: 17,
    borderRadius: 5,
    paddingTop: 14,
    marginVertical: 10,
    textAlignVertical: 'top',
    textAlign: 'left',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    color: Colors.Text.black,
  },
  backgroundWhite: {backgroundColor: Colors.Generic.white},
  marginTop: {
    marginTop: Spacing.size14,
  },
  fieldStyle: {
    padding: Spacing.size2,
  },
  width: {
    width: '90%',
  },
  editIcon: {
    position: 'absolute',
    alignSelf: 'center',
    paddingRight: 13,
    paddingTop: 6,
  },
  editIcon1: {
    position: 'absolute',
    // alignSelf: 'center',
    marginTop: hp(Spacing.size3),
    paddingRight: 13,
    paddingTop: 6,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.Generic.white,
  },
  bottomView: {
    marginHorizontal: Spacing.size10,
    marginTop: Spacing.size15,
  },
  btnView: {
    alignSelf: 'center',
    marginTop: 20,
  },
  btnTitle: {
    color: Colors.Text.black,
    fontSize: Spacing.size20,
  },
  flex1: {
    flex: 0.5,
  },
  eyeIcon: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingTop: 20,
  },
  flexOne: {
    width: '100%',
  },
  saveBtn: {
    marginTop: Spacing.size20,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    marginLeft: Spacing.size40,
  },
  errorText: {color: 'red', marginLeft: 22, marginTop: Spacing.size5},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  mainView1: {
    padding: Spacing.size20,
    alignSelf: 'center',
    marginHorizontal: Spacing.size20,
    backgroundColor: Colors.Generic.white,
    borderRadius: Spacing.size12,
    shadowOffset: {
      height: 4,
      width: 3,
    },
    shadowOpacity: 0.4,
    elevation: 4,
    shadowColor: Colors.Text.disable,
    zIndex: Spacing.size9,
    alignItems: 'center',
  },
  rowIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
    backgroundColor: Colors.Generic.white,
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
    bottom: 0,
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
  profileName: {
    fontSize: 50,
    color: Colors.Button.primary,
    paddingTop:Platform.OS==='android'?7:0,
    letterSpacing:2,
    fontFamily:'Poppins-SemiBold',
    textAlign:'center', 
    alignSelf:'center',
    zIndex:1
  },
});
export default styles;
