import React from 'react';
import { createStackNavigator, StackView} from '@react-navigation/stack';
import DrawerContent from '../screens/DrawerContent';
import MainTabScreen from '../screens/MainTabScreen';
import SupportScreen from '../screens/SupportScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChangeWeight from '../screens/ChangeWeight';
import ChangeProgram from '../screens/ChangeProgram';
import ExerciseScreen from '../screens/ExerciseScreen';
import HomeScreen from '../screens/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const AppStack = () =>{
    return(
           <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
                <Drawer.Screen name="HomeDrawer" component={MainTabScreen}/>
                <Drawer.Screen name="SupportScreen" component={SupportScreen}/>
                <Drawer.Screen name="ChangeWeight" component={ChangeWeight}/>
                <Drawer.Screen name="ChangeProgram" component={ChangeProgram}/>
                <Drawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen}/>
           </Drawer.Navigator>
    );
}

export default AppStack;

{/*<Stack.Navigator>
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="SupportScreen" component={SupportScreen} />
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
            <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
            </Drawer.Navigator>
</Stack.Navigator>*/}

