import React from 'react';
import { StyleSheet,  View, Text} from 'react-native';

const SettingsScreen = () => {
  return (
   <View style={styles.container}>
     <Text>Settings screen screen</Text>
   </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});