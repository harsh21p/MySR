import {Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({
  padding:{paddingVertical:10},
  donateNowEl: {
    alignSelf: 'center',
    paddingTop: 30,
    paddingBottom: 215
  },

  scroll: {
    flex: 1,
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
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
  },
  input1: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    width: '90%',
    color: Colors.Text.black,
  },
  input2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    width: '90%',
    color: Colors.Text.black,
  },
  view2: {
    borderWidth: 0.6,
    borderColor: Colors.Button.secondary,
    backgroundColor: Colors.Button.secondary,
    paddingTop: Platform.OS === 'android' ? 6 : 14,
    paddingBottom: Platform.OS === 'android' ? 0 : 14,
    paddingHorizontal: 17,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  style: {
    borderWidth: 0.6,
    borderColor: Colors.Text.primary,
    paddingTop: Platform.OS === 'android' ? 6 : 14,
    paddingBottom: Platform.OS === 'android' ? 0 : 14,
    paddingHorizontal: 17,
    borderRadius: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default styles;
