/**
 * https://reactnative.dev/docs/navigation
 * https://oblador.github.io/react-native-vector-icons/
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert, Linking, Button, View} from 'react-native';
import CardDetail from '../Homescreen/Card/CardDetail';
import Home from '../Homescreen/HomeScreen';
import UserProfile from '../Homescreen/User/UserProfile';
import Filter from './Filter';
import MySearch from '../Homescreen/SearchScreen/Searching';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator mode="modal">
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
            <View style={{padding: 5}}>
              <Button
                color="green"
                onPress={() =>
                  Alert.alert(
                    'To buy it please go to this website',
                    'Use the search bar and search for your item',
                    [
                      {
                        text: 'Cancel',
                      },
                      {
                        text: 'Go to Website',
                        onPress: () => {
                          Linking.openURL('https://wax.atomichub.io/market');
                        },
                      },
                    ],
                  )
                }
                title="Buy"
              />
            </View>
          ),
        }}
      />
      {/* <Stack.Screen name="Apply Filter" component={Filter} />
      <Stack.Screen name="Search" component={MySearch} /> */}
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
const SearchNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={MySearch}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Apply Filter" component={Filter} />
    </Stack.Navigator>
  );
};

export {MyStack, UserNav, SearchNav};
