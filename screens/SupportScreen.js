import React from 'react';
import { StyleSheet,  View, Text} from 'react-native';

const SupportScreen = () => {
  return (
   <View style={styles.container}>
     <Text>Support screen screen</Text>
   </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});