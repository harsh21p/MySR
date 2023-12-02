import {Platform, StyleSheet} from 'react-native';
import {Colors, Spacing} from '../../style';
import {hp} from 'utils/commonFunctions';

const styles = StyleSheet.create({
nHolderNews: {
    paddingHorizontal: 15,
  },

  newsImg: {
    position: 'relative',
    width: '100%',
    height: 134,
    borderRadius: 5,
  },

  newsTitle: {
    color: Colors.Generic.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },

  newsSubTitle: {
    color: Colors.Generic.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    paddingTop: 3,
  },

  grd: {
    height: 75,
    width: '100%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingLeft: 18,
    paddingRight: 80,
    paddingVertical: 5,
    position: 'absolute',
  },

  nNHolder: {
    position: 'relative',
    justifyContent: 'flex-end',
  },
});
export default styles;
