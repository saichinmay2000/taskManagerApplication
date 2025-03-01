import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import { View, ActivityIndicator } from "react-native";
import EditTaskScreen from "../screens/EditTaskScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { userToken } = useContext(AuthContext);

    if (userToken === undefined) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0071E7" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {userToken ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
                    <Stack.Screen name="EditTaskScreen" component={EditTaskScreen} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="SignupScreen" component={SignupScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default AppNavigator;
