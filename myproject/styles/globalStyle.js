import React from 'react';
import { StyleSheet } from 'react-native';

export const globalStyle = StyleSheet.create({
    header:{
        backgroundColor: '#5399DF',
        height: '8%',
    },
    headerText:{
        color: '#fff',
        fontSize: 28,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
    },
    screen:{
        flex: 1,
        backgroundColor: '#e6f9ff',
    },
    countrySelectButton: {
        alignSelf:"center", 
        alignItems:"center",
        backgroundColor:"#66B2FF",
        marginTop: 65,
        borderWidth:3,
        borderRadius:10,
        width:130,
        
        borderColor:"blue",  
        },
    buttonBox: {
        marginTop: 20
    }
})