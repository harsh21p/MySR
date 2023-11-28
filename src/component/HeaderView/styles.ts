import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  title:{
    fontFamily:'Poppins-SemiBold',
    fontSize:15,
    color: Colors.Button.primary
  },
  svg:{
    paddingVertical:10,
    paddingHorizontal:5,
  },
  columnHolder:{
    paddingLeft:20
  },
  holder: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  iconText: {
    width: 15,
    height: 12,
    alignItems:'center',
    
  },
  icon: {
    width: 20,
    flex: 1,
    alignSelf: 'center',
  },
  text: {
    fontSize: 9,
    paddingHorizontal: 6,
    fontFamily: 'Poppins-Regular',
    color:Colors.Text.disable
  },
  header: {
    flexDirection:'row',
    backgroundColor: Colors.Button.secondary,
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  firstRow: {
    flexDirection: 'row',
  },
});

export default styles;
