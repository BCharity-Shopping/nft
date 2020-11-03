import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './Styles/CardDetailStyle';

const MyList = ({route}) => {
  const {
    cardName,
    cardPrice,
    cardImg,
    asset_id,
    description,
    owner,
    collection_name,
  } = route.params;
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{uri: 'https://ipfs.io/ipfs/' + cardImg}}
      />
      <Text style={styles.centering}>Name:</Text>
      <Text style={styles.name}>{cardName} </Text>
      <ScrollView>
        <View style={styles.viewStyle}>
          <View style={styles.childStyle}>
            <Text style={styles.centering}>Price:</Text>
            <Text style={(styles.profile, styles.price)}>{cardPrice} Wax</Text>
          </View>
          <View style={styles.childStyle}>
            <Text style={styles.centering}>Owner:</Text>
            <Text style={styles.profile}>
              {owner === undefined || owner === null ? 'null' : owner}
            </Text>
          </View>
          <View style={styles.childStyle}>
            <Text style={styles.centering}>Asset ID:</Text>
            <Text style={styles.profile}>
              {asset_id === undefined || asset_id === null ? 'null' : asset_id}
            </Text>
          </View>
          <View style={styles.childStyle}>
            <Text style={styles.centering}>Collection Name:</Text>
            <Text style={styles.profile}>{collection_name}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.description}>Description:</Text>
          <Text style={styles.desBlock}>
            {description === undefined ? 'No description' : description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyList;
