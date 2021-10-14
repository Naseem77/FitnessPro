import React, {useContext, useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Alert,TextInput } from 'react-native';
import {
  SubmitBtn,
  SubmitBtnText,
} from '../styles/RecipesStyle';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {Picker} from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DialogAndroid from 'react-native-dialogs';

const ViewFood = ({route, navigation}) => {
  const today = new Date();
  const year = new Date().getFullYear();
  const month = new Date().getMonth()+1;
  const day = today.getDate();
  const itemData = route.params.itemData;
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [servingNumber, setServingNumber] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState();

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

  const addUserFoods = async (type) => {
      firestore().collection('users').doc(user.uid).collection('userFood').doc()
      .set({
        foodName: itemData.foodName,
        year,
        month,
        day,
        mealType: type,
        calories: itemData.calories,
        servingSizeNumber: servingNumber.servingSizeNumber,
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
  const updateUserDetails= async (type) =>{
        let foodCalories = itemData.calories*servingNumber.servingSizeNumber;//multiply it by the serving number
        let currentCaloriesDatabase = userData.currentCalories;
        let updateCurrentCalories = foodCalories + currentCaloriesDatabase
        addUserFoods(type);//Adding food to the the user in firestore

      firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        currentCalories: updateCurrentCalories,
      })
      .then(() => {
        console.log('Food Updated!');
        
      })
   
  }

  const checkServingNumberValue =() =>{
    if(servingNumber.servingSizeNumber > 0){
      if(Platform.OS === 'ios'){
        handleAddFood();
      }
      else{
        handleAddFoodAndroid();
      }
    }else{
      Alert.alert('please insert a food serving number before adding a food!');
    }
  }
  const handleAddFoodAndroid = async() =>{
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
          AddFood1() 
          console.log('You selected item:', selectedItem);
      }
      else if (selectedItem.id == 'Lunch') {
          AddFood2() 
          console.log('You selected item:', selectedItem);
      }
      else if (selectedItem.id == 'Dinner') {
          AddFood3() 
          console.log('You selected item:', selectedItem);
      }
      else if(selectedItem.id == 'Snacks') {
          AddFood4() 
          console.log('You selected item:', selectedItem);
      }
    }catch(e){
      console.log("cancel add food",e);
    }
  }

  const handleAddFood =() =>{
        Alert.alert('Add to my food','Select which meal!',
        [
        {
            text:'Cancel',
            onPress: () => console.log('cancel adding food'),
            style : 'cancel'
        },
        {
            text: 'BreakFast',
            onPress: () => AddFood1(),
        },
        {
            text: 'Lunch',
            onPress: () => AddFood2(),
        },
        {
            text: 'Dinner',
            onPress: () => AddFood3(),
        },
        {
            text: 'Snacks',
            onPress: () => AddFood4(),
        },
        ],
        {cancelable: false}
        );
      }
    
    const AddFood1 = async() =>{
      updateUserDetails('breakfast');
    }
    const AddFood2 = async(item) =>{
      updateUserDetails('lunch');
    }
    const AddFood3 = async(item) =>{
      updateUserDetails('dinner');
    }
    const AddFood4 = async(item) =>{
      updateUserDetails('snacks');
    }

const handleReportFood = async() =>{
  if(Platform.OS === 'ios'){
        handleReportFoodIos();
      }
      else{
        handleReportFoodAndroid();
      }
}
const handleReportFoodAndroid = async() =>{
    const { selectedItem } = await DialogAndroid.showPicker('Give us your feedback:', null, {
    items: [
        { label:'Wrong nutrition information', id:'Wrong nutrition information' },
        { label:'Incorrect food name', id:'Incorrect food name' },
        { label:'Duplicate food', id:'Duplicate food' },
        { label:'other reason', id:'other reason' },
    ]
    });
    try{
      if (selectedItem.id == 'Wrong nutrition information') {
          AddReportFirebase('Wrong nutrition information'); 
          console.log('You selected item:', selectedItem);
      }
      else if (selectedItem.id == 'Incorrect food name') {
          AddReportFirebase('Incorrect food name'); 
          console.log('You selected item:', selectedItem);
      }
      else if (selectedItem.id == 'Duplicate food') {
          AddReportFirebase('Duplicate food'); 
          console.log('You selected item:', selectedItem);
      }
      else if(selectedItem.id == 'other reason') {
          AddReportFirebase('other reason'); 
          console.log('You selected item:', selectedItem);
      }
    }catch(e){
      console.log("cancel selecting report",e);
    }
  }
const handleReportFoodIos =() =>{
          Alert.alert('Report a food','what is wrong with the food?',
        [
        {
            text:'Cancel',
            onPress: () => console.log('cancel report'),
            style : 'cancel'
        },
        {
            text: 'Wrong nutrition information',
            onPress: () => AddReportFirebase('Wrong nutrition information'),
        },
        {
            text: 'Incorrect food name',
            onPress: () => AddReportFirebase('Incorrect food name'),
        },
        {
            text: 'Duplicate food',
            onPress: () => AddReportFirebase('Duplicate food'),
        },
        {
            text: 'other reason',
            onPress: () => AddReportFirebase('other reason'),
        },
        ],
        {cancelable: false}
        );
      }

  const AddReportFirebase = async(text) =>{
      firestore().collection('foodReports')
      .add({
      foodName: itemData.foodName,
      calories: itemData.calories,
      protein: itemData.protein,
      carbs: itemData.carbs,
      fat: itemData.fat,
      userReportID: user.uid,
      reportIssue: text,

    })
    .then(() => {
      console.log('report added.');
      Alert.alert('You have reported the food successfully');
    })
    .catch((error) => {
      console.log("Something wrong with firestore adding new report", error);
    })
  }

   useEffect(() => {
   getUser();
  }, []);

    return (
      <View style={styles.container}>
      

        
          <View style={styles.section}>
              <Text style={styles.title}>{itemData.foodName} - {itemData.servingSize} Gram</Text>
          </View>

        <View style={[styles.section, styles.sectionLarge]}>
        <Animatable.View animation="fadeInUpBig">
        <View style={styles.action}>
          <MaterialCommunityIcons name="account-edit" color="#333333" size={20} />
          <TextInput
            placeholder="Food serving number"
            placeholderTextColor="#000000"
            onChangeText={(txt) => setServingNumber({...servingNumber, servingSizeNumber: txt})}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        </Animatable.View>
        <Text></Text>
          <Text style={styles.title}>Total Calories: {itemData.calories} Grams</Text>
          <Text style={styles.title}>Total Crabs: {itemData.carbs} Grams</Text>
          <Text style={styles.title}>Total Protein: {itemData.protein} Grams</Text>
          <Text style={styles.title}>Total Fat: {itemData.fat} Grams</Text>
        </View>
        
        
            
        <SubmitBtn onPress={checkServingNumberValue}>
            <SubmitBtnText>Add Food</SubmitBtnText>
          </SubmitBtn>
          <Text></Text>
          <SubmitBtn onPress={handleReportFood}>
            <SubmitBtnText>Report Food</SubmitBtnText>
          </SubmitBtn>
      </View>
    );
};

export default ViewFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
   action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 5
    },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
    padding :20,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#cccccc',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
});

