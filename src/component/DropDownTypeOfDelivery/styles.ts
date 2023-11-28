import {Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({
  flatListItem: {
    padding: 5,
    marginHorizontal: 15,
    borderRadius: 2,
    alignSelf: 'center',
    color: Colors.Text.black,
  },
  selectedFlatListItem: {
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 2,
    alignSelf: 'center',
    color: Colors.Text.black,
    fontSize: Spacing.size15,
    fontWeight: 'bold',
  },
  flatListView: {
    padding: 5,
  },
  flatListHolder: {
    paddingHorizontal: 10,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconSvg: {width: 15, height: 15, alignSelf: 'center'},
  icon: {
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
  mainView: {
    marginVertical: 10,
    borderRadius: 5,
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
  scroll: {
    height: 100,
    width: '50%',
    flexGrow: 0,
  },
  scroll1: {
    height: 150,
    width: '25%',
    paddingHorizontal: 5,
  },
  scroll2: {
    height: 150,
    width: '25%',
  },
});

export default styles;
