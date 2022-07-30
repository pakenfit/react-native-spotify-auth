import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home-screen';
import { Text, View } from 'react-native-ui-lib';
import { HomeNavigationTypes } from '../types/navigation.type';
import { Routes } from './routes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../theme';
import { IconButton } from '../components/IconButton';
import SearchScreen from '../screens/search/search-screen';
import { TABBAR_HEIGHT } from '../constants';

const LibraryScreen = () => (
  <View>
    <Text>Lib Screen</Text>
  </View>
);

const getIcon = (
  route: RouteProp<HomeNavigationTypes, keyof HomeNavigationTypes>,
  size: number,
  color: string,
  focused: boolean,
) => {
  if (route.name === Routes.HOME) {
    return (
      <IconButton isActive={focused}>
        <AntDesign name="home" size={size} color={color} />
      </IconButton>
    );
  }
  if (route.name === Routes.SEARCH) {
    return (
      <IconButton isActive={focused}>
        <AntDesign name="search1" size={size} color={color} />
      </IconButton>
    );
  }
  if (route.name === Routes.LIBRARY) {
    return (
      <IconButton isActive={focused}>
        <MaterialIcons name="library-music" size={size} color={color} />
      </IconButton>
    );
  }
};

const Tab = createBottomTabNavigator<HomeNavigationTypes>();

export default function HomeNavigation(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          return getIcon(route, size, color, focused);
        },
        tabBarActiveTintColor: Colors.BRAND,
        tabBarInactiveTintColor: Colors.WHITE,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.BLACK,
          height: TABBAR_HEIGHT,
        },
      })}>
      <Tab.Screen name={Routes.HOME} component={HomeScreen} />
      <Tab.Screen name={Routes.SEARCH} component={SearchScreen} />
      <Tab.Screen name={Routes.LIBRARY} component={LibraryScreen} />
    </Tab.Navigator>
  );
}
