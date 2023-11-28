import {StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';
import {wp, hp} from '../../utils/commonFunctions';

const style = StyleSheet.create({
  maincontainer: {
    flex: Spacing.size1,
    backgroundColor: Colors.Generic.white,
  },
  container: {
    padding: 30,
  },
  center:{ flex: 1, justifyContent: "center", alignItems: "center", },

  row: {
    flexDirection: 'row',
    paddingTop: 60,
    paddingBottom: 20,
  },
  settingIcon: {},
  mainText: {
    paddingLeft: 20,
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Poppins-Bold',
    color: Colors.Text.black,
  },
  desc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.Text.black,
  },
  mainText1: {
    paddingLeft: 20,
    fontSize: 20,
    paddingBottom: 10,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.Text.black,
  },

  rowStyle: {
    flexDirection: 'row',
  },
  marginTop50: {
    marginTop: Spacing.size50,
  },
  yellowView: {
    backgroundColor: Colors.Button.secondary,
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 20,
    marginVertical: 15,
  },
  vectorIcon: {
    marginLeft: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 13,
  },
  backgroundNotification: {
    backgroundColor: Colors.Generic.white,
    opacity: 0.9,
    flex: 1,
    borderRadius: 5,
    elevation:4,
    shadowColor: Colors.Text.black,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 5,
    marginTop:5,
  },
  notification: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: Colors.Button.primary,
    marginHorizontal: 10,
    paddingBottom: 15,
  },
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
    backgroundColor: Colors.Generic.white,
  },
});
export default style;
