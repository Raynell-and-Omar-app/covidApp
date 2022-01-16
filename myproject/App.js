import React, { useState } from 'react';
import  AppNavigator  from './routes/drawer';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

// function called before rendering AppNavigator to load font
const getFonts = () =>{
  return Font.loadAsync({
    'helvetica-neue-regular': require('./assets/fonts/helveticaneue.ttf')
  })
}


export default function App(){
  // 'fontsLoaded' variable to hold true if font is loaded
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if(fontsLoaded){
    // displaying actual app when font is loaded
    return (
      <AppNavigator />
    );
  }else{
    // loading fonts via AppLoading component
    return(
      <AppLoading 
        startAsync={getFonts}
        onFinish={()=> setFontsLoaded(true)} 
        onError={() => console.log('error')}
      />
    )
  }
}
