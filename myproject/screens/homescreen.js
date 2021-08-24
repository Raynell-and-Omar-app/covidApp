import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { HomeButtons } from '../modular comps/homebuttons'
import { globalStyle } from '../styles/globalStyle';
import { StatusBar } from 'expo-status-bar';

export const Home = ({ navigation }) =>{
  //Features so far
  const features = [
    {id: 1, name: "Country Tracker"},
    {id: 2, name: "Symptoms"}
  ]

  return (
    
    <View style={globalStyle.screen}>
      <StatusBar hidden />
      <ImageBackground source={require('../assets/imgs/corona3.jpg')} style={style.body}>

        {/* header */}
        <View style={globalStyle.header}>
          <Text style={globalStyle.headerText}> COVID-19 App </Text>
        </View>

        {/* Features button */}
        <View style={style.featureContainer}>
          <FlatList 
              data={features}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) =>{
                //attaching appropriate onPress event handler based on feature pressed
                if(item.id === 1){
                  return(
                    <TouchableOpacity onPress={() => navigation.navigate("Tracker")}>
                            <HomeButtons id={item.id} name={item.name}/>
                    </TouchableOpacity>
                  )
                }else{
                  return(
                    <TouchableOpacity onPress={() => navigation.navigate("Symptoms")}>
                            <HomeButtons id={item.id} name={item.name}/>
                    </TouchableOpacity>
                  )
                }
              }}    
          />
        </View>

      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({  
  featureContainer:{
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  body: {   
    width: '100%',
    height: '100%',   
  },
})
 