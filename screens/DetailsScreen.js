


import React from 'react';
import { SafeAreaView, StyleSheet,  View, Text,Button,} from 'react-native';

const DetailsScreen = () => {
  return (
   <View style={styles.container}>
     <Text>details screen screen</Text>
   </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});