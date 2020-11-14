import 'react-native-gesture-handler';
import * as React from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import {useState} from 'react';
import styles from '../Styles/HomeScreenStyle';
import {useQuery} from '@apollo/client';
import {NetworkStatus} from '@apollo/client';
import {Divider, Menu} from 'react-native-paper';
import QueryItems from './HomeScreenQueryItem';
import MyQuery from '../Query/MyQuery';
import {useTheme} from '@react-navigation/native';

//Global variable
const TWO = 2;

const HomeScreen = ({navigation, route}) => {
  const {colors} = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);
  const [order_by, setOrder] = useState('asc_nulls_last');

  const {data, loading, error, fetchMore, networkStatus} = useQuery(MyQuery, {
    variables: {order_by, offset: 0},
  });

  const handleLoadMore = React.useCallback(() => {
    fetchMore({
      variables: {
        offset:
          data && data.atomicassets_assets
            ? data.atomicassets_assets.length
            : 0,
        order_by,
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          atomicassets_assets: [
            ...prev.atomicassets_assets,
            ...fetchMoreResult.atomicassets_assets,
          ],
        });
      },
    });
  }, [fetchMore, data]);
  React.useEffect(() => {
    if (route.params?.colName) {
      console.log('chaned');
      setSearch(route.params?.colName);
    }
  }, [route.params?.colName]);

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (error) {
    console.log('error', error);
  }

  return (
    <View styles={styles.mainContainer}>
      <Header
        containerStyle={{backgroundColor: colors.header}}
        centerComponent={{
          text: 'Market Place',
          style: styles.headerText,
          color: colors.text,
        }}
        rightComponent={
          <Menu
            containerStyle={styles.menuIcon}
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={styles.menuContent}
            anchor={
              <Icon name="sort" onPress={openMenu}>
                Show menu
              </Icon>
            }>
            <Menu.Item title="Sort by Mint" />
            <Divider />
            <Menu.Item
              onPress={() => {
                // fetchMore({
                //   variables: {
                //     order_by: 'asc_nulls_last',
                //   },
                // });
                // {
                //   !!loading && <ActivityIndicator size="large" color="green" />;
                // }
                setOrder('asc_nulls_last');
              }}
              title="Ascending"
            />
            <Menu.Item
              onPress={() => {
                // fetchMore({
                //   variables: {
                //     order_by: 'desc_nulls_last',
                //   },
                // });
                // {
                //   !!loading && <ActivityIndicator size="large" color="green" />;
                // }
                setOrder('desc_nulls_last');
              }}
              title="Descending"
            />
          </Menu>
        }
      />
      <Divider />

      {!!loading && <ActivityIndicator size="large" color="green" />}

      {!loading && (
        <FlatList
          contentContainerStyle={{
            alignSelf: 'flex-start',
            paddingBottom: 120,
          }}
          numColumns={TWO}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(atomicassets_assets) => atomicassets_assets.asset_id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          data={data.atomicassets_assets}
          renderItem={({item}) => (
            <QueryItems navigation={navigation} atomicassets_assets={item} />
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;
