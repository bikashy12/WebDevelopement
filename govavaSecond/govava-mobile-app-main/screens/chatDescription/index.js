import React, { Component, useState,useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Dimensions,
  KeyboardAvoidingView, 
  StatusBar,
  SafeAreaView,
  Platform,
  Modal
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { useSelector, useDispatch } from "react-redux";
import Header from '../../components/Header';
import styles from './styles';
// import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Pusher from "pusher-js/react-native";
import * as chatActions from "../../store/actions/chat";
import Icon from 'react-native-vector-icons/AntDesign';

const ChatDescriptionScreen = ({route, navigation}) => {
  const {chatId} = route.params.params;
  const {product} = route.params.params;
  const {previousmobilenumber} = route.params.params;
  const {previouschatUsers} = route.params.params;
  const userId = useSelector((state) => state.auth.userId);
  
  // alert(userId)
  const [modalVisible,setModalVisible] = React.useState(false); 
  const [modalVisibledelete, setModalVisibledelete] = React.useState(false);
  const [chat_user_id,setchat_user_id] = React.useState(null);
  // alert(userId);
  // console.log("chat ID is "+chatId);
  // console.log(product);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();
 
  const [msg, setMsg] = useState('');
  //To select contacts
  const [contactsShow, setContactsShow] = useState(false);
  const [sending, setSending] = useState(true);
  const flatListRef = useRef();
  const deleteUser = async () => {
    // alert("delete")
    // return;
    // let chat_user_id = id;
    try {
      chatUserList = chatActions.deleteUser(chatId,chat_user_id);
      

      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(chatUserList);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      if (resultData.state) {
        dispatch(chatActions.setReloadChatMessages());
        setModalVisible(true);
          // navigation.goBack();
      } else {
       
      }
      // console.log(resultData.state);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <View style={{ flex: 1 }}>
  
        <Modal
      transparent={true}
      animationType={'fade'}
      visible={modalVisible}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Contact successfully deleted.</Text>
        
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              // setload(false);
              navigation.goBack();
              //   props.onChange();
            }}
            style={{
              ...styles.openButton,
              backgroundColor: '#cb9b27',
            }}>
            <Text style={styles.textStyle}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <Modal
                transparent={true}
                animationType={'fade'}
                visible={modalVisibledelete}
                onRequestClose={() => {
                  console.log('close modal');
                }}>
                <View style={{flex: 1, backgroundColor: '#000000ad'}}>
                  <View
                    style={{
                      top: 250,
                      margin: 30,
                      backgroundColor: '#ffffff',
                      borderRadius: 10,
                      padding: 20,
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}>
                    <Text style={styles.modalText}>
                      Are you sure? Do you want to delete the contact?
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingHorizontal: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisibledelete(false);
                        }}
                        style={{
                          backgroundColor: '#cb9b27',
                          padding: 10,
                          elevation: 2,
                          width: '45%',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisibledelete(false);
                          // props.loadPetdetails(item.petwizardDetails);
                          deleteUser();
                        }}
                        style={{
                          backgroundColor: '#cb9b27',
                          padding: 10,
                          elevation: 2,
                          width: '45%',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

       <StatusBar backgroundColor="#B60612" />

<View
  style={{
    backgroundColor: '#B60612',
    height: Platform.OS === 'ios' ? 100 : 55,
    width: width,
  }}>
  <SafeAreaView></SafeAreaView>
  <View
    style={{
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'flex-start',
      width:'100%',
    }}>
    <TouchableOpacity
      onPress={() =>{dispatch(chatActions.setReloadChatMessages()); navigation.goBack()}}
      style={{flexDirection: 'row'}}>
      <FontAwesomeIcon
        name="chevron-left"
        size={17.49}
        color="#E4E9EA"
        style={{paddingLeft: 16}}
      />
     <Text
        style={{
          color: '#ffffff',
          fontStyle: 'normal',
          fontFamily: 'Roboto-Medium',
          fontSize: 18,
          lineHeight: 20,
          paddingLeft: 20,
          // padding: 20,
          // paddingBottom: 10,
          // right: 16,
        }}>
        CHAT DESCRIPTION
      </Text>
    </TouchableOpacity>
    
  
  </View>
</View>
<ScrollView showsVerticalScrollIndicator={true}>
  
 
    <Image source={{uri:product.imageurl}} style={{width:width,height:width,alignSelf:'center'}} />
  
  <View style={{backgroundColor:'#B60612',padding:10}}>
      <Text
          style={{
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            marginTop: 20,
            marginBottom: 20,
            width:'100%',
            textAlign:'justify',
            color:'#ffffff',
            
          }}>
         {product.productname}
          {/* {JSON.stringify(product)} */}
        </Text>
  </View>
    <View style={{flexDirection:'row',justifyContent:'space-between', padding:15,}}>
    <Text
          style={{
            textAlign: 'left',
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            marginTop: 5
            // marginBottom: 10,

          }}>
         MEMBERS
        </Text>
       <TouchableOpacity style={{flexDirection:'row', marginLeft:10,backgroundColor:'#B60612',
       width:130,
                        justifyContent:'space-between',
                        marginRight:0,
                      
                        marginBottom:5,
                            padding:5,borderRadius:5,alignSelf:'center'}}
                            onPress={() => {
                              // alert(JSON.stringify(previousmobilenumber));
                              navigation.navigate('ChatContacts',{
                              params: {
                                product: product,
                                chatId: chatId,
                                previousmobilenumber:previousmobilenumber
                              },                                      
                              });
                            }
                            }
                            >
       <Text
          style={{
            textAlign: 'left',
            fontFamily: 'Roboto-Medium',
            fontSize: 14,
            paddingLeft:5,
            color:'#FFFFFF'
            // marginTop: 10,
            // marginBottom: 10,

          }}>
         ADD NEW
        </Text>
       <FontAwesomeIcon
              name="user-plus"
              size={17}
              color="#ffffff"
              style={{paddingRight:5}}
            />
       </TouchableOpacity>
    </View>
   {previouschatUsers.map((Users, index) => {
         console.log(JSON.stringify(Users));
         if(Users.customer_id==null){
              return (
                        <View key={'user'+index} style={{flexDirection:'row', marginLeft:10,backgroundColor:'#B60612',
                        justifyContent:'space-between',
                        marginRight:10,
                        marginTop:5,
                        marginBottom:5,
                            padding:10,borderRadius:5}}>
                          <Text style={{color:'#ffffff'}}>{Users.name!=null && Users.name+'   - '}  {Users.mobile} </Text>
                          <TouchableOpacity onPress={()=>{setchat_user_id(Users.id);setModalVisibledelete(true)}}>
                             <Icon name="delete" size={20} color="#ffffff" />
                          </TouchableOpacity>
                         
                        </View>
                      );
              }else{
                if(Users.customer_id!=userId){
                return (
                  <View key={'user'+index} style={{flexDirection:'row', marginLeft:10,backgroundColor:'#B60612',
                  justifyContent:'space-between',
                  marginRight:10,
                  marginTop:5,
                  marginBottom:5,
                      padding:10,borderRadius:5}}>
                    <Text style={{color:'#ffffff'}}>{Users.chat_user!=null && Users.chat_user['name']+'   - '}  {Users.mobile} </Text>
                    <TouchableOpacity onPress={()=>{setchat_user_id(Users.id);setModalVisibledelete(true)}}>
                       <Icon name="delete" size={20} color="#ffffff" />
                    </TouchableOpacity>
                   
                  </View>
                );
                }else{
                  return null;
                }
              }
                })}
         
      </ScrollView>
    
    </View>
  );

};
export default ChatDescriptionScreen;

