import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            Alert.alert('Please consider checking your email and password!');
          }
        },
        register: async (email, password, fname, lname, selectedYear, selectedHeight, selectedWeight, selectedProgram, selectedGender, selectedTotalCalories) => {
          try {
              await auth().createUserWithEmailAndPassword(email, password)
              .then(() => {
                firestore().collection('users').doc(auth().currentUser.uid)
                .set({
                  fname,
                  lname,
                  email:email,
                  createdTime: firestore.Timestamp.fromDate(new Date()),
                  userImg: null,
                  age: selectedYear,
                  weight: selectedWeight,
                  hight: selectedHeight,
                  program: selectedProgram,
                  Gender: selectedGender,
                  totalCalories: selectedTotalCalories,
                  currentCalories: 0,
                })
                .catch(error => {
                  console.log('Error while user registering to firestore')
                })
              })
              .catch(error =>{
                console.log('Error while signing up')
                Alert.alert('Please consider checking your email and password!');
              });
              } catch(e) {
                  console.log(e);
              }
            },
           
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};