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
  SafeAreaView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useSelector, useDispatch } from "react-redux";
import Header from '../../components/Header';
import ChatList from './chatList';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as chatActions from "../../store/actions/chat";
import Loader from '../../components/Loader';
import hamburger from '../../assets/images/hamburger.png';

const ChatScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const dispatch2 = useDispatch();

  let reloadChatMessages = useSelector(
    (state) => state.chat.reloadChatMessages,
  );
  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(true);
  const flatListRef = useRef();
  const reload = () => {
    dispatch2(chatActions.getAllChats());
  }
  useFocusEffect(
    React.useCallback(() => {
      dispatch2(chatActions.getAllChats());
    }, [])
  );
  // useEffect(() => {

  //   dispatch2(chatActions.getAllChats());

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 50);
  // }, []);
  useEffect(() => {
    dispatch2(chatActions.getAllChats());

  }, [reloadChatMessages]);
  let previousChats = useSelector((state) => state.chat.previousChats);
  console.log("Flatlist chat List is " + previousChats);
  // console.log("chat List length is "+previousChats.length)

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#B60612" />

      <View
        style={{
          backgroundColor: '#B60612',
          height: Platform.OS === 'ios' ? 100 : 55,
          width: windowWidth,
        }}>
        <SafeAreaView></SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
           onPress={() => navigation.navigate('Home')}
            style={{ flexDirection: 'row' }}>
            <FontAwesomeIcon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{ paddingLeft: 16 }}
            />
            <Text
              style={styles.headerStyle}>
              GIFT CHATS
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
        <View style={{ margin: 10 }}>

          {(previousChats && previousChats != null&& previousChats != '') ? <FlatList
            style={styles.list}
            data={previousChats}
            //  extraData={sending}
            keyExtractor={(item) => {
              return 'key' + item.id;
            }}
            renderItem={({ item }) => (
              <ChatList item={item} reloadChatMessages={reloadChatMessages} reloading={() => reload()} />
            )}
            ListFooterComponent={() => <View style={{ padding: 20 }}></View>}
            ref={flatListRef}
          // onContentSizeChange={() => flatListRef?.current?.scrollToEnd()}
          /> : <Text style={[styles.modalText,{marginVertical:50}]}>No chats available</Text>}

        </View>

      </KeyboardAvoidingView>
    </View>
  );

};
export default ChatScreen;

