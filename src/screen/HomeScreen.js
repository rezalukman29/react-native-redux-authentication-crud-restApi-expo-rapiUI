import React, { useRef, useState, useEffect } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    View,TouchableOpacity, Pressable 
} from 'react-native';
import { TouchableOpacity as PressableIcon} from 'react-native-gesture-handler'

import { useSelector, useDispatch } from 'react-redux';
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,Avatar,
TextInput, useTheme,themeColor
} from "react-native-rapi-ui";
import { createPost, getPosts, removePost, setPost, updatePost } from '../redux/actions/post';
import * as myFunction from '../components/lib/function';
import { width,height } from '../components/Dimensions';
import { IconAction } from '../components/IconAction';
import { ScrollView} from 'react-native-gesture-handler';
import { changeTheme, logout } from '../redux/actions/auth';
import CustomAlert from '../components/CustomAlert';
import { Loader } from '../components/Loader';
import { ActionLoader } from '../components/ActionLoader';
import { BottomSheet } from 'react-native-btr';
import InputText from '../components/InputText';
import { IconInput } from '../components/IconInput';

import { IconButton } from '../components/IconButton';
import * as mock from '../components/mock/data'
import { SubmitButton } from '../components/SubmitButton';
import ToggleButton from '../components/ToggleButton';


const headerHeight = 230;
const headerFinalHeight = 70;
const imageSize = (headerHeight / 3) * 1.5;



export default function HomeScreen({navigation}) {
    const dispatch = useDispatch();
    const { isDarkmode, setTheme } = useTheme();
    const { posts,isLoading,isFetching, post, error} = useSelector(state => state.post);
    const { user,theme, users} = useSelector(state => state.auth);
    const [alertLogout, setAlertLogout] = React.useState(false)
    console.log(theme)
    React.useEffect(() => {
      setTheme(theme)
      dispatch(getPosts(users));
      dispatch(setPost({
        id: '',
        title: '',
        description: '',
        createdAt: myFunction.getDateTime(),
        photo: noImage

      }))
  
    },[])

    
      

   

    var noImage = 'https://dq36fmjfe2dny.cloudfront.net/ec8e65e3-b3bc-463a-812c-bb69d813cc38/images/no-preview.png';
    const initialForm = {
        title: '',
        description: '',
        image: noImage,
        createdAt: myFunction.getDateTime(),
        userId: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
    }

    const initialUpdate = {
        id: post.id,
        title: post.title,
        description: post.description,
        image: post.image,
        createdAt: myFunction.getDateTime()
    }


    const [form, setForm] = useState(initialForm)
    const [alertMessage, setAlertMessage] = React.useState('');
    const [formUpdate, setFormUpdate] = useState(initialUpdate);
    const [visible, setVisible] = useState(false);
    const [modify, setModify] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalValidation, setModalValidation] = useState(false);

    const closeBottomSheet = () => {
        setVisible(false)
        setForm({...form, image: noImage})
      }

    const handleRemove = (post) => {
 
       
        dispatch(setPost(post))
        setAlertMessage('Do you want delete ' + post.title )
        setModalDelete(true)
     
      }

    const openModalUpdate = (post) => {
        dispatch(setPost(post))
        setModify(true)
        setVisible(true)
        
      }

    
    const handleUpdate = (formUpdate) => {
        if (formUpdate.title == '') {
          setAlertMessage('Please Fill Title')
          setModalValidation(true)
        } else if (formUpdate.description == '') {
            setAlertMessage('Please Fill Description')
            setModalValidation(true)
        } else {
         
          setVisible(false)
          dispatch(updatePost(formUpdate))
        }
      }

    
    const openModalAdd = () => {
       setForm(initialForm)
        setModify(false)
        setVisible(true)  
      }

  
    const handleInsert = (form) => {
        if (form.title == '') {
            setAlertMessage('Please Fill Title')
            setModalValidation(true)
        } else if (form.description == '') {
            setAlertMessage('Please Fill Description')
            setModalValidation(true)
        } else {
        
            dispatch(createPost(form));
            setVisible(false);
            setTimeout(() => { setVisible(false)},1000);
            
        }
      }

      useEffect(() => {
        setFormUpdate(initialUpdate);
      
      },[post])


    const scrollY = useRef(new Animated.Value(0)).current;
    const [textWidth, setTextWidth] = useState(0);
    const offset = headerHeight - headerFinalHeight ;
    const translateHeader = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -offset],
        extrapolate: 'clamp',
    });

    const translateIconY = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -(headerFinalHeight - headerHeight)],
        extrapolate: 'clamp',
    });
    const translateImageY = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -(headerFinalHeight - headerHeight) / 2],
        extrapolate: 'clamp',
    });
    const translatePanelY = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -(headerFinalHeight - headerHeight) / 4],
        extrapolate: 'clamp',
    });
    const translateImageX = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [
            0,
            -(width / 2) + (imageSize * headerFinalHeight) / headerHeight,
        ],
        extrapolate: 'clamp',
    });
    const scaleImage = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [1, (headerFinalHeight + 20) / headerHeight],
        extrapolate: 'clamp',
    });
    const translateNameX = scrollY.interpolate({
        inputRange: [0, offset / 2, offset],
        outputRange: [0, 10, -width / 2 + textWidth / 2.8 + headerFinalHeight],
        extrapolate: 'clamp',
    });
    const scaleName = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [1, 0.8],
        extrapolate: 'clamp',
    });
    const opacityPanel = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    const renderItem = ({ item,index }) => {
        if (index == 0)
            return (
                <Animated.View
                    style={[styles.header, { backgroundColor: isDarkmode? 'rgb(24,24,26)' : themeColor.white100  ,transform: [{ translateY: translateHeader }] }]}>
                     <Animated.View
                        style={[
                            styles.iconPanel,
                            {
                                transform: [
                                    { translateY: translateIconY },
                                 
                                ],
                            },
                        ]}>

                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                <TouchableOpacity onPress={() => openModalAdd(true)}>
                                    <IconAction name="plus-box-multiple"/>

                                </TouchableOpacity>
                     
                                <TouchableOpacity onPress={() => setAlertLogout(true)}>
                                    <IconAction name="logout-variant"/>

                                </TouchableOpacity>      
                        </View>
                         
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.image,
                            {
                                transform: [
                                    { translateY: translateImageY },
                                    { translateX: translateImageX },
                                    { scale: scaleImage },
                                ],
                            },
                        ]}>
                        <Image
                            source={{
                                uri: user.avatar,
                            }}
                            style={styles.img}
                            resizeMode="cover"
                        />
                    </Animated.View>
                    <Animated.Text
                        onTextLayout={e => setTextWidth(e.nativeEvent.lines[0].width)}
                        style={[
                            styles.name,
                            { transform: [{ translateX: translateNameX }, { scale: scaleName }], color: isDarkmode? '#fff' : '#2c2f30' },
                        ]}>
                        {user.name}
                    </Animated.Text>
                    <Animated.View
                        style={[
                            styles.themePanel,
                            { opacity: opacityPanel,
                                transform: [
                                    { translateY: translatePanelY },
                                   

                           
                                ],
                            },
                        ]}>
                            {isLoading?<ActionLoader/> : <ToggleButton/>}
                            
                    </Animated.View>
                </Animated.View>
            );
        return <View style={styles.item} >
                 
                <View style={[styles.subItem,{backgroundColor:  isDarkmode? '#000' : '#fff', }]}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View style={{flexDirection: 'row'}}>
                            <Avatar
                                        source={{uri:item.avatar}}
                                        size="sm"
                                        shape="round"        
                            />
                            <View style={{flexDirection: 'column', marginHorizontal: 6, bottom: 3}}>
                                <Text size="md" fontWeight="bold" >{item.name}</Text>
                                <Text size="sm" fontWeight="light">{item.email}</Text>

                            </View>
                        </View>

               

                  </View>
                  <Text size="lg" fontWeight='regular' style={{marginTop: 3}} onPress={() => Alert.alert("press")}>{item.title}</Text>
                  <Text size="sm" fontWeight='light' >{item.description.substring(0,40) + '...'}</Text>
                  <Text size="sm" fontWeight='light'  style={{marginTop: 3, alignSelf: 'flex-end',fontStyle: 'italic'}} >{item.createdAt}</Text>
                        
                  {item.userId === user.id?
                        <View style={{flexDirection: 'row',alignSelf: 'flex-end',zIndex: 999, bottom: 50}}>
                                <PressableIcon onPress={() => openModalUpdate(item)} >
                                    
                                    <IconAction name="square-edit-outline" onPress={() => openModalUpdate(item)} />

                                </PressableIcon>
                                <PressableIcon onPress={() => handleRemove(item)}>
                                    <IconAction name="delete-sweep" />
                                </PressableIcon>
                        </View> : <View/> }
            

                </View>
      
                <ImageBackground
                  source={{uri: item.image }}
                  style={styles.cardImage}
                  resizeMode='cover'
                  imageStyle={{borderRadius: 12}}
                >




                </ImageBackground>
          

               </View>;
    };
    return (
        <View style={{backgroundColor: isDarkmode? 'rgb(24,24,26)' : themeColor.white100 }}>
                <CustomAlert 
                    modalVisible={alertLogout} 
                    setModalVisible={setAlertLogout}
                    title={'Log Out Confirmation'}
                    message={'Are you sure want to Log out?'}   
        
                    buttons={[{
                    text: 'No',
            
                    },{
                    text: 'Yes',
                    func: () => {dispatch(logout())},
            
                    }]}
                />
                 <CustomAlert 
                    modalVisible={modalDelete} 
                    setModalVisible={setModalDelete}
                    title={'Delete Confirmation'}
                    message={alertMessage} 
        
                    buttons={[{
                    text: 'No',
            
                    },{
                    text: 'Yes',
                    func: () => {dispatch(removePost(post))},
            
                    }]}
                />

                <CustomAlert 
                    modalVisible={modalValidation} 
                    setModalVisible={setModalValidation}
                    title={'Warning'}
                    message={alertMessage} 
        
                    buttons={[{
                    text: 'Got It',
                
                    }]}
                />
        

                {isFetching?<Loader/> :
            <FlatList
                data={posts.sort(myFunction.descSort('createdAt'))}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                stickyHeaderIndices={[0]}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: false,
                })}
            />}
             <BottomSheet
                  visible={visible}
                  onBackButtonPress={closeBottomSheet}
                  onBackdropPress={closeBottomSheet}
                  >
          
                  <View style={[styles.bottomNavigationView, {backgroundColor: isDarkmode? themeColor.black200 : themeColor.white}]}>
                    <Text size="md" style={{marginBottom: 6}}>Select Image</Text>
                    {isLoading? <ActionLoader/> :  <View/>}
                    <Image source={{uri: modify?formUpdate.image : form.image!==''?form.image :  noImage }} style={{width: 200,height: 160, borderRadius: 8,marginBottom: 6}}/>
                   
                        
                    <Text style={{ marginVertical: 6 ,alignSelf: 'flex-start'}} size="md">Image</Text>
                    <ScrollView horizontal>
                    {mock.gallery.map((item,index) => 
                      <TouchableOpacity key={index} style={{paddingHorizontal: 6}} 
                      onPress={() => modify?setFormUpdate({ ...formUpdate, image: item.url }) : setForm({ ...form, image: item.url })}
                
                      >
                                <Avatar
                                  source={{uri:item.url}}
                                  size="md"
                                  shape="round"
                                
                            />
                      </TouchableOpacity>
                    )}
                  </ScrollView>
                                 
                    <Text style={{ marginVertical: 6 ,alignSelf: 'flex-start'}} size="md">Title</Text>
                          <InputText
                            placeholder="Type Title"
                            onChangeText={modify? (text) => setFormUpdate({ ...formUpdate, title: text }) : (text) => setForm({ ...form, title: text })} 
                            value={modify ? formUpdate.title : form.title}
                            rightContent={
                                <IconInput name={"format-title"} />
                            }
                     />
                    <Text style={{ marginVertical: 6 ,alignSelf: 'flex-start'}} size="md">Description</Text>
                          <InputText
                            placeholder="Type Description"
                            onChangeText={modify? (text) => setFormUpdate({ ...formUpdate, description: text }) : (text) => setForm({ ...form, description: text })} 
                            value={modify ? formUpdate.description : form.description}
                            rightContent={
                                <IconInput name={"card-text"} />
                            }
                     />


                     {modify?

                        <SubmitButton 
                          text="Update"
                          width={width * 1 - 48}
                          onPress={() => handleUpdate(formUpdate)}
                        />    
                        :
                        <SubmitButton 
                        text="Post"
                        width={width * 1 - 48}
                        onPress={() => handleInsert(form)}
                      />    
                      }

                  </View>
              </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        borderRadius: 12,
        height: 220,
        marginVertical: 12,
        width: width * .9,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x:2,y:-2},
        // elevation: 5,

        marginBottom: 60,
        // flex: 1
    },
    subItem: {
        position: 'absolute', 
        top: 180,
        padding: 6,
        borderRadius: 6,
        width: width * .8,
        height: 100, 
        marginLeft: 12,
        elevation:3,
        opacity: .8,
        shadowColor: '#000',
        alignSelf: 'center'
    },
    header: {
        height: headerHeight,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: imageSize,
        width: imageSize,
        borderRadius: headerHeight,
        backgroundColor: '#fff',
        overflow: 'hidden',
        top: 18
    },
    themePanel: {
        top: 30
    },
    iconPanel: {
        alignSelf: 'flex-end',
        overflow: 'hidden',
        paddingHorizontal: 12,top: 6
    },
    img: {
        height: '100%',
        width: '100%',
    },
    name: {
        fontSize: 24,
        position: 'absolute',
        bottom: 12,
        height: headerFinalHeight,
        textAlignVertical: 'center',
        letterSpacing: 2,
    },
    cardImage: {
    //   flex: 3,
      width: width * .9 - 6,
      height: '100%',
      alignSelf: 'center',
    
    },
    bottomNavigationView: {
        padding: 24,
        borderWidth: 1,
        width: '100%',
        height: height * 0.8,
        alignItems: 'center',
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
     
      },
});