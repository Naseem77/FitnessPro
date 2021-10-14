import React, {useEffect, useContext, useState, Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Animated from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';

const AddNewFood = ({navigation}) => {

  const [userData, setUserData] = useState(null);

  const handleUpdateFirestore = async() => {
    firestore().collection('food')
    .add({
      foodName: userData.foodName,
      calories: userData.calories,
      protein: userData.protein,
      carbs: userData.carbs,
      fat: userData.fat,
      servingSize: userData.servingSize,
    })
    .then(() => {
      console.log('food added.');
      navigation.navigate('FoodListScreen');
      Alert.alert('Your food has been added successfully');
      setUserData(null);
    })
    .catch((error) => {
      console.log("Something wrong with firestore adding new food", error);
    })
  }

  /* Function check if the entered field if request number alert enter the number and if request a 
  name enter a name with alert option */
  const handleUpdate = async() => {
    try{
      if(isNaN(userData.foodName)){
        if(!isNaN(userData.calories)){
          if(!isNaN(userData.protein)){
            if(!isNaN(userData.carbs)){
              if(!isNaN(userData.fat)){
                if(!isNaN(userData.servingSize && userData.servingSize >0)){
                  handleUpdateFirestore();
                } else{
                  Alert.alert('Please insert a number in the serving size field!');
                }
              } else {
                Alert.alert('Please insert a number in the fat field!');
              }
            } else {
              Alert.alert('Please insert a number in the carbohydrate field!');
            }
          } else {
            Alert.alert('Please insert a number in the protein field!');
          }
        } else {
            Alert.alert('Please insert a number in the calories field!');
        }
      } else {
            Alert.alert('Please insert a name not a number in the food name field!');
      }
    }  catch(e) {
      Alert.alert('Please insert the food details first!');
        console.log('error while trying to add empty details food:',e);
    }
    
  }

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
     
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}>
       
            <Text>Enter your food details:</Text>
         <Animatable.View animation="fadeInUpBig">
        <View style={styles.action}>
          <MaterialIcons name="drive-file-rename-outline" color="#333333" size={20} />
          <TextInput
            placeholder="Food Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(txt) => setUserData({...userData, foodName: txt})}
            style={styles.textInput}
          />
        </View>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig">
        <View style={styles.action}>
          <MaterialCommunityIcons name="account-edit" color="#333333" size={20} />
          <TextInput
            placeholder="Food Calories"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            onChangeText={(txt) => setUserData({...userData, calories: txt})}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig">
        <View style={styles.action}>
          <MaterialCommunityIcons name="account-edit" color="#333333" size={20} />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="Food protein"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            onChangeText={(txt) => setUserData({...userData, protein: txt})}
            autoCorrect={true}
            style={styles.textInput}
          />
        </View>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig">
        <View style={styles.action}>
          <MaterialCommunityIcons name="account-edit" color="#333333" size={20} />
          <TextInput
            placeholder="Food carbohydrate"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            onChangeText={(txt) => setUserData({...userData, carbs: txt})}
            style={styles.textInput}
          />
        </View>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig">
        <View style={styles.action}>
          <MaterialCommunityIcons name="account-edit" color="#333333" size={20} />
          <TextInput
            placeholder="Food fat"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            onChangeText={(txt) => setUserData({...userData, fat: txt})}
            style={styles.textInput}
          />
        </View>
        </Animatable.View>

        <Animatable.View animation="fadeInUpBig">
        <View style={styles.action}>
          <MaterialCommunityIcons name="account-edit" color="#333333" size={20} />
          <TextInput
            placeholder="Food serving size (grams)"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            onChangeText={(txt) => setUserData({...userData, servingSize: txt})}
            style={styles.textInput}
          />
        </View>
        </Animatable.View>
    
         <Animatable.View animation="fadeInDownBig">
            <TouchableOpacity style={styles.commandButton} onPress={handleUpdate}>
            <Text style={styles.panelButtonTitle}>Add</Text>
          </TouchableOpacity>
          </Animatable.View>

      </Animated.View>
    </View>
  );
};

export default AddNewFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#517dcf',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,

  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#8b838f',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
