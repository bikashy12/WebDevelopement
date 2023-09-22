import React, { Component, useState, useEffect, useCallback } from 'react';
import {
  TextInput,
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableHighlight,
  Modal,
  Platform,
  PermissionsAndroid,
  TouchableWithoutFeedback
} from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import hamburger from '../assets/images/hamburger.png';
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import Loader from '../components/Loader';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import * as authActions from '../store/actions/auth';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Notifications from '../components/Notifications';
import { useFocusEffect } from '@react-navigation/native';
//Personal
import Friends from '../components/Contacts';
import { useSelector } from 'react-redux';
import styles from '../styles/resetStyle';
import * as wizardActions from '../store/actions/petwizard';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const PetEditScreen = ({ navigation, route }) => {
  const userData = useSelector((state) => state.auth);
  console.log(userData);
  const { petData, pet_image } = route.params;
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [navscreen, setnavscreen] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [agerange, setagerange] = React.useState([]);
  const [species, setspecies] = React.useState([]);
  const [breeds, setbreeds] = React.useState([]);
  const [petName, setPetName] = React.useState(petData.name ? petData.name : '');
  const [gender, setGender] = useState(petData.gender ? petData.gender : '');

  //  const [petName, setPetName] = React.useState('');

  const [speciesopen, setSpeciesOpen] = useState(false);
  const [speciesValue, setSpeciesValue] = useState(petData.type ? petData.type.id : null);
  const [breedopen, setBreedOpen] = useState(false);
  const [breedValue, setBreedValue] = useState(petData.breed ? petData.breed.id : null);
  const [ageopen, setAgeOpen] = useState(false);
  const [ageValue, setAgeValue] = useState(petData.ageRange ? petData.ageRange.id : null);

  const [speciesloading, setS_Loading] = React.useState(false);
  const [breedloading, setB_Loading] = React.useState(false);
  const [ageloading, setA_Loading] = React.useState(false);

  const [newPetImage, setNewImage] = React.useState(pet_image);
  const [imageObj, setImageObj] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [breedError, setBreedError] = React.useState(null);
  const [nameError, setNameError] = React.useState(null);
  const [speciesError, setSpeciesError] = React.useState(null);
  const [ageError, setAgeError] = React.useState(null);
  const [genderError, setGenderError] = React.useState(null);




  const [errors, setErrors] = React.useState({
    pet_name_error: null,
    pet_species_error: null,
    pet_gender_error: null,
    pet_breed_error: null,
    pet_age_error: null,
  });


  const dispatch = useDispatch();
  useEffect(() => {


    const getAllAgeranges = async () => {
      try {
        setA_Loading(true);
        let ageresult;
        ageresult = wizardActions.getAllAgeranges();
        const result = await dispatch(ageresult);
        const resultData = JSON.parse(result);
        console.log('------ageresult-----');
        console.log(resultData);
        if (resultData.state == true) {
          setagerange(resultData.agerange);
        }
        setA_Loading(false);
      } catch (err) {
        alert('Error,Something went wrong');
        setA_Loading(false);
      }
    };
    getAllAgeranges();

    getBreeds();
    const getSpecies = async () => {
      try {
        setS_Loading(true);
        let speciesresult;
        speciesresult = wizardActions.getSpecies();
        const result = await dispatch(speciesresult);
        const resultData = JSON.parse(result);
        console.log('-----species------');
        console.log(resultData);
        if (resultData.state == true) {
          setspecies(resultData.species);
        }
        setS_Loading(false);

        // console.log(resultData.state);
      } catch (err) {
        alert('Error,Something went wrong');
        setS_Loading(false);
      }
    };
    if (petData.type) {
      getBreeds(petData.type.id);
    }
    getSpecies();
  }, []);
  const getBreeds = async (species_id) => {
    try {
      setB_Loading(true)
      let breedresult;
      breedresult = wizardActions.getBreeds(species_id);
      const result = await dispatch(breedresult);
      const resultData = JSON.parse(result);
      console.log('-----breeds------');
      console.log(resultData);
      if (resultData.state == true) {
        setbreeds(resultData.breeds);
      }
      setB_Loading(false)
    } catch (err) {
      alert('Error,Something went wrong');
      setB_Loading(false);
    }
  };
  const onBreedOpen = useCallback(() => {
    setSpeciesOpen(false);
    setAgeOpen(false);
  }, []);

  const onSpeciesOpen = useCallback(() => {
    setAgeOpen(false);
    setBreedOpen(false);
  }, []);
  const onAgeOpen = useCallback(() => {
    setSpeciesOpen(false);
    setBreedOpen(false);
  }, []);
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
      maxWidth: 1000,
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
          setImageObj(source);
          setNewImage(source.uri);
          // props.onChange(source);
        }
      });
    }
  };

  const launchCameraImageLibrary = async () => {
    const options = {
      quality: 1.0,
      maxWidth: 1000,
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
          setImageObj(source);
          setNewImage(source.uri);
        }
      });
    }
  };
  const ValidationProcess = () => {
    var err=errors;
    if (petName == '' || petName == null) {
     setNameError('Name is required');
    }else{
     setNameError(null)
    }
    if (speciesValue == '' || speciesValue == null) {
     setSpeciesError( 'Select a pet') ;
    }else{
      setSpeciesError( null) ;
    }
    if (breedValue == '' || breedValue == null) {
     setBreedError('Select a breed');
    }else{
      setBreedError(null);
    }
    if (ageValue == '' || ageValue == null) {
     setAgeError('Select age range of pet');
    }else{
      setAgeError(null);
    }
    if (gender == '' || gender == null) {
      setGenderError('Select pet gender');
    }else{
      setGenderError(null);
    }
   
    if (petName != '' && petName != null) {
      if (speciesValue != '' && speciesValue != null) {
        if (breedValue != '' && breedValue != null) {
          if (ageValue != '' && ageValue != null) {
            if (gender != '' && gender != null) {
              updatePetData();
            }
          }
        }
      }
    }
  }
  const updatePetData = async() => {
    try {
      setLoading(true)
      let editResult;
      editResult = wizardActions.updatePetDetails(petName, speciesValue, breedValue, ageValue, gender, imageObj,petData.pet_id);
      const result = await dispatch(editResult);
      const resultData = JSON.parse(result);
      console.log('-----updatestatus------');
      console.log(resultData);
      if (resultData.state == true) {
        setmsg(resultData.message);
        setnotification(true);
      }
      setLoading(false)
    } catch (err) {
      console.log(err);
      alert('Error,Something went wrong');
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      {/* OTP verification block */}
      {notification && (
        <Notifications
          msg={msg}
          navscreen={navscreen}
          onChange={() => setnotification(false)}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={[styles.centeredView, { alignItems: 'center' }]}
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
                    <Text style={[styles.modalText], { color: 'white', alignSelf: 'center' }}>Select option</Text>
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
                    <Text style={[styles.modalText], { color: 'black', alignSelf: 'center' }}>Take from camera</Text>
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
                    <Text style={[styles.modalText], { color: 'black', alignSelf: 'center' }}>Pick from gallery</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <StatusBar backgroundColor="#B60612" />
      {loading && <Loader loading={loading} />}
      <View
        style={{
          backgroundColor: '#B60612',
          height: Platform.OS === 'ios' ? 100 : 55,
          width: windowWidth,
        }}>
        <SafeAreaView></SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: 100 }}>
            <Icon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{ paddingLeft: 20 }}
            />
          </TouchableOpacity>

          <Image source={Logo_Text_white} style={{ width: 119, height: 16 }} />
          <View style={{ width: 90, height: 16 }}></View>
        </View>
      </View><View>
      <TouchableOpacity
        style={{
          height: 50, width: 50, alignItems: 'center'
          , justifyContent: 'center', borderRadius: 25,
          backgroundColor: '#ffffff7d', position: 'absolute', top: 10, right: 10, zIndex: 1
        }}
        onPress={() => setModalVisible(true)}
      >
        <Icon
          name="edit"
          size={25}
          color="red"
          style={{}}
        />
      </TouchableOpacity>
      <Image source={{ uri: newPetImage }} style={{ width: windowWidth, height: windowWidth / 1.8, resizeMode: 'cover' }} />
      </View>
      <View style={{ width: '100%', flexDirection: 'column', marginVertical: 20, padding: 10 }}>
        <TextInput
          style={{
            width: '100%',
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
            //backgroundColor:'red'
          }}
          placeholderTextColor="#808080"
          placeholder="Name"
          onChangeText={(text) =>
            setPetName(text)
          }
          value={petName}
        />
        {nameError != null && (
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginBottom: 10,
              left: 10,
            }}>
            {nameError}
          </Text>
        )}
        <DropDownPicker
          loading={speciesloading}
          open={speciesopen}
          containerStyle={{ height: 40, marginTop: 10, marginBottom: 10 }}
          style={{ flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 0 }}
          dropDownContainerStyle={{
            borderRadius: 5
          }}
          placeholder="Pet "
          schema={{
            label: 'pet_name',
            value: 'id'
          }}
          items={species}
          setOpen={setSpeciesOpen}
          value={speciesValue}
          setValue={setSpeciesValue}
          // itemSeparator={true}
          selectedItemContainerStyle={{
            backgroundColor: "#dae5f2"
          }}
          onOpen={onSpeciesOpen}
          onChangeValue={(value) => {
            if(value!=petData.type.id){
              setBreedValue(null);
            }
            getBreeds(value);
          }}
          zIndex={2000}
        />
        {speciesError!= null && (
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginBottom: 10,
              left: 10,
            }}>
            {speciesError}
          </Text>
        )}
        <DropDownPicker
          loading={breedloading}
          containerStyle={{ height: 40, marginTop: 10, marginBottom: 10 }}
          style={{ flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 0 }}
          dropDownContainerStyle={{
            borderRadius: 5
          }}
          open={breedopen}
          placeholder="Breed "
          schema={{
            label: 'breed_name',
            value: 'id'
          }}
          items={breeds}
          setOpen={setBreedOpen}
          value={breedValue}
          setValue={setBreedValue}
          // itemSeparator={true}
          selectedItemContainerStyle={{
            backgroundColor: "#dae5f2"
          }}
          onOpen={onBreedOpen}
          zIndex={1000}
        />
        {breedError != null && (
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginBottom: 10,
              left: 10,
            }}>
            {breedError}
          </Text>
        )}
        <DropDownPicker
          loading={ageloading}
          containerStyle={{ height: 40, marginTop: 10, marginBottom: 10 }}
          style={{ flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 0 }}
          dropDownContainerStyle={{
            borderRadius: 5
          }}
          open={ageopen}
          placeholder="Age Range "
          schema={{
            label: 'age_label',
            value: 'id'
          }}
          items={agerange}
          setOpen={setAgeOpen}
          value={ageValue}
          setValue={setAgeValue}
          // itemSeparator={true}
          selectedItemContainerStyle={{
            backgroundColor: "#dae5f2"
          }}
          onOpen={onAgeOpen}
          zIndex={500}
        />
        {ageError != null && (
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginBottom: 10,
              left: 10,
            }}>
            {ageError}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 10
          }}>
          <Text style={{ paddingLeft: 10, color: 'gray', fontSize: 16 }}>
            Gender
          </Text>
          <TouchableOpacity
            onPress={() =>
              setGender('Female')
            }
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 15,
                height: 15,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 15,
                backgroundColor: gender == 'Female' ? 'gray' : null,
              }}></View>
            <Text style={{ color: 'gray', fontSize: 14 }}>{'  '}Female</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setGender('Male')
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <View
              style={{
                width: 15,
                height: 15,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 15,
                backgroundColor: gender == 'Male' ? 'gray' : null,
              }}></View>
            <Text style={{ color: 'gray', fontSize: 14 }}>{'  '}Male</Text>
          </TouchableOpacity>
        </View>
        {genderError!= null && (
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginBottom: 10,
              left: 10,
            }}>
            {genderError}
          </Text>
        )}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 0,
          width: '100%',
        }}>
        <TouchableOpacity
         onPress={() => ValidationProcess()}
        >
          <View
            style={{
              height: Platform.OS == 'ios' ? 50 : 50,
              backgroundColor: '#B60612',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Text
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                fontSize: 20,
                color: '#ffffff',
                fontFamily: 'Roboto-Medium',
              }}>
              SAVE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetEditScreen;
