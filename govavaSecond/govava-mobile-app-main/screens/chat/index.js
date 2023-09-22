import React, { Component, useState, useRef, useEffect } from 'react';
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
  BackHandler,
  Modal
} from 'react-native';
import moment from 'moment';
import * as loadingActions from '../../store/actions/loader';
import {useFocusEffect} from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
import { useSelector, useDispatch } from "react-redux";
import Header from '../../components/Header';
import ChatMessage from './chatMessage';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import Pusher from "pusher-js/react-native";
import * as chatActions from "../../store/actions/chat";
import Loader from '../../components/Loader';
import FastImage from 'react-native-fast-image';

const ChatScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const { chatId } = route.params;
  const { product } = route.params;
  const { chatTitle } = route.params;
  const { chat_user } = route.params;

  const userId = useSelector((state) => state.auth.userId);
  let reloadChatMessages = useSelector(
    (state) => state.chat.reloadChatMessages,
  );
  const userData = useSelector((state) => state.auth);
  // alert(reloadChatMessages);

  console.log("reload msg" + reloadChatMessages);
  const [previousmobilenumber, setpreviousmobilenumber] = React.useState([]);
  const [previouschatUsers, setpreviouschatUsers] = React.useState([]);
  const [chat_user_array, setchat_user_array] = React.useState(null);
  const [chat_user_length, setchat_user_length] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState(false);

  // alert(userId);
  // console.log("chat ID is "+chatId);
  // console.log(product);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();

  const [msg, setMsg] = useState('');
  const flatListRef = useRef();
  React.useEffect(() => {
    const backAction = () => {
      dispatch(chatActions.setReloadChatMessages()); 
      navigation.navigate('Chats', { screen: 'Chat' })
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const deleteMessage = async (msgId) => {
    try {
      let chat_message_ids = [];
      chat_message_ids.push(msgId);
      let chat_id = chatId;
      chatUserList = chatActions.deleteChatMessages(chat_id, chat_message_ids);


      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(chatUserList);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      if (resultData.state) {

        setModalVisible(true);
        // navigation.goBack();
      } else {

      }
      // console.log(resultData.state);
    } catch (err) {
      console.log(err);
    }
  }
  const reloading = () => {
    dispatch(chatActions.resetOrderMessages());
    dispatch2(chatActions.getChatMessages(chatId));
  }
  let subscribedChannels = useSelector(
    (state) => state.chat.subscribedChannels
  );
  useEffect(() => {

    let pusher;
    pusher = new Pusher("441155bbdae95b9462fa", {
      cluster: "ap2",
    });

    const currentChannelName = "channel-chat" + chatId;
    const channelFound = subscribedChannels.find(
      (channelName) => channelName === currentChannelName
    );
    // console.log("Channel Found", channelFound);

    let channel = null;
    channel = pusher.channel(currentChannelName);

    if (undefined === channelFound) {
      dispatch(chatActions.setCurrentSubscriptionChannel(currentChannelName));
      // console.log("Channel in SUBSCRIBED list", currentChannelName);

      if (channel === undefined) {
        channel = pusher.subscribe(currentChannelName);
        console.log("Channel SUBSCRIBED", currentChannelName);
        if (channel != undefined) {
          channel.bind("chat-event", (data) => {
            //   console.log("Pusher xxxxxxxxxxxxxxxxxxxxxxxxxxxx", data);
            //   console.log(data);
            if (
              data.chatmessage.customer_id !== userId
            ) {
              dispatch(chatActions.updateChatMessage(data.chatmessage));
            }
          });
        }
      }
    } else {
      console.log("Channel already there", currentChannelName);
    }
    return function cleanup() {

      subscribedChannels.map((channelName) => {
        pusher.unsubscribe(channelName);
      });
      pusher.unbind_all();
      pusher.disconnect();
      dispatch(chatActions.resetAllSubscriptions());

    };
  }, [chatId]);

  useFocusEffect(
    React.useCallback(() => {

      dispatch(chatActions.resetOrderMessages());
      dispatch2(chatActions.getChatMessages(chatId));  
 
     },[chatId]));
  useEffect(() => {
    //alert(5);
    let users = '';
    setchat_user_length(chat_user.length);
    chat_user.forEach(element => {
      if ((element.customer_id != userData.userId) || element.customer_id == null) {
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log(JSON.stringify(element))
        if (element.name != null) {
          if (users == '') {
            users = element.name;
            console.log(1);
          } else {
            users = users + ', ' + element.name;
            console.log(2)
          }

        } else {
          if (users == '') {
            users = element.mobile;
            console.log(3);
          } else {
            users = users + ', ' + element.mobile;
            console.log(4)
          }

        }
        if (chat_user) {
         
          setchat_user_array(users);
        }

      }
    });


  }, [chatId]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 50);
   // alert(1);
  }, [chatId]);
  useEffect(() => {
  //  alert(2);
    const getChatUserList = async () => {
      // setpreviousmobilenumber([]);
      // previousmobilenumber = [];
      console.log("Hi");
      let users = '';
      try {
        chatUserList = chatActions.getChatUserList(chatId);


        // console.log('=====================');
        // console.log(otpaction);
        const result = await dispatch(chatUserList);
        const resultData = JSON.parse(result);
        console.log('-----------');
        console.log(resultData.chatUsers);
        if (resultData.state) {
          console.log("hiiiiii")
          let chatUsers = resultData.chatUsers;
          console.log("chatUsers " + JSON.stringify(chatUsers))
          setpreviouschatUsers(chatUsers);
          let numbers = [];
          setchat_user_length(chatUsers.length);
          chatUsers.forEach(element => {
            numbers.push(element.mobile);
            if (element.name != null) {
              if (users == '') {
                users = element.name;
                console.log(1);
              } else {
                users = users + ', ' + element.name;
                console.log(2)
              }
            } else {
              if (users == '') {
                users = element.mobile;
                console.log(3);
              } else {
                users = users + ', ' + element.mobile;
                console.log(4)
              }
            }
            // alert(previousmobilenumber)
            // if(!previousmobilenumber.includes(element.mobile)){
            // alert(element.mobile);
            // previousmobilenumber.push(element.mobile);
            // }
          });
          if (chatUsers) {
         
            setchat_user_array(users);
          }
          setpreviousmobilenumber(numbers);
          console.log("previous nos are = " + previousmobilenumber);
        } else {

        }
        // console.log(resultData.state);
      } catch (err) {
        console.log(err);
      }
    };
    if (chatId != null) {
      getChatUserList();

    }
  }, [chatId, reloadChatMessages]);
  const _scrolltoend = async () => {
    flatListRef.current && flatListRef.current.scrollToEnd();
  };
  const send = () => {
    // alert( moment(new Date()).format('HH:mm:ss'));
    // return;
    if (msg != null && msg.length > 0) {
      console.log("current time zone" + new Date());
      console.log("CONVERTED" + moment(new Date()).format('DD/MM/YYYY HH:mm:ss'));
      let created_at = new Date();
      console.log("Message before sending is " + msg)
      let chatMessage = msg;
      let currentId = 'NEW' + moment(new Date()).format('HH:mm:ss');
      let arr = {
        id: currentId,
        chat_id: chatId,
        created_at: created_at,
        customer_id: userId,
        message: chatMessage,
        chat_user: null
      }
      dispatch(chatActions.updateChatMessage(arr));
      // dispatch({
      //   type: UPDATE_CHAT_MESSAGES,
      //   newMessages: {
      //     id : 'NEW'+chatMessage.length,
      //    chat_id : chatId,
      //    created_at : null,
      //    customer_id : userId,           
      //    message : chatMessage,
      //    chat_user: null
      //   },
      // });

      dispatch2(chatActions.sendMessages(chatId, chatMessage, currentId));
      _scrolltoend();
      setMsg(null);
    }
  }
  let chatMessages = useSelector((state) => state.chat.previouschatMessages);
  // console.log("chatMessage length is "+chatMessages.length)
  console.log("Flatlist chat message" + chatMessages);
  console.log(chatMessages);

  return (
    <View style={{ flex: 1 }}>
      <Modal
       animationType="slide"
       transparent={true}
       visible={confirmModal}
       onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
         setConfirmModal(!confirmModal);
       }}
      // isVisible={confirmModal}
       >
          <View style={{ flex: 1 }}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>You are going to create a new chat session, click on continue button and add contacts to chat</Text>
<View style={{width:'100%',justifyContent:'space-around',flexDirection:'row'}}>
<TouchableOpacity
             onPress={() => {
              setConfirmModal(false);
              console.log('false');
            }
          }
              
              style={{
                ...styles.openButton,
                backgroundColor: '#cb9b27',
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => {
              setConfirmModal(false);
              // alert(JSON.stringify(previousmobilenumber));
              navigation.navigate('ChatContacts', {
                params: {
                  product: product,
                  chatId: null,
                  previousmobilenumber: []
                },
              });
            }
          }
              
              style={{
                ...styles.openButton,
                backgroundColor: '#cb9b27',
              }}>
              <Text style={styles.textStyle}>Continue</Text>
            </TouchableOpacity></View>
          </View>
        </View>
        </Modal>
      <StatusBar backgroundColor="#B60612" />
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Message successfully deleted.</Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                reloading();
                // setload(false);
                //   navigation.goBack();
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
     
      <View
        style={{
          backgroundColor: '#B60612',
          height: Platform.OS === 'ios' ? 100 : 55,
          width: width,
          justifyContent: 'center'
        }}>
        <SafeAreaView></SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            // marginTop: 20,
            justifyContent: 'space-between',
            // alignSelf:'center'
          }}>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', height: Platform.OS === 'ios' ? 100 : 55,
            alignItems: 'center',
          }}>
            <TouchableOpacity
              onPress={() =>{dispatch(chatActions.setReloadChatMessages()); navigation.navigate('Chats', { screen: 'Chat' })}}
              style={{
                flexDirection: 'row', paddingLeft: 16, paddingRight: 10, paddingRight: 20,
                alignItems: 'center', justifyContent: 'center', height: Platform.OS === 'ios' ? 100 : 55,
              }}>
              <FontAwesomeIcon
                name="chevron-left"
                size={20}
                alignSelf="center"
                color="#E4E9EA"

              />

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // alert(JSON.stringify(previousmobilenumber));
                navigation.navigate('ChatDescription', {
                  params: {
                    product: product,
                    chatId: chatId,
                    previousmobilenumber: previousmobilenumber,
                    previouschatUsers: previouschatUsers
                  },
                });
              }
              }
              style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontStyle: 'normal',
                  fontFamily: 'Roboto-Medium',
                  fontSize: 16,
                  lineHeight: 20,
                  // paddingLeft: 20,
                  // padding: 20,
                  // paddingBottom: 10,
                  // right: 16,
                }}>
                {chatTitle}
              </Text>
              {chat_user_length > 2 &&
                <View style={{ flexDirection: 'row' }}>

                  <Text
                    style={{
                      color: '#ffffff',
                      fontStyle: 'normal',
                      fontFamily: 'Roboto-Medium',
                      fontSize: 13,
                      // lineHeight: 20,
                      // paddingLeft: 20,
                      // padding: 20,
                      // paddingBottom: 10,
                      // right: 16,
                    }}>
                    {/* {chat_user_array.length} */}
                    {chat_user_array.length && chat_user_array.length > 20 ? chat_user_array.substring(0, 20) + "..." : chat_user_array}

                  </Text>

                </View>

              }
            </TouchableOpacity>

          </View>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', height: Platform.OS === 'ios' ? 100 : 55,
            alignItems: 'center',
          }}>
            <TouchableOpacity
             onPress={() => {
              // alert(JSON.stringify(previousmobilenumber));
              navigation.navigate('ChatDescription', {
                params: {
                  product: product,
                  chatId: chatId,
                  previousmobilenumber: previousmobilenumber,
                  previouschatUsers: previouschatUsers
                },
              });
            }
          }
              style={{
                flexDirection: 'row', paddingLeft: 16, paddingRight: 10, paddingRight: 20,
                alignItems: 'center', justifyContent: 'center', height: Platform.OS === 'ios' ? 100 : 55,
              }}>
                 <Text
          style={{
            textAlign: 'left',
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            paddingRight:5,
            color:'#FFFFFF'
            // marginTop: 10,
            // marginBottom: 10,

          }}>
         ADD 
        </Text>
              <FontAwesomeIcon
                name="user-plus"
                size={20}
                color="#ffffff"
              // style={{ paddingRight: 5 }}
              />


            </TouchableOpacity>
           
            <TouchableOpacity 
             style={{
              flexDirection: 'row', 
              alignItems: 'center', 
            }}
            onPress={() => {
               setConfirmModal(true);
               console.log('confirmModal',confirmModal);
              }
              }>
                 <Text
          style={{
            textAlign: 'left',
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            paddingRight:5,
            color:'#FFFFFF'
            // marginTop: 10,
            // marginBottom: 10,

          }}>
         NEW 
        </Text>
              <FontistoIcon
                name="hipchat"
                size={20}
                color="#fff"
                style={{ alignSelf: 'flex-end', paddingRight: 15 }}

              />
              {/* <Image source={{ uri: product.imageurl }} style={{ height: 220, width: 220, backgroundColor: '#f8f8f8' }} /> */}
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
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
            style={{ flexDirection: 'row' }}>
            <FontAwesomeIcon
              name="user-plus"
              size={17.49}
              color="#E4E9EA"
              style={{ paddingRight: 16,alignSelf:'center' }}
            />
            </TouchableOpacity> */}
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : ''} style={styles.keyboard}>
        <View style={{ flex: 1 }}>
          {/* <Text>{JSON.stringify(previouschatUsers)}</Text> */}
          <FlatList
            style={{ flexGrow: 1 }}
            data={chatMessages}
            //   extraData={sending}
            keyExtractor={(item) => {
              return 'key' + item.id;
            }}
            renderItem={({ item }) => (
              <ChatMessage item={item} onDelete={(msgId) => deleteMessage(msgId)} />
            )}
            ref={flatListRef}
            onContentSizeChange={() => flatListRef?.current?.scrollToEnd()}
            ListHeaderComponent={() => <View style={{ alignItems: 'flex-end', marginTop: 10 }} >
              <Text style={styles.rightBlock}>
                {product.productname}
                {/* {JSON.parse(product).productname} */}
              </Text>

              {/* <Image source={{ uri: details.imageurl }}  /> */}
              <TouchableOpacity onPress={() => navigation.navigate('Chatproductdescription', {
              product: product,
              product_name: product.productname,
              product_id: product.productId,
              navscreen: 'ChatScreen',
              favoriteIndex: 0,
            })}>
                <FastImage
                  source={{ uri: product.imageurl }} style={{ height: 220, width: 220, backgroundColor: '#f8f8f8' }}

                  resizeMode={FastImage.resizeMode.contain}
                />


              </TouchableOpacity>

            </View>}
          />
        </View>
        <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value={msg}

          multiline={true}
          placeholderTextColor="#696969"
          onChangeText={msg => setMsg(msg)}
          blurOnSubmit={false}
          // onSubmitEditing={() => send()}
          placeholder="Type a message"
          returnKeyType="send" />
        <TouchableOpacity onPress={() => send()} style={styles.iconHolder}>
          <Icon name="send" size={22} color="white" />

        </TouchableOpacity>
      </View>
   
      </KeyboardAvoidingView>
   </View>
  );

};
export default ChatScreen;

