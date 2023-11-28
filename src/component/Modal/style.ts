import {StyleSheet} from 'react-native';
import { Colors } from '../../style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    color: Colors.Text.white,
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 28,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: Colors.Text.white,
    marginTop: 16,
    marginBottom: 20,
  },
  btnRight: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalstyle: {
    marginHorizontal: 1,
    borderRadius: 6,
    backgroundColor: 'blue',
    justifyContent: 'center',
    textAlign: 'center',
  },
  Viewstyle: {
    flex: 1,
  },
  cancelstyle: {
    alignSelf: 'flex-end',
  },
  svgstyle: {
    bottom: 15,
    left: 16,
  },
  titlestyle: {
    color: '#0B41CD',
  },
  titlecolor: {
    color: '#0B41CD',
  },
});

export default styles;
