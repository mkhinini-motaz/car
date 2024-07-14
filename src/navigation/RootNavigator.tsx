import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar, View} from "react-native";
import HomeNavigator from './HomeNavigator';

export default function RootNavigator(): JSX.Element {

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} backgroundColor="white" />
            <NavigationContainer >
              {/** TODO: authenticated logic */}
              <HomeNavigator />
            </NavigationContainer>
        </View>
    );
}