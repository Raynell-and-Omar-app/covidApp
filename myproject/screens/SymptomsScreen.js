import React from 'react';
import { View, Text } from 'react-native';
import { globalStyle } from '../styles/globalStyle';

export const Symptoms = () =>{
    return(
        <View style={globalStyle.screen}>
            {/* Header */}
            <View style={globalStyle.header}>
                <Text style={globalStyle.headerText}>Symptoms Screen</Text>
            </View>
            

        </View>
    )
}

