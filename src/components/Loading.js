import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import { LinesLoader } from 'react-native-indicator';
import { Button,useTheme } from 'react-native-rapi-ui';
import { themeColor } from 'react-native-rapi-ui';

export function Loading() {
  const { isDarkmode, setTheme } = useTheme();

  return (
      <View style={{alignSelf: 'center'}}>
        <LinesLoader color={isDarkmode? '#e4eaef' : themeColor.primary}/>
      </View>

  );
}

const styles = StyleSheet.create({
 
});
