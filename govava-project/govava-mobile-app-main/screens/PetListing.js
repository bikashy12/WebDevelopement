import React, { Component, useState, useEffect } from 'react';
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
} from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import hamburger from '../assets/images/hamburger.png';
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import Loader from '../components/Loader';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import * as wizardActions from '../store/actions/petwizard';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Notifications from '../components/Notifications';
import { useFocusEffect } from '@react-navigation/native';
//Personal
import SavedPets from '../components/SavedPets';
import { useSelector } from 'react-redux';
import styles from '../styles/resetStyle';

const PetListingScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.auth);
  console.log(userData);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [pets, setPets] = React.useState('');

  const [navscreen, setnavscreen] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [emptyPets, setEmptyPets] = React.useState(false);

  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      const getPetwizardDetails = async () => {
        try {
  setLoading(true);
          var user_id = userData.userId;
          let wizardPetProducts;
          wizardPetProducts = wizardActions.getPetwizardDetails(user_id);
          const result = await dispatch(wizardPetProducts);
          const resultData = JSON.parse(result);
          if (resultData.pets) {
            setPets(resultData.pets);
            if (resultData.pets.length == 0) {
              setEmptyPets(true);
            }
  
          }
          setLoading(false);
        } catch (err) {
          setLoading(false);
           alert(err);
        }
      };
      getPetwizardDetails();
    }, [])
  );
 
  const removePet=(id)=>{
    pets.splice(pets.findIndex(function(i){
      return i.id == id;
  }), 1);
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
      </View>
      <SavedPets
      editPet={true}
        pets={pets}
        species={null}
        species_id={null}
        loadPetdetails={(petdetails) =>{ console.log(petdetails);navigation.navigate('EditPet',{petData:petdetails.petwizardDetails,pet_image:petdetails.pet_image==null?petdetails.petwizardDetails.type.pet_icon:petdetails.pet_image})}}
        removePet={removePet}
        onChange={(item) =>
          console.log(item)
        }
        onSkip={() => console.log('skip')}
      />
    </View>
  );
};

export default PetListingScreen;
