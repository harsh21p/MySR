import {Dimensions, Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    flex: 1,
    paddingBottom: 215

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

  type: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
    backgroundColor: Colors.Generic.white,
  },
});
export default styles;
