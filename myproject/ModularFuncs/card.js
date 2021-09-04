import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Card(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 6,
        elevation: 3,
        backgroundColor:'rgb(170, 214, 250)',
        marginHorizontal: 10,
        marginVertical: 10,
        shadowColor:'blue',
        shadowOffset: {width: 1, height:1},
        shadowOpacity: 0.3,
        shadowRadius: 2
    },
    cardContent:{
        marginHorizontal: 18,
        marginVertical: 10,
    },
})