import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Pressable } from 'react-native';

export default function Signup({ navigation }) {
    const [phonenumber, setPhonenumber] = useState(null);


    const handlePress = () => {
        let req = {
            phonenumber: phonenumber
        }
        axios.post("http://192.168.2.94:3001/auth/generateotp", req).then((response) => {
            console.log(response);
            navigation.navigate("verification");
        } )
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Using OTP</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phonenumber}
                onChangeText={setPhonenumber}
            />
            <Pressable style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Generate OTP</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
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
