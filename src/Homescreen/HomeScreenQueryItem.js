import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaView, TouchableOpacity, Text, Image} from 'react-native';
import {Card} from 'react-native-elements';
import styles from '../Styles/HomeScreenStyle';

const QueryItems = ({atomicassets_assets, navigation}) => {
  const {colors} = useTheme();
  const {
    atomicassets_template,
    atomicassets_collection,
    owner,
    asset_id,
    immutable_data,
  } = atomicassets_assets;

  const collection_name = atomicassets_collection.collection_name;
  const cardName =
    atomicassets_template === null
      ? 'Unknown'
      : atomicassets_template.immutable_data.name;
  const cardImg =
    atomicassets_template != null
      ? 'https://ipfs.io/ipfs/' + atomicassets_template.immutable_data.img
      : immutable_data != null
      ? 'https://ipfs.io/ipfs/' + immutable_data.img
      : 'https://vignette3.wikia.nocookie.net/lego/images/a/ac/No-Image-Basic.png/revision/latest?cb=20130819001030';
  const cardPrice =
    atomicassets_template === null
      ? 'No price given'
      : atomicassets_template.atomicmarket_template_prices.map((d) => d.median);
  const description = atomicassets_collection.data.description;
  const cardDetail = {
    cardName,
    cardImg,
    description,
    asset_id,
    owner,
    cardPrice,
    collection_name,
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Card Detail', {
            cardDetail,
          })
        }
        style={styles.card}>
        <Card
          containerStyle={[
            styles.cardContainer,
            {backgroundColor: colors.card},
            {color: 'white'},
          ]}>
          <Image style={styles.img} source={{uri: cardImg}} />
          <Text style={styles.title}>{cardName}</Text>
          <Text style={styles.price}>{cardPrice} WAX</Text>
        </Card>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default QueryItems;
