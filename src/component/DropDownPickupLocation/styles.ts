import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  svgHolder:{
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
  loader:{
    flex:1,
    padding:30,
  },
  flatListHolder:{
    paddingHorizontal: 15,
    paddingTop:17
  },
  svg:{
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  input:{
    fontSize: 15, width: '90%',
    color:Colors.Text.black
  },
  mainView:{
    marginVertical: 10,
    borderRadius: 5,
  },
  style1:{
    borderWidth: 0.6,
    borderColor: Colors.Button.secondary,
    backgroundColor: Colors.Button.secondary,
    paddingTop: Platform.OS==='android'? 6 : 14,
    paddingBottom: Platform.OS==='android'? 0 : 14,
    paddingHorizontal: 17,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  scroll:{
    height:150,paddingBottom:50
  },
  flatList:{
   
  },
  style: {
    borderWidth: 0.6,
    borderColor: Colors.Text.primary,
    paddingTop: Platform.OS==='android'? 6 : 14,
    paddingBottom: Platform.OS==='android'? 0 : 14,
    paddingHorizontal: 17,
    borderRadius: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  addAddressName: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: Colors.Button.primary,
    paddingBottom:15,
    paddingTop:5
  },
  currentLocation: {
    flexDirection: 'row',
    verticalAlign: 'top',
    paddingBottom:10,
    paddingHorizontal:5
  },
  imageCurrentLocation: {
    paddingRight: 15,
  },
  imageLocation: {
    width: 20,
    height: 20,
  },
  nameCol: {
    flex: 1,
  },
  titleAddress: {
    fontFamily: 'Poppins-Medium',
    color: Colors.Text.black,
    paddingBottom: 5,
    fontSize:13
  },
  subTitleAddress:{
    fontFamily:'Poppins-Medium',
    fontSize:9,
    color:Colors.Text.gray
  },
});

export default styles;
