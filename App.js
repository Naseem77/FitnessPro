/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import { DrawerContent} from './screens/DrawerContent';


const Drawer = createDrawerNavigator();

const App = () => {
  return(
    <NavigationContainer>
    <Drawer.Navigator drawerContent= {props => <DrawerContent { ...props}/>}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="SupportScreen" component={SupportScreen} />
        <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


export default App;
