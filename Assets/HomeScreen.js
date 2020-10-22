import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';
import {useState} from 'react';
import BottomTab from './BottomTabNav';
//Global variable
const TWO = 2;

//CSS
const styles = StyleSheet.create({
  price: {
    textAlign: 'center',
  },
  flatList: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  item: {
    backgroundColor: '#f9c2ff',
    width: 185,
    height: 200,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  img: {
    width: 90,
    height: 90,
    padding: 10,
  },
});

// Hardcoded values once I start api will remove
const collection = [
  {
    img: 'https://reactjs.org/logo-og.png',
    id: 'sdadas',
    title: '1',
    price: '$1',
    rarity: 'rare',
    description:
      'This block of text is the first paragraph in this example, and is not very long.This block of text is the second paragraph, and is also not very long, which is nice.',
  },
  {
    img: 'https://reactjs.org/logo-og.png',
    id: 'sdada32s',
    title: '2',
    price: '$1',
    rarity: 'common',
    description:
      'This block of text is the first paragraph in this example, and is not very long.This block of text is the second paragraph, and is also not very long, which is nice.',
  },
  // {
  //   img: 'https://reactjs.org/logo-og.png',
  //   id: 'sdada33s',
  //   title: '3',
  //   price: '$1',
  //   rarity: 'uncommon',
  // },
  // {
  //   img: 'https://reactjs.org/logo-og.png',
  //   id: 's312dadas',
  //   title: '4',
  //   price: '$1',
  //   rarity: 'common',
  // },
  // {
  //   img: 'https://reactjs.org/logo-og.png',
  //   id: '3123131',
  //   title: '5',
  //   price: '$1',
  //   rarity: 'rare',
  // },
  // {
  //   img: 'https://reactjs.org/logo-og.png',
  //   id: '3123131321',
  //   title: '6',
  //   price: '$1',
  //   rarity: 'rare',
  // },
];

const updateSearch = (search) => {
  this.setState({search});
};
const HomeScreen = (props) => {
  const renderItem = ({item}) => (
    <Item
      title={item.title}
      price={item.price}
      navigation={props.navigation}
      img={item.img}
      rarity={item.rarity}
      description={item.description}
    />
  );
  const [search, updateSearch] = useState('');
  return (
    <View styles={styles.flatList}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        round={true}
        lightTheme={true}
      />
      <Icon name="sort" onPress={() => alert('Buy')} title="Buy" />
      <FlatList
        contentContainerStyle={{
          alignSelf: 'flex-start',
        }}
        numColumns={TWO}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={collection}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* <BottomTab /> */}
    </View>
  );
};

const Item = ({title, price, navigation, img, rarity, description}) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('Card Detail', {
        title,
        price,
        img,
        rarity,
        description,
      })
    }
    style={styles.item}>
    <Image style={styles.img} source={{uri: img}} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.price}>{price}</Text>
  </TouchableOpacity>
);

export default HomeScreen;
