import React, { useContext, useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../navigation/AuthProvider';

const SignInScreen = ({navigation}) => {
    const [selectedHight, setSelectedHight] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [selectedWeight, setSelectedWeight] = useState();
    const [selectedProgram, setSelectedProgram] = useState();
    const [selectedGender, setSelectedGender] = useState();
    const [selectedTotalCalories, setSelectedTotalCalories] = useState();
    const [data, setData] = React.useState({
        email: '',
        password: '',
        FirstName: '',
        LastName: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });
    const {register} = useContext(AuthContext);
    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleFirstNameChange = (val) => {
        setData({
            ...data,
            FirstName: val
        });
    }

    const handleLastNameChange = (val) => {
        setData({
            ...data,
            LastName: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const handleCalories = async() =>{
        const currentYear = new Date().getFullYear();
        var calories = 0;
        if(selectedGender == 'male'){
            const maleBMR = (10*selectedWeight) + (6.25*selectedHight) - (5*(currentYear - selectedYear)) +5;
             if(selectedProgram == 1){
                calories = maleBMR*1.55;
            } else if (selectedProgram == 2){
                calories = maleBMR*1.375;
            }else{
                calories = maleBMR*1.2;
            }
        } else {
            const femaleBMR = (10 * selectedWeight) + (6.25* selectedHight) - (5*(currentYear - selectedYear)) -161;
             if(selectedProgram == 1){
                calories = femaleBMR*1.55;
            } else if (selectedProgram == 2){
                calories = femaleBMR*1.375;
            }else{
                calories = femaleBMR*1.2;
            }
        }
        console.log('totalCalories:',calories);
        return calories;
    }
        
    const handleFieldsInput = async() => {//wrong calculate calories intake before inter/check user input???
       var calories = 0;
        try{
            if(data.FirstName !== ''){
                    if(data.FirstName.length > 3){
                                if(data.LastName !== ''){
                                    if(data.LastName.length > 2){
                                        if(selectedGender !== 'None'){
                                            if(selectedYear > 1){
                                                if( selectedWeight > 1){
                                                    if( selectedHight > 1){
                                                        if(selectedProgram != 'None'){
                                                            calories = await handleCalories();
                                                            console.log('TotalCalories!!!:',calories);
                                                            if(calories != 0){
                                                                register(data.email,data.password,data.FirstName,data.LastName,selectedYear,selectedHight,selectedWeight,selectedProgram,selectedGender,Math.round(calories));
                                                            }
                                                        }else{
                                                            Alert.alert('Please select a program'); 
                                                        }
                                                    } else{
                                                        Alert.alert('Please insert your Hight!'); 
                                                    }
                                                }else{
                                                    Alert.alert('Please insert your Weight!'); 
                                                }
                                            } else {
                                                Alert.alert('Please insert your birth day year!');
                                            }
                                        }else{
                                            Alert.alert('Please select your gender!');
                                        }
                                    }else{
                                        Alert.alert('Your Last name must be at least 3 characters');
                                    }
                                }else {
                                    Alert.alert('Please insert your last name!');
                                }
                            } else{
                                Alert.alert('Your First name must be at least 4 characters');
                            }
                        } else {
                            Alert.alert('Please insert your first name');
                        }
        } catch(e){
            console.log('Error from handleFieldInput function in sign up screen while checking!');
        }
    }
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#ff5900' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, {marginTop: 10}]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {marginTop: 10}]}>First Name</Text>
            <View style={styles.action}>
                <Feather 
                    name="user"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="First Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleFirstNameChange(val)}
                />
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 20
            }]}>Last Name</Text>
            <View style={styles.action}>
                <Feather 
                    name="user"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Last Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleLastNameChange(val)}
                />
                    
            </View>
              <Text style={[styles.text_footer, {marginTop: 10, marginLeft: 165}]}>Gender</Text>
            <View>
                <Picker style={{width:'80%', marginLeft: 40}}
                selectedValue={selectedGender}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedGender(itemValue)
                }>
                <Picker.Item label="None" value="None" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                </Picker>
                
            </View>

            <Text style={[styles.text_footer, {marginTop: 10, marginLeft: 145}]}>Year of birth</Text>
            <View style={styles.action}>
                <Picker style={{width:'80%', marginLeft: 40}}
                selectedValue={selectedYear}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedYear(itemValue)
                }>
                <Picker.Item label="None" value="None" />
                <Picker.Item label="1950" value="1950" />
                <Picker.Item label="1951" value="1951" />
                <Picker.Item label="1952" value="1952" />
                <Picker.Item label="1953" value="1953" />
                <Picker.Item label="1954" value="1954" />
                <Picker.Item label="1955" value="1955" />
                <Picker.Item label="1956" value="1956" />
                <Picker.Item label="1957" value="1957" />
                <Picker.Item label="1958" value="1958" />
                <Picker.Item label="1959" value="1959" />
                <Picker.Item label="1960" value="1960" />

                <Picker.Item label="1961" value="1961" />
                <Picker.Item label="1962" value="1962" />
                <Picker.Item label="1963" value="1963" />
                <Picker.Item label="1964" value="1964" />
                <Picker.Item label="1965" value="1965" />
                <Picker.Item label="1966" value="1966" />
                <Picker.Item label="1967" value="1967" />
                <Picker.Item label="1968" value="1968" />
                <Picker.Item label="1969" value="1969" />
                <Picker.Item label="1970" value="1970" />

                <Picker.Item label="1971" value="1971" />
                <Picker.Item label="1972" value="1972" />
                <Picker.Item label="1973" value="1973" />
                <Picker.Item label="1974" value="1974" />
                <Picker.Item label="1975" value="1975" />
                <Picker.Item label="1976" value="1976" />
                <Picker.Item label="1977" value="1977" />
                <Picker.Item label="1978" value="1978" />
                <Picker.Item label="1979" value="1979" />
                <Picker.Item label="1980" value="1980" />

                <Picker.Item label="1981" value="1981" />
                <Picker.Item label="1982" value="1982" />
                <Picker.Item label="1983" value="1983" />
                <Picker.Item label="1984" value="1984" />
                <Picker.Item label="1985" value="1985" />
                <Picker.Item label="1986" value="1986" />
                <Picker.Item label="1987" value="1987" />
                <Picker.Item label="1988" value="1988" />
                <Picker.Item label="1989" value="1989" />
                <Picker.Item label="1990" value="1990" />

                <Picker.Item label="1991" value="1991" />
                <Picker.Item label="1992" value="1992" />
                <Picker.Item label="1993" value="1993" />
                <Picker.Item label="1994" value="1994" />
                <Picker.Item label="1995" value="1995" />
                <Picker.Item label="1996" value="1996" />
                <Picker.Item label="1997" value="1997" />
                <Picker.Item label="1998" value="1998" />
                <Picker.Item label="1999" value="1999" />
                <Picker.Item label="2000" value="2000" />

                <Picker.Item label="2001" value="2001" />
                <Picker.Item label="2002" value="2002" />
                <Picker.Item label="2003" value="2003" />
                <Picker.Item label="2004" value="2004" />
                <Picker.Item label="2005" value="2005" />
                
                </Picker>
            </View>
             <Text style={[styles.text_footer, {marginTop: 10, marginLeft: 165}]}>Weight</Text>
            <View style={styles.action}>
               <Picker style={{width:'80%', marginLeft: 40}}
                selectedValue={selectedWeight}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedWeight(itemValue)
                }>
                <Picker.Item label="None" value="None" />
                <Picker.Item label="40" value="40" />
                <Picker.Item label="41" value="41" />
                <Picker.Item label="42" value="42" />
                <Picker.Item label="43" value="43" />
                <Picker.Item label="44" value="44" />
                <Picker.Item label="45" value="45" />
                <Picker.Item label="46" value="46" />
                <Picker.Item label="47" value="47" />
                <Picker.Item label="48" value="48" />
                <Picker.Item label="49" value="49" />
                <Picker.Item label="50" value="50" />

                <Picker.Item label="51" value="51" />
                <Picker.Item label="52" value="52" />
                <Picker.Item label="53" value="53" />
                <Picker.Item label="54" value="54" />
                <Picker.Item label="55" value="55" />
                <Picker.Item label="56" value="56" />
                <Picker.Item label="57" value="57" />
                <Picker.Item label="58" value="58" />
                <Picker.Item label="59" value="59" />
                <Picker.Item label="60" value="60" />

                <Picker.Item label="61" value="61" />
                <Picker.Item label="62" value="62" />
                <Picker.Item label="63" value="63" />
                <Picker.Item label="64" value="64" />
                <Picker.Item label="65" value="65" />
                <Picker.Item label="66" value="66" />
                <Picker.Item label="67" value="67" />
                <Picker.Item label="68" value="68" />
                <Picker.Item label="69" value="69" />
                <Picker.Item label="70" value="70" />

                <Picker.Item label="71" value="71" />
                <Picker.Item label="72" value="72" />
                <Picker.Item label="73" value="73" />
                <Picker.Item label="74" value="74" />
                <Picker.Item label="75" value="75" />
                <Picker.Item label="76" value="76" />
                <Picker.Item label="77" value="77" />
                <Picker.Item label="78" value="78" />
                <Picker.Item label="79" value="79" />
                <Picker.Item label="80" value="80" />

                <Picker.Item label="81" value="81" />
                <Picker.Item label="82" value="82" />
                <Picker.Item label="83" value="83" />
                <Picker.Item label="84" value="84" />
                <Picker.Item label="85" value="85" />
                <Picker.Item label="86" value="86" />
                <Picker.Item label="87" value="87" />
                <Picker.Item label="88" value="88" />
                <Picker.Item label="89" value="89" />
                <Picker.Item label="90" value="90" />

                <Picker.Item label="91" value="91" />
                <Picker.Item label="92" value="92" />
                <Picker.Item label="93" value="93" />
                <Picker.Item label="94" value="94" />
                <Picker.Item label="95" value="95" />
                <Picker.Item label="96" value="96" />
                <Picker.Item label="97" value="97" />
                <Picker.Item label="98" value="98" />
                <Picker.Item label="99" value="99" />
                <Picker.Item label="100" value="100" />

                <Picker.Item label="101" value="101" />
                <Picker.Item label="102" value="102" />
                <Picker.Item label="103" value="103" />
                <Picker.Item label="104" value="104" />
                <Picker.Item label="105" value="105" />
                <Picker.Item label="106" value="106" />
                <Picker.Item label="107" value="107" />
                <Picker.Item label="108" value="108" />
                <Picker.Item label="109" value="109" />
                <Picker.Item label="110" value="110" />

                <Picker.Item label="111" value="111" />
                <Picker.Item label="112" value="112" />
                <Picker.Item label="113" value="113" />
                <Picker.Item label="114" value="114" />
                <Picker.Item label="115" value="115" />
                <Picker.Item label="116" value="116" />
                <Picker.Item label="117" value="117" />
                <Picker.Item label="118" value="118" />
                <Picker.Item label="119" value="119" />
                <Picker.Item label="120" value="120" />
                </Picker>
            </View>
             <Text style={[styles.text_footer, {marginTop: 10, marginLeft: 165}]}>Height</Text>
            <View>
                <Picker style={{width:'80%', marginLeft: 40}}
                selectedValue={selectedHight}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedHight(itemValue)
                }>
                <Picker.Item label="None" value="None" />
                <Picker.Item label="160" value="160" />
                <Picker.Item label="161" value="161" />
                <Picker.Item label="162" value="162" />
                <Picker.Item label="163" value="163" />
                <Picker.Item label="164" value="164" />
                <Picker.Item label="165" value="165" />
                <Picker.Item label="166" value="166" />
                <Picker.Item label="167" value="167" />
                <Picker.Item label="168" value="168" />
                <Picker.Item label="169" value="169" />
                <Picker.Item label="170" value="170" />
                <Picker.Item label="171" value="171" />
                <Picker.Item label="172" value="172" />
                <Picker.Item label="173" value="173" />
                <Picker.Item label="174" value="174" />
                <Picker.Item label="175" value="175" />
                <Picker.Item label="176" value="176" />
                <Picker.Item label="177" value="177" />
                <Picker.Item label="178" value="178" />
                <Picker.Item label="179" value="179" />
                <Picker.Item label="180" value="180" />
                <Picker.Item label="181" value="181" />
                <Picker.Item label="182" value="182" />
                <Picker.Item label="183" value="183" />
                <Picker.Item label="184" value="184" />
                <Picker.Item label="185" value="185" />
                <Picker.Item label="186" value="186" />
                <Picker.Item label="187" value="187" />
                <Picker.Item label="188" value="188" />
                <Picker.Item label="189" value="189" />
                <Picker.Item label="190" value="190" />
                <Picker.Item label="191" value="191" />
                <Picker.Item label="192" value="192" />
                <Picker.Item label="193" value="193" />
                <Picker.Item label="194" value="194" />
                <Picker.Item label="195" value="195" />
                <Picker.Item label="196" value="196" />
                <Picker.Item label="197" value="197" />
                <Picker.Item label="198" value="198" />
                <Picker.Item label="199" value="199" />
                <Picker.Item label="200" value="200" />
                </Picker>
                
            </View>
                <Text style={[styles.text_footer, {marginTop: 10, marginLeft: 155}]}>Program</Text>
            <View>
                <Picker style={{width:'80%', marginLeft: 40}}
                selectedValue={selectedProgram}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedProgram(itemValue)
                }>
                <Picker.Item label="None" value="None" />
                <Picker.Item label="Maintain weight" value="1" />
                <Picker.Item label="Mild weight loss (0.25kg/week)" value="2" />
                <Picker.Item label="Weight loss (0.5kg/week)" value="3" />
                </Picker>
                
            </View>

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={handleFieldsInput}
                >
                <LinearGradient
                    colors={['#ff5900', '#ff5900']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#ff5900',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#ff5900'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#ff5900'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 6 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
