import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';
import {useState} from 'react';
import styles from './Styles/HomeScreenStyle';
import {gql, useQuery} from '@apollo/client';
import {graphql} from 'graphql';
import {} from 'lodash';

// where: {collection_name: {_is_null: false, _gte: $collection_name}}
const MyQuery = gql`
  query MyQuery($collection_name: String) {
    atomicassets_assets(
      limit: 1
      where: {collection_name: {_gte: $collection_name}}
    ) {
      asset_id
      owner
      immutable_data
      atomicassets_collection {
        collection_name
        data
      }
      atomicassets_template {
        template_id
        immutable_data
        atomicmarket_template_prices {
          median
        }
      }
    }
  }
`;

const SearchMarketPlace = gql`
  query($serchQuery: String) {
    atomicassets_assets(filter: {collection_name: {contains: $searchQuery}}) {
      atomicassets_collection {
        collection_name
      }
    }
  }
`;

//Global variable
const TWO = 2;

const QueryItems = ({atomicassets_assets, navigation}) => {
  const {
    atomicassets_template,
    atomicassets_collection,
    owner,
    asset_id,
  } = atomicassets_assets;
  const collection_name = atomicassets_collection.collection_name;
  const cardName = atomicassets_template.immutable_data.name;
  const cardImg = atomicassets_template.immutable_data.img;
  const cardPrice = atomicassets_template.atomicmarket_template_prices.map(
    (d) => d.median,
  );
  const description = atomicassets_collection.data.description;

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Card Detail', {
            cardName,
            cardImg,
            description,
            asset_id,
            owner,
            cardPrice,
            collection_name,
          })
        }
        style={styles.item}>
        <Image
          style={styles.img}
          source={{uri: 'https://ipfs.io/ipfs/' + cardImg}}
        />
        <Text style={styles.title}>{cardName}</Text>
        <Text style={styles.price}>{cardPrice} WAX</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const HomeScreen = (props) => {
  const [collection_name, setSearch] = useState('');

  // , {
  //   variables: {collection_name},
  // }
  const {data, loading, error} = useQuery(MyQuery, {
    variables: {collection_name},
  });

  // const {searchData, searchLoading} = useQuery(SearchMarketPlace(search));

  // if (loading) {
  //   return <ActivityIndicator size="large" color="green" />;
  // }
  if (error) {
    console.log('error', error);
  }

  const updateSearch = (text) => {
    // alert(text);
    // {filterArray = data.filter{i => i.atomicassets_collection.include(text)}}}
    setSearch(text);
    // console.log('easfsa', collection_name);
  };
  return (
    <View styles={styles.mainContainer}>
      <SafeAreaView>
        <SearchBar
          placeholder="Search the marketplace"
          onChangeText={updateSearch}
          value={collection_name}
          round={true}
          lightTheme={true}
          onPressCancel={() => {
            this.collection_name('');
          }}
        />
      </SafeAreaView>
      {/* {updateSearch === ''
        ? ({data} = useQuery(MyQuery))
        : ({data} = useQuery(SearchMarketPlace))} */}
      <Icon name="sort" onPress={() => alert('Buy')} title="Buy" />
      {!!loading && <ActivityIndicator size="large" color="green" />}
      {!loading && (
        <FlatList
          contentContainerStyle={{
            alignSelf: 'flex-start',
          }}
          numColumns={TWO}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data.atomicassets_assets}
          renderItem={({item}) => (
            <QueryItems
              navigation={props.navigation}
              atomicassets_assets={item}
            />
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;
// export default compose(
//   graphql(MyQuery, {
//     options: (data) => ({
//       fetchPolicy: 'cache-and-network',
//     }),
//     props: (props) => ({
//       updateSearch: (updateSearch) => {
//         updateSearch = updateSearch.toLowerCase();
//         return props.data.fetchMore({
//           query: updateSearch === '' ? MyQuery : SearchMarketPlace,
//           variables: {
//             searchQuery,
//           },
//           updateQuery: (previousResult, {fetchMoreResult}) => ({
//             ...previousResult,
//             atomicassets_assets: {
//               ...previousResult.atomicassets_assets,
//               items: fetchMoreResult.atomicassets_assets.items,
//             },
//           }),
//         });
//       },
//       data: prop.data,
//     }),
//   }),
// )(HomeScreen);/
