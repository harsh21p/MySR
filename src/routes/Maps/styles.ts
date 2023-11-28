import {Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({
  backGround: {
    borderRadius: 5,
    elevation: 3,
    shadowColor: Colors.Text.black,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 5,
    marginTop: 5,
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  location: {
    width: 20,
    height: 20,
  },
  back: {
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'android' ? 20 : 50,
  },
  address: {
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.Button.primary,
    padding: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.Text.black,
  },
  padding: {
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 5 : 8,
    paddingBottom: Platform.OS === 'android' ? 1 : 8,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Colors.Button.secondary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    shadowColor: Colors.Text.black,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 5,
    margin: 5,
    elevation: 3,
  },
  textButton: {
    paddingLeft: 14,
    fontSize: 14,
    color: Colors.Text.black,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
  },
  spacer: {
    height: 10,
  },
  statusBar: {
    flex: 0,
    backgroundColor: Colors.Generic.statusBar,
  },
  mainBody: {
    flex: 1,
  },
  mainView: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    alignContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    flex: 1,
    elevation: 3,
  },
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
  },

  loaderAddress: {
    height: '40%'
  },
});

export default styles;
