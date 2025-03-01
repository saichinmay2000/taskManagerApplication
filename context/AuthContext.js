import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);

    const login = async (email, password, navigation) => {
        try {
            const res = await axios.post('https://taskmanagerapplicationbackend.onrender.com/auth/login', { email, password });
            await AsyncStorage.setItem('token', res.data.token);
            setUserToken(res.data.token);
            // navigation.replace("HomeScreen");
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUserToken(null);
    };

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('token');
            setUserToken(token);
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ userToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
