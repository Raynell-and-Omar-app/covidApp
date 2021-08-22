import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Home } from './screens/homescreen'
import { AppNavigator } from './routes/homeStack';



export default function App(){
  return (
    // <Home />
    <AppNavigator />    
  );
}



