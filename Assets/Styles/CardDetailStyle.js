import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const CardDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flexDirection: 'row',
    width: width,
    height: height,
  },
  img: {
    width: 360,
    height: 350,
    margin: 20,
    resizeMode: 'contain',
  },
  profile: {
    fontSize: 24,
    textAlign: 'center',
    color: 'orange',
  },
  rarity: {
    fontSize: 20,
    textAlign: 'center',
  },
  price: {
    color: 'green',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
  },
  desBlock: {
    flex: 1,
    flexWrap: 'wrap',
  },
  childStyle: {
    width: '50%',
    height: 100,

    marginBottom: 0,
  },
  viewStyle: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 0,
    marginTop: 20,
  },
  childStyle: {
    width: '50%',
    height: 100,
    marginBottom: 0,
  },
  centering: {
    textAlign: 'center',
  },
  name: {
    fontSize: 30,
    color: 'orange',
    textAlign: 'center',
  },
  price: {
    textAlign: 'center',
    fontSize: 24,
    color: 'green',
  },
});

export default CardDetailStyle;
