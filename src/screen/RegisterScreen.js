import React, {useState} from 'react';
import {StyleSheet,View,Image,ToastAndroid,Alert, Pressable} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
TextInput,useTheme,Avatar
} from "react-native-rapi-ui";

import { width,height } from '../components/Dimensions';
import { SubmitButton } from '../components/SubmitButton';
import { useSelector, useDispatch } from 'react-redux';
import { login, registerUser } from '../redux/actions/auth';
import { Loading } from '../components/Loading';
import ToggleButton from '../components/ToggleButton';
import * as mock from '../components/mock/data'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';


const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const { user,isLoading,error } = useSelector(state => state.auth);

  const { isDarkmode, setTheme } = useTheme();
  const noAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFghe9NlnM-gPygO1pbXIp3QDflsCer36gLxnfHQWqVXSamYNUshZe6mbW98mFYAw4Hl0&usqp=CAU'
  const initialForm = {
    name: '',
    email: '',
    password: ''
  }

  const [avatar, setAvatar] = useState(noAvatar);
  const handleRegister = (values) => {
    Object.assign(values, {avatar: avatar});
   
    dispatch(registerUser(values,navigation))
    // setTimeout(() => { navigation.navigate('Login')},1000)
 
  }

  const loginValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is Required'),
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
                <Text fontWeight="bold" style={{ textAlign: "center" ,marginBottom: 12}}>
                      Register Screen
                  </Text>
                  {isLoading?<Loading/>:<View/>}
                <Avatar
                              source={{uri:avatar}}
                              size="xl"
                              shape="round"
                              style={{alignSelf: 'center'}}
                            />
            
             
                 
                
            
                  <Text style={{ marginVertical: 10 }}>Avatar</Text>
                  <ScrollView horizontal>
                    {mock.people.map((item,index) => 
                      <TouchableOpacity key={index} style={{paddingHorizontal: 3}} onPress={() => setAvatar(item.url)}>
                                <Avatar
                                  source={{uri:item.url}}
                                  size="md"
                                  shape="round"
                                
                            />
                      </TouchableOpacity>
                    )}
                  </ScrollView>

                  <Formik
                    validationSchema={loginValidationSchema}
              
                    initialValues={initialForm}
                    onSubmit={values => handleRegister(values)}
                    
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
                  
                  <Text style={{ marginVertical: 10 }}>Name</Text>
                    <TextInput
                        placeholder="Enter your name"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
              
                    />
                       {(errors.name && touched.name) &&
                        <Text size="sm" status="danger">{errors.name}</Text>
                      }
                  <Text style={{ marginVertical: 10 }}>Email</Text>
                    <TextInput
                        placeholder="Enter your email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                       {(errors.email && touched.email) &&
                        <Text size="sm" status="danger">{errors.email}</Text>
                      }
                  <Text style={{ marginVertical: 10 }}>Password</Text>
                    <TextInput
                        placeholder="Enter your text"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                    />
                      {(errors.password && touched.password)&&
                        <Text size="sm" status="danger">{errors.password}</Text>
                      }
                  <SubmitButton
                    text="Register"
                    onPress={handleSubmit}
                    disabled={!isValid}
                  />

            </>
            )}
          </Formik>

                  <ToggleButton/>


                </SectionContent>
            </Section>
            </View>
          </Layout>

  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
   
  },
  sectionContent: {
    width: width * 0.9
  },
  titleLogin: {

  
  }
});
