
import * as React from 'react';
import { Button } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet,View,Image,Dimensions} from 'react-native';
import { themeColor,useTheme } from 'react-native-rapi-ui';
const ButtonSubmit = (props) => {
  const { isDarkmode, setTheme } = useTheme();
  return (

        <Button
          text={props.text}
          size="md"
          rightContent={props.rightContent}
          type="TouchableOpacity"
          status={isDarkmode ? "success" : "primary"}
          color={props.color}
          onPress={props.onPress}
          width={props.width}
          style={{marginTop: 12}}
          textStyle={{color: isDarkmode? themeColor.black200 : themeColor.white}}
      
    />
   
  );
};

export default ButtonSubmit;