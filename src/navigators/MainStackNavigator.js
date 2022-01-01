import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';



const MainStack = createStackNavigator();


export function MainStackNavigator() {

  return (
    <MainStack.Navigator
      mode={'modal'}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
      >
     
            <MainStack.Screen name={'Home'} component={HomeScreen} options={{
                title:'',
                headerStyle: {
                  backgroundColor: '#fff',
                  elevation: 0,
                  shadowOffset: {
                    height: 0,
                },
                shadowRadius: 0,
                },
                headerRight: null,

            }}/>

           
    </MainStack.Navigator>
  );
}
