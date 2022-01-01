
import * as React from 'react';
import { themeColor,useTheme,TextInput } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet,View,Image,Dimensions} from 'react-native';

const InputText = (props,name) => {
  const { isDarkmode, setTheme } = useTheme();
  return (

        <TextInput
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={(value) => props.onChangeText(value)}
          rightContent={props.rightContent}
          maxLength={props.maxLength}
          onBlur={props.onBlur}
          
      
    />
   
  );
};

export default InputText;