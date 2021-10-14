import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList,Alert} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

import firestore from '@react-native-firebase/firestore';
import {Container} from '../styles/FoodListStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Card,
  UserInfo,
  UserInfoText,
  InteractionWrapper,
  InteractionText,
} from '../styles/DiaryStyle';
import * as Animatable from 'react-native-animatable';
import DialogAndroid from 'react-native-dialogs';

const RecipeListScreen = ({navigation}) => {

    const today = new Date();
    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const day = today.getDate();
    const [Recipe, setRecipe] = useState([]);
    const {user, logout} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);
    const [saveMealType, setSaveMealType] = useState();
    const [userData, setUserData] = useState([]);

  const DeleteFirestoreRecipe =(item) =>{
    firestore().collection('users').doc(user.uid).collection('userRecipe').doc(item.id)
    .delete().then(() => {
      setDeleted(true);
      Alert.alert('Recipe deleted','Your Recipe has been deleted successfully');
    })
    .catch(e => console.log('Error deleting recipe', e))

    }

    const handleDeleteFood =(item) =>{
        Alert.alert('Delete recipe','Are you sure?',
        [
        {
            text:'Cancel',
            onPress: () => console.log('cancel deleting recipe'),
            style : 'cancel'
        },
        {
            text: 'Confirm',
            onPress: () => DeleteFirestoreRecipe(item),
        },
        ],
        {cancelable: false}
        );
    }

 const fetchRecipe = async() => {
      try {
        const list = [];
        await firestore().collection('users').doc(user.uid).collection('userRecipe')
        .get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
              const {recipeName,calories,protein,carbs,fat} = doc.data();
               console.log('doc(RecipeListScreen):',doc.id);
              list.push({
                  id: doc.id,
                  recipeName,
                  calories,
                  protein,
                  carbs,
                  fat,
              });
            }) 
        })
        setRecipe(list);
        console.log('recipes list: ',list);
        if (loading) {
            setLoading(false);
          }
      } catch(e) {
        console.log(e);
      }
    }

  const handleAddFood = async(item) =>{
    if(Platform.OS === 'ios'){
          handleAddFoodIos(item);
        }
        else{
          handleAddFoodAndroid(item);
        }
  }

    const handleAddFoodAndroid = async(item) =>{
    const { selectedItem } = await DialogAndroid.showPicker('Pick meal type:', null, {
    items: [
        { label:'Breakfast', id:'Breakfast' },
        { label:'Lunch', id:'Lunch' },
        { label:'Dinner', id:'Dinner' },
        { label:'Snacks', id:'Snacks' },
    ]
    });
    try{
      if (selectedItem.id == 'Breakfast') {
          AddFood1(item) 
          console.log('You selected item:', selectedItem);
      }
      else if (selectedItem.id == 'Lunch') {
          AddFood2(item) 
          console.log('You selected item:', selectedItem);
      }
      else if (selectedItem.id == 'Dinner') {
          AddFood3(item) 
          console.log('You selected item:', selectedItem);
      }
      else if(selectedItem.id == 'Snacks') {
          AddFood4(item) 
          console.log('You selected item:', selectedItem);
      }
    }catch(e){
      console.log("cancel add food",e);
    }
  }

    const handleAddFoodIos =(item) =>{
        console.log('CHECKING HERE: ', item);
        Alert.alert('Add to my food','Select which meal!',
        [
        {
            text:'Cancel',
            onPress: () => console.log('cancel adding recipe'),
            style : 'cancel'
        },
        {
            text: 'BreakFast',
            onPress: () => AddFood1(item),
        },
        {
            text: 'Lunch',
            onPress: () => AddFood2(item),
        },
        {
            text: 'Dinner',
            onPress: () => AddFood3(item),
        },
        {
            text: 'Snacks',
            onPress: () => AddFood4(item),
        },
        ],
        {cancelable: false}
        );
      }
    
    const AddFood1 = async(item) =>{
      updateUserDetails(item, 'breakfast');
    }
    const AddFood2 = async(item) =>{
      updateUserDetails(item, 'lunch');
    }
    const AddFood3 = async(item) =>{
      updateUserDetails(item,'dinner');
    }
    const AddFood4 = async(item) =>{
      updateUserDetails(item,'snacks');
    }

    const getUser = async() => {
    await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  const addUserFoods = async (item,mealSelected) => {
      firestore().collection('users').doc(user.uid).collection('userFood').doc()
      .set({
        foodName: item.recipeName,
        year,
        month,
        day,
        mealType: mealSelected,
        calories: item.calories,
      })
      .then(() => {
        console.log('daily Food added to the user');
        navigation.navigate('Diary');
      })
      .catch((error) => {
        console.log("Something wrong with firestore addUserFood Function", error);
      })

    }
/*function update the current calories for the user after adding a food */
  const updateUserDetails= async (item, mealSelected) =>{
        let foodCalories = item.calories;
        let currentCaloriesDatabase = userData.currentCalories;
        let updateCurrentCalories = foodCalories + currentCaloriesDatabase
        addUserFoods(item, mealSelected);//Adding food to the the user in firestore

      firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        currentCalories: updateCurrentCalories,
      })
      .then(() => {
        console.log('Food/Recipe Updated!');
        
      })
  
  }


  useEffect(() => {
    getUser();
    fetchRecipe();
    setDeleted(false);//fixed the delete refresh only for first time, now every time will refresh after deleting
   navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading,deleted]);


  const renderItem = ({item}) => {
  return (
  <Animatable.View animation="lightSpeedIn">
    <TouchableOpacity onPress={() => handleAddFood(item)}>
      <Card>
        <UserInfo>
          <UserInfoText>
          <InteractionWrapper>
              <Text>{item.recipeName}</Text>
              
                <InteractionText>
                <TouchableOpacity onPress={() => handleDeleteFood(item)}>
                  <Icon name="delete" size={26} />
                  </TouchableOpacity>
                </InteractionText>
              </InteractionWrapper>
          </UserInfoText>
        </UserInfo>
      </Card>
    </TouchableOpacity>
      </Animatable.View>
  );
  }

    return (
       <Container>
       <FlatList
         data={Recipe}
         renderItem={renderItem}
         keyExtractor={item => item.id}
         showsVerticalScrollIndicator={false}
       />
      </Container>  
    );
};

export default RecipeListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  signIn: {
        width: '33%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
});
