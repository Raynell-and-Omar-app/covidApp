import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { HomeButtons } from '../modular comps/homebuttons'


export const Home = () =>{
  //Features so far
  const features = [
    {id: 1, name: "Country Tracker"},
    {id: 2, name: "Symptoms"}
  ]

  const featurePress = () =>{
    console.log('FlatList pressed');
  }


  return (
    <View style={style.screen}>
      <ImageBackground source={require('../assets/imgs/corona3.jpg')} style={style.body}>

        {/* header */}
        <View style={style.header}>
          <Text style={style.headerText}> COVID-19 App </Text>
        </View>

        {/* Features button */}
        <View style={style.featureContainer}>
          <FlatList 
              data={features}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) =>{
                    return(
                        <TouchableOpacity onPress={featurePress}>
                            <HomeButtons id={item.id} name={item.name}/>
                        </TouchableOpacity>
                    )

              }}    
          />
        </View>

      </ImageBackground>
    </View>
  );
}



const style = StyleSheet.create({
  screen:{
    flex: 1,
  },  
  featureContainer:{
      flex: 1,
      alignItems: 'center',
      marginTop: 60,
  },
  body: {   
     width: '100%',
     height: '100%',   
  },
  header :{
    backgroundColor: '#5399DF',
    height: '10%',
    borderColor: 'white',
  },
  headerText:{
    color: '#fff',
    fontSize: 28,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20
  }
})
 