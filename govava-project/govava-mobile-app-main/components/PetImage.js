import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  Modal,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from './Header';
import {Dimensions} from 'react-native';
import petwizard from '../assets/images/petwizard.png';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import newpet from '../assets/images/newpet.jpg';
import Icon1 from 'react-native-vector-icons/Entypo';
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import * as wizardActions from '../store/actions/petwizard';
import {useFocusEffect} from '@react-navigation/native';
import styles from '../styles/ageStyle';

export default function PetImage(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [photo, setPhoto] = React.useState(props.image);
  useFocusEffect(React.useCallback(() => {}, []));
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const launchCameraImage = async () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 1000,
      storageOptions: {
        skipBackup: true,
      },
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        // Same code as in above section!
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log('Success');
          console.log(response);
          let source = response;
          setPhoto(source);
          props.onChange(source);
        }
      });
    }
  };

  const launchCameraImageLibrary = async () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 1000,
      storageOptions: {
        skipBackup: true,
      },
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    // Open Image Library:
    if (isCameraPermitted && isStoragePermitted) {
      launchImageLibrary(options, (response) => {
        // Same code as in above section!
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log('Success');
          let source = response;
          console.log(response);
          setPhoto(source);
          props.onChange(source);
        }
      });
    }
  };
  return (
    <View style={{alignItems: 'center'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          onPressOut={() => setModalVisible(!modalVisible)}>
          <TouchableWithoutFeedback>
            <View
              style={{
                margin: 20,
                marginTop: 260,
                backgroundColor: 'white',
                borderRadius: 2,
                paddingTop: 0,
                paddingBottom: 10,
                alignItems: 'flex-start',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: windowWidth / 1.2,
                height: 130,
              }}>
              <ScrollView>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#cb9b27',
                    padding: 10,
                    width: windowWidth / 1.2,
                  }}>
                  <View>
                    <Text style={styles.modalText}>Select option</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    launchCameraImage();
                  }}
                  style={{
                    width: windowWidth / 1.2,
                    padding: 10,
                    // marginBottom: 20,
                  }}>
                  <View>
                    <Text style={styles.modalText}>Take from camera</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderWidth: 1,
                    width: windowWidth,
                    borderColor: 'gray',
                  }}></View>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    launchCameraImageLibrary();
                  }}
                  style={{
                    width: windowWidth / 1.2,
                    padding: 10,
                    // marginBottom: 20,
                  }}>
                  <View>
                    <Text style={styles.modalText}>Pick from gallery</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {photo == null ? (
          <Image
            source={newpet}
            style={{
              width: windowWidth / 1.4,
              height: windowWidth / 1.5,
              resizeMode: 'contain',
              // marginLeft: 16,
              alignSelf: 'center',
              marginTop: 50,
            }}
          />
        ) : (
          <Image
            source={{uri: photo.uri}}
            style={{
              width: windowWidth / 1.6,
              height: windowWidth / 1.6,
              // marginLeft: 16,
              marginTop: 60,
              borderRadius: 150,
            }}
          />
        )}
        <TouchableOpacity style={{position:'absolute',right:-20,top:-30,zIndex:1}} onPress={props.onSkip}>
          <Text
            style={{
              fontSize: 13,
              padding: 7,
              backgroundColor: 'white',
              marginTop: 45,
              borderRadius: 3,
              borderColor: '#c57700',
              borderWidth: 1,
            }}>
            SKIP
          </Text>
        </TouchableOpacity>
        <View></View>
      </View>

      <Text
        style={{
          textAlign: 'left',
          fontFamily: 'Roboto-Regular',
          fontSize: 16,
          marginTop:8,
          marginBottom: 20,
          width: windowWidth / 1.4,
        }}>
        Do you have a picture you want to upload ?
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View>
          <TouchableOpacity
            // onPress={handleChoosePhoto}
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              width: windowWidth / 1.2,
              height: 40,
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              paddingRight: 10,
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text
              style={{
                textAlign: 'left',
                fontFamily: 'Roboto-Regular',
                fontSize: 14,
                // marginTop: 20,
                // marginBottom: 20,
                color: photo == null ? 'gray' : 'red',
              }}>
              {photo == null ? 'Choose file' : photo.fileName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
