import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { themeColor,useTheme } from 'react-native-rapi-ui';

export function IconButton({name}) {
  const { isDarkmode, setTheme } = useTheme();
  return (
 
      <MaterialCommunityIcons  color={isDarkmode? themeColor.black200 : themeColor.white} name={name}  size={20} />
  
  );
}

