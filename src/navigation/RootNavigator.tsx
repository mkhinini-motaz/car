import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View } from "react-native";
import HomeNavigator from './HomeNavigator';
import { useUser } from '../store/hooks';
import LoginNavigator from './LoginNavigator';

export default function RootNavigator(): JSX.Element {
  const user = useUser();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <NavigationContainer >
        {!!user.id ?
          <HomeNavigator/> :
          <LoginNavigator/>
        }
      </NavigationContainer>
    </View>
  );
}