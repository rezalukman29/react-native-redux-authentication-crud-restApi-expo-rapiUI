import * as React from 'react';
import { Button,Text,themeColor } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet,View,Image,Dimensions,Pressable,Modal}  from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const CustomAlert = (props) => {
  const { theme} = useSelector(state => state.auth);

  React.useEffect(()=>{
    setAndroidDefaults({...androidDefaults, backgroundColor: theme === 'dark'?themeColor.black100 : themeColor.white100}) 
  },[theme])

  const [androidDefaults, setAndroidDefaults] = React.useState({
    backgroundColor: '#FAFAFA',

    button: {
      color: '#387ef5',
      // fontFamily: 'initial',
      fontSize: 16,
      fontWeight: '500',
      // textTransform: 'uppercase',
      backgroundColor: 'transparent',
    },
  });
  const [iOSDefaults, setIOSDefaults] = React.useState({
    backgroundColor: '#FAFAFA',
    button: {
      color: '#387ef5',
      // fontFamily: 'initial',
      fontSize: 17,
      fontWeight: '500',
      textTransform: 'none',
      backgroundColor: 'transparent',
    },
  });
  const AndroidButtonBox = () => {
    const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = React.useState(1);
    const buttonProps = props.buttons && props.buttons.length > 0 ? props.buttons : [{}]

    return (
      <View style={[styles.androidButtonGroup, {
        flexDirection: buttonLayoutHorizontal === 1 ? "row" : "column",
      }]} onLayout={(e) => {
        if(e.nativeEvent.layout.height > 60)
          setButtonLayoutHorizontal(0);
      }}>
        {
          buttonProps.map((item, index) => {
              if(index > 2) return null;
              const alignSelfProperty = buttonProps.length > 2 && index === 0 && buttonLayoutHorizontal === 1 ?  'flex-start' : 'flex-end';
              let defaultButtonText = 'OK'
              if(buttonProps.length > 2){
                if(index === 0)
                  defaultButtonText = 'ASK ME LATER'
                else if(index === 1)
                  defaultButtonText = 'CANCEL';
              } else if (buttonProps.length === 2 && index === 0)
                defaultButtonText = 'CANCEL';
              return (
                <View key={index} style={[styles.androidButton, index === 0 && buttonLayoutHorizontal === 1 ? {flex: 1} : {}]}>
                  <Pressable onPress={() => {
                    props.setModalVisible(false)
                    if(item.func && typeof(item.func) === 'function')
                      item.func();
                  }} style={[{
                    alignSelf: alignSelfProperty, 

                  }]}>
                    <View style={[styles.androidButtonInner, {backgroundColor: (item.styles && item.styles.backgroundColor) || androidDefaults.button.backgroundColor}]}>
                      <Text
                        size="lg"
                      >{item.text || defaultButtonText}</Text>
                    </View>
                  </Pressable>
                </View>
              )
            })

        }
      </View>
    );
  }
  const IOSButtonBox = () => {
    const buttonProps = props.buttons && props.buttons.length > 0 ? props.buttons : [{}]
    const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = React.useState(buttonProps.length === 2 ? 1 : 0);


    return (
      <View style={[styles.iOSButtonGroup, {
        flexDirection: buttonLayoutHorizontal === 1 ? "row" : "column",
      }]} onLayout={(e) => {
        if(e.nativeEvent.layout.height > 60)
          setButtonLayoutHorizontal(0);
      }}>
        {
          buttonProps.map((item, index) => {
              let defaultButtonText = 'OK'
              if(buttonProps.length > 2){
                if(index === 0)
                  defaultButtonText = 'ASK ME LATER'
                else if(index === 1)
                  defaultButtonText = 'CANCEL';
              } else if (buttonProps.length === 2 && index === 0)
                defaultButtonText = 'CANCEL';
              const singleButtonWrapperStyle = {}
              let singleButtonWeight = iOSDefaults.button.fontWeight;
              if(index === buttonProps.length - 1){
                  singleButtonWeight = '700';
              }
              if(buttonLayoutHorizontal === 1){
                singleButtonWrapperStyle.minWidth = '50%';
                if(index === 0){
                  singleButtonWrapperStyle.borderStyle = 'solid';
                  singleButtonWrapperStyle.borderRightWidth = 0.55;
                  singleButtonWrapperStyle.borderRightColor = '#dbdbdf';
                }

              }
              return (
                <View key={index} style={[styles.iOSButton, singleButtonWrapperStyle]}>
                  <Pressable onPress={() => {
                    props.setModalVisible(false)
                    if(item.func && typeof(item.func) === 'function')
                      item.func();
                  }}>
                    <View style={[styles.iOSButtonInner, {backgroundColor: (item.styles && item.styles.backgroundColor) || iOSDefaults.button.backgroundColor}]}>
                    <Text
                        size="lg"
                      >{item.text || defaultButtonText}</Text>
                    </View>
                  </Pressable>
                </View>
              )
            })

        }
      </View>
    );
  }
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(false);
        }}
      >
        <Pressable style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} onPress={() => props.setModalVisible(false)} />
        <View style={styles.alertBox}>
        {
          Platform.OS === "ios" ? 
          <View style={[styles.iOSAlertBox, iOSDefaults.container]}>
            <Text style={[styles.iOSTitle]} fontWeight='bold' size="lg">{props.title || 'Message'}</Text>
            <Text style={[styles.iOSMessage]}>{props.message || ''}</Text>
            <IOSButtonBox />
          </View>
          :
          <View style={[styles.androidAlertBox, androidDefaults]}>
            <Text style={styles.androidTitle} fontWeight='bold' size="lg">{props.title || 'Message'}</Text>
            <Text style={styles.androidMessage} size='sm'>{props.message || ''}</Text>
            <AndroidButtonBox />
          </View>
        }
        </View>


      </Modal>
  )
}


export default CustomAlert;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.32
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  alertBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidAlertBox: {
    maxWidth: 280,
    width: '100%',
    margin: 48,
    elevation: 24,
    borderRadius: 2,
    height: 160,
    padding: 12
  },
  androidTitle: {
    margin: 12,
    marginBottom: 12
   
  },
  androidMessage: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
  },
  androidButtonGroup: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 24,
  },
  androidButton: {
    marginTop: 12,
    marginRight: 8,    
  },
  androidButtonInner: {
    padding: 10,

  }
   
});
