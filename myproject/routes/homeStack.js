import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/homescreen";
import {Tracker} from "../screens/trackerScreen"
import {Symptoms} from "../screens/SymptomsScreen"
import { ViewMore } from "../screens/ViewMoreScreen";
import {  Alert, Button, StyleSheet, Text, View, Pressable, ImageBackground, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

export default ({navigation}) => (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign:"center",
        headerShown:true,
        headerStyle: {
          height: 55,
          backgroundColor: '#5399DF',
        },
        headerTintColor: "#fff",
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "COVID-19 App",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Tracker"
        component={Tracker}
        options={{
          title: "Country Tracker",
          headerRight: () => (
            <View style={style.buttons}>
            <Button
              onPress={() => navigation.navigate('Symptoms')}
              title="Symptoms"
              color="#66B2FF"
            />
            </View>
          ),
          headerLeft: () => (
            <View style={style.buttons}>
            <Button
              
              onPress={() => navigation.navigate('Home')}
              title="Home"
              color="#66B2FF"
            />
            </View>
          )
        }}
      />
      <Stack.Screen
        name="ViewMore"
        component={ViewMore}
        options={{
          title:"Detailed",
          headerLeft: () => (
            <View style={style.buttons}>
            <Button
              onPress={() => navigation.navigate('Tracker')}
              title="Tracker"
              color="#66B2FF"
            />
            </View>
          )
        }}
      />
      <Stack.Screen
        name="Symptoms"
        component={Symptoms}
        options={{
          title: "Symptoms",
          headerLeft: () => (
            <View style={style.buttons}>
            <Button
              onPress={() => navigation.navigate('Home')}
              title="Home"
              color="#66B2FF"
            />
            </View>
          ),
          headerRight: () => (
            <View style={style.buttons}>
            <Button
              onPress={() => navigation.navigate('Tracker')}
              title="Tracker"
              color="#66B2FF"
             />
            </View>
          )
        }}
      />
    </Stack.Navigator>
);

const style = StyleSheet.create({
  buttons: {
    // width:100,
    // height:100,
    paddingHorizontal: 7
  }
})



