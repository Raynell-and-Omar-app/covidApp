import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import CountryPicker from 'react-native-country-picker-modal';
import { storeData, getData, deleteData } from '../ModularFuncs/StoreGetCases';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Card  from '../ModularFuncs/card';
import { MaterialIcons } from '@expo/vector-icons';
import * as Notification from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';


//getting data from local storage when launched again
const intializingData = async() =>{
    const data = await AsyncStorage.getItem('countries')
    return data;
}
//when Launching app for the first time we get data promise
const data = intializingData();

//resetting Data when there is a change to update state in Tracker component while re-rendering
const settingNewData = (newData) =>{
    data._W = newData;
}


// setting up background task (setting up a notification along with calling getData())

// name of the task
// const BACKGROUND_FETCH_TASK = "set notification with cases"
// // defining the task
// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async() =>{
//     console.log("===========Notif Triggered=============");
//     // const data = await getData();
//     console.log(data);
//     Notification.scheduleNotificationAsync({
//         content:{
//             title: 'Cases Today',
//             body: 'data here',
//         }
//     })

//     return BackgroundFetch.Result.NoData;
// })

// // function to call when register the task
// const registerBackgroundFetchAsync = async() =>{
//     return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//         minimumInterval: 5,
//         stopOnTerminate: false, // works only for android
//         startOnBoot: true,      // works only for android
//     });
// }

// // function to call when unregister the task
// const unregisterBackgroundFetchAsync = async() =>{
//     return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
// }



//                      NOTIFICATION STUFFS (LOOK LATER)
//scheduling a notification with settingNotification() and listening using Notification.setNotificationHandler()
// const settingNotification = async () =>{
//     console.log("===========Notif Triggered=============");
//     // const data = await getData();
//     Notification.scheduleNotificationAsync({
//         content:{
//             title: 'Cases Today',
//             body: "data here",
//         },
//         trigger:{
//             seconds: 5
//             // repeats:true,
//         },
//     })
//     // await Notification.cancelAllScheduledNotificationsAsync();


//     // use setinterval to call this function again
//     // setInterval(settingNotification(), 10000);
// }
// Notification.setNotificationHandler({
//     handleNotification: async() =>({
//         shouldShowAlert: true,
//         shouldPlaySound: false,
//         shouldSetBadge: false, 
//     }),
// });



// tracker functional component
export const Tracker = ({ navigation }) =>{
    // code regarding Background fetch
    // const [isRegisteredBackg, setIsRegisteredBackg] = useState(false);
    // // constantly being updated
    // useEffect(() =>{
    //     checkStatusAsync();
    // }, []);
    // // checking status of background task
    // const checkStatusAsync = async() =>{
    //     const checkIsRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    //     setIsRegisteredBackg(checkIsRegistered);
    // }
    // // function triggered when button pressed (used to toggle registration)
    // const toggleBackgTask = async() =>{
    //     if(isRegisteredBackg){ await unregisterBackgroundFetchAsync(); }
    //     else{ await registerBackgroundFetchAsync(); }
    //     // calling function to update isRegisteredBackg state
    //     checkStatusAsync();
    // }

    const [countryList, setCountryList] = useState(data._W !== null ? JSON.parse(data._W) : []);

    //adding new choices
    const storingData = (countryName) =>{ 
        storeData(countryName, setCountryList, settingNewData);
    }

    const deletingData = (countryID) => {
        deleteData(setCountryList, settingNewData, countryID)
    }

    return(
        <View style={globalStyle.screen}>

            {/* Body */}
            <View style={{alignItems:'center'}}>
                <TouchableOpacity>
                    <View  style={globalStyle.countrySelectButton}>  
                        <CountryPicker  placeholder={"Add Country"}  withCallingCode={false} withCountryNameButton={true} 
                                        withFilter={true} theme={{backgroundColor:"#5399DF", fontSize:18, onBackgroundTextColor:"white"}} 
                                        withAlphaFilter={true} 
                                        withEmoji
                                        onSelect={(value) => {
                                            storingData(value.name);
                                        }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            
            {/* Displaying the choices */}
            <View style={{flex:1, marginTop:10, padding:20}}>
                <FlatList
                    data={countryList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>{
                        return(
                            <Card>
                                <View style={{textAlign:"center", alignSelf:"center"}}>
                                    <Text style={style.cardHeader}>
                                        {(item.country).toUpperCase()}{"\n"}
                                    </Text>
                                </View>
                                <View style={{flexDirection:"row", paddingTop:4}}>
                                    <View style={{paddingBottom:10}}>
                                        <Text style={style.textStyle}>DAILY{"\n"}Cases: {item.casesDaily}{"\n"}Deaths: {item.deathsDaily}</Text>
                                    </View>
                                    <View style={{marginHorizontal:20}}>
                                        <Text style={style.textStyle}>TOTAL{"\n"}Cases: {item.cases}{"\n"}Deaths: {item.deaths}</Text>                                        
                                    </View>
                                </View>
                                <View style={{flexDirection:"row", width:"100%"}}> 
                                    <View style={{width:"20%", marginRight:20}}>
                                        <MaterialIcons
                                            // backgroundColor={Platform.OS === 'ios'? '#007AFF' : '#2196F3'} 
                                            color={'black'} name='delete' 
                                            size={35}
                                            onPress={() => deletingData(item.country)}/>
                                    </View>
                                    {/* on pressing this button we navigate to a different screen with graph for item.country */}
                                    <View style={{width:"75%", paddingLeft: 5, paddingBottom:10}}>
                                        <Button title='View more' onPress={() => navigation.navigate("ViewMore", {country:item.country})}/>
                                    </View>
                                </View>
                            
                            </Card>
                        )
                    }}
                />
            </View>


            {/* Redundant feature */}
            {/* Getting latest data from JHU databse for chosen countries and then clearing storage and TRIGGER NOTIFFICATIONS*/}
            {/* <View style={globalStyle.buttonBox}>
                <Button 
                title={isRegisteredBackg ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'} 
                onPress={toggleBackgTask}
                />
            </View> */}

        </View>
    )
}



const style = StyleSheet.create({
    cardHeader:{
        fontFamily:'helvetica-neue-regular',
        fontWeight:"bold", 
        color: 'black', 
        borderBottomLeftRadius:10, 
        borderBottomRightRadius:10, 
        borderTopLeftRadius:3, 
        borderTopRightRadius:3,
        marginTop: 5,
        paddingTop: 5, 
        textAlign:"center", 
        backgroundColor:"red", 
        alignSelf:"flex-start", 
        flexDirection:"row", 
        padding: 10, 
        alignItems:"center",
        height:32, 
        borderRadius: 3, 
        borderWidth:2, 
        backgroundColor:"#66B2FF"
    },
    textAlign:{
        fontFamily:'helvetica-neue-regular',
    },
})