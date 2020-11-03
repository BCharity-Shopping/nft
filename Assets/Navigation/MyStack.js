/**
 * https://reactnative.dev/docs/navigation
 * https://oblador.github.io/react-native-vector-icons/
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, StyleSheet, Alert} from 'react-native';
import CardDetail from '../CardDetail';
import Home from '../HomeScreen';
import UserProfile from '../UserProfile';
const Stack = createStackNavigator();

const updateSearch = (search) => {
  this.setState({search});
};

const MyStack = (props) => {
  const [search, updateSearch] = useState('');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Market"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Card Detail"
        component={CardDetail}
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
