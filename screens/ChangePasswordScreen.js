import React, {useEffect, useContext, useState, Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Animated from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';

const ChangePasswordScreen = ({navigation}) => {

  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = React.useState({
        newPassword: '',
        currentPassword: '',
    });

  const reauthenticate = (currentPassword) => {
    setUploading(true);
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Changes user's password...
  const onChangePasswordPress = () => {

    reauthenticate(userData.currentPassword).then(() => {
      var user = auth().currentUser;
      user.updatePassword(userData.newPassword).then(() => {
        Alert.alert("Password was changed successfully!");
        navigation.goBack();
      }).catch((error) => { console.log('Error while changing user password',error.message); });
    }).catch((error) => { 
      Alert.alert('The current password is invalid!');
      console.log('Error while changing user password',error.message); 
    });
  }

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
     
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}>
       
            <Text>Enter your new password:</Text>
         <Animatable.View animation="fadeInUpBig">
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="Current Password"
            placeholderTextColor="#666666"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(txt) => setUserData({...userData, currentPassword: txt})}
            style={styles.textInput}
          />
        </View>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig">
        <View style={styles.action}>
          <Feather name="lock" color="#333333" size={20} />
          <TextInput
            placeholder="New Password"
            placeholderTextColor="#666666"
            onChangeText={(txt) => setUserData({...userData, newPassword: txt})}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        </Animatable.View>
    
         <Animatable.View animation="fadeInDownBig">
            <TouchableOpacity style={styles.commandButton} onPress={onChangePasswordPress}>
            <Text style={styles.panelButtonTitle}>Change</Text>
          </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation="fadeInUpBig">
            <TouchableOpacity style={styles.commandButton} onPress={() => navigation.goBack()}>
            <Text style={styles.panelButtonTitle}>Go Back</Text>
          </TouchableOpacity>
          </Animatable.View>

      </Animated.View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:50,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#517dcf',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,

  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#8b838f',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
