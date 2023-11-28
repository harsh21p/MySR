import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  flatView:{
    flexDirection: 'row',
    padding: 5,
  },
  loader:{
    flex:1,
    padding:30,
  },
  flatSubViewI:{
    borderWidth: 1,
    borderColor: Colors.Text.black,
    
    height: 25,
    width: 25,
    borderRadius: 3,
    justifyContent: 'space-around',
  },
  checkI:{
    color:Colors.Text.black,
    borderColor:Colors.Text.black,
    height: 22, width: 22, alignSelf: 'center'
  },
  check:{
    color:Colors.Text.black,
    borderColor:Colors.Text.black,
    // height: 22, width: 22, alignSelf: 'center'
},
  flatSubView:{
    
    // borderWidth: 1,
    borderColor: Colors.Text.black,
    color:Colors.Text.black
    // height: 25,
    // width: 25,
    // borderRadius: 3,
    // justifyContent: 'space-around',
  },
  value:{
    padding: 5,
    paddingLeft: 15,
    borderRadius: 2,
    alignSelf: 'center',
    color:Colors.Text.black
  },
  subText:{
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    color: Colors.Button.primary,
    padding: 5,
  },
  slider:{
    flex: 1,
    alignSelf: 'center',
  },
  nestedView:{
    flexDirection: 'row',
    flex: 1,
  },
  subView:{
    paddingHorizontal: 15,
    paddingTop:15
  },
  svgHolder:{
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
  svg:{
    width: 15,
              height: 15,
              alignSelf: 'center',
  },
  input:{
    fontSize: 15, fontFamily: 'Poppins-Medium', width: '90%',color:Colors.Text.black
  },
  mainView:{
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
  scroll:{
    height:150,
    paddingHorizontal:10,
    paddingTop:10
  },
  flatList:{
    
  },
  press:{
    marginVertical: 10,
    borderRadius: 5,

  }
});

export default styles;
