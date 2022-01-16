import React, {useState, useEffect} from 'react';
import { Platform } from 'react-native'
import { View, Text, ScrollView } from 'react-native';
import { globalStyle } from '../styles/globalStyle';
import CountryPicker from 'react-native-country-picker-modal';
import { storeData, getData, deleteData } from '../ModularFuncs/StoreGetCases';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Card  from '../ModularFuncs/card';
import { MaterialIcons } from '@expo/vector-icons';
import LineGraph  from '../modular comps/lineGraph';
export const ViewMore = ({route}) =>{
    // holding country name passed from trackerScreen
    const {country} = route.params;
    // holding historical data (global variable)
    const [yCases, setYCases] = useState([]);
    const [yDeaths, setYDeaths] = useState([]);
    const [xDays, setXDays] = useState([]);
    // state variable used to toggle when data is loaded or not to render screen accordingly
    const [dataLoaded, setDataLoaded] = useState(false);
    // function to call for loading data into 'data' variable
    useEffect(() => {
        const loadData = async() =>{
            let tempCases = [];
            let tempDays = [];
            let tempDeath = [];
            // passing in variables by reference to get n cases and respective days
            let temp = await getData(country, 20, tempCases, tempDays, tempDeath);
            setYCases(tempCases);
            setXDays(tempDays);
            setYDeaths(tempDeath);
            setDataLoaded(true);
        }
        loadData();
    }, []);


    return (
        <View style={globalStyle.screen}>
            {/* showing the graph when data is loaded */}
            {
                (!dataLoaded) ?
                // maybe have a different screen/animation for the loading
                <Text>loading Data!</Text>
                :
                <View>
                    <ScrollView>
                        {/* showing lineGraph where x-axis: days and y-axis: cases */}
                        <LineGraph xData={xDays} yData={yCases} title={"CASES"}/>
                        <LineGraph xData={xDays} yData={yDeaths} title={"DEATHS"}/>
                        {/* <FusionCharts
                            chartConfig={ChartConfig}
                        /> */}
                    </ScrollView>
                </View>
            }
        </View>
    )
}