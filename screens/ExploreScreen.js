import React from 'react';
import { StyleSheet,  View, Text} from 'react-native';

const ExploreScreen = () => {
  return (
   <View style={styles.container}>
     <Text>Explore screen </Text>
   </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});