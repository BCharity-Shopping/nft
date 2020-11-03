import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const HomeScreenStyle = StyleSheet.create({
  price: {
    textAlign: 'center',
    fontSize: 12,
  },
  mainContainer: {
    width,
    height,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  item: {
    backgroundColor: '#f9c2ff',
    width: 185,
    height: 200,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
  },
  img: {
    width: 100,
    height: 100,
    padding: 10,
    resizeMode: 'contain',
  },
});

export default HomeScreenStyle;
