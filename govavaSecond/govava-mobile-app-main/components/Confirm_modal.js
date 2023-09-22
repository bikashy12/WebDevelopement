import React, { Component, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';

const Confirmation = (props) => {
  const navigation = useNavigation();
  const [load, setload] = React.useState();
  const { msg, confirm, friend, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={confirm}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {friend ? friend.contact_name : ''}'s profile already saved in our
            system
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
                // navigation.navigate(navscreen);
                props.closeConfirm();
              }}
              style={{
                ...styles.openButton,
                backgroundColor: '#cb9b27',
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log(friend);
                // navigation.navigate(navscreen);
                props.onChange(friend);
              }}
              style={{
                ...styles.openButton,
                backgroundColor: '#cb9b27',
              }}>
              <Text style={styles.textStyle}>Continue</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#000000ad',
  },

  modalView: {
    top: 250,
    margin: 50,
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
    width: '45%',
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
});

export default Confirmation;
