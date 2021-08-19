import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { HomeButtons } from '../modular comps/homeButtons.js';

//Features so far
const features = [
    {id: 1, name: "Country Tracker"},
    {id: 2, name: "Symptoms"}
]

export const Home = () =>{
    const featurePress = () =>{
        console.log('FlatList pressed');
    }

    return(
        <View style ={styles.container}>

            {/* Header */}
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Home Page</Text>
            </View> */}

            {/* Butons for features */}
            <View style={styles.featureContainer}>
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

        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
    },  
    // header:{
    //     backgroundColor: 'rgb(72, 150, 112)',
    //     height: 80,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // headerText:{
    //     marginTop: 20,
    //     color: 'white',
    //     fontSize: 23,
    //     fontFamily: 'notoserif',
    //     fontWeight: 'bold',
    // },
    featureContainer:{
        flex: 1,
        alignItems: 'center',
        marginTop: 60,
    },
})