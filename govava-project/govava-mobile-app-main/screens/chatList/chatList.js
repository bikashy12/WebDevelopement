import React,{useEffect} from 'react';
//import { withNavigation } from '@react-navigation/compat';
import { View, Dimensions, Image,Text, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import {useDispatch } from "react-redux";
import * as chatActions from "../../store/actions/chat";
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ChatList(props) {
    const userData = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [modalVisible,setModalVisible] = React.useState(false); 
    const [modalVisibledelete, setModalVisibledelete] = React.useState(false);
    const [chat_id,setchat_id] = React.useState(null);
    const [name, setname] = React.useState(null);
    //var noimg = 'http://govava.webbs.a2hosted.com/img/noimage.b63b5bb5.jpeg';
 
    const {
        item,
        reloadChatMessages
    } = props;
    const navigation = useNavigation();
    let details = JSON.parse(item.product_details);
//    console.log('item',item);
   const noOfUsers = item.chat_user.length;
//    let name =null;
  //  console.log("parsed details are"+details);
  const deleteChat = async () => {
    // alert("delete")
    // return;
    // let chat_user_id = id;
    try {
      chatUserList = chatActions.deleteChat(chat_id);
      

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
  useEffect(() => {
    if(noOfUsers>2){
      setname('Group chat');
    }else{
        let chat_user = item.chat_user;
        if(chat_user){
                    chat_user.forEach(element => {
                    console.log(JSON.stringify(element))
                    if((element.customer_id!=userData.userId) || element.customer_id==null){
                        console.log("kkkkkk")
                        if(element.name==null){
                            setname('Gift chat');
                            console.log("lllllllllllll")
                        }else{
                            setname(element.name);
                            console.log("mmmmmmmmmmmmmm")
                        }
                        
                        console.log("name =",name)
                    }
                });
        }else{
            setname('Gift chat');
        }
        
        
    }
   console.log('item',item);
  },[item.id]);
    return (
        <TouchableOpacity style={{flexDirection:'row',padding:10}}
          onPress={()=>{dispatch(chatActions.setReloadChatMessages());navigation.navigate('Chats',{screen:'ChatScreen',params:{
              chatId:item.id,
              product: JSON.parse(item.product_details),
              chatTitle: name,
              chat_user : item.chat_user,
            }})}}>
                <Modal
                transparent={true}
                animationType={'fade'}
                visible={modalVisible}
                onRequestClose={() => {
                console.log('close modal');
                }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.modalText}>Chat successfully deleted.</Text>

                <TouchableOpacity
                onPress={() => {
                setModalVisible(false);
                props.reloading();
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
                <Modal
                transparent={true}
                animationType={'fade'}
                visible={modalVisibledelete}
                onRequestClose={() => {
                console.log('close modal');
                }}>
                <View style={{flex: 1, backgroundColor: '#000000ad'}}>
                <View
                style={styles.deletemodalView}>
                <Text style={styles.modalText}>
                Are you sure? Do you want to delete the chat?
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
                width: 100,
                }}>
                <Text
                style={styles.cancelText}>
                Cancel
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => {
                setModalVisibledelete(false);
                // props.loadPetdetails(item.petwizardDetails);
                deleteChat();
                }}
                style={{
                backgroundColor: '#cb9b27',
                padding: 10,
                elevation: 2,
                width: 100,
                }}>
                <Text
                style={styles.deleteText}>
                Delete
                </Text>
                </TouchableOpacity>
                </View>
                </View>
                </View>
                </Modal>

                <View style={{alignSelf:'flex-start',}}>
                  <FastImage
                    style={styles.chatPic}
                    source={{
                      uri: details.imageurl,
                    }}
                  
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  </View>

            <View  style={{flexDirection:'row',alignSelf:'center',borderBottomWidth:1,width:'100%',
            paddingLeft:10,
            borderColor:'gray',paddingBottom:30,
            alignContent:'center'}}>
                <View style={{flexDirection:'column',width:'60%'}}>
                    <Text style={styles.listName}>{name}</Text>
                    <Text style={styles.listTitle}>{item.title && item.title.substring(0,60)}</Text>
                </View>
                <View style={{flexDirection:'row',width:'20%',alignItems:'center',justifyContent:'flex-end'}}>
                    {item.customer_unread_message_count>0 &&  <View style={{height:23,width:23,borderRadius:23,backgroundColor:'#B60612',justifyContent:'center',marginRight:10,alignItems:'center'}}>
             <Text style={{color:'#ffffff',fontSize:12}}>{item.customer_unread_message_count}</Text>
           </View>}
           <TouchableOpacity style={{justifyContent:'center'}}
             onPress={()=>{setchat_id(item.id);setModalVisibledelete(true)}}>
           <Icon name="delete" size={22} color="#B60612" />
           </TouchableOpacity>
         
          
                </View>
          
            </View>
         
        </TouchableOpacity>
    );

}
