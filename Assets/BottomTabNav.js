import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {UserNav, MyStack} from './MyStack';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MyStack} />
      <Tab.Screen name="User" component={UserNav} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
