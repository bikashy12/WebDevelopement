
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
  Dimensions,Platform,
  KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    // justifyContent: 'center',
    flexDirection: 'column',
    padding:5
  },
  chatContainer: {
    flex:3,
    flexDirection: 'column',
    alignItems: 'center'
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
   // alignSelf: 'flex-end',
    padding: 10,
    minHeight: 60,
    maxHeight: 150,
    width: width,
    alignItems: 'center', 
    justifyContent: 'space-between'
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
  textInput: {
    width: '80%',
    backgroundColor: '#8080806b',
    minHeight: 40,
    maxHeight: 130,
    borderRadius: 10,
    paddingLeft:10
  },
  iconHolder: {
    margin: 5,
    height: 50,
    borderRadius: 25,
    width: 50,
    backgroundColor: '#B60612',
    alignItems: 'center',
    justifyContent: 'center'
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
  leftMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-start',
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
    maxWidth: width/1.7,
    borderRadius: 5,
    backgroundColor: '#97c163',
  padding:8,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    elevation:2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    flexDirection:'column',
    paddingRight:20,
  },
  leftBlock: {
    maxWidth: width/1.7,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 8,
    paddingRight:15,
    shadowColor: '#3d3d3d',
    elevation:2,
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
  chatMessage: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
    fontFamily: 'Roboto-Regular',
    width: '80%'
  },
  msgTime:{
    fontSize:10,
    alignSelf:'flex-end',
  //  backgroundColor:'red',
 
  },
  sender:{
    fontSize: 15,
    color: '#202020',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    paddingBottom:5
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
  height:'100%',
  width:'100%',
  backgroundColor: '#000000ad',
},
headerStyle :{
  color: '#ffffff',
  fontStyle: 'normal',
  fontFamily: 'Roboto-Medium',
  fontSize: 18,
  lineHeight: 20,
  paddingLeft: 20,
  // padding: 20,
  // paddingBottom: 10,
  // right: 16,
},
listName :{
  color: '#000',
  fontWeight: '600',
  fontSize: 16,
  width:'100%',
  fontFamily: 'Roboto-Medium',    
},
listTitle :{
  color: '#000',
  fontWeight: '600',
  fontSize: 13,
  width:'100%'
},
deleteText :{
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
cancelText :{
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
deletemodalView:{
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
});
export default styles;