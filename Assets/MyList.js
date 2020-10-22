import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: 360,
    height: 400,
    margin: 20,
  },
  profile: {
    fontSize: 30,
    textAlign: 'center',
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
  },
});

const MyList = ({route}) => {
  const {title, price, img, rarity, description} = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{uri: img}} />
      <ScrollView>
        <Text style={styles.profile}>Name: {title} </Text>
        <Text style={styles.profile}>
          Price: <Text style={styles.price}>{price}</Text>
        </Text>
        <Text style={styles.rarity}>Rarity: {rarity}</Text>
        <Text style={styles.description}>Description:</Text>
        <Text>{description}</Text>
      </ScrollView>
    </View>
  );
};

export default MyList;
