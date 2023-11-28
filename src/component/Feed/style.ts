import {Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';
import {hp} from 'utils/commonFunctions';

const styles = StyleSheet.create({
  scrollMain: {
    flex: 1,
    marginBottom: 230,
  },

  donateNowEl: {
    alignSelf: 'center',
    height: 200,
    flex: 1,
    // paddingHorizontal: 30,
    // backgroundColor:'blue'
  },

  scrollNearby: {
    paddingHorizontal: 10,
    marginBottom: 0,
    paddingBottom: 0,
    // backgroundColor: 'red',
  },

  innerView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    height: 200,
    paddingVertical: 20,
    // backgroundColor:'green',
    // flex:1,
    // width:'100%'
  },
  // /////////////////////////////////

  nHolder: {
    width:110,
    paddingHorizontal: 0,
    flexDirection: 'column',
    // backgroundColor: Colors.Generic.backgroundPopup,
    borderRadius: 5,
    padding: 1,
    margin: 1,
    // elevation: 3,
    shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 3},
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  name: {
    paddingTop: Platform.OS === 'android' ? 15 : 10,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    padding: 10,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    color: Colors.Text.primary,
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  yellowView: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.Button.secondary,
  },
  profileName: {
    fontSize: 14,
    color: Colors.Button.primary,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 4 : 1,
    paddingLeft: 2,
    letterSpacing: 2,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },

  // /////////////////////////////////

  nHolderNews: {
    paddingHorizontal: 15,
  },

  newsImg: {
    position: 'relative',
    width: '100%',
    height: 134,
    borderRadius: 5,
  },

  newsTitle: {
    color: Colors.Generic.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },

  newsSubTitle: {
    color: Colors.Generic.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    paddingTop: 3,
  },

  grd: {
    height: 75,
    width: '100%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingLeft: 18,
    paddingRight: 80,
    paddingVertical: 5,
    position: 'absolute',
  },

  nNHolder: {
    position: 'relative',
    justifyContent: 'flex-end',
  },

  // ////////////////////////////////

  scroll: {
    flex: 1,
  },

  feedTitleOne: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    paddingTop: 5,
    color: Colors.Text.black,
  },
  blogView: {
    width: 125,
    marginHorizontal: 5,
    padding: 6,
    backgroundColor: Colors.Generic.backgroundPopup,
    borderRadius: 5,
  },
  blogImg: {
    height: 74,
    width: '100%',
    borderRadius: 5,
  },
  blogTitle: {
    fontSize: 8,
    fontFamily: 'Poppins-Medium',
    color: Colors.Text.black,
    paddingVertical: 10,
  },
  blogSub: {
    fontSize: 7,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.black,
  },
  blogSee: {
    fontSize: 7,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.blue,
    alignSelf: 'flex-end',
    paddingTop: 5,
  },
});
export default styles;
