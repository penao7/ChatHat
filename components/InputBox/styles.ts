import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 25,
    flex: 1,
    alignItems: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginLeft: 10
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 16,
    maxHeight: 100
  },
  icon: {
    marginLeft: 5,
    marginRight: 10,
  }
});

export default styles;