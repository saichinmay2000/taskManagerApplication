import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import { Button, TextInput } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {

    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.appHeader}>Task Manager</Text>
            <Text style={styles.loginHeader}>Login</Text>
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
                buttonColor="#0071E7"
                onPress={() => {login(email, password, navigation)}}>
                    Login
            </Button>
            <Text onPress={() => navigation.navigate('SignupScreen')} style={styles.link}>
                Don't have an account? <Text style={styles.signUpText}>Sign Up</Text>
            </Text>
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
    appHeader: {
        fontWeight: '700',
        fontSize: 30
    },
    loginHeader: {
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