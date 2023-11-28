import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({
  statusBar: {
    flex: 0,
    backgroundColor: Colors.Generic.statusBar,
  },

  mainBody: {
    flex: 1,
    backgroundColor: Colors.Generic.white,
  },
  header: {
    flex: 1,
    padding: 20,
  },
  text: {
    alignSelf: 'center',
    top: 48,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    color: Colors.Text.certBlue,
    marginBottom: 80,
  },
  img: {
    width: '100%',
    height: 400,
  },
  imgview: {
    height: 400,
    width: '100%',
  },
  imgView1: {
    marginTop: Spacing.size50,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 400,
    width: '100%',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    marginTop: Spacing.size20,
  },
});

export default styles;
