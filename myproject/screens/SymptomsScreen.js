import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import { StatusBar } from 'expo-status-bar';
// import { Notifications, Permissions, Constants } from 'expo';
import BackgroundTask from 'react-native-background-task';

// const gettingData = async() =>{
//     const response = await fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global?country=India&min_date=2021-09-07&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state,%20uid`);
//     const cases = await response.json();
//     console.log(cases);
    
// }
// gettingData();
// BackgroundTask.define(() =>{
//     console.log("Hello from backgroundTask");
//     BackgroundTask.finish();
// })

export const Symptoms = ({routes}) =>{
    // useEffect(() =>{
    //     BackgroundTask.schedule();
    // })
    return(
        <View style={globalStyle.screen}>
            <StatusBar hidden />
            <Text>Hello</Text>
        </View>
    )
}
