import React, {Component} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator,Dimensions, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight= Dimensions.get('window').height;

const Global_loader = (props) => {
  const loading = useSelector((state) => state.loader.profile_loading);
  const dispatch = useDispatch();
  if(loading){
    if(Platform.OS=='ios'){
    return (
      <View style={{position:'absolute',alignItems:'center',justifyContent:'center',height:windowHeight,width:windowWidth,top:0,left:0,zIndex:500,backgroundColor:'transparent'}}>
 <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} size="large" color="red" />
          </View>
        </View>
      </View>
      
    );}else{
      return (
      <Modal
      transparent={true}
      animationType={'fade'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} size="large" color="red" />
        </View>
      </View>
    </Modal>
      );
    }
  }
  else{
    return (
     <View style={{position:'absolute',zIndex:-100,top:-100,right:-100}}>

     </View>
    );
      }
  }

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width:'100%',
    // backgroundColor: '#000000a0',
    backgroundColor: '#0000005e',
    // backgroundColor: '#ffffff',
  },
  activityIndicatorWrapper: {
    // backgroundColor: '#000000c2',
    backgroundColor: '#ffffff',

    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Global_loader;
