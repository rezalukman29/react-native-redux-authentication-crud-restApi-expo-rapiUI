import React from 'react';
import { themeColor,useTheme } from 'react-native-rapi-ui';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


export function IconMenu({name}) {
  const { isDarkmode, setTheme } = useTheme();
  return (
 
      <MaterialCommunityIcons   
        name={name}  
        size={80} 
        color={isDarkmode? themeColor.gray100 : themeColor.black200}
        style={{marginHorizontal: 6}}
      />
  
  );
}

