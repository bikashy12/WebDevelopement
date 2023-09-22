import React, {Component, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';

const Loader = (props) => {
  const navigation = useNavigation();
  const [load, setload] = React.useState(true);
  const {msg, navscreen, response, reset, ...attributes} = props;

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={load}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{msg}</Text>
          {/* {reset == true ? (
            <TouchableOpacity
              onPress={() => {
                setload(false);
                props.onChange();
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{name: 'Browse'}],
                  }),
                );
              }}
              style={{
                ...styles.openButton,
                backgroundColor: '#cb9b27',
              }}>
              <Text style={styles.textStyle}>OK</Text>
            </TouchableOpacity>
          ) : ( */}
          <TouchableOpacity
            onPress={() => {
              setload(false);
              // navigation.navigate(navscreen);
              props.onChange();
            }}
            style={{
              ...styles.openButton,
              backgroundColor: '#cb9b27',
            }}>
            <Text style={styles.textStyle}>OK</Text>
          </TouchableOpacity>
          {/* )} */}
          {/* {response != false && ( */}

          {/* // )} */}
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
});

export default Loader;
