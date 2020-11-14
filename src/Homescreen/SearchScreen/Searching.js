import 'react-native-gesture-handler';
import * as React from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import SearchQuery from '../../Query/SearchQuery';
import QueryItems from '../HomeScreenQueryItem';
import {SearchBar, Icon, Header} from 'react-native-elements';
import styles from '../../Styles/SearchStyle';
import {useColorScheme} from 'react-native-appearance';
import {useQuery} from '@apollo/client';
import {NetworkStatus} from '@apollo/client';
import {Divider} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

///Global Variables
const SEARCHMSG = 'Search the marketplace';
const TWO = 2;

const Searching = ({navigation, route}) => {
  const scheme = useColorScheme();
  const {colors} = useTheme();
  const [search, setSearch] = React.useState(route.params?.colName);
  const {data = {}, loading, error, networkStatus, fetchMore} = useQuery(
    SearchQuery,
    {
      variables: {search},
    },
  );
  const updateSearch = (text) => {
    setSearch(text);
    // fetchMore({
    //   variables: {
    //     search: text,
    //   },
    // });
  };
  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (error) {
    console.log('error', error);
  }

  React.useEffect(() => {
    if (route.params?.colName) {
      console.log('chaned');
      setSearch(route.params?.colName);
    }
  }, [route.params?.colName]);
  return (
    <>
      <View style={styles.mainContainer}>
        <Header
          containerStyle={{backgroundColor: colors.header}}
          leftComponent={
            <SearchBar
              containerStyle={styles.searchBar}
              placeholder={SEARCHMSG}
              onChangeText={updateSearch}
              value={search}
              round={true}
              lightTheme={scheme === 'dark' ? false : true}
              onPressCancel={() => {
                this.collection_name('');
              }}
            />
          }
          rightComponent={
            <Icon
              name="filter-alt"
              onPress={() => navigation.navigate('Apply Filter')}
              containerStyle={styles.filterIcon}
            />
          }
        />
        <Divider />
        {/* <View style={styles.searchContainer}>
          <SearchBar
            containerStyle={styles.searchBar}
            placeholder={SEARCHMSG}
            onChangeText={updateSearch}
            value={search}
            round={true}
            lightTheme={scheme === 'dark' ? false : true}
            onPressCancel={() => {
              this.collection_name('');
            }}
          />
          <Icon
            name="filter-alt"
            onPress={() => navigation.navigate('Apply Filter')}
            containerStyle={styles.filterIcon}
          />
        </View> */}
        {!!loading && <ActivityIndicator size="large" color="green" />}

        <FlatList
          contentContainerStyle={{
            alignSelf: 'flex-start',
            paddingBottom: 120,
          }}
          numColumns={TWO}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data.atomicassets_assets}
          keyExtractor={(atomicassets_assets, index) =>
            index.toString() + '{1++}'
          }
          renderItem={({item}) => (
            <QueryItems navigation={navigation} atomicassets_assets={item} />
          )}
        />
      </View>
    </>
  );
};

export default Searching;
