import React, { useState } from 'react';

import { StyleSheet, View, TextInput, Text, Pressable } from 'react-native';

export default function Signup({navigation}) {
    const [otp, setOtp]= useState('');
   

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify User</Text>
            <TextInput
                style={styles.input}
                placeholder="OTP"
                value={otp}
                onChangeText={setOtp}
            />
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
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
