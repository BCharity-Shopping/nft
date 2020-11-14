import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    width: wp('100%'),
    height: hp('30%'),
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
    padding: 1,
  },
  desBlock: {
    flex: 1,
    flexWrap: 'wrap',
  },
  childStyle: {
    width: wp('50%'),
    height: hp('15%'),
    marginBottom: 0,
  },
  viewStyle: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 0,
    marginTop: 20,
  },

  centering: {
    textAlign: 'center',
    padding: 1,
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
