import React, { useState } from 'react';
import axios from 'axios';
import { Button, Text, Input } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';

import { StyleSheet, View, TextInput, Pressable } from 'react-native';

export default function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState(null);


    const handlePress = () => {
        let req = {
            email: email,
            phonenumber: phonenumber

        }
        axios.post("http://192.168.2.94:3001/auth/signup", req).then((response) => {
            console.log(response);
            navigation.navigate("login");
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <Input
                placeholder="Email"
                onChangeText={setEmail}
                leftIcon={
                    <Icon
                        name="envelope"
                        size={24}
                        color="#c72b62"
                    />
                }
            />

            <Input
                placeholder="Phone Number"
                onChangeText={setPhonenumber}
                leftIcon={
                    <Icon
                        name="phone"
                        size={24}
                        color="#c72b62"
                    />
                }
                keyboardType="phone-pad" // Opens numeric keypad with phone symbols
            />



            <Button
                title="Signup"
                onPress={handlePress}
                titleStyle={{ fontWeight: '700', fontFamily: "Roboto-Bold", }}
                buttonStyle={{
                    backgroundColor: 'rgba(199, 43, 98, 1)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    alignItems: 'center',

                }}
                containerStyle={{
                    width: 150,
                    height: 45,
                    alignSelf: 'center',
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        padding:20
    },
    title: {
        fontSize: 24,
        fontFamily: 'Roboto-Bold',
        color: "#c72b62",
        fontWeight: 'bold',
        marginBottom: 20,

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        width: '90%', // Increased width
        color: 'black',
    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        width: '90%', // Increased width
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    hyperlink: {
        color: 'blue',
        textDecorationLine: 'underline',
    }
});
