import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
//storing in device storage
export const storeData = async (value, setStateTracker, settingInitialDataTracker, storingOrDeleting) =>{
    //checking if have stored in storage the country list before
    AsyncStorage.getItem('countries')
    .then(countryList =>{
        
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
            const date = `${yesterday.getFullYear()}-${yesterday.getMonth()+1 < 10 ? '0': ''}${yesterday.getMonth() + 1}-${yesterday.getDate() < 10 ? '0': ''}${yesterday.getDate()}`;
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
                            Alert.alert('Sorry!','Data not available for this country',[
                                {text: 'Choose another country'}
                            ])
                        }

                        //data available
                        else{
                            //console.log(cases);
                            //storing choice in local storage
                            try{
                                //adding country choice for the first time
                                if(countryList.length === 0){
                                    countryList.push({id: "1", country: value, casesDaily: (cases[0].confirmed_daily).toString(), deaths: (cases[0].deaths).toString(), cases: (cases[0].confirmed).toString(), deathsDaily: (cases[0].deaths_daily).toString(), population: (cases[0].population).toString()});
                                    AsyncStorage.setItem('countries', JSON.stringify(countryList));
                                //adding new choice with previous choices
                                }else{
                                    countryList.push({id: (countryList.length + 1).toString(), country: value,  casesDaily: (cases[0].confirmed_daily).toString(), deaths: (cases[0].deaths).toString(), cases: (cases[0].confirmed).toString(), deathsDaily: (cases[0].deaths_daily).toString(), population: (cases[0].population).toString()});
                                    AsyncStorage.setItem('countries', JSON.stringify(countryList));
                                }

                                //after addition
                                console.log("from storeData: ", countryList);
                                setStateTracker(countryList);
                                settingInitialDataTracker(JSON.stringify(countryList));
                                //getData();

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


//Getting cases data from JHU
export const getData = async () =>{

    AsyncStorage.getItem('countries')
    .then(countryList =>{

        if(countryList !== null){
            dailyCases = [];
            //converting string to an array of objects
            countryList = JSON.parse(countryList);

            //getting previous day's date and validating it
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const date = `${yesterday.getFullYear()}-${yesterday.getMonth()+1 < 10 ? '0': ''}${yesterday.getMonth() + 1}-${yesterday.getDate() < 10 ? '0': ''}${yesterday.getDate()}`;

            //looping through each choice to get their data
            for(i = 0; i < countryList.length; i++){
                const data = countryList[i].country;
                if(data !== null){
                    //fetching cases cases from JHU
                    fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global?country=${data}&min_date=${date}&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state,%20uid`)
                    .then(response =>{
                        if(response.status !== 200)
                            console.log("Error occured when fetching data...");
                        else{
                            response.json()
                            .then(cases =>{
                                if(cases.length !== 0){
                                    console.log(cases);
                                    console.log('latest confirmed:', cases[0].confirmed_daily);
                                    // dailyCases.push(cases[0].confirmed_daily);
                                    // console.log(dailyCases);
                                    // console.log("Country List:",countryList);
                                    // for(x = 0; x < dailyCases.length; x++){
                                    //     countryList[x]["Cases"] = dailyCases[x];
                                    //     console.log(dailyCases[x]);
                                    // }
                                    // console.log("Country List atfer:",countryList);

                                }else{
                                    console.log("======================NO DATA==================");
                                }
                            })
                        }
                    })
                    
                }else{
                    console.log('Data at index ',i,' is empty...');
                }
            }
        }else{
            console.log("No data exists...");
        }
    })
    .catch(e =>{
        console.log('Error caught in retrieving data: ', e);
    })
    
}


export const deleteData = async (setStateTracker, settingInitialDataTracker, countryID) =>{
    //checking if have stored in storage the country list before
    AsyncStorage.getItem('countries')
    .then(countryList =>{

        //Empty lists for countries and CountryList
        countryListCopy = [];
        selectedCountries = [];

        selectedCountriesDailyCaseCount = [];
        selectedCountriesDailyDeathCount = [];

        selectedCountriesDeathCount = [];
        selectedCountriesCaseCount = [];

        selectedCountriesPopulation = [];
        
        countryList = JSON.parse(countryList);
        console.log(countryList);
        
        //Getting list of selected countries
        for(i = 0; i < countryList.length; i++){
            selectedCountries.push(countryList[i].country);

            selectedCountriesDailyCaseCount.push(countryList[i].casesDaily);
            selectedCountriesDailyDeathCount.push(countryList[i].deathsDaily);

            selectedCountriesDeathCount.push(countryList[i].deaths);
            selectedCountriesCaseCount.push(countryList[i].cases);

            selectedCountriesPopulation.push(countryList[i].population);
            
        }

        //Logging selected countries
        console.log(selectedCountries);

        //Creating new Country List without the deleted Country
        for (let i = 1; i < countryList.length+1; i++) {
            if (i < parseInt(countryID)){
                countryListCopy.push({id:(i).toString(), country: selectedCountries[i-1], casesDaily: selectedCountriesDailyCaseCount[i-1], deathsDaily: selectedCountriesDailyDeathCount[i-1] ,deaths: selectedCountriesDeathCount[i-1], cases: selectedCountriesCaseCount[i-1], population: selectedCountriesPopulation[i-1]});
            } if (i > parseInt(countryID)) {
                countryListCopy.push({id:(i-1).toString(), country: selectedCountries[i-2], casesDaily: selectedCountriesDailyCaseCount[i-2], deathsDaily: selectedCountriesDailyDeathCount[i-2], deaths: selectedCountriesDeathCount[i-2], cases: selectedCountriesCaseCount[i-2], population: selectedCountriesPopulation[i-2]})
             } 
             if ( i == parseInt(countryID)) {
                selectedCountries.splice(parseInt(countryID)-1,1);

                selectedCountriesDailyCaseCount.splice(parseInt(countryID)-1,1);
                selectedCountriesDailyDeathCount.splice(parseInt(countryID)-1,1);

                selectedCountriesDeathCount.splice(parseInt(countryID)-1,1);
                selectedCountriesCaseCount.splice(parseInt(countryID)-1,1);

                selectedCountriesPopulation.splice(parseInt(countryID)-1,1);
                //console.log("Selected countries inside ELSE:",selectedCountries);
                
            }
        }

        //Logging selected countries and country List after deletion
        console.log("Selected countries:",selectedCountries);
        console.log("Country list copy:",countryListCopy);

        countryList = countryListCopy;
        console.log("new country list:",countryList);

        AsyncStorage.setItem('countries', JSON.stringify(countryList));
        setStateTracker(countryList);
        settingInitialDataTracker(JSON.stringify(countryList)); 
 
    })
    //some error while ding the first getItem call in the function
    .catch(e =>{
        console.log('Error while deleting data: ', e);
    })
    
}


//fetching cases (LOOK INTO THIS LATER!!)
// const fetchData = (country= "", date="") => {
//     //with date
//     if(date.length > 0){
//         fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global?country=${country}&min_date=${date}&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state,%20uid`)
//         .then(response =>{
//             if(response.status !== 200)
//                 throw new Error("Error while retrieving data from fetchData....")
//             else{
//                 response.json()
//                 .then(cases => {
//                     return(cases);
//                 })
//             }
//         })
//         .catch(e =>{
//             console.log("Error retreiving data from fetchData:", e);
//         })

//     //without date
//     }else{
//         fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global?country=${country}&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state,%20uid`)
//         .then(response =>{
//             if(response.status !== 200)
//                 throw new Error("Error while retrieving data from fetchData....")
//             else{
//                 response.json()
//                 .then(cases => {
//                     return(cases);
//                 })
//             }
//         })
//         .catch(e =>{
//             console.log("Error retreiving data from fetchData:", e);
//         })
//     }    
// }

// (async() =>{
//     const cases = await fetchData("Argentina", "2021-08-28");
//     console.log(cases); 
// })()
