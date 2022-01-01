import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import { LinesLoader } from 'react-native-indicator';
import { themeColor,useTheme } from 'react-native-rapi-ui';


export function ActionLoader() {

  const { isDarkmode, setTheme } = useTheme();

  return (
    <View>
      <LinesLoader color={isDarkmode? themeColor.white : themeColor.black200}/>
    </View>
  );
}

const styles = StyleSheet.create({

});
