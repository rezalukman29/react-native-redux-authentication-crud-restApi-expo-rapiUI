
import * as React from 'react';
import { themeColor,useTheme,Text } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet,View,Image,Dimensions} from 'react-native';

export function TextMessage({message}){
  const { isDarkmode, setTheme } = useTheme();
  return (

    <Text size="sm" status={isDarkmode?"warning" : "info"} style={{ textAlign: "center" , fontStyle: 'italic'}}>
        {message}
  </Text>
   
  );
};

