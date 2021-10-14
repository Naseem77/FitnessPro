import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

import firestore from '@react-native-firebase/firestore';
import {Container} from '../styles/FoodListStyle';
import FoodListCard from '../components/FoodListCard';

const FoodListScreen = ({navigation}) => {

    const [Food, setFood] = useState([]);
    const {user, logout} = useContext(AuthContext);
      const [loading, setLoading] = useState(true);

  {/*const test  = async () => {

  const events = await firestore().collection('food')
  events.get().then((querySnapshot) => {
      const tempDoc = []
      querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() })
      })
      setFood(tempDoc);
      console.log(Food);

   })
}*/}

 const fetchFood = async() => {
      try {
        const list = [];
        await firestore().collection('food')
        .get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
              const {foodName,calories,protein,carbs,fat,servingSize} = doc.data();
               console.log('doc:',doc.id);
              list.push({
                  id: doc.id,
                  foodName,
                  calories,
                  protein,
                  carbs,
                  fat,
                  servingSize,
              });
            }) 
        })
        setFood(list);
        if (loading) {
            setLoading(false);
          }
      } catch(e) {
        console.log(e);
      }
    }


  useEffect(() => {
    
    fetchFood();
   navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);


  const renderItem = ({item}) => {
  return (
  <FoodListCard
      itemData={item}
      onPress={()=> navigation.navigate('ViewFood', {itemData: item})}
  />
  );
  }

    return (
       <Container>
       <FlatList
         data={Food}
         renderItem={renderItem}
         keyExtractor={item => item.id}
         showsVerticalScrollIndicator={false}
       />
      </Container>  
    );
};

export default FoodListScreen;

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
