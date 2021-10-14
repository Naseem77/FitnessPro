import React, {useContext, useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet,Image, Platform, Dimensions,StatusBar, Alert } from 'react-native';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import {
  SubmitBtn,
  SubmitBtnText,
} from '../styles/RecipesStyle';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 300;

const ViewRecipes = ({route, navigation}) => {
  const itemData = route.params.itemData;
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [userRecipe, setUserRecipe] = useState([]);
  const [recipesID, setRecipeID] = useState([]);
   const [addRecipe, setAddRecipe] = useState(true);//used as a flag for checking if the recipe already added or not!

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

  const getRecipe = async() => {
  try {
        const list = [];
        await firestore().collection('users').doc(user.uid).collection('userRecipe')
        .get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
              const {recipeId} = doc.data();
              if(recipeId !== itemData.id){
                console.log('doc:(ViewRecipe)',doc.id);
                list.push({
                    id: doc.id,
                    recipeId,
                });
              }else{
                setAddRecipe(false);//checking if the recipe has been added or not!
              }
            }) 
        })
          console.log('list: ', list);
          setUserRecipe(list);
          
      } catch(e) {
        console.log(e);
      }
  }

  const submitRecipe = async () => {
          console.log('add recipe flag:',addRecipe);
          if(addRecipe == true){
          
          firestore().collection('users').doc(user.uid).collection('userRecipe').doc()
          .set({
          recipeId: itemData.id,
          recipeName: itemData.recipeName,
          calories: itemData.calories,
          protein: itemData.protein,
          fat: itemData.fat,
          carbs: itemData.carbs,
        })
        .then(() => {
          console.log('recipe added to the user');
          Alert.alert('The recipe has been added to your recipes!');
          navigation.navigate('Recipes');
        })
        .catch((error) => {
          console.log("Something wrong with firestore addUserFood Function", error);
        })
      }else{
        Alert.alert('Recipe has been already added to your recipes!');
      }
  }

  useEffect(() => {
   getUser();
   getRecipe();
  }, [addRecipe]);

    return (
      <View style={styles.container}>
       <StatusBar barStyle='light-content'/>
       <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        minOverlayOpacity ={0.2}
        maxOverlayOpacity = {0.6}
        headerImage = {itemData.recipeImg}
    >

        <TriggeringView style={styles.section}>
          <View>
              <Text style={styles.title}>{itemData.recipeName}</Text>
          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.title}>Total Calories: {itemData.calories} Grams</Text>
          <Text style={styles.title}>Total Crabs: {itemData.carbs} Grams</Text>
          <Text style={styles.title}>Total Protein: {itemData.protein} Grams</Text>
          <Text style={styles.title}>Total Fat: {itemData.fat} Grams</Text>
          <Text></Text>
          <Text style={styles.title}>Ingredients:</Text>
          <Text style ={styles.sectionContent}>{itemData.recipeIngredients}</Text>
          <Text style={styles.title}>Directions:</Text>
          <Text style ={styles.sectionContent}>{itemData.Directions}</Text>
        </View>
        <SubmitBtn onPress={submitRecipe}>
            <SubmitBtnText>Add To Diary</SubmitBtnText>
          </SubmitBtn>
    </ImageHeaderScrollView>
      </View>
    );
};

export default ViewRecipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
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
    color: '#fff',
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
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
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

