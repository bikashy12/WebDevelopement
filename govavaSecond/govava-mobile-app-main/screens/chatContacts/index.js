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
  CommonActions,
  ActivityIndicator,
  Modal,
  BackHandler
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Header from '../../components/Header';
import Contacts from '../../components/chat_contacts';
import Loader from '../../components/Loader';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as productActions from '../../store/actions/products';
import * as chatActions from '../../store/actions/chat';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const ChatContacts = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { product } = route.params.params;
  const { chatId } = route.params.params;
  console.log('route.params.params');

  console.log(route.params.params);
  const { previousmobilenumber } = route.params.params;
  const [selectedmobilenumber, setselectedmobilenumber] = React.useState([]);
  const [selectedmobileids, setselectedmobileids] = React.useState([]);

  const [selectedcontacts, setselectedcontacts] = React.useState([]);
  const [arraylength, setarraylength] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setselectedmobilenumber([]);
      setselectedcontacts([]);
      setarraylength(0);
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      };
    }, [])
  );
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {

  }, []);
  const storeMobileNumbers = (ischecked, input_index, item) => {
    let phones = selectedcontacts;
    if (selectedcontacts.some(contact => contact.mobile1 == item.mobile1)) {
      // alert("Object found inside the array.");
      phones = phones.filter(function (obj) {
        return obj.mobile1 !== item.mobile1;
      });
      let m_numbers = phones.map(num =>{
        if(num.mobile1!=null && num.mobile1.length>=10 ){
        //  console.log('num.mobile1.length',num.mobile1.length);
          return(num.mobile1.slice(num.mobile1.length - 10))
        }else{
         // console.log('num.mobile1.length',num.mobile1.length)
         return(num.mobile1!=null&& num.mobile1!=''?num.mobile1:0)
        }
      });
      setselectedcontacts(phones);
      setselectedmobilenumber(m_numbers);
      console.log('phones', phones, m_numbers)
    } else {
      //  alert("Object not found.");
      phones.push(item);
      let m_numbers = phones.map(num =>{
        if(num.mobile1!=null && num.mobile1.length>=10 ){
          console.log('num.mobile1.length',num.mobile1.length);
          return(num.mobile1.slice(num.mobile1.length - 10))
        }else{
          console.log('num.mobile1.length',num.mobile1.length)
         return(num.mobile1!=null&& num.mobile1!=''?num.mobile1:0)
        }
      });

      setselectedcontacts(phones);
      setselectedmobilenumber(m_numbers);

      console.log('phones', phones, m_numbers)
    }
    // if (!ischecked == true) {
    //   if (selectedmobilenumber.includes(input_index) == false) {
    //     selectedmobilenumber.push(input_index);
    //   }
    //   if(selectedcontacts.length==0){
    //     selectedcontacts.push(item);
    //   }else{
    //     selectedcontacts.forEach(element => {
    //       if(element.mobile1!=input_index){
    //         selectedcontacts.push(item);
    //       }
    //     });
    //   }

    // } else {
    //   if (selectedmobilenumber.includes(input_index) == true) {
    //     var index = selectedmobilenumber.indexOf(input_index);

    //       if (index > -1) {
    //       selectedmobilenumber.splice(index, 1);
    //     }
    //   }
    //   let index1=0;
    //   selectedcontacts.forEach(element => {
    //     if(element.mobile1==input_index){
    //       selectedcontacts.splice(index1, 1);
    //     }
    //     index1++;
    //   });

    // }
    setarraylength(selectedcontacts.length);
  };
  const createChat = async () => {
    if(selectedcontacts.length<=0){
      return '';
    }
    try {
      setLoading(true);
      const { product } = route.params.params;
      var title = product.productname;
      let chatResult;
      chatResult = chatActions.createChat(product, title, selectedcontacts);
      const result = await dispatch(chatResult);
      const resultData = JSON.parse(result);
      if (resultData.state == true) {
        dispatch(chatActions.setReloadChatMessages());
        setLoading(false);
        setselectedmobilenumber([]);
        setselectedcontacts([]);
        setarraylength(0);
        navigation.navigate('Chats', {
          screen: 'ChatScreen', params: {
            chatId: resultData.chats.id,
            product: product,
            chatTitle: resultData.chatmessage.name,
            chat_user: resultData.chatUser
          }
        });
      } else {
        setLoading(false);
        // alert(resultData.message)
      }
    } catch (err) {
      setLoading(false);
      // alert(err);
    }
  };
  const addUserToChat = async () => {
    if(selectedcontacts.length<=0){
      return '';
    }
    try {
      setLoading(true);
      let chatResult;
      chatResult = chatActions.addUserToChat(chatId, selectedcontacts);

      const result = await dispatch(chatResult);
      const resultData = JSON.parse(result);

      if (resultData.state == true) {
        dispatch(chatActions.setReloadChatMessages());
        selectedmobilenumber.forEach(element => {
          if (previousmobilenumber.includes(element) == false) {
            previousmobilenumber.push(element);
          }

        });
        setLoading(false);
        setselectedmobilenumber([]);
        setselectedcontacts([]);
        setarraylength(0);
        // console.log("****************",resultData.chatUsers);
        navigation.navigate('Chats', {
          screen: 'ChatScreen', params: {
            chatId: chatId,
            product: product,
            chatTitle: 'Group chat',
            chat_user: resultData.chatUsers
          }
        });
        setModalVisible(true);
      } else {
        setLoading(false);
        // alert(resultData.message)
      }
    } catch (err) {
      setLoading(false);
      // alert(err);
    }
  };
  const goback = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Home' }],
      }),
    )

  }

  return (
    <View style={{ flex: 1, height: '100%', flexDirection: 'column', width: '100%', }}>
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Contacts successfully added.</Text>

            <TouchableOpacity
              disabled={loading}
              onPress={() => {
                setModalVisible(false);
                chatId == null && navigation.goBack();
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
          }}>
          <TouchableOpacity
            disabled={loading}
            onPress={() => { dispatch(chatActions.setReloadChatMessages()); navigation.goBack() }}
            style={{ flexDirection: 'row' }}>
            <FontAwesomeIcon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{ paddingLeft: 16 }}
            />
            <Text
              style={{
                color: '#ffffff',
                fontStyle: 'normal',
                fontFamily: 'Roboto-Medium',
                fontSize: 18,
                lineHeight: 20,
                paddingLeft: 20,
              }}>
              CONTACTS
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>


        {arraylength > 0 ?

          <View style={{ maxHeight: '30%', marginTop: 20 }}>
            <ScrollView>
              {selectedcontacts.map((number, i) =>
                <View key={'number' + i} style={styles.mobileText}>
                  <Text style={{ color: '#ffffff' }}>{number.contact_name} :  {number.mobile1}</Text>
                  <TouchableOpacity 
                  disabled={loading}
                  onPress={() => storeMobileNumbers(true, number.mobile1, number)}>
                    <Icon name="close-circle-outline" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              )}
              <View>

              </View>
            </ScrollView>
            <TouchableOpacity
              disabled={loading}
              style={styles.giftChatText} onPress={() => chatId == null ? createChat() : addUserToChat()}
            >
              {loading ?
                <ActivityIndicator size="small" color="white" style={{ alignSelf: 'center',padding:10 }} /> :
                <Text style={styles.colorWhite}>
                  {chatId == null ? 'START GIFT CHAT' : 'ADD NEW CONTACTS TO CHAT'}</Text>}
            </TouchableOpacity>
          </View>
          : <Text
            style={styles.selectContactText}>
            Select contacts
          </Text>
        }
        <View style={{ height: setselectedcontacts.length != 0 ? height * (1 - (setselectedcontacts.length / 10)) - 100 : heigth - 100, marginTop: 20 }}>
          <Contacts
            selectedmobilenumber={selectedmobilenumber}
            previousmobilenumber={previousmobilenumber}
            storeMobileNumbers={(ischecked, input_index, item) =>
              storeMobileNumbers(ischecked, input_index, item)
            }
          /></View>
      </KeyboardAvoidingView>
    </View>
  );

};
export default ChatContacts;

