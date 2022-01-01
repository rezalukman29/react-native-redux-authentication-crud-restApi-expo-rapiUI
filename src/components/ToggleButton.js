import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    StyleSheet,
 
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';
import { themeColor,useTheme,Text } from 'react-native-rapi-ui';
import { changeTheme } from '../redux/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
const activeColor =themeColor.black200;
const inActiveColor = themeColor.white200;
export default function ToggleButton() {
    const dispatch = useDispatch();
    const { isDarkmode, setTheme } = useTheme();
    return (
        <View style={styles.constainer}>
            <TouchableOpacity
                style={[
                    styles.toggleContainer,
                    { borderColor: isDarkmode ? themeColor.gray500 : inActiveColor },
                ]}
                onPress={() => {
                    LayoutAnimation.easeInEaseOut();
          
                    if (isDarkmode) {
                        let theme = "light"
                        setTheme("light");
                        dispatch(changeTheme(theme))
                        
                      } else {
                        let theme = "dark"
                        setTheme("dark");
                        dispatch(changeTheme(theme))
                      }
                    
                }}
                activeOpacity={1}>
                <View
                    style={[
                        styles.toggleBtn,
                        isDarkmode
                            ? { backgroundColor: activeColor, alignSelf: 'flex-end' }
                            : { backgroundColor: inActiveColor },
                    ]}
                >
                    <Text size="md" style={styles.status}>{isDarkmode ? 'Dark' : 'Light'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    constainer: {  alignItems: 'center', justifyContent: 'center',paddingVertical: 24 },
    status: {
      
        textAlign: 'center',
    
    },
    toggleContainer: {
        height: 30,
        width: 100,
        borderRadius: 5,
        borderWidth: 0.5,
        overflow: 'hidden',
    },
    toggleBtn: { height: '100%', width: '50%', justifyContent: 'center' },
});