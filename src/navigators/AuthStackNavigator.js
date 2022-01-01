import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';



const AuthStack = createStackNavigator();
// const LoginStack = createStackNavigator();

export function AuthStackNavigator() {

  return (
    <AuthStack.Navigator
      mode={'modal'}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
      >
     
            <AuthStack.Screen name={'Login'} component={LoginScreen} options={{
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

            <AuthStack.Screen name={'Register'} component={RegisterScreen} options={{
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




  

      
    </AuthStack.Navigator>
  );
}
