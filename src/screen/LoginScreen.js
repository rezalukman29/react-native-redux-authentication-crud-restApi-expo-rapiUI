import React, { useState } from 'react';
import {StyleSheet,View,Image,ToastAndroid,Alert} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
TextInput,useTheme,Avatar
} from "react-native-rapi-ui";
import { Ionicons } from '@expo/vector-icons';
import { width,height } from '../components/Dimensions';
import { SubmitButton } from '../components/SubmitButton';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/actions/auth';
import { Loading } from '../components/Loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ToggleButton from '../components/ToggleButton';
import { TextMessage } from '../components/TextMessage';
import { TextError } from '../components/TextError';
import { Formik } from 'formik';
import * as yup from 'yup';




const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const { user,isLoading,error, message } = useSelector(state => state.auth);
  

  const { isDarkmode, setTheme } = useTheme();
  const initialForm = {
    email: '',
    password: ''
  }
  const handleLogin = (values) => {
    

    dispatch(login(values))

  }
 
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })





  return (
   
          <Layout >
            <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 20,
                  
                }}
              >
            <Section>
                <SectionContent style={styles.sectionContent}>
                <Avatar
                              source={require('../../assets/img/owsla.png')}
                              size="xl"
                              shape="round"
                              style={{alignSelf: 'center', marginBottom: 12}}
                            />
            
                  <Text fontWeight="bold"  style={{ textAlign: "center" }}>
                      Login Screen
                  </Text>
                  <TextMessage message={message}/>
                
                 
                  {isLoading?<Loading/>:<View/>}

                  <Formik
                    validationSchema={loginValidationSchema}
              
                    initialValues={initialForm}
                    onSubmit={values => handleLogin(values)}
                    
                   >
                    {({      
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                      isValid, }) => (
              <>
                  <Text style={{ marginVertical: 10 }}>Email</Text>
                    <TextInput
                        placeholder="Enter your Email"                      
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                      {(errors.email && touched.email) &&
                        <Text size="sm" status="danger">{errors.email}</Text>
                      }
                  <Text style={{ marginVertical: 10 }}>Password</Text>
                    <TextInput
                        placeholder="Enter your password"
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                     {(errors.password && touched.password)&&
                        <Text size="sm" status="danger">{errors.password}</Text>
                      }

                  <SubmitButton
                    text="Login"
                    onPress={handleSubmit}
                    disabled={!isValid}
                    // onPress={() => handleLogin()}
                  />

            </>
            )}
          </Formik>

        
                  <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => navigation.navigate('Register')}>
                    <Text size="lg" fontWeight='bold'>Register</Text>
                  </TouchableOpacity>
     
                    <ToggleButton/>

                   <TextError error={error}/>
            

                </SectionContent>
            </Section>
            </View>
          </Layout>

  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
   
  },
  sectionContent: {
    width: width * 0.9
  },
  titleLogin: {

  
  }
});
