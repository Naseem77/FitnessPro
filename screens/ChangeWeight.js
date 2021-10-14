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

const ChangeWeight = ({navigation}) => {

  const [selectedWeight, setSelectedWeight] = useState();
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
      weight: selectedWeight,
      
    })
    .then(() => {
        Alert.alert('Your weight has been updated!');
      console.log('Weight has been Updated!');
      navigation.goBack();
    })
    }

  const handleFieldsInput = async() => {
      const currentYear = new Date().getFullYear();
      var calories = 0;
    if( selectedWeight > 1){
         if(userData.Gender == "male"){
            const maleBMR = (10*selectedWeight) + (6.25*userData.hight) - (5*(currentYear - userData.age)) +5;
             if(userData.program == 1){
                calories = maleBMR*1.55;
            } else if (userData.program == 2){
                calories = maleBMR*1.375;
            }else{
                userData.program = maleBMR*1.2;
            }
        } else {
            const femaleBMR = (10 * selectedWeight) + (6.25* userData.hight) - (5*(currentYear - userData.age)) -161;
             if(userData.program == 1){
                calories = femaleBMR*1.55;
            } else if (userData.program == 2){
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
       
            <Text>Select your new weight:</Text>
            <Text styles={styles.colorText}>Note: By changing your weight your total calories intake will be changed</Text>
            <Text>depends on your weight change!</Text>
            <View>
                <Picker style={{width:'80%', marginLeft: 40}}
                selectedValue={selectedWeight}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedWeight(itemValue)
                }>
                <Picker.Item label="None" value="None" />
                <Picker.Item label="40" value="40" />
                <Picker.Item label="41" value="41" />
                <Picker.Item label="42" value="42" />
                <Picker.Item label="43" value="43" />
                <Picker.Item label="44" value="44" />
                <Picker.Item label="45" value="45" />
                <Picker.Item label="46" value="46" />
                <Picker.Item label="47" value="47" />
                <Picker.Item label="48" value="48" />
                <Picker.Item label="49" value="49" />
                <Picker.Item label="50" value="50" />

                <Picker.Item label="51" value="51" />
                <Picker.Item label="52" value="52" />
                <Picker.Item label="53" value="53" />
                <Picker.Item label="54" value="54" />
                <Picker.Item label="55" value="55" />
                <Picker.Item label="56" value="56" />
                <Picker.Item label="57" value="57" />
                <Picker.Item label="58" value="58" />
                <Picker.Item label="59" value="59" />
                <Picker.Item label="60" value="60" />

                <Picker.Item label="61" value="61" />
                <Picker.Item label="62" value="62" />
                <Picker.Item label="63" value="63" />
                <Picker.Item label="64" value="64" />
                <Picker.Item label="65" value="65" />
                <Picker.Item label="66" value="66" />
                <Picker.Item label="67" value="67" />
                <Picker.Item label="68" value="68" />
                <Picker.Item label="69" value="69" />
                <Picker.Item label="70" value="70" />

                <Picker.Item label="71" value="71" />
                <Picker.Item label="72" value="72" />
                <Picker.Item label="73" value="73" />
                <Picker.Item label="74" value="74" />
                <Picker.Item label="75" value="75" />
                <Picker.Item label="76" value="76" />
                <Picker.Item label="77" value="77" />
                <Picker.Item label="78" value="78" />
                <Picker.Item label="79" value="79" />
                <Picker.Item label="80" value="80" />

                <Picker.Item label="81" value="81" />
                <Picker.Item label="82" value="82" />
                <Picker.Item label="83" value="83" />
                <Picker.Item label="84" value="84" />
                <Picker.Item label="85" value="85" />
                <Picker.Item label="86" value="86" />
                <Picker.Item label="87" value="87" />
                <Picker.Item label="88" value="88" />
                <Picker.Item label="89" value="89" />
                <Picker.Item label="90" value="90" />

                <Picker.Item label="91" value="91" />
                <Picker.Item label="92" value="92" />
                <Picker.Item label="93" value="93" />
                <Picker.Item label="94" value="94" />
                <Picker.Item label="95" value="95" />
                <Picker.Item label="96" value="96" />
                <Picker.Item label="97" value="97" />
                <Picker.Item label="98" value="98" />
                <Picker.Item label="99" value="99" />
                <Picker.Item label="100" value="100" />

                <Picker.Item label="101" value="101" />
                <Picker.Item label="102" value="102" />
                <Picker.Item label="103" value="103" />
                <Picker.Item label="104" value="104" />
                <Picker.Item label="105" value="105" />
                <Picker.Item label="106" value="106" />
                <Picker.Item label="107" value="107" />
                <Picker.Item label="108" value="108" />
                <Picker.Item label="109" value="109" />
                <Picker.Item label="110" value="110" />

                <Picker.Item label="111" value="111" />
                <Picker.Item label="112" value="112" />
                <Picker.Item label="113" value="113" />
                <Picker.Item label="114" value="114" />
                <Picker.Item label="115" value="115" />
                <Picker.Item label="116" value="116" />
                <Picker.Item label="117" value="117" />
                <Picker.Item label="118" value="118" />
                <Picker.Item label="119" value="119" />
                <Picker.Item label="120" value="120" />
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

export default ChangeWeight;

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
