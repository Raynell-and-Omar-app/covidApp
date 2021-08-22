import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Tracker } from '../screens/trackerScreen';
import { Symptoms } from '../screens/SymptomsScreen';
import { Home } from '../screens/homescreen';

const Stack = createStackNavigator();

const HomeNavigator = () =>{
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeStack" component={ Home }/>
            <Stack.Screen name="TrackerStack" component={ Tracker }/>
            <Stack.Screen name="SymptomsStack" component={ Symptoms }/>
        </Stack.Navigator>
    )
}

export const AppNavigator = () =>{
    return(
        <NavigationContainer>
            <HomeNavigator />
        </NavigationContainer>
    )
}