import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  Modal,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import { Dimensions } from 'react-native';
import petwizard from '../assets/images/petwizard.png';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import * as wizardActions from '../store/actions/petwizard';
import noimage from '../assets/images/noimage.png';
import FastImage from './FastImagePets';
import { useFocusEffect } from '@react-navigation/native';

export default function SavedPets(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleleModal] = useState(false);
  const [deleteResponse, setDeleleResponse] = useState(false);
  const [deleteStatus, setDeleleStatus] = useState(false);
  const [deleteMsg, setDeleleMsg] = useState('');


  const [loading, setLoading] = React.useState(false);
  const [petData, setPetData] = React.useState(null);
  const [allpets, setallPets] = React.useState(props.pets);

  const [deletepet, setDeletePet] = React.useState(null);


  const { pets, removePet, ...attributes } = props;

  const deletePetData = async () => {

    try {
      setLoading(true);

      let deleteResult;
      deleteResult = wizardActions.deletePetData(deletepet.id);

      const result = await dispatch(deleteResult);
      const resultData = JSON.parse(result);
      setLoading(false);
      if (resultData.state == true) {
        removePet(deletepet.id);
        setDeleleResponse(true);
        setDeleleStatus(true);
        setDeleleMsg(resultData.message);
      } else {
        setDeleleResponse(true);
        setDeleleStatus(false);
        setDeleleMsg(resultData.message);
        // alert('error')
      }
    } catch (err) {
      console.log(err.message);
      setDeleleResponse(true);
      setDeleleStatus(false);
      setDeleleMsg(err.message);
      setLoading(false);
    }
  };
  const loadPetData = (data) => {
    if (props.editPet) {
      setPetData(data);
      console.log(data);
      props.loadPetdetails(data);
    } else {
      setPetData(data);
      setModalVisible(true);
    }

  }
  useFocusEffect(React.useCallback(() => { }, []));
  return (
    <View style={{ alignItems: 'center' }}>
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={deleteModal}
        onRequestClose={() => {
          setDeleleResponse(false);
          setDeleleStatus(false);
          setDeleleMsg('');
          setDeleleModal(false);
        }}>
        <View style={styles.centeredView}>
          {deleteResponse ?
            <View style={styles.modalView}>
              {deleteStatus ? <Icon
                name="checkcircle"
                size={40}
                color="green"
                style={{ alignSelf: 'center', marginBottom: 10 }}
              /> : <Icon
                name="exclamationcircle"
                size={40}
                color="red"
                style={{ alignSelf: 'center', marginBottom: 10 }}
              />}
              <Text style={styles.modalText}>
                {deleteMsg}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setDeleleResponse(false);
                    setDeleleStatus(false);
                    setDeleleMsg('');
                    setDeleleModal(false);
                  }}
                  style={{
                    ...styles.openButton,
                    backgroundColor: '#cb9b27',
                  }}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>

              </View>
            </View> :
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to delete {deletepet ? deletepet.petwizardDetails.name : 'Pet'}?
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
                    setDeleleModal(false);
                  }}
                  style={{
                    ...styles.openButton,
                    backgroundColor: '#cb9b27',
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (deletepet != null) {
                      deletePetData()
                    } else {
                      alert('Pet details not found');
                    }
                  }}
                  style={{
                    ...styles.openButton,
                    backgroundColor: '#cb9b27',
                  }}>
                  <Text style={styles.textStyle}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>}
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {petData ? petData.petwizardDetails.name : 'Pet'} is already saved in our
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
                  setModalVisible(false);
                }}
                style={{
                  ...styles.openButton,
                  backgroundColor: '#cb9b27',
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (petData != null) {
                    props.loadPetdetails(petData.petwizardDetails);
                  } else {
                    alert('Pet details not found');
                  }
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
      <FlatList
        // extraData={ch_styles}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        data={pets}
        renderItem={({ item, i }) => (
          <TouchableOpacity
            onPress={() => { loadPetData(item) }}
            //   navigation.navigate('Suggestedproductdescription', {
            //     product: item,
            //     wizard_detail: wizard_detail,
            //     product_name: item.productname,
            //     product_id: item.productId,
            //     navscreen: navscreen,
            //     user_contact_id: user_contact_id,
            //   })
            // }
            key={'product_' + i}
            style={[styles.productContainer, styles.shadow]}>


            <FastImage item={item} />

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                height: 50,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  // textAlign: 'center',
                  // alignSelf: 'center',
                  // width: '100%',
                  paddingVertical: 3,
                  paddingHorizontal: 3,
                  color: '#525252',
                }}>
                {item.petwizardDetails.name}
              </Text>
              <View
                style={{
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  backgroundColor: '#e4e4e4',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 10,
                    // textAlign: 'center',
                    // alignSelf: 'center',
                    // width: '50%',
                    paddingVertical: 3,
                    color: '#525252',
                  }}>
                  {item.petwizardDetails.gender == 'Male' ? 'M' : 'F'}
                </Text>
              </View>
            </View>
            {props.editPet? <View style={{flexDirection:'row',width:'100%'}}><TouchableOpacity
              onPress={() => { setDeletePet(item), setDeleleModal(true) }}

              style={{

                height: 40,
                width: '50%',
                //borderRadius:30,
                justifyContent: 'center',
                alignItems: 'center',
                // justifyContent: 'flex-start',
                backgroundColor: '#fe3c00'
              }}>
              <Text style={{ color: 'white' }}>Delete</Text>
              {/* {product_index == i ? (
                  <Icon2 name="heart" size={20} color="#d4a040" />
                ) : (
                  <Icon2 name="hearto" size={20} color="#d4a040" />
                )} */}
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => { loadPetData(item) }}

            style={{

              height: 40,
              width: '50%',
              //borderRadius:30,
              justifyContent: 'center',
              alignItems: 'center',
              // justifyContent: 'flex-start',
              backgroundColor: 'white'
            }}>
            <Text style={{ color: 'black' }}>Edit</Text>
            {/* {product_index == i ? (
                <Icon2 name="heart" size={20} color="#d4a040" />
              ) : (
                <Icon2 name="hearto" size={20} color="#d4a040" />
              )} */}
          </TouchableOpacity></View>:null}
          </TouchableOpacity>
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
      {props.editPet?null:<TouchableOpacity
        onPress={() => props.onSkip()}
        style={{
          backgroundColor: '#B60612',
          width: '100%',
          height: 60,
          elevation: 5,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: Platform.OS == 'ios' ? 100 : 50,
          // zIndex:50
        }}>
        <View style={{ flexDirection: 'row' }}><Text style={{ color: 'white' }}>ADD PET</Text>
          <Icon
            name="pluscircle"
            size={20}
            color="white"
            style={{ paddingLeft: 16 }}
          />
        </View>
      </TouchableOpacity>}
      <SafeAreaView></SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  //modal style
  centeredView1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 0,
  },
  modalView1: {
    margin: 20,
    marginTop: 10,
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
    height: 420,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText1: {
    // marginBottom: 20,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
  },

  product: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderWidth: 0,
    minHeight: 114,
    alignItems: 'center',
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: 10 / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: 10 / 2,
    marginTop: 0,
  },
  horizontalImage: {
    height: 100,
    width: 'auto',
  },

  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 5,
  },
  //Products
  productsHolder: {
    flex: 1,
    flexDirection: 'column',
    // padding: 10,
    width: windowWidth,
    alignItems: 'center',
    //flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  productContainer: {
    width: windowWidth / 2.3,
    height: windowWidth / 1.8,
    backgroundColor: '#f1f1f1',
    margin: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: '#000000a0',
    backgroundColor: '#000000ad',
  },

  modalView: {

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
    width: '80%'
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
    alignItems: 'center',
    justifyContent: 'center'
    // width:'70%'
  },
});
