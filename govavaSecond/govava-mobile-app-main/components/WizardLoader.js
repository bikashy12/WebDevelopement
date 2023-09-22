import React, {Component} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator,Image} from 'react-native';
import loader from '../assets/images/loader.gif';

const WizardLoader = (props) => {
  const {loading, ...attributes} = props;

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
         
          <Image source={loader} style={{height:100,width:100,alignSelf:'center'}} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
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

export default WizardLoader;
