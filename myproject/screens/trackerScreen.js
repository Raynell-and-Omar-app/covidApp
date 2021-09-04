import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import CountryPicker from 'react-native-country-picker-modal';
import { storeData, getData } from '../ModularFuncs/StoreGetCases';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Card  from '../ModularFuncs/card';

//getting data from local storage when launched again
const intializingData = async() =>{
    const data = await AsyncStorage.getItem('countries')
    return data;
}
//when Launching app for the first time we get data promise
const data = intializingData();

//resetting Data when there is a change to retain state in Tracker component while re-rendering
const settingNewData = (newData) =>{
    data._W = newData;
}

console.log("re-render");
export const Tracker = () =>{
    console.log(data);
    const [countryList, setCountryList] = useState(data._W !== null ? JSON.parse(data._W) : []);
    console.log("Using state: ", countryList)

    //adding new choices
    const storingData = (countryName) =>{ 
        storeData(countryName, setCountryList, settingNewData);
    }

    //getting the data for country choices
    const gettingData = () =>{ getData(); }

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
            <View style={{flex:1, marginTop:10, padding: 20}}>
                <FlatList
                    data={countryList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>{
                        return(
                            <TouchableOpacity onPress={() => console.log(item.country)}>
                                <Card>
                                    <Text style={{color: 'black'}}>{item.country}</Text>
                                </Card>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

            {/* Getting latest data from JHU databse for chosen countries and then clearing storage*/}
            <View style={globalStyle.buttonBox}>
                <Button title='Get' onPress={gettingData}/>
            </View>

        </View>
    )
}