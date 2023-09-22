import React from 'react';
//import { withNavigation } from '@react-navigation/compat';
import { View, Dimensions, Image,Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import moment from 'moment';

import styles from './styles';
import { useSelector, useDispatch } from "react-redux";

export default function ChatMessage(props) {
    const [modalVisibledelete, setModalVisibledelete] = React.useState(false);
    const [msgId, setmsgId] = React.useState([]);
    //var noimg = 'http://govava.webbs.a2hosted.com/img/noimage.b63b5bb5.jpeg';
    const {
        item
    } = props;
    const userId = useSelector((state) => state.auth.userId);
    const _longPress = (id) => {
        if(typeof(id)=='number'){
            setmsgId(item.id);setModalVisibledelete(true);
        }
    }

    if (item.sent === false) {
        return (
            <View style={styles.eachMsg}>
                {/* <Image source={{ uri: item.image }} style={styles.userPic} /> */}
                <View style={styles.msgBlock}>
                    <Text style={styles.msgTxt}>hiii</Text>
                </View>
            </View>
        );
    } else {
        return (

            <TouchableOpacity style={{width:'100%'}}
            onLongPress={()=>{_longPress(item.id)}}>
                <View  style={[item.customer_id==userId?styles.rightMsg:styles.leftMsg,{alignItems:'center'}]} >
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
                Are you sure? Do you want to delete the message?
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
                props.onDelete(msgId)
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
                  {typeof(item.id)!='number' &&  
                <ActivityIndicator size="small" color="#B60612" style={{paddingRight:5}} />
                }
                <View style={[item.customer_id==userId?styles.rightBlock:styles.leftBlock,]} >
                {item.customer_id!=userId?
                <Text style={styles.sender}>{item.chat_user.name?item.chat_user.name:item.chat_user.mobile}</Text>:null}
                    <Text style={styles.rightTxt}>
                        {/* {JSON.stringify(item)} */}
                    {item.message}
                    </Text>
                   {moment().format('MMMM Do YYYY')==moment(item.created_at).format('MMMM Do YYYY')? <Text style={styles.msgTime}>{item.readableTime}</Text>:<Text  style={styles.msgTime}>{item.readableTime}</Text>}
                   
                   
                </View>
              
                {/* <Image source={{ uri: item.image }} style={styles.userPic} /> */}
                </View>
            </TouchableOpacity>
        );
    }


}
