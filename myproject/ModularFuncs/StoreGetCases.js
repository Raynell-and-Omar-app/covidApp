import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


//storing in device storage
export const storeData = async (value, setStateTracker, settingInitialDataTracker, scheduleNotification) =>{
    //checking if have stored in storage the country list before
    AsyncStorage.getItem('countries')
    .then(countryList =>{
        // when no country selected previously or BUG?!
        if(countryList === null){
            countryList=[];
        }else{
            //converting string to an array of objects
            countryList = JSON.parse(countryList);
        }

        //Store only if submitted a country
        if(value !== ""){
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            let date = `${yesterday.getFullYear()}-${yesterday.getMonth()+1 < 10 ? '0': ''}${yesterday.getMonth() + 1}-${yesterday.getDate() < 10 ? '0': ''}${yesterday.getDate()}`;
            console.log("***************************************", date);
            //setting up proper values
            if(value === "United States") 
                value = "US";
            
            //checking if data is available for a particular country and storing choice if available
            fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global?country=${value}&min_date=${date}&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state,%20uid`)
            .then(response =>{
                if(response.status !== 200)
                    console.log("Error fetching the data in storeData function...");
                else{
                    response.json()
                    .then(cases =>{
                        //No data monitored for selected country(value)
                        if(cases.length === 0){
                            // checking if update issue or data actually not monitored
                            yesterday.setDate(yesterday.getDate() - 2);
                            date = `${yesterday.getFullYear()}-${yesterday.getMonth()+1 < 10 ? '0': ''}${yesterday.getMonth() + 1}-${yesterday.getDate() < 10 ? '0': ''}${yesterday.getDate()}`;
                            fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global?country=${value}&min_date=${date}&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state,%20uid`)
                            .then(result =>{
                                if(result.status !== 200){
                                    console.log("error while fetching data for verifying if data not actually available");
                                }else{
                                    result.json()
                                    .then(prevCases =>{
                                        // data not monitored for this country
                                        if(prevCases.length === 0){
                                            Alert.alert('Sorry!','This country is not being monitored yet.',[
                                                {text: 'Choose another country'}
                                            ]);
                                        }else{
                                            Alert.alert('Sorry!','Data not updated for this country yet, Please try again later.\n(Recommended: In a few hours)',[
                                                {text: 'Choose another country'}
                                            ]);
                                        }
                                    }).catch(e =>{
                                        console.log("error (from catch) while fetching data for verifying if data not actually available", e);
                                    })
                                }
                            })
                        }
                        //data available
                        else{
                            //storing choice in local storage
                            try{
                                console.log("frome stroe===================(cases)", cases);
                                //adding country choice for the first time
                                if(countryList.length === 0){
                                    // adding total numbers if list has more than one (i.e., different states)
                                    var total_number = getTotalNumber(cases);
                                    countryList.push({id: "1", country: value, casesDaily: (total_number[0] >= 0 ? (total_number[0]).toString() : "0"), deaths: (total_number[1]).toString(), cases: (total_number[2]).toString(), deathsDaily: (total_number[3]).toString(), population: (total_number[4]).toString()});
                                    AsyncStorage.setItem('countries', JSON.stringify(countryList));
                                //adding new choice with previous choices
                                }else{
                                    // adding total numbers if list has more than one (i.e., different states)
                                    var total_number = getTotalNumber(cases);
                                    countryList.unshift({id: (countryList.length + 1).toString(), country: value, casesDaily: (total_number[0]).toString(), deaths: (total_number[1]).toString(), cases: (total_number[2]).toString(), deathsDaily: (total_number[3]).toString(), population: (total_number[4]).toString()});
                                    AsyncStorage.setItem('countries', JSON.stringify(countryList));
                                }

                                //after addition
                                console.log("from storeData: \n", countryList);
                                setStateTracker(countryList);
                                settingInitialDataTracker(JSON.stringify(countryList));
                                // scheduleNotification(JSON.stringify(countryList));

                            //error while doing something in the try block above
                            }catch(e){
                                console.log("Error while storing data: ", e);
                            }
                        }
                    })
                }
            })
            .catch(e =>{
                console.log("Error while checking data availabilty in storeData:", e);
            })

        //if nothing selected
        }else{
            console.log("Input field empty....");
        }  
    })
    //some error while ding the first getItem call in the function
    .catch(e =>{
        console.log('Error while storing data from function storeData: ', e);
    })
}


//                  Original getData()
// //Getting cases data from JHU and returning data (here, 'dailyCases') to scheduling notifications
// export const getData = async () =>{
//     let dailyCases = [];
//     AsyncStorage.getItem('countries')
//     .then(countryList =>{
//         if(countryList !== null){
//             //converting string to an array of objects
//             countryList = JSON.parse(countryList);

//             //getting previous day's date and validating it
//             const today = new Date();
//             const yesterday = new Date(today);
//             yesterday.setDate(yesterday.getDate() - 1);
//             const date = `${yesterday.getFullYear()}-${yesterday.getMonth()+1 < 10 ? '0': ''}${yesterday.getMonth() + 1}-${yesterday.getDate() < 10 ? '0': ''}${yesterday.getDate()-2}`;
//             //looping through each choice to get their data
//             for(i = 0; i < countryList.length; i++){
//                 //variable recording the current index cause undefined behaviour to value of i
//                 // const iter = i;
//                 const data = countryList[i].country;
//                 if(data !== null){
//                     fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global?country=${data}&min_date=${date}&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state,%20uid`)
//                     .then(response =>{
//                         if(response.status !== 200)
//                             console.log("Error occured when fetching data...");
//                         else{
//                             response.json()
//                             .then(cases =>{
//                                 if(cases.length !== 0){
//                                     dailyCases.push(cases);
//                                 }else{
//                                     console.log("======================NO DATA==================");
//                                 }
//                             })
//                         }
//                     })
                    
//                 }else{
//                     console.log('Data at index ',i,' is empty...');
//                 }
//             }
//             // returning final data
//             console.log("Here in getData");
//             return dailyCases;
//         }else{
//             console.log("No country choices in asyncStorage...");
//         return dailyCases;
//         }
//     })
//     .catch(e =>{
//         console.log('Error caught in retrieving data: ', e);
//         return dailyCases;
//     })
//     console.log("Could return dailyCases");
//     // returning an empty list if not returned the cases list before    
// }


export const deleteData = async (setStateTracker, settingInitialDataTracker, countryID) =>{
    //checking if have stored in storage the country list before
    AsyncStorage.getItem('countries')
    .then(countryList =>{
        countryList = JSON.parse(countryList);
        
        //Getting list of selected countries (doing a complete for loop incase user select one country multiple times)
        for(i = 0; i < countryList.length; i++){
            if(countryList[i].country === countryID){
                countryList.splice(i, 1);
                i--;
            }else{
                let temp = i+1;
                countryList[i].id = temp.toString();
            }
            
        }

        AsyncStorage.setItem('countries', JSON.stringify(countryList));
        setStateTracker(countryList);
        settingInitialDataTracker(JSON.stringify(countryList)); 
 
    })
    //some error while ding the first getItem call in the function
    .catch(e =>{
        console.log('Error while deleting data: ', e);
    })
    
}




// function to get the total of deaths,cases,confirmed,etc.
// format:
// var total_number = [cases[0].confirmed_daily, cases[0].deaths, cases[0].confirmed, cases[0].deaths_daily, cases[0].population];
function getTotalNumber(cases){
    var confirmed_today = 0;
    var deaths_today = 0;
    var confirmed_total = 0;
    var deaths_total = 0;
    var total_pop = 0;
    // getting the total numbers
    for(i = 0; i<cases.length; i++){
        confirmed_today += cases[i].confirmed_daily;
        deaths_today += cases[i].deaths_daily;
        confirmed_total += cases[i].confirmed;
        deaths_total += cases[i].deaths;
        total_pop += cases[i].population;
    }
    return [confirmed_today, deaths_total, confirmed_total, deaths_today, total_pop];
}





//                  TRIALS
//Getting cases data from JHU and returning data (here, 'dailyCases') to scheduling notifications
export const getData = async (countryName, daysFromToday, casesList, daysList, deathList) =>{
    let dailyCases = [];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - daysFromToday);
    const date = `${yesterday.getFullYear()}-${yesterday.getMonth()+1 < 10 ? '0': ''}${yesterday.getMonth() + 1}-${yesterday.getDate() < 10 ? '0': ''}${yesterday.getDate()}`;
        // //looping through each choice to get their data
        // for(i = 0; i < countryListJson.length; i++){
        //     const data = countryListJson[i].country;
        //     if(data !== null){
    // getting 'daysFromToday' number of cases in json format
    const response = await(await fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global?country=${countryName}&min_date=${date}&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state,%20uid`)).json();
    if(response.length !== 0){
        for(let i = 0; i<response.length; i++){
            casesList.push((response[i].confirmed_daily < 0 ? 0 : response[i].confirmed_daily));
            // removing the timezone mentioned in the string
            daysList.push((response[i].date).slice(0, 10));
            deathList.push(response[i].deaths_daily < 0 ? 0 : response[i].deaths_daily);
            dailyCases.push(response[i]);
        }
    }else{
        console.log("======================NO DATA==================getData()");
    }
        //     }else{
        //         console.log('Data at index ',i,' is empty from getData()...');
        //     }
        // }
        // console.log("Here in getData", dailyCases);
    //     return JSON.stringify(dailyCases);
    // }else{
    //     console.log("No country choices in asyncStorage...");
    // }
    return JSON.stringify(dailyCases);
}

