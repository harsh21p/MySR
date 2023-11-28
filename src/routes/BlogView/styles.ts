import { color } from 'react-native-reanimated';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({
  subTitle:{
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color:Colors.Text.disable,
    padding:5,
  },
  image:{
    width:'100%',
    height:208,
    borderRadius:5,
  },
  statusBar: {
    flex: 0,
    backgroundColor: Colors.Generic.statusBar,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 19,
    fontFamily: 'Poppins-SemiBold',
    color:Colors.Text.black,
    paddingVertical:15,
  },
  scroll: {
    flex: 1,
  },
 
  mainBody: {
    flex: 1,
    backgroundColor: Colors.Generic.white,
  },

  mainHolder: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    width: '100%',
  },
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
    backgroundColor: Colors.Generic.white,
  },
  srollView:{
    padding:15,
  }
});

export default styles;
