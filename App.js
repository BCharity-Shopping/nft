/**
 * An application for Ecssen. Converting their market webapge into a mobile app
 *
 * @author Gary Li
 */

import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// import MyStack from './Assets/MyStack';
import BottomTab from './Assets/BottomTabNav';

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
};

export default App;
