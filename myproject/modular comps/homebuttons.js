import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

export const HomeButtons = ({id, name}) =>{
    if(id === 1){
        return(
            <View style={styles.featuresButton}>
                <ImageBackground 
                    source={require('../assets/imgs/feature1.jpg')}
                    style={styles.imgStyle}
                >
                    <Text style={styles.featureText1}>{name}</Text>
                </ImageBackground>
            </View>
        )
    }else{
        return(
            <View style={styles.featuresButton}>
                <ImageBackground 
                    source={require('../assets/imgs/feature2.jpg')}
                    style={styles.imgStyle}
                >
                    <Text style={styles.featureText2}>{name}</Text>
                </ImageBackground>
            </View>
        )
    }
        
}



const styles= StyleSheet.create({
    featuresButton:{
        marginBottom: 40,
        height: 215,
        width: 215,
        borderRadius: 50,
        borderWidth: 4,
        borderStyle: 'dashed',
        borderColor: 'white'
        // borderColor: '#5399DF',
        // borderColor: 'white',
    },
    featureText1:{
        fontFamily:'helvetica-neue-regular',
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 60,
        fontWeight: 'bold',
    },
    featureText2:{
        fontFamily:'helvetica-neue-regular',
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 80,
        fontWeight: 'bold',
    },
    imgStyle:{
        height:200,
        width:200,
        borderRadius: 50,
        overflow: 'hidden',
        marginLeft: 3,
        marginTop: 3,
    },
})
