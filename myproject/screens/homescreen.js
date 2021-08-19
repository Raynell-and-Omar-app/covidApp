import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {  Alert, Button, StyleSheet, Text, View, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
//import Homebuttons from '../modular comps/homebuttons'


export default function App(){

  return (
    
    
    <ImageBackground source={require('../assets/imgs/corona3.jpg')} style={style.body}>
      <StatusBar hidden />
      <Text style={style.header}> COVID-19 App </Text>

       {/* <View style={style.buttonWrapper}> */}

        {/* <View style={style.buttonBox}>
        <View style={style.buttonCountry}>
          <TouchableOpacity style={style.button} onPress={() => Alert.alert("Country Tracker")}>
            <Text style={style.text}>Country Tracker</Text>
          </TouchableOpacity>
        </View> 

        <View style={style.buttonSymptoms}>
          <TouchableOpacity style={style.button} onPress={() => Alert.alert("Symptoms")}>
            <Text style={style.text}>Symptoms</Text>
          </TouchableOpacity>
        </View> */}
      

      {/* </View> */}
      {/* </View> */}
    </ImageBackground>
  );
}



const style = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    },

  buttonBox: {
    width: '90%',
    alignItems: 'center',
    padding: 17,
    height: '100%',
    backgroundColor: '#5399DF',
    alignContent: 'center',
    borderRadius: 120,
    borderColor: 'white',
    borderWidth: 2,

    
  },
  button1: {
    alignItems: 'center',
    marginTop: '156%'
  },
  button2: {
    alignItems: 'center',
    marginTop: 10
  },
  insidebutton: {
    height: 50,
    width: 150,
    textAlign: 'center',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    color: 'red'
  },

  buttontext: {
    textAlign: 'center'
  },

   body: {
    
     width: '100%',
     height: '100%',
     
   },

   text: {
     fontSize: 50,
     lineHeight: 21,
     fontWeight: 'bold',
     letterSpacing: 0.25,
     color: 'black',
   },
   button: {
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: 10,
     paddingHorizontal: 32,
     borderRadius: 10,
     elevation: 3,
     backgroundColor: '#1282F3',
     overflow:'hidden',
     width: '100%',
     
   },
  header :{
    color: '#fff',
    backgroundColor: '#5399DF',
    fontSize: 28,
    width: '100%',
    textAlign: 'center',
    height: '8%',
    alignItems: 'center',
    textAlignVertical: 'center',
    borderColor: 'white',
    borderWidth: 1,
    fontWeight: 'bold'
  },
   buttonWrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingTop: 430,
      paddingBottom: 70,
      width: '100%',
      alignItems: 'center'
   },

   buttonCountry: {
     width: '50%',
    
   },

   buttonSymptoms: {
     width: '65%',
     paddingTop: 10,
   },

  text: {
    color: 'white'
  }
})
 