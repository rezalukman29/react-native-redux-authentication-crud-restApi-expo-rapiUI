import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Button,useTheme, themeColor } from 'react-native-rapi-ui';


export function SubmitButton({text,onPress,disabled,width}) {
  const { isDarkmode, setTheme } = useTheme();
  return (
 
      
    <Button
    text={text}
    // status={isDarkmode ? themeColor.gray100 : "primary"}
    color={isDarkmode ? '#e4eaef' : themeColor.primary }
    onPress={onPress}
    style={{
      marginVertical: 12,
    }}
    textStyle={{color: isDarkmode ? themeColor.black200 : themeColor.white }}
    disabled={disabled}
    width={width}
 />
  
  );
}

