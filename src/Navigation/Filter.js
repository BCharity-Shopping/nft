import 'react-native-gesture-handler';
import React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useState} from 'react';
import styles from '../Styles/FilterStyle';
import {Button, Divider} from 'react-native-paper';
import {useQuery} from '@apollo/client';
import {ScrollView} from 'react-native-gesture-handler';
import {useColorScheme} from 'react-native-appearance';
import FilterQuery from '../Query/FilterQuery';

const FilterItems = ({atomicassets_collections, navigation}) => {
  const {collection_name} = atomicassets_collections;
  return (
    <ScrollView>
      <Button
        style={styles.collection}
        onPress={() => {
          navigation.navigate('Search', {
            colName: collection_name,
          });
        }}>
        {collection_name}
      </Button>
    </ScrollView>
  );
};

const Filter = ({navigation}) => {
  const scheme = useColorScheme();
  const [collectionName, setFilter] = useState('');
  const {data = {}, loading, error} = useQuery(FilterQuery, {
    variables: {collectionName},
  });
  const updateFilter = (text) => {
    setFilter(text);
  };

  if (error) {
    console.log('error', error);
  }
  return (
    <>
      <SearchBar
        placeholder="Search Collection"
        onChangeText={updateFilter}
        value={collectionName}
        lightTheme={scheme === 'dark' ? false : true}
        round={true}
      />
      {!!loading && <ActivityIndicator size="small" color="green" />}
      <View style={styles.filterCollection}>
        <Divider />
        {!loading && (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data.atomicassets_collections}
            renderItem={({item}) => (
              <FilterItems
                navigation={navigation}
                atomicassets_collections={item}
              />
            )}
            keyExtractor={(atomicassets_collections) =>
              atomicassets_collections.author
            }
          />
        )}
      </View>
    </>
  );
};

export default Filter;
