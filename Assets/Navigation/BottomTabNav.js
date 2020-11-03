import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {UserNav, MyStack} from './MyStack';
import showTabBar from '../showTabBar';

const Tab = createBottomTabNavigator();

const isTabBarVisible = (navState) => {
  if (!navState) {
    return true;
  }
  let tabBarVisible = navState.routes[navState.index].params
    ? navState.routes[navState.index].params.showTabBar
    : true;
  return tabBarVisible;
};
const componentWillMount = () => {
  const setParamsAction = NavigationActions.setParams({
    params: {hideTabBar: true},
  });
  this.props.navigation.dispatch(setParamsAction);
};
const componentWillUnmount = () => {
  const setParamsAction = NavigationActions.setParams({
    params: {hideTabBar: false},
  });
  this.props.navigation.dispatch(setParamsAction);
};

const BottomTabNav = ({navigation}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Market"
        component={MyStack}
        // options={{
        //   tabBarVisible:
        //     (navigation.params && navigation.params.hideTabBar) === true,
        //   animationEnabled: true,
        // }}
      />
      <Tab.Screen name="User" component={UserNav} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
