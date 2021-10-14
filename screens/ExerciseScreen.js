import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import ExerciseCard from '../components/ExerciseCard';

const Exercise = [
  {
    id: '1',
    exerciseName: 'Beginners workout',
    exerciseImg: require('../assets/exercise/beginners.jpg'),
    exerciseDetails: 'This is one of fitnessPro recipes',
    Ex1: require('../assets/exercise/Beginners/47120-butt-kicks.json'),
    Ex1Info:'Butt Kicks - 3 sets each set 10 times',
    Ex2: require('../assets/exercise/Beginners/47795-jumping-jack.json'),
    Ex2Info:'Jumping jack - 3 sets each set 10 times',
    Ex3: require('../assets/exercise/Beginners/49234-dynamic-hamstring-stretch-left.json'),
    Ex3Info:'Hamstring stretch - 3 sets each set 10 times',
    Ex4: require('../assets/exercise/Beginners/51565-wall-sit.json'),
    Ex4Info:'Wall sit - 3 sets each set 30 sec (rest 30 secs)',
    Ex5: require('../assets/exercise/Beginners/51858-side-split-squats.json'),
    Ex5Info:'Side split squats - 3 sets each set 10 times',
    Ex6: require('../assets/exercise/Beginners/52882-bird-dog.json'),
    Ex6Info:'Side split squats - 3 sets each set 10 times',
    Ex7: require('../assets/exercise/Beginners/52890-bridge.json'),
    Ex7Info:'Side split squats - 3 sets each set 10 times',
    Ex8: require('../assets/exercise/Beginners/53576-air-squat.json'),
    Ex8Info:'Side split squats - 3 sets each set 10 times',
  },
  {
    id: '2',
    exerciseName: 'Medium workout',
    exerciseImg: require('../assets/exercise/medium.jpg'),
    exerciseDetails: 'This is one of fitnessPro recipes',
    Ex1: require('../assets/exercise/Medium/49786-modified-burpee.json'),
    Ex1Info:'Burpee - 4 sets each set 10 times',
    Ex2: require('../assets/exercise/Medium/49927-bicycle-crunch.json'),
    Ex2Info:'Bicycle crunch - 4 sets each set 10 times',
    Ex3: require('../assets/exercise/Medium/51034-side-lunge-to-curtsy-lunge-left.json'),
    Ex3Info:'Lunge to curtsy - 4 sets each set 10 times',
    Ex4: require('../assets/exercise/Medium/51120-t-push-ups.json'),
    Ex4Info:'Push ups - 4 sets each set 30 sec (rest 30 secs)',
    Ex5: require('../assets/exercise/Medium/51617-bulgarian-split-squat-right.json'),
    Ex5Info:'Bulgarian split squat - 4 sets each set 10 times',
    Ex6: require('../assets/exercise/Medium/51853-squat-jump.json'),
    Ex6Info:'Squat jump - 4 sets each set 10 times',
    Ex7: require('../assets/exercise/Medium/52895-single-leg-bridge.json'),
    Ex7Info:'Single leg bridge - 4 sets each set 10 times',
    Ex8: require('../assets/exercise/Medium/53059-single-leg-deadlift-left.json'),
    Ex8Info:'Single led deadlift - 4 sets each set 10 times',
  },
  {
    id: '3',
    exerciseName: 'Advanced workout',
    exerciseImg: require('../assets/exercise/advanced.jpg'),
    exerciseDetails: 'This is one of fitnessPro recipes',
    Ex1: require('../assets/exercise/Advanced/49786-modified-burpee.json'),
    Ex1Info:'Burpee - 4 sets each set 15 times',
    Ex2: require('../assets/exercise/Advanced/49791-wipers.json'),
    Ex2Info:'Wipers - 4 sets each set 15 times',
    Ex3: require('../assets/exercise/Advanced/51610-box-pistol-right.json'),
    Ex3Info:'Box pistol right - 4 sets each set 15 times',
    Ex4: require('../assets/exercise/Advanced/52186-long-jumps.json'),
    Ex4Info:'Long jumps - 4 sets each set 15 times',
    Ex5: require('../assets/exercise/Advanced/52879-plank-with-hip-extension.json'),
    Ex5Info:'Plank with hip extension - 4 sets each set 15 times',
    Ex6: require('../assets/exercise/Advanced/53140-single-leg-forward.json'),
    Ex6Info:'Single leg forward - 4 sets each set 15 times',
    Ex7: require('../assets/exercise/Advanced/53270-jumping-lunges.json'),
    Ex7Info:'Jumping lunges - 4 sets each set 15 times',
    Ex8: require('../assets/exercise/Advanced/47960-cocoons.json'),
    Ex8Info:'Cocoons - 4 sets each set 15 times',
  },
  
];

const ExerciseScreen = ({navigation}) => {

const renderItem = ({item}) => {
  return (

  <ExerciseCard
      itemData={item}
      onPress={()=> navigation.navigate('ViewExercise', {itemData: item})}
  />
  );
  }
    return (
      <View style={styles.container}>
       <FlatList
         data={Exercise}
         renderItem={renderItem}
         keyExtractor={item => item.id}
         showsVerticalScrollIndicator={false}
       />
       </View>
    );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
});
