import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Fontisto';
import HomeScreen from './HomeScreen';
import DiaryScreen from './DiaryScreen';
import RecipesScreen from './RecipesScreen';
import ProfileScreen from './ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ViewRecipes from './ViewRecipes';
import ViewExercise from './ViewExercise';
import ExerciseScreen from './ExerciseScreen';
import EditProfileScreen from './EditProfileScreen';
import FoodListScreen from './FoodListScreen';
import ViewFood from './ViewFood';
import AddNewFood from './AddNewFood';
import RecipeListScreen from './RecipeListScreen';
import ViewFoodBackwards from './ViewFoodBackwards';

const HomeStack = createStackNavigator();
const DiaryStack = createStackNavigator();
const RecipesStack = createStackNavigator();
const ExerciseStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

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
          tabBarColor: '#ff5900',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryStackScreen}
        options={{
          tabBarLabel: 'Diary',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon5 name="list-ul" color={color} size={26} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Recipes"
        component={RecipesStackScreen}
        options={{
          tabBarLabel: 'Recipes',
          tabBarColor: '#d0282b',
          tabBarIcon: ({ color }) => (
            <Icon3 name="silverware-fork-knife" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Exercise"
        component={ExerciseStackScreen}
        options={{
          tabBarLabel: 'Exercise',
          tabBarColor: '#d08910',
          tabBarIcon: ({ color }) => (
            <Icon5 name="running" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#43204f',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;


const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#ff5900',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'FitnessPro',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#ff5900" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
        headerRight: () => (
          <Icon2.Button name="pluscircleo" size={22} backgroundColor="#ff5900" onPress={() => navigation.navigate('AddPost')}></Icon2.Button>
        ),
        }} />
    <HomeStack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#ff5900',
          shadowColor: '#ff5900',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Icon name="arrow-back-circle-outline" size={25} />
          </View>
        ),
      }}
    />

    <HomeStack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Icon name="arrow-back-circle-outline" size={25} />
          </View>
        ),
      }}
    />
</HomeStack.Navigator>
);

const DiaryStackScreen = ({navigation}) => (
<DiaryStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DiaryStack.Screen name="Diary" component={DiaryScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
        headerRight: () => (
          <Icon1.Button name="preview" size={22} backgroundColor="#1f65ff" onPress={() => navigation.navigate('ViewFoodBackwards')}></Icon1.Button>
        ),
        }} />
        <DiaryStack.Screen
          name="FoodListScreen"
          component={FoodListScreen}
          options={{
            title: 'Food List',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
          
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                <Icon.Button name="add-circle-sharp" size={25} backgroundColor="#1f65ff" onPress={() => navigation.navigate('AddNewFood')}></Icon.Button>
                <Icon4.Button name="list" size={25} backgroundColor="#1f65ff" onPress={() => navigation.navigate('RecipeListScreen')}></Icon4.Button>
                </View>
              ),
              
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <View style={{marginLeft: 15}}>
                <Icon name="arrow-back-circle-outline" size={25} />
              </View>
            ),
            
          }}
        />

        <DiaryStack.Screen
          name="ViewFood"
          component={ViewFood}
          options={{
            title: 'Food',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerStyle: {
            backgroundColor: '#1f65ff',
            shadowColor: '#1f65ff',
            elevation: 0,
            },
            headerBackImage: () => (
              <View style={{marginLeft: 15}}>
                <Icon name="arrow-back-circle-outline" size={25} />
              </View>
            ),
          }}
        />
        <DiaryStack.Screen
          name="AddNewFood"
          component={AddNewFood}
          options={{
            title: 'Add New Food',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerStyle: {
            backgroundColor: '#1f65ff',
            shadowColor: '#1f65ff',
            elevation: 0,
            },
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <View style={{marginLeft: 15}}>
                <Icon name="arrow-back-circle-outline" size={25} />
              </View>
            ),
          }}
        />
         <DiaryStack.Screen
          name="RecipeListScreen"
          component={RecipeListScreen}
          options={{
            title: 'My Recipes',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerStyle: {
            backgroundColor: '#1f65ff',
            shadowColor: '#1f65ff',
            elevation: 0,
            },
            headerBackImage: () => (
              <View style={{marginLeft: 15}}>
                <Icon name="arrow-back-circle-outline" size={25} />
              </View>
            ),
          }}
        />
        <DiaryStack.Screen
          name="ViewFoodBackwards"
          component={ViewFoodBackwards}
          options={{
            title: 'View Backwards',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerStyle: {
            backgroundColor: '#1f65ff',
            shadowColor: '#1f65ff',
            elevation: 0,
            },
            headerBackImage: () => (
              <View style={{marginLeft: 15}}>
                <Icon name="arrow-back-circle-outline" size={25} />
              </View>
            ),
          }}
        />
</DiaryStack.Navigator>
);
  
const RecipesStackScreen = ({navigation}) => (
<RecipesStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#d0282b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <RecipesStack.Screen name="Recipes" component={RecipesScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#d0282b" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />

      <RecipesStack.Screen
      name="ViewRecipes"
      component={ViewRecipes}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerTransparent:true,
        headerStyle: {
          backgroundColor: '#d0282b',
          shadowColor: '#d0282b',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Icon name="arrow-back-circle-outline" size={25} />
          </View>
        ),
      }}
    />
</RecipesStack.Navigator>

);

const ExerciseStackScreen = ({navigation}) => (
<ExerciseStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#d08910',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <ExerciseStack.Screen name="Exercise" component={ExerciseScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#d08910" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
        <ExerciseStack.Screen
      name="ViewExercise"
      component={ViewExercise}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerTransparent:true,
        headerStyle: {
          backgroundColor: '#d08910',
          shadowColor: '#d08910',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Icon name="arrow-back-circle-outline" size={25} />
          </View>
        ),
      }}
    />

      
</ExerciseStack.Navigator>

);

const ProfileStackScreen = ({navigation}) => (
<ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
        headerShown : false,
        }} />
        <ProfileStack.Screen
      name="EditProfileScreen"
      component={EditProfileScreen}
      options={{
        title: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Icon name="arrow-back-circle-outline" size={25} />
          </View>
        ),
      }}
    />

      
</ProfileStack.Navigator>

);

