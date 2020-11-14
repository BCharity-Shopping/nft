import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HomeScreenStyle = StyleSheet.create({
  price: {
    textAlign: 'center',
    fontSize: 12,
  },
  mainContainer: {
    maxWidth: wp('100%'),
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  card: {
    width: wp('45%'),
    height: hp('35'),

    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: wp('43%'),
    height: hp('35%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
  },
  img: {
    width: wp('30%'),
    height: hp('20%'),
    padding: 10,
    resizeMode: 'contain',
  },
  // headerContainer: {
  //   flexDirection: 'row',
  //   resizeMode: 'contain',
  //   alignItems: 'center',
  //   alignContent: 'stretch',
  // },
  filterIcon: {
    width: wp('7.5%'),
    padding: 5,
  },
  menuIcon: {
    width: wp('7.5%'),
    padding: 5,
    paddingTop: 100,
  },
  headerText: {
    fontSize: 25,
  },
  menuContent: {
    marginTop: hp('7%'),
  },
});

export default HomeScreenStyle;
