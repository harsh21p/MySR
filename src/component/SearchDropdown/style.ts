import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  profileName:{
    fontSize: 8,
    width:'100%',
    color: Colors.Button.primary,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',  
    position:'absolute',
    paddingTop:Platform.OS==='android'?4:1,
    letterSpacing:2,
    paddingLeft:2,
    fontFamily:'Poppins-SemiBold',
    textAlign:'center',

  },
  yellowView: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.Button.secondary,
  },
  image:{
    width:30,
    height:30,
    borderRadius:40,
  },
  name:{
    alignSelf:'center',
    paddingHorizontal:15,
    fontFamily:"Poppins-Medium",
    fontSize:13,
    color:Colors.Text.black,
  },
  nameHeadline:{
    alignSelf:'center',
    paddingHorizontal:15,
    paddingVertical:6,
    fontFamily:"Poppins-Medium",
    fontSize:13,
    color:Colors.Text.black,
  },
  title: {
    paddingBottom:10,
    fontFamily:"Poppins-Medium",
    fontSize:13,
    color:Colors.Text.black,
  },

  titleSecond:{
    paddingVertical:10,
    fontFamily:"Poppins-Medium",
    fontSize:13,
    color:Colors.Text.black,
  },
  nHolder:{
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginTop: 5,
    borderRadius: 5,
    alignContent: 'center',
    padding: 10,
  },

  scrollNearby:{
    // height:200,
    // flexGrow:0,
  },

  card: {
    width:'92%',
    // height:300,
    backgroundColor: Colors.Button.secondary,
    marginTop: 2,
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    zIndex:1,
    position:'absolute',
    alignSelf:'center',
    flexGrow:0,
  },
  
  typeOfDonationText: {
    fontSize: 7,
    fontFamily: 'Poppins-Regular',
    color: Colors.Text.black,
    alignSelf: 'center',
    paddingLeft: 5,
  },
  
});
export default styles;
