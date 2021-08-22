import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { globalStyle } from '../styles/globalStyle';

export const Tracker = () =>{
    return(
        <View style={globalStyle.screen}>
            {/* Header */}
            <View style={globalStyle.header}>
                <Text style={globalStyle.headerText}>Tracker Screen</Text>
            </View>

            {/* Body */}
            <View>
                <TextInput
                    placeholder="Username..."
                />
            </View>
        </View>
    )
}

