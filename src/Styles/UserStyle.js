import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const UserStyle = StyleSheet.create({
  img: {
    height: hp('30%'),
    width: wp('100%'),
    resizeMode: 'contain',
  },
  subContainer: {
    width: wp('100%'),
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  centerText: {
    textAlign: 'center',
  },
});

export default UserStyle;
