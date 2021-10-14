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
import {Picker} from '@react-native-picker/picker';

import Animated from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const ChangeProgram = ({navigation}) => {

  const [selectedProgram, setSelectedProgram] = useState();
  const {user, register} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async() => {
    const currentUser = await firestore()
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

  useEffect(() => {
    getUser();
  }, []);

    const updateWeightFirestore = (calories) => {
    firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      totalCalories: calories,
      program: selectedProgram,
      
    })
    .then(() => {
        Alert.alert('Your program has been updated!');
      console.log('program has been Updated!');
      navigation.goBack();
    })
    }

  const handleFieldsInput = async() => {
      const currentYear = new Date().getFullYear();
      var calories = 0;
    if(selectedProgram !== ""){
         if(userData.Gender == "male"){
            const maleBMR = (10*userData.weight) + (6.25*userData.hight) - (5*(currentYear - userData.age)) +5;
             if(selectedProgram == 1){
                calories = maleBMR*1.55;
            } else if (selectedProgram == 2){
                calories = maleBMR*1.375;
            }else{
                userData.program = maleBMR*1.2;
            }
        } else {
            const femaleBMR = (10 * userData.weight) + (6.25* userData.hight) - (5*(currentYear - userData.age)) -161;
             if(selectedProgram == 1){
                calories = femaleBMR*1.55;
            } else if (selectedProgram == 2){
                calories = femaleBMR*1.375;
            }else{
                calories = femaleBMR*1.2;
            }
        }
        updateWeightFirestore(Math.round(calories));
    } else{
        Alert.alert('Please select your Weight before submitting change!'); 
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
       
            <Text>Select your new program:</Text>
            <Text styles={styles.colorText}>Note: By changing your program your total calories intake will be changed</Text>
            <Text>depends on your program change!</Text>
            <View>
                <Picker style={{width:'80%', marginLeft: 40}}
                selectedValue={selectedProgram}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedProgram(itemValue)
                }>
                <Picker.Item label="None" value="None" />
                <Picker.Item label="Maintain weight" value="1" />
                <Picker.Item label="Mild weight loss (0.25kg/week)" value="2" />
                <Picker.Item label="Weight loss (0.5kg/week)" value="3" />
                </Picker>
                
            </View>
         <Animatable.View animation="fadeInDownBig">
            <TouchableOpacity style={styles.commandButton} onPress={handleFieldsInput}>
            <Text style={styles.panelButtonTitle}>Submit Change</Text>
          </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation="fadeInUpBig">
            <TouchableOpacity style={styles.commandButton} onPress={() => navigation.goBack()}>
            <Text style={styles.panelButtonTitle}>Go Back</Text>
          </TouchableOpacity>
          </Animatable.View>

      </Animated.View>
    </View>
  );
};

export default ChangeProgram;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:50,
  },
  colorText: {
    backgroundColor: '#e62737',
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