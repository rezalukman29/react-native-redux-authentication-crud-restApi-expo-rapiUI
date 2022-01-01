import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { MainStackNavigator } from './navigators/MainStackNavigator';

const RootStack = createStackNavigator();

export const Routes = () =>  {
  const { user,isLogin} = useSelector(state => state.auth);


  function renderScreens() {
    
 
    return  (
          isLogin ?
            <RootStack.Screen name={'MainStack'} component={MainStackNavigator} />
                :
            <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
          );
  }
  return (

            <NavigationContainer>
                  <RootStack.Navigator
                      screenOptions={{
                        headerShown: false,
                        animationEnabled: false,
                      }}>
                        {renderScreens()}
                  </RootStack.Navigator>
            </NavigationContainer>

  );
}

