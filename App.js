import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Login from './src/Login';
import Register from './src/Register';
import HomePage from './src/HomePage';
import Add from './src/Add';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ title: 'Giriş' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Kayıt Ol' }} />
        <Stack.Screen name="Notlar" component={HomePage} options={{ title: 'Notlar' }} />
        <Stack.Screen name="Add" component={Add} options={{ title: 'Yeni Not Ekle' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

