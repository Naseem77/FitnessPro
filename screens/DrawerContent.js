import React from 'react';
import { StyleSheet, View} from 'react-native';
import { DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title,Caption,Paragraph,Drawer,Text,TouchableRipple,Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props){

    const[isDarkTheme,setIsDarkTheme] = React.useState(false);
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView { ...props}>
                <View style={styles.DrawerContent}>
                    <View style ={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop:15}}>
                            <Avatar.Image
                                source ={{
                                    uri: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft: 15, flexDirection:'column'}}>
                              <Title style={styles.title} >Naseem Ali</Title>  
                              <Caption></Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem 
                        icon={({color,size}) => (
                            <Icon
                                name="home-outline"
                                color ={color}
                                size ={size}
                            />
                         )}
                        label= "Home"
                        onPress={() => {props.navigation.navigate('Home')}}   
                        />
                        <DrawerItem 
                        icon={({color,size}) => (
                            <Icon
                                name="account-outline"
                                color ={color}
                                size ={size}
                            />
                         )}
                        label= "Profile"
                        onPress={() => {props.navigation.navigate('Profile')}}   
                        />
                        <DrawerItem 
                        icon={({color,size}) => (
                            <Icon
                                name="account-settings-outline"
                                color ={color}
                                size ={size}
                            />
                         )}
                        label= "Settings"
                        onPress={() => {props.navigation.navigate('SettingsScreen')}}   
                        />
                        <DrawerItem 
                        icon={({color,size}) => (
                            <Icon
                                name="account-check-outline"
                                color ={color}
                                size ={size}
                            />
                         )}
                        label= "Support"
                        onPress={() => {props.navigation.navigate('SupportScreen')}}   
                        />
                    </Drawer.Section>
                    <Drawer.Section title="preferences">
                        <TouchableRipple onPress ={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value ={isDarkTheme}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style ={styles.bottomDrawerSection}> 
                <DrawerItem 
                icon={({color,size}) => (
                    <Icon
                        name="exit-to-app"
                        color ={color}
                        size ={size}
                    />
                )}
                label= "Sign Out"
                onPress={() => {}}   
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    DrawerContent:{
        flex:1,
    },
    userInfoSection:{
        paddingLeft:20,
    },
    title: {/*
        fontSize:16,
        marginTop: 3,
        lineHeight:'bold',
    */},
    caption: {
        fontSize: 14,
        lineHeight:14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection:'row',
        alignItems:'center',
        marginRight: 15,
    },
    Paragraph:{
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection:{
        marginTop: 15,
    },
    bottomDrawerSection:{
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});