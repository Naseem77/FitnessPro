import React from 'react';
import { SafeAreaView, StyleSheet,  View, Text,Button,} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
   <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
     <Text>Home screen</Text>
     <Button title= "Go to details screen"
       onPress={() =>  navigation.navigate("Details")}
     />
   </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});