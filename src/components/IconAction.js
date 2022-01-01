import React from 'react';
import { themeColor,useTheme } from 'react-native-rapi-ui';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


export function IconAction({name,onPress}) {
  const { isDarkmode, setTheme } = useTheme();
  return (
 
      <MaterialCommunityIcons   
        name={name}  
        size={26} 
        color={isDarkmode? themeColor.white : themeColor.black200}
        style={{marginHorizontal: 6}}
        onPress={onPress}
      />
  
  );
}

