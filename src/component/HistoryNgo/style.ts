import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../style';

const styles = StyleSheet.create({
  card: {
    backgroundColor:
      Platform.OS === 'ios'
        ? Colors.Generic.cardBackground
        : Colors.Generic.cardBackground,
    marginBottom: 15,
    padding: 20,
    borderRadius: 5,
    shadowColor: Colors.Text.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default styles;
