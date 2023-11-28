import {Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({

  voiceInput: {
    fontSize: 20,
    marginBottom: 10,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  style: {
    borderWidth: 0.6,
    borderColor: Colors.Text.primary,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 17,
    borderRadius: 5,
    marginVertical: 10,
  },
  loader: {
    flex:1,
    alignSelf:'center',
    paddingLeft:10,
    zIndex: Spacing.size1,
    verticalAlign:'middle'
  },
  header: {
    height: Platform.OS === 'ios' ? 114 : 125,

    backgroundColor: Colors.Button.secondary,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  addressTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: Colors.Text.primary,
  },
  locationIcon: {
    width: 20,
    height: 24,
    alignItems: 'center',
    alignSelf: 'center',
  },
  notificationIcon: {
    width: 22,
    height: 23,
    alignSelf: 'center',
  },
  firstRow: {flexDirection: 'row'},
  column: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 7,
  },
  addressSubTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    width:'80%',
    color: Colors.Text.primary,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(27, 46, 114, 0.2)',
    flex: 1,
    marginTop: 15,
    borderRadius: 5,
    alignContent: 'space-between',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  searchIcon: {
    width: 17,
    height: 17,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
  input: {
    width: '100%',
    flex: 1,
    color: Colors.Text.primary,
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    padding: 0,
    paddingTop: Platform.OS === 'ios' ? 0 : 5,
  },
  spacer: {
    width: 1.6,
    backgroundColor: Colors.Text.primary,
    borderRadius: 50,
  },
  speechIcon: {
    width: 17,
    height: 17,
    alignSelf: 'center',
    marginHorizontal: 15,
    zIndex:1
  },
});

export default styles;
