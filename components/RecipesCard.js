import React from 'react';
import { View,Text,Image,StyleSheet,TouchableOpacity } from 'react-native';

import {
  Card,
  RecipesImg,
  RecipeInfoText,
} from '../styles/RecipesStyle';
const RecipesCard = ({itemData, onPress}) => {


  return (
    
    <Card>
    <TouchableOpacity onPress={onPress}>
        <View style ={styles.card}>
          <View style={styles.cardImgWrapper}>
          <RecipesImg
            source={itemData.recipeImg}
            resizeMode ="cover"
            style={styles.cardImg}
          />
          </View>
          
          <RecipeInfoText>
          <Text>{itemData.recipeName}</Text>
           </RecipeInfoText>
        </View>
    </TouchableOpacity>
    </Card>
  );
};

export default RecipesCard;


const styles = StyleSheet.create({
  card: {
    height: 110,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    padding: 3,
  },
  cardDetails: {
    fontSize: 12,
    padding: 5,
    color: '#444',
  },
});
