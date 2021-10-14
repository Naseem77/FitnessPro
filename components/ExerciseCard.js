import React from 'react';
import { View,Text,Image,StyleSheet,TouchableOpacity } from 'react-native';

import {
  Card,
  ExerciseImg,
  ExerciseInfoText,
} from '../styles/ExerciseStyle';
const ExerciseCard = ({itemData, onPress}) => {


  return (
    
    <Card>
    <TouchableOpacity onPress={onPress}>   
          <ExerciseImg
            source={itemData.exerciseImg}
            resizeMode ="cover"
            style={styles.cardImg}
          />
          
          <ExerciseInfoText>
          <Text>{itemData.exerciseName}</Text>
           </ExerciseInfoText>
        
    </TouchableOpacity>
    </Card>
  );
};

export default ExerciseCard;


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
