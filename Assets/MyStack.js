/**
 * https://reactnative.dev/docs/navigation
 * https://oblador.github.io/react-native-vector-icons/
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import MyList from './MyList';
import Home from './HomeScreen';
import UserProfile from './UserProfile';
import {SearchBar, Icon} from 'react-native-elements';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomNav} from './BottomTabNav';
const Stack = createStackNavigator();

const updateSearch = (search) => {
  this.setState({search});
};

const MyStack = (props) => {
  const [search, updateSearch] = useState('');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          // title: 'Market',
          // headerRight: () => (
          // <Icon
          //   name="search"
          //   onPress={() => (
          //     <SearchBar
          //       placeholder="Type Here..."
          //       onChangeText={updateSearch}
          //       value={search}
          //     />
          //   )}
          // />
          // <View
          //   style={{
          //     justifyContent: 'center',
          //     flexDirection: 'row',
          //   }}>
          //   <SearchBar
          //     placeholder="Type Here..."
          //     onChangeText={updateSearch}
          //     value={search}
          //     containerStyle={{backgroundColor: 'red'}}
          //     style={{width: 100}}
          //   />
          //   <Icon name="sort" onPress={() => alert('Buy')} title="Buy" />
          // </View>
          // ),
          // headerRight: () => (
          //   <TouchableOpacity style={styles.headerRight}>
          // <Icon name="sort" onPress={() => alert('Buy')} title="Buy" />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <Stack.Screen
        name="Card Detail"
        component={MyList}
        options={{
          headerRight: () => (
            <Button
              style={{width: 10, marginRight: 0}}
              onPress={() => Alert.alert('Titlesada')}
              title="Buy"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const UserNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  // headerRight: {
  //   marginRight: 0,
  // },
});
// export default MyStack;
export {MyStack, UserNav};
