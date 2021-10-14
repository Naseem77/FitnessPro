import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,Image } from 'react-native';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  CaloriesText,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FoodListStyle';
import * as Animatable from 'react-native-animatable';

const FoodListCard = ({itemData, onPress}) => {
    return (
       <Animatable.View animation="lightSpeedIn">
      <TouchableOpacity onPress={onPress} >
      <Card>
          <PostText>{itemData.foodName}</PostText>
          <CaloriesText>Total Calories - {itemData.calories}</CaloriesText>
      </Card>
      </TouchableOpacity>
      </Animatable.View>
    );
};

export default FoodListCard;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
