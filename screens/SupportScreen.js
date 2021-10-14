import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {UserName3, UserName2} from '../styles/FeedStyles';
import LinearGradient from 'react-native-linear-gradient';

const SupportScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
         <StatusBar backgroundColor='#ff5900' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="fadeInUpBig"
                duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
          </View>
          
         <View style={styles.header2}>
        <Animatable.View animation="fadeInDownBig">
        <UserName3>
            <Text>Support: Please send an e-mail to this address: Admin@hotmail.com</Text>
            <Text>  ,If you feel about reporting anything nor having problems using the app!</Text>
            </UserName3>
            </Animatable.View>
            </View>
          <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => navigation.goBack()}
                >
                <LinearGradient
                    colors={['#ff5900', '#ff5900']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Back Home</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
         <UserName2>
            <Text>FitnessPro App has been created by : Naseem Ali & Ayman abd alrhman</Text>
          </UserName2>
      </View>
    );
};

export default SupportScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
   header: {
      flex: 2,
      padding:80,
      alignItems: 'center',
  },
  header2: {
      flex: 4,
      padding:30,
      alignItems: 'center',
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  textStyles:{
    fontWeight: 'bold',
    color: '#05375a',
  },
  button: {
        alignItems: 'center',
        marginTop: 50
    },
     signIn: {
        width: '75%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
