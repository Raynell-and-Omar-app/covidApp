import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import  HomeStack  from './homeStack';

const Drawer = createDrawerNavigator();

export default function drawerNav() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Homes" component={HomeStack} options={{headerShown:false}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
