import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {
  Card,
  UserInfo,
  UserInfoText,
  InteractionWrapper,
  InteractionText,
} from '../styles/DiaryStyle';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const DiaryScreen = ({navigation, route}) => {
  const today = new Date();
  const yearToday = new Date().getFullYear();
  const monthToday = new Date().getMonth()+1;
  const dayToday = today.getDate();
  const todayDate = today.getDate() + " - "+ parseInt(today.getMonth()+1) +" - "+ today.getFullYear();
  const todayDateFirebase = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+ today.getFullYear();

  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [userFood, setUserFood] = useState([]);
  const [userFoodToday, setUserFoodToday] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [trackDate, setTrackDate] = useState([]);

 const getDate = async() => {/*getting the date value that has been saved day before */
    await firestore()
    .collection('date')
    .doc("9pe8G7e9hMrr6UMAclBk")
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('Date Data', documentSnapshot.data());
        if(documentSnapshot.data().year !== yearToday  || documentSnapshot.data().month !== monthToday || documentSnapshot.data().day !== dayToday){
          UpdateCaloriesForNewDay();
          updatedNewDate();

        }else{
        console.log('Still the same date!');
        }
        setTrackDate(documentSnapshot.data());
      }
    })

  }


const UpdateCaloriesForNewDay = async() => {/* updates calories for 0 for new day if the today date not equal to the saved date in firestore */
    console.log('inside!!!!!!!!!!!!!!!!!!!!1');
    firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      currentCalories: 0,
    })
    .then(() => {
      console.log('Current Calories updated Updated!');
    }).catch((e) => {
      console.log('error',e);
    })
}

const updatedNewDate = async() => {/* updates the date value in firebase for our new date */
  console.log('inside!!!!!!!!!!!!!!!!!!!!2');
       await firestore()
        .collection('date')
        .doc(trackDate.docId)
        .update({
          year: yearToday,
          month: monthToday,
          day: dayToday,
      }). then(() =>{
        console.log('new date has been updated in the firestore!');
      }).catch((e)=>{
        console.log('error',e);
      })
        
  }

  const getUser = async() => {
    await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        //console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
    getDate();
  }

  const getUserFood = async() => {
    try {
        const list = [];
        await firestore().collection('users').doc(user.uid).collection('userFood')
        .get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
              const {foodName,mealType,year,month,day,calories,servingSizeNumber} = doc.data();
              if(yearToday == year && monthToday == month && dayToday == day){//checking if we have the current day value same as the foods database.
                console.log('doc:',doc.id);
                list.push({
                    id: doc.id,
                    foodName,
                    mealType,
                    year:yearToday,
                    month: monthToday,
                    day: dayToday,
                    calories,
                    servingSizeNumber,
                });
              }else{
                console.log('no food found for today for the user!');
              }
            }) 
        })
          console.log('list: ', list);
          setUserFood(list);
          if (loading) {
            setLoading(false);
          }
      } catch(e) {
        console.log(e);
      }
  }

  /* function updates the current calories for user after deleting any food */
const UpdateFirestoreFoodAfterDeleting = (item) => {
  let foodCalories = 0;
  if(item.servingSizeNumber == null){//checking for if the user added recipe to the dairy screen and our serving number is null
    foodCalories = item.calories;
  } else {
    foodCalories = item.calories*item.servingSizeNumber;//multiply by serving number to remove as the user selected
  }
  let currentCaloriesDatabase = userData.currentCalories;
  let updateCurrentCalories = currentCaloriesDatabase - foodCalories;
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
/* Deleteing the user food from firestore */
const DeleteFirestoreFood = (item) => {
   firestore().collection('users').doc(user.uid).collection('userFood').doc(item.id)
    .delete().then(() => {
      Alert.alert('Food deleted','Your food has been deleted successfully');
      setDeleted(true);
      UpdateFirestoreFoodAfterDeleting(item);
    })
    .catch(e => console.log('Error deleting food', e))
}
/* Alert message to cancel deleting the food or confirm deleting it */
  const handleDeleteFood = (item) => {
    console.log(item);
    Alert.alert('Delete food','Are you sure?',
    [
      {
        text:'Cancel',
        onPress: () => console.log('cancel deleting food'),
        style : 'cancel'
      },
      {
        text: 'Confirm',
        onPress: () => DeleteFirestoreFood(item),
      },
    ],
    {cancelable: false}
    );
  }

  {/*const handleRemainCaloriesUnderZero = () => {
    if(userData.totalCalories - userData.currentCalories <= 0){
        setRemainCalories(0);
    }else{
      setRemainCalories(userData.totalCalories - userData.currentCalories);
    }
  }*/}

  useEffect(() => {
   getUser();
   getUserFood();
   setDeleted(false);//fix for onlt first time delete food, now will refresh and delete any food deleted!
   navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading,deleted]);


  const renderItem = ({item}) => {
      return (
      <Card>
        <UserInfo>
          <UserInfoText>
          <InteractionWrapper>
              <Text>{item.foodName} - {item.mealType}</Text>
              
                <InteractionText>
                <TouchableOpacity onPress={() => handleDeleteFood(item)}>
                  <Icon name="delete" size={26} />
                  </TouchableOpacity>
                </InteractionText>
              
              </InteractionWrapper>
          </UserInfoText>
        </UserInfo>
      </Card>
      );
    }

  return (

       <View style={styles.container}>
       <Text style={[styles.userInfoTitle, {marginTop:5}]}>{todayDate}</Text>
          <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{userData.totalCalories}</Text>
            <Text style={styles.userInfoSubTitle}>Total Calories</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{userData.currentCalories}</Text>
            <Text style={styles.userInfoSubTitle}>Current Calories</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{userData.totalCalories - userData.currentCalories}</Text>
            <Text style={styles.userInfoSubTitle}>Remain Calories</Text>
          </View>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer]}
        >
      <Card>
      <UserInfo>
        <UserInfoText>
        
            <Text style={[styles.text_footer]}>Add Food by clicking on the icon:</Text>
            <View style={styles.action}>
            <TouchableOpacity onPress = {() => navigation.navigate('FoodListScreen')}>
                <MaterialIcons
                    name="add-box"
                    color= "#05375a"
                    size={30}
                />
                </TouchableOpacity>
                
            </View>
            </UserInfoText>
     </UserInfo>
    </Card>
            
     
       <FlatList
         data={userFood}
         renderItem={renderItem}
         
         keyExtractor={item => item.id}
         showsVerticalScrollIndicator={false}
       />

        </Animatable.View>
      </View>

     

  );
};
{/*renderItem={({item})=> renderItem( item={item})}*/}
export default DiaryScreen;

const styles = StyleSheet.create({
 container: {
      flex: 1, 
      backgroundColor: '#dcddde'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 6 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textIn: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingRight: 20,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#3b3b3a',
    textAlign: 'center',
  },
});

