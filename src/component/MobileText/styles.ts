import { color } from 'react-native-reanimated';
import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    position:'absolute',
    zIndex: 1,
  },
  red:{
    color: Colors.Text.error,
    fontFamily: 'Poppins-Regular',
    fontSize: Platform.OS ==='ios'? 14 : 16,
  },
  placeholder1:{
    paddingHorizontal: 14,
    paddingTop: Platform.OS ==='ios'? 14 : 16,
    paddingBottom: Platform.OS ==='ios'? 14 : 0,
    fontFamily: 'Poppins-Regular',
    fontSize: Platform.OS ==='ios'? 14 : 14,
    color:Colors.Text.gray,
    alignSelf:'center',
    textAlignVertical:'center',
    
  },
  style: {
    borderWidth: 0.6,
    borderColor: Colors.Text.primary,
    borderRadius: 5,
    flexDirection: 'row',
  },
  code: {
    flex: 0.5,
    alignSelf: 'center',
    textAlignVertical:'center',
    paddingRight: 5,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.primary,
    paddingTop: Platform.OS==='android' ? 5 : 0,
    fontSize: Platform.OS ==='ios'? 14 : 16,
  },
  spacer: {
    width: 0.6,
    backgroundColor: Colors.Text.primary,
  },
  flagIcon: {
    flex: 0.3,
    alignSelf: 'center',
    paddingVertical: 14,
    paddingLeft: 12,
  },
  placeholder: {
    flex: 3,
    paddingHorizontal: 14,
    paddingTop: Platform.OS ==='ios'? 14 : 5,
    paddingBottom: Platform.OS ==='ios'? 14 : 0,

  },
  input:{
    color:Colors.Text.black,
    fontFamily: 'Poppins-Regular',
    fontSize: Platform.OS ==='ios'? 14 : 16,
  },
});

export default styles;
