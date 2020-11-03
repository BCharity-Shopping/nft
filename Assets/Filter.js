import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';

import styles from './Styles/DrawerStyle';
import {Button, Divider} from 'react-native-paper';

import {gql, useQuery} from '@apollo/client';

const FilterQuery = gql`
  query MyQuery($collection_name: String) {
    atomicassets_assets(
      limit: 100
      where: {collection_name: {_gte: $collection_name}}
    ) {
      collection_name
    }
  }
`;

const QueryItems = ({atomicassets_assets}) => {
  const {collection_name} = atomicassets_assets;
  return (
    <SafeAreaView>
      <Text style={styles.collection}>{collection_name}</Text>
    </SafeAreaView>
  );
};

const Filter = (props) => {
  const [collection_name, setFilter] = useState('');
  const {data, loading, error} = useQuery(FilterQuery, {
    variables: {collection_name},
  });
  // if (loading) {
  //   return <ActivityIndicator size="small" color="green" />;
  // }
  const updateSearch = (text) => {
    setFilter(text);
  };

  if (error) {
    console.log('error', error);
  }
  // console.log('filter', data);
  return (
    <SafeAreaView>
      <Text style={styles.filterText}>Apply Filter</Text>
      <SearchBar
        placeholder="Search Collection"
        onChangeText={updateSearch}
        value={collection_name}
        round={true}
        lightTheme={true}
      />
      {!!loading && <ActivityIndicator size="small" color="green" />}
      <View style={styles.filterCollection}>
        <Divider />
        {!loading && (
          <FlatList
            contentContainerStyle={{
              alignSelf: 'flex-start',
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data.atomicassets_assets}
            // key={data.asset_id}
            // keyExtractor={(item, index) => item.asset_id}
            renderItem={({item}) => <QueryItems atomicassets_assets={item} />}
          />
        )}
      </View>
      <View>
        <Divider />
        <Button>Profile</Button>
      </View>
    </SafeAreaView>
  );
};

export default Filter;
