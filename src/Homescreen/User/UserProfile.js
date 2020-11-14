import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import {Text, View, SafeAreaView, Image, ScrollView} from 'react-native';
import {Button, Menu} from 'react-native-paper';
import styles from '../../Styles/UserStyle';

const UserProfile = () => {
  const {colors} = useTheme();
  const [myText, setText] = React.useState('');
  const userName = 'Username';
  const waxAmount = '$0';
  const imgSource =
    'https://vignette3.wikia.nocookie.net/lego/images/a/ac/No-Image-Basic.png/revision/latest?cb=20130819001030';
  return (
    <SafeAreaView>
      <View>
        <View>
          <Image style={styles.img} source={{uri: imgSource}} />
        </View>
        <Text style={[styles.centerText, {color: colors.text}]}>
          {userName}
        </Text>
        <Text style={[styles.centerText, {color: colors.text}]}>
          {waxAmount}
        </Text>
      </View>

      <View style={styles.subContainer}>
        <ScrollView horizontal={true}>
          <Button onPress={() => setText('Inventory')}>
            <Text>Inventory</Text>
          </Button>
          <Button onPress={() => setText('Sales')}>
            <Text>Active Sales</Text>
          </Button>
          <Button onPress={() => setText('Sold')}>
            <Text>Sold</Text>
          </Button>
          <Button onPress={() => setText('Bought')}>
            <Text>Bought</Text>
          </Button>
          <Button onPress={() => setText('Collection')}>
            <Text>Collections</Text>
          </Button>
          <Button onPress={() => setText('Watchlist')}>
            <Text>Watchlist</Text>
          </Button>
          <Button onPress={() => setText('Friends')}>
            <Text>Friends</Text>
          </Button>
        </ScrollView>
      </View>

      <Text style={styles.subText} style={{color: colors.text}}>
        {myText == '' ? 'No asset found' : myText}
      </Text>
    </SafeAreaView>
  );
};

export default UserProfile;
