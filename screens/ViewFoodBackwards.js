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
  FlatList,
} from 'react-native';
import {
  Card,
  UserInfo,
  UserInfoText,
  InteractionWrapper,
  InteractionText,
} from '../styles/DiaryStyle';
import {InteractionWrapperPicker} from '../styles/FeedStyles';
import {Picker} from '@react-native-picker/picker';

import Animated from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewFoodBackwards = ({navigation}) => {
  const today = new Date();
  const yearToday = new Date().getFullYear();
  const monthToday = new Date().getMonth()+1;
  const dayToday = today.getDate();
  const todayDate = today.getDate() + " - "+ parseInt(today.getMonth()+1) +" - "+ today.getFullYear();
  const todayDateFirebase = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear();

    const [selectedYear, setSelectedYear] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedDay, setSelectedDay] = useState();
    const {user, register} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [userFood, setUserFood] = useState([]);

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

  const getUserFood = async() => {
    try {
        const list = [];
        await firestore().collection('users').doc(user.uid).collection('userFood')
        .get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
              const {foodName,mealType,year,month,day,calories} = doc.data();
              if(year == selectedYear && month == selectedMonth && day == selectedDay){//checking if we have the current day value same as the foods database.
                console.log('doc:',doc.id);
                list.push({
                    id: doc.id,
                    foodName,
                    mealType,
                    year:yearToday,
                    month: monthToday,
                    day: dayToday,
                    calories,
                });
              }
            }) 
        })
        if(list.length == 0){
          Alert.alert('No food were added in this date!');
          console.log('no food found for today for the user!');
        }
          console.log('list: ', list);
          setUserFood(list);
      } catch(e) {
        console.log(e);
      }
  }

  useEffect(() => {
    getUser();

  }, []);

   const renderItem = ({item}) => {
      return (
      <Card>
        <UserInfo>
          <UserInfoText>
          <InteractionWrapper>

              <Text>{item.foodName} - {item.mealType} - calories:{item.calories}</Text> 

              </InteractionWrapper>
          </UserInfoText>
        </UserInfo>
      </Card>
      );
    }
  return (
    <View style={styles.container}>
            <Text>       Pick the date to view your backwards food:</Text>
        <InteractionWrapperPicker>
    
                <Picker style={{width:'30%',marginLeft:-20}}
                selectedValue={selectedYear}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedYear(itemValue)
                }>
                <Picker.Item label="Year" value="Year" />
                <Picker.Item label="2015" value="2015" />
                <Picker.Item label="2016" value="2016" />
                <Picker.Item label="2017" value="2017" />
                <Picker.Item label="2018" value="2018" />
                <Picker.Item label="2019" value="2019" />
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2021" value="2021" />  
                </Picker>
          
            <View>
                <Picker style={{width:'400%', marginRight: 28}}
                selectedValue={selectedMonth}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedMonth(itemValue)
                }>
                <Picker.Item label="Mth" value="Month" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
                </Picker>
                
            </View>
            <View>
                <Picker style={{width:'170%', marginRight: 65}}
                selectedValue={selectedDay}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedDay(itemValue)
                }>
                <Picker.Item label="Day" value="Day" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="13" value="13" />
                <Picker.Item label="14" value="14" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="16" value="16" />
                <Picker.Item label="17" value="17" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="19" value="19" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="22" value="22" />
                <Picker.Item label="23" value="23" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="26" value="26" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="28" value="28" />
                <Picker.Item label="29" value="29" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="31" value="31" />
                </Picker>      
            </View>
        </InteractionWrapperPicker>
         <Animatable.View animation="fadeInDownBig">
            <TouchableOpacity style={styles.commandButton} onPress={getUserFood}>
            <Text style={styles.panelButtonTitle}>View</Text>
          </TouchableOpacity>
          </Animatable.View>
        <Text></Text>
        <Text></Text>
           <FlatList
                data={userFood}
                renderItem={renderItem}
                
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />

    </View>
  );
};

export default ViewFoodBackwards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:20,
  },
  colorText: {
    backgroundColor: '#e62737',
  },
  commandButton: {
    padding: 15,
    borderRadius: 40,
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
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
