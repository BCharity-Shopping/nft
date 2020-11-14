import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SearchScreenStyle = StyleSheet.create({
  mainContainer: {
    maxWidth: wp('100%'),

    justifyContent: 'center',
    flexDirection: 'column',
  },
  // searchContainer: {
  //   flexDirection: 'row',
  //   resizeMode: 'contain',
  //   alignItems: 'center',
  //   alignContent: 'stretch',
  // },
  searchBar: {
    width: wp('90%'),
    padding: 2,
  },
});

export default SearchScreenStyle;
