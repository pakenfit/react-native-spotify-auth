import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { RootNavigationTypes } from '../types/navigation.type';
import { Routes } from './routes';
import Welcome from '../screens/welcome-screen';
import HomeNavigation from './HomeNavigation';

const Stack = createNativeStackNavigator<RootNavigationTypes>();
const options: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};

export default function RootNavigation() {
  return (
    <Stack.Navigator initialRouteName={Routes.WELCOME}>
      <Stack.Screen
        name={Routes.WELCOME}
        component={Welcome}
        options={options}
      />
      <Stack.Screen
        name={Routes.HOMETABNAV}
        component={HomeNavigation}
        options={options}
      />
    </Stack.Navigator>
  );
}
