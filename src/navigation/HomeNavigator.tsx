import React, {useEffect} from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from "./DrawerNavigator";
import CarScreen from '../screens/CarScreen';

const Stack = createNativeStackNavigator();

export default function HomeNavigator({ }): JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="CarScreen" component={CarScreen} />

        </Stack.Navigator>
    );
}