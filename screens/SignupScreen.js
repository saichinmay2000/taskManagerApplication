import axios from "axios";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import { TextInput, Button } from "react-native-paper";


export default function SignupScreen({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signup = async () => {
        try {
            await axios.post('https://taskmanagerapplicationbackend.onrender.com/auth/signup', { name, email, password });
            alert('Signup successful! Please login.');
            navigation.navigate('Login');
        } catch (error) {
            alert('Signup failed. Try again.');
        }
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.appHeader}>Task Manager</Text>
            <Text style={styles.signUpHeader}>Sign Up</Text>
            <TextInput
                mode="outlined"
                label="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                mode="outlined"
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button
                style={{ width: '50%', alignSelf: "center" }}
                labelStyle={{ fontSize: 18, fontWeight: "bold" }}
                mode="contained" 
                onPress={signup} 
                buttonColor="#0071E7">
                    Sign Up
            </Button>
            <Text onPress={() => navigation.navigate('LoginScreen')} style={styles.link}>Already have an account? <Text style={styles.signUpText}>Login</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        flexDirection: "column",
        gap: 10,
        justifyContent: "center"
    },
    signUpHeader: {
        fontWeight: '700',
        fontSize: 30
    },
    appHeader: {
        fontWeight: '700',
        fontSize: 30
    },
    link: {
        fontSize: 16,
        textAlign: "center"
    },
    signUpText: {
        color: "#0071E7",
        fontSize: 16,
        fontWeight: "bold",
    }
})