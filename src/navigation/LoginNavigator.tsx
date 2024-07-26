import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";

export default function LoginNavigator(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerTitle: '', headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}