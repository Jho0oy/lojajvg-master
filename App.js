import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './Screens/Splash/Splash';
import Login from './Screens/Login/Login';
import Inicio from './Screens/Inicio/Inicio';
import {useState} from 'react';




export default function App() {
  const Stack = createNativeStackNavigator() 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name='Splash'
        component={Splash}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Login'
        component={Login}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Inicio'
        component={Inicio}
        options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}