/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';



const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions= {{
        headerStyle: {
            backgroundColor: '#e89323'
          },
          headerTintColor: '#fff',
          headerTitleStyle: { 
            fontWeight: 'bold'
          }
      }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options= {{
          title: 'FitnessPro',
          headerLeft: () =>(
            <Icon.Button name="ios-menu" size={25}
            backgroundColor= '#e89323' onPress= {() => navigation.openDrawer()}
            ></Icon.Button>
          )
        }}/>
      </HomeStack.Navigator>

);

const DetailsStackScreen = ({navigation}) => (
  <DetailsStack.Navigator screenOptions= {{
        headerStyle: {
            backgroundColor: '#e89323'
          },
          headerTintColor: '#fff',
          headerTitleStyle: { 
            fontWeight: 'bold'
          }
      }}>
        <DetailsStack.Screen name="Home" component={DetailsScreen} options= {{
          headerLeft: () =>(
            <Icon.Button name="ios-menu" size={25}
            backgroundColor= '#e89323' onPress= {() => navigation.openDrawer()}
            ></Icon.Button>
          )
        }}/>
      </DetailsStack.Navigator>

);


const App = () => {
  return(
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Details" component={DetailsStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


export default App;
