import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor} from './src/redux/store';
import {Routes} from './src/Routes';
import { ThemeProvider } from "react-native-rapi-ui";
import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_400Regular_Italic,
  Ubuntu_500Medium,
  Ubuntu_500Medium_Italic,
  Ubuntu_700Bold,
  Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';

export default function App() {
  

  const [loaded] = useFonts({
    Ubuntu_400Regular: Ubuntu_400Regular,
    Ubuntu_700Bold: Ubuntu_700Bold,
    Ubuntu_500Medium: Ubuntu_500Medium,
    Ubuntu_300Light: Ubuntu_300Light


  });
  
  if (!loaded) {
    return null;
  }


  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
            <ThemeProvider>       
                <Routes/>
            </ThemeProvider>
        </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
