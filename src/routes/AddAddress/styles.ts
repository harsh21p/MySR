import { BackButton } from 'component/BackButton';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../style';
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
  statusBar:{
    flex:0,
    backgroundColor:Colors.Generic.statusBar
  },
  loader:{
    flex:1,
    alignSelf:'center',
    justifyContent:'center',
    alignContent:'center'
  },
  flex:{
    flexGrow:0
  },
  backButton:{
    padding:20,
    paddingBottom:30,
  },
  mainBody: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal:35
  },
  line:{
    backgroundColor: Colors.Text.gray,
    height: 1,
    width: '100%',
    alignSelf: 'center',
  },
  scroll: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center'
  },
  arrow:{
    width:28,
    paddingLeft:15
  },
  addAddress:{
    alignSelf:'center',
    alignItems:'center',
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-evenly',
  },
  addAddressName:{  
    fontSize:16,
    fontFamily:'Poppins-Medium',
    color:Colors.Text.black,
  },
  plusIcon:{
    width:30,
    height:30,
    marginRight:20
  },
  lineHelper:{
    flexDirection:'row',
    paddingVertical:15
  },
  spacer:{
    height:20
  }
});

export default styles;
