import AsyncStorage from '@react-native-async-storage/async-storage';

//storing in device storage
export const storeData = async (value, flag, setStateTracker, settingInitialDataTracker) =>{
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

            //setting up proper values
            if(value === "United States") 
                value = "US";
            
            //checking if data is available for a particular country and storing choice if available
            fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global?country=${value}&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state,%20uid`)
            .then(response =>{
                if(response.status !== 200)
                    console.log("Error fetching the data in storeData function...");
                else{
                    response.json()
                    .then(cases =>{
                        //No data monitored for selected country(value)
                        if(cases.length === 0){
                            console.log('No data available for this country');
                        }

                        //data available
                        else{
                            //storing choice in local storage
                            try{
                                //adding country choice for the first time
                                if(countryList.length === 0){
                                    countryList.push({id: "1", country: value, countryFlag: flag});
                                    AsyncStorage.setItem('countries', JSON.stringify(countryList));
                                //adding new choice with previous choices
                                }else{
                                    countryList.push({id: (countryList.length + 1).toString(), country: value, countryFlag: flag});
                                    AsyncStorage.setItem('countries', JSON.stringify(countryList));
                                }

                                //after addition
                                console.log("from storeData: ", countryList);
                                setStateTracker(countryList);
                                settingInitialDataTracker(JSON.stringify(countryList));

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

    //temporarily for production
    AsyncStorage.clear();
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
