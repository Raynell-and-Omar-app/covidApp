import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import { StatusBar } from 'expo-status-bar';

export const Symptoms = () =>{
    return(
        <View style={globalStyle.screen}>
            <StatusBar hidden />
        </View>
    )
}
