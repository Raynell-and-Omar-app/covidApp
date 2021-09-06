import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, Alert } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import CountryPicker from 'react-native-country-picker-modal';
import { storeData, getData, deleteData } from '../ModularFuncs/StoreGetCases';
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

    const deletingData = (countryID) => {
        deleteData(setCountryList, settingNewData, countryID)
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
            <View style={{flex:1, marginTop:10, padding:20}}>
                <FlatList
                    data={countryList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>{
                        return(
                            <TouchableOpacity onPress={() => console.log("Population: ", item.population)}>
                                <Card>
                                    {/* <Text style={{color: 'black', marginBottom: 8}}>{(item.country).toUpperCase()}{"\n\n"}Daily Cases: {item.casesDaily}{"\n"}Daily Deaths: {item.deathsDaily}{"\n"}Cases:{item.cases}{"\n"}Deaths:{item.deaths}</Text> */}
                                    <View style={{textAlign:"center", alignSelf:"center"}}><Text style={{fontWeight:"bold" ,color: 'black', borderBottomLeftRadius:10, borderBottomRightRadius:10, borderTopLeftRadius:3, borderTopRightRadius:3 ,marginTop: 5,paddingTop: 5, textAlign:"center", backgroundColor:"red", alignSelf:"flex-start", flexDirection:"row", padding: 10, alignItems:"center" ,height:32, borderRadius: 3, borderWidth:2, backgroundColor:"#66B2FF"}}>{(item.country).toUpperCase()}{"\n"}</Text></View>
                                    <View style={{flexDirection:"row", paddingTop:4, width:"100%"}}>
                                        <View  style={{textAlign:"left",marginTop:5, height:"90%"}}>
                                            <Text>Daily{"\n"}Cases: {item.casesDaily}{"\n"}Deaths: {item.deathsDaily}</Text>
                                            {/* <Text  style={{textAlign:"left"}}>Cases: {item.casesDaily}</Text>
                                            <Text  style={{textAlign:"left"}}>Deaths: {item.deathsDaily}</Text> */}
                                        </View>
                                        <View  style={{textAlign:"right", width: "100%", height:"90%"}}>
                                        <Text style={{paddingBottom:15, paddingLeft:120, marginTop: 5}}>Total{"\n"}Cases: {item.cases}{"\n"}Deaths: {item.deaths}</Text>                                        
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row", width:"100%"}}>    
                                    <View style={{width:"25%"}}><Button title='X' onPress={() => deletingData(item.id)}/></View>
                                    <View style={{width:"75%", paddingLeft: 5}}><Button title='Population' onPress={() => Alert.alert("The population of "+item.country+" is "+item.population)}/></View>

                                    </View>
                                    <Text></Text>
                                
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