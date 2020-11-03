/**
 * https://www.codementor.io/@ekunolaeasybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-17o7vwtdnn.
 */

import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import MyTab from './BottomTabNav';
import {UserNav} from './MyStack';
import Filter from '../Filter';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(prop) => <Filter />}>
      <Drawer.Screen name="Home" component={MyTab} />
      <Drawer.Screen name="User" component={UserNav} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
