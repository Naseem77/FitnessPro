import React , { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';


export function DrawerContent(props,{navigation}) {

    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState([]);

  const getUser = async() => {
    await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }
  useEffect(() => {
    getUser();
  }, []);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{uri: userData ? userData.userImg || 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png' : 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'}}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{userData ? userData.fname || 'Unknown' : 'Unknown'} {userData ? userData.lname || 'User' : 'User'}</Title>
                            </View>
                        </View>

                       
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Edit Your Profile"
                            onPress={() => {props.navigation.navigate('EditProfileScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="barcode" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Change Password"
                            onPress={() => {props.navigation.navigate('ChangePasswordScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="weight-kilogram" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Change Weight"
                            onPress={() => {props.navigation.navigate('ChangeWeight')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="weight-lifter" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Change Program"
                            onPress={() => {props.navigation.navigate('ChangeProgram')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => logout()}
                />
            </Drawer.Section>
        </View>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
