import { StyleSheet } from 'react-native';

export const globalStyle = StyleSheet.create({
    header:{
        backgroundColor: '#5399DF',
        height: '8%',
    },
    headerText:{
        fontFamily:'helvetica-neue-regular',
        color: '#fff',
        fontSize: 28,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
    },
    screen:{
        flex: 1,
        backgroundColor: '#e6f9ff',
    },
    countrySelectButton: {
        justifyContent: 'center',
        alignItems:"center",
        backgroundColor:"#66B2FF",
        marginTop: 40,
        borderWidth:3,
        borderRadius:10,
        width:130,
        height:40,
        borderColor:"blue",  
    },
    buttonBox: {
        marginTop: 20
    }
})