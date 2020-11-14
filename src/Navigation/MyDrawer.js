/**
 * https://www.codementor.io/@ekunolaeasybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-17o7vwtdnn.
 */

import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import MyTab from './BottomTabNav';
import {UserNav} from './MyStack';
import Filter from './Filter';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    // drawerContent={(props) => <Filter {...props} />}
    <Drawer.Navigator drawerContent={(props) => <Filter {...props} />}>
      <Drawer.Screen
        name="Market"
        component={MyTab}
        // options={({route}) => ({colName: route.params?.colName})}
      />
      <Drawer.Screen name="User" component={UserNav} />
      <Drawer.Screen name="Filter" component={Filter} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
