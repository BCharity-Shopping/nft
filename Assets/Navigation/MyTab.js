import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../HomeScreen';
import MyList from '../UserProfile';

const Tab = createBottomTabNavigator();

const MyTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Market" component={Home} />
        <Tab.Screen name="Settings" component={MyList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default MyTab;
