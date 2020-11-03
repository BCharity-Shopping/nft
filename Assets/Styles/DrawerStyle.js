import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const DrawerStyle = StyleSheet.create({
  filterText: {
    fontSize: 20,
    textAlign: 'center',
  },
  filterCollection: {
    width: width,
    height: height - 130,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    borderColor: 'red',
  },
  collectionText: {
    color: 'blue',
  },
  collection: {
    textAlign: 'center',
    color: 'pink',
    fontSize: 18,
  },
  collectionView: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  //   bottomContainer: {
  //     position: 'absolute',
  //     bottom: 0,
  //     justifyContent: 'space-between',
  //   },
});

export default DrawerStyle;
