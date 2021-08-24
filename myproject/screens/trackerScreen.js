import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryPicker from 'react-native-country-picker-modal';


export const Tracker = () =>{

    const [country, setcountry] =  useState("");
    const storeData = async () =>{
        //Store only if submitted a country
        if(country !== ""){
            try{
                //initializing 'USER' as a key
                await AsyncStorage.setItem('USER', country);
                console.log('Succesful from storeData', country);
            }catch(e){
                console.log("Error from storeData: ", e);
            }
        }else{
            console.log("Input field empty....")
        }
    }

    const getData = async () =>{
        const data = await AsyncStorage.getItem('USER');
        try{
            //if retrieving successful
            if(data !== null){
                //getting previous day's date
                const date = new Date();
                const today = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate() - 1}`;
                //fetching cases data
                console.log(`Getting data for ${data}`);
                //Getting data from JHU
                const response = await fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global?country=${data}&min_date=${today}&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state,%20uid`)
                if(response.status !== 200)
                    console.log("Error occured when fetching data...");
                else{
                    var cases = await response.json();
                    console.log(cases);
                    console.log('latest confirmed:', cases[0].confirmed_daily);
                }
            }  
        }catch(e){
            console.log('Error from getData: ', e);
        }
    }

    return(
        <View style={globalStyle.screen}>

            {/* Body */}
            <View style={{alignItems:'center'}}>
                <TouchableOpacity>
                    <View  style={globalStyle.countrySelectButton}>  
                        <CountryPicker placeholder={"Select Country"}  withCallingCode={false} withCountryNameButton={true} 
                                        withFilter={true} theme={{backgroundColor:"#5399DF", fontSize:18, onBackgroundTextColor:"white"}} withAlphaFilter={true} 
                                        onSelect={(country) => (
                                                    setcountry(country.name)
                                                )}>  
                        </CountryPicker>
                    </View>
                </TouchableOpacity>
                {/* Storing country choices */}
                <View style={globalStyle.buttonBox}>
                <Button title='Store'  onPress={storeData}/>

                {/* Getting latest data from JHU databse for chosen countries */}
                <Button title='Get'  onPress={getData}/>
                </View>
            </View>

        </View>
    )
}

