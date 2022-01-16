import React, {useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Modal from "react-native-modal";

export default LineGraph = ({xData, yData, title}) =>{
    const [modalView, setModalView] = useState(false);
    const [dataIndex, setDataIndex] = useState(0);
    return(
        <View style={{marginTop:15}}>
            {/* setting up modal to view on clicking a data point*/}
            <Modal
                isVisible={modalView}
                onBackButtonPress={()=>{ setModalView(false); }}
                onBackdropPress={()=>{ setModalView(false); }}
                animationIn={'bounceIn'}
                animationOut={'bounceOut'}
                style={style.modalStyle}
            >  
                <View style={style.modalContent}>
                    <ScrollView>
                        <Text>yyyy-mm-dd: {xData[dataIndex]}</Text>
                        <Text>{title}: {yData[dataIndex]}</Text>
                    </ScrollView>         
                </View>
            </Modal>
            <Text style={style.subHeader}>{title}</Text>
            {/* Displaying the graph */}
            <LineChart
                data={{
                labels: xData,
                datasets: [
                    {
                        data: yData
                    }
                ]
                }}
                width={Dimensions.get("screen").width - 10}
                height={250}
                chartConfig={chartConfig}
                withVerticalLabels={false}
                style={{
                    borderRadius: 16,
                    alignSelf:'center',
                }}
                yAxisInterval={1}
                onDataPointClick={({index}) => {
                    setDataIndex(index);
                    setModalView(true);
                }}
            />
        </View>
    )
}


// chart config
const chartConfig = {
    backgroundGradientFrom: "blue",
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: "#5399DF",
    backgroundGradientToOpacity: 1,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 100, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
}


const style = StyleSheet.create({
    subHeader:{
        fontSize:20, 
        fontWeight:'bold',
        marginLeft: 11,
    },  
    modalStyle:{
        flex: 0,
        backgroundColor: "#e6f9ff",
        borderRadius: 10,
        height: 100,
        marginTop: Dimensions.get('screen').height/3,
    },
    modalContent:{
        marginLeft: 10,
    }
});