import React from 'react';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();


const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();


const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#e89323',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Details',
          tabBarColor: '#e89',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#e89323',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#e89323',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);


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

 export default MainTabScreen;

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