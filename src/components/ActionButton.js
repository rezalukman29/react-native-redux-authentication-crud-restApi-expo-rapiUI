import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Button,useTheme } from 'react-native-rapi-ui';


export function ActionButton({text,onPress}) {
  const { isDarkmode, setTheme } = useTheme();
  return (
 
      
    <Button
    text={text}
    status={isDarkmode ? "success" : "primary"}
    onPress={onPress}
    size="sm"
    style={{paddingHorizontal: 6,marginHorizontal: 3, borderRadius: 6}}

 />
  
  );
}

