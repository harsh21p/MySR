import {Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
    padding: 30,
  },
  yellowView: {
    width: 35,
    height: 35,
    borderRadius: 35,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.Button.secondary,
  },
  press: {justifyContent: 'flex-end'},
  profileName: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: Colors.Button.primary,
  },
  svg: {
    width: 10,
    height: 10,
    alignSelf: 'flex-end',
  },
  mainContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  rowThird: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
  },
  message: {
    flex: 1,
    paddingTop: 10,
  },
  viewHolder: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 12,
  },
  holder: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  iconText: {
    width: 15,
    height: 9,
  },
  icon: {
    width: 15,
    flex: 1,
    alignSelf: 'center',
  },
  text: {
    fontSize: 7,
    paddingHorizontal: 6,
    fontFamily: 'Poppins-Regular',
    paddingRight: 20,
    color: Colors.Text.black,
    paddingRight:20,
  },
  card: {
    backgroundColor:
      Platform.OS === 'ios'
        ? Colors.Generic.cardBackground
        : Colors.Generic.cardBackground,
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: Colors.Text.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 5,
  },
  holderProfile: {
    flexDirection: 'row',
    flex: 2,
  },
  type: {
    flexDirection: 'row',
    alignSelf: 'center',
    flex: 1,
  },
  spacer: {
    width: 14,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: Colors.Text.black,
  },
  subTitle: {
    fontSize: 7,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.black,
  },
  colView: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  firstRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  typeOfDonation: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  typeOfDonationText: {
    fontSize: 7,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.black,
    alignSelf: 'center',
    paddingLeft: 5,
  },
  typeOfRequest: {
    fontSize: 7,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.black,
    alignSelf: 'center',
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  buttonHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button_1: {},
  button_2: {},
});
export default styles;
