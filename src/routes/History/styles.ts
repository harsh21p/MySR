import {Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';
import { hp, wp } from 'utils/commonFunctions';

const styles = StyleSheet.create({
  card: {
    backgroundColor:
      Platform.OS === 'ios'
        ? Colors.Generic.cardBackground
        : Colors.Generic.cardBackground,
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    shadowColor: Colors.Text.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 5,
  },
  popupTitle: {
    alignSelf: 'center',
    fontSize: Spacing.size20,
    fontWeight: '700',
    color: Colors.Text.primary,
    marginTop: Spacing.size5,
    marginBottom: 10,
  },
  scrollView: {
    height: '80%',
  },
  padding: {
    // marginBottom: Platform.OS === 'ios' ? 100 : 90,
  },
  scroll: {
    height: '70%',
  },
  mobile: {
    paddingVertical: 10,
  },
  button: {
    alignSelf: 'center',
    width: '100%',
    marginVertical: 20,
  },
  description: {
    borderWidth: 0.6,
    borderColor: Colors.Text.primary,
    height: 100,
    paddingHorizontal: 17,
    borderRadius: 5,
    paddingTop: 14,
    marginVertical: 10,
    textAlignVertical: 'top',
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: Colors.Text.black,
  },
  cardView: {
    width: '90%',
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

  close: {alignSelf: 'flex-end'},

  statusBar: {
    flex: 0,
    backgroundColor: Colors.Generic.statusBar,
  },
  mainBody: {
    flex: 1,
  },
  mainView: {
    paddingHorizontal: 9,
  },
  mainHolder: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    paddingBottom: 10,
    width: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
    padding: 30,
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
    bottom: hp(Spacing.size15),
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
