import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from '../../Styles/CardDetailStyle';
import {useTheme} from '@react-navigation/native';

const MyList = ({route}) => {
  const {colors} = useTheme();
  const {cardDetail} = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{uri: cardDetail.cardImg}} />
      <Text style={[styles.centering, {color: colors.text}]}>Name:</Text>
      <Text style={styles.name}>{cardDetail.cardName} </Text>
      <ScrollView>
        <View style={styles.viewStyle}>
          <View style={styles.childStyle}>
            <Text style={[styles.centering, {color: colors.text}]}>Price:</Text>
            <Text style={(styles.profile, styles.price)}>
              {cardDetail.cardPrice == 'No price given'
                ? 'Price Unknown'
                : cardDetail.cardPrice + ' WAX'}
            </Text>
          </View>
          <View style={styles.childStyle}>
            <Text style={[styles.centering, {color: colors.text}]}>Owner:</Text>
            <Text style={styles.profile}>
              {cardDetail.owner === null ? 'null' : cardDetail.owner}
            </Text>
          </View>
          <View style={styles.childStyle}>
            <Text style={[styles.centering, {color: colors.text}]}>
              Asset ID:
            </Text>
            <Text style={styles.profile}>
              {cardDetail.asset_id === null
                ? 'null'
                : JSON.stringify(cardDetail.asset_id)}
            </Text>
          </View>
          <View style={styles.childStyle}>
            <Text style={[styles.centering, {color: colors.text}]}>
              Collection Name:
            </Text>
            <Text style={styles.profile}>{cardDetail.collection_name}</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.description, {color: colors.text}]}>
            Description:
          </Text>
          <Text style={[styles.desBlock, {color: colors.text}]}>
            {cardDetail.description === undefined
              ? 'No description'
              : cardDetail.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyList;
