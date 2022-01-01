import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { themeColor,useTheme } from 'react-native-rapi-ui';

export function IconInput({name,onPress,color}) {
  const { isDarkmode, setTheme } = useTheme();
  return (
 
      <MaterialCommunityIcons  name={name} color={isDarkmode? themeColor.white : themeColor.black200} size={24} style={{paddingHorizontal: 6}} onPress={onPress} />
  
  );
}

