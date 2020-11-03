import React, {useState} from 'react';
import {Button, Overlay} from 'react-native-elements';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import login from './Navigation/Login';

const LoginOverlay = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Button title="Open Overlay" onPress={toggleOverlay} />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Button onPress={login} title="Login" />
      </Overlay>
    </View>
  );
};

export default LoginOverlay;
