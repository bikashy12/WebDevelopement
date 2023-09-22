
import React, { Component } from 'react';
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
  KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    keyboard: {
      height:'90%',
      width:'100%',
     // justifyContent: 'center',
      flexDirection:'column',
    //  alignItems:'center'
    },
    image: {
      width,
      height,
    },
    header: {
      height: 65,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#075e54',
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    right: {
      flexDirection: 'row',
    },
    chatTitle: {
      color: '#fff',
      fontWeight: '600',
      margin: 10,
      fontSize: 15,
    },
    chatImage: {
      width: 30,
      height: 30,
      borderRadius: 15,
      margin: 5,
    },
    input: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      padding: 10,
      minHeight: 60,
      maxHeight:150,
      width: width,
      alignItems:'center',justifyContent:'space-between'
     // backgroundColor: '#fff',
      //marginVertical: 10,
      // shadowColor: '#3d3d3d',
      // shadowRadius: 2,
      // shadowOpacity: 0.5,
      // elevation:5,
      // shadowOffset: {
      //   height: 1,
      // },
     // borderColor:'#696969',
     // borderWidth:1,
    },
    textInput:{
      width:'80%',
      backgroundColor:'white',
      minHeight: 40,
      maxHeight:130,
      borderRadius:10
    },
    iconHolder:{
      margin:5,
      height:50,
      borderRadius:25,
      width:50,
      backgroundColor:'#B60612',
      alignItems:'center',
      justifyContent:'center'
    },
    eachMsg: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      margin: 5,
    },
    rightMsg: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      margin: 5,
      alignSelf: 'flex-end',
    },
    userPic: {
      height: 40,
      width: 40,
      margin: 5,
      borderRadius: 20,
      backgroundColor: '#f8f8f8',
    },
    chatPic: {
      height: 60,
      width: 60,
      margin: 5,
      // marginTop:-5,
      borderRadius: 30,
      backgroundColor: '#f8f8f8',
    },
    msgBlock: {
      width: 220,
      borderRadius: 5,
      backgroundColor: '#ffffff',
      padding: 10,
      shadowColor: '#3d3d3d',
      shadowRadius: 2,
      shadowOpacity: 0.5,
      shadowOffset: {
        height: 1,
      },
    },
    rightBlock: {
      width: 220,
      borderRadius: 5,
      backgroundColor: '#97c163',
      padding: 10,
      shadowColor: '#3d3d3d',
      shadowRadius: 2,
      shadowOpacity: 0.5,
      shadowOffset: {
        height: 1,
      },
    },
    msgTxt: {
      fontSize: 15,
      color: '#555',
      fontWeight: '600',
      fontFamily: 'Roboto-Regular',
    },
    rightTxt: {
      fontSize: 15,
      color: '#202020',
      fontWeight: '600',
      fontFamily: 'Roboto-Regular',
    },
    chatMessage:{
      fontSize: 15,
      color: '#202020',
      fontWeight: '600',
      fontFamily: 'Roboto-Regular',
      width:'80%'
    },
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      // backgroundColor: '#000000a0',
      backgroundColor: '#000000ad',
    },
  
    modalView: {
      top: 250,
      margin: 20,
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
    },
    modalText: {
      marginBottom: 20,
      textAlign: 'center',
      fontSize: 16,
      color: 'gray',
      fontFamily: 'Roboto-Medium',
    },
    openButton: {
      backgroundColor: '#cb9b27',
      padding: 10,
      elevation: 2,
      width: 100,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    centeredView: {
      flex: 1,
      backgroundColor: '#000000ad',
    },
    selectContactText :{
      textAlign: 'left',
      fontFamily: 'Roboto-Regular',
      fontSize: 18,
      marginTop: 20,
      marginBottom: 20,
      width:'100%',
      textAlign:'center',
    },
    colorWhite:{
      color:'#ffffff',
      paddingVertical:10
    },
    giftChatText :{
      alignItems:'center',
      padding:5,
      backgroundColor:'#e1ac4b',
      margin:5,           
      borderRadius:5
    },
    mobileText :{
      backgroundColor:'#B60612',
      margin:2,
      paddingHorizontal:10,
      paddingVertical:10,
      borderRadius:5,
      flexDirection:'row',
      justifyContent:'space-between',}
  }); 
  export default styles;