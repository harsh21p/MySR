import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';

const styles = StyleSheet.create({
  scrollNotification:{

  },
  mainView: {
    width:'80%',
    padding: Spacing.size20,
    alignSelf: 'center',
    backgroundColor: Colors.Generic.white,
    borderRadius: Spacing.size12,
    shadowOffset: {
      height: 4,
      width: 3,
    },
    shadowOpacity: 0.4,
    shadowColor: Colors.Text.disable,
    zIndex: Spacing.size9,
    elevation: 4,
  },
  mainTitle: {
    alignSelf: 'center',
    fontSize: Spacing.size20,
    fontWeight: '700',
    color: Colors.Text.primary,
    marginTop: Spacing.size5,
  },
  desc: {
    fontSize: Spacing.size15,
    fontWeight: '400',
    color: Colors.Text.black,
    alignSelf: 'center',
    marginTop: Spacing.size15,
    textAlign:'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.size40,
  },
  btnView: {
    backgroundColor: Colors.Button.secondary,
    padding: Spacing.size10,
    width: Spacing.size90,
    alignItems: 'center',
    borderRadius: Spacing.size5,
    marginTop:15,
    alignSelf:'center'
  },
  btnView2: {
    backgroundColor: Colors.Button.secondary,
    padding: Spacing.size10,
    width: Spacing.size90,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: Spacing.size30,
    borderRadius: Spacing.size5,
  },
  btnView1: {
    backgroundColor: Colors.Text.disable,
    padding: Spacing.size10,
    width: Spacing.size90,
    alignItems: 'center',
    borderRadius: Spacing.size5,
  },
  whiteText: {
    color: Colors.Text.white,
    fontSize: Spacing.size15,
  },
  text: {
    fontSize: Spacing.size15,
    fontFamily:'Poppins-Regular',
    color:Colors.Button.primary
  },
  iconView: {
    height: 35,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom:10
  },
  iconView1: {
    height: Spacing.size50,
    width: Spacing.size30,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: Spacing.size20,
  },
  statusBar: {
    flex: 0,
    backgroundColor: Colors.Generic.statusBar,
  },
  center:{ flex: 1, justifyContent: "center", alignItems: "center", },

  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 13,
  },
  backgroundNotification: {
    backgroundColor: Colors.Generic.white,
    opacity: 0.9,
    flex: 1,
    borderRadius: 5,
    elevation: 4,
    shadowColor: Colors.Text.black,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 5,
    marginTop: 5,
  },
  notification: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: Colors.Button.primary,
    marginHorizontal: 10,
    paddingBottom: 15,
  },
  scroll: {
    flex: 1,
  },
  feed: {
    alignSelf: 'center',
  },
  mainBody: {
    flex: 1,
    backgroundColor: Colors.Generic.white,
  },
  spacer: {
    height: 30,
  },
  message: {
    fontSize: 14,
    color: Colors.Generic.success,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
  mainHolder: {
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom:10,
    width: '100%',
  },
  mainHolder1: {
    width: '100%',
  },
  loader: {
    flex: Spacing.size1,
    zIndex: Spacing.size1,
    backgroundColor: Colors.Generic.white,
  },
});

export default styles;
