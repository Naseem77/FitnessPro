/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
//import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import { DrawerContent } from './screens/DrawerContent';
//import MainTabScreen from './screens/MainTabScreen';
//import SupportScreen from './screens/SupportScreen';
//import SettingsScreen from './screens/SettingsScreen';
//import BookmarkScreen from './screens/BookmarkScreen';
import RootStackScreen from '../screens/RootStackScreen';

const Drawer = createDrawerNavigator();

const AuthStack = () => {

  return (

    
    <RootStackScreen/>   

  );
}

export default AuthStack;
