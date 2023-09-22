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
  PermissionsAndroid,
} from 'react-native';
// import {Images} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
import hamburger from '../assets/images/hamburger.png';
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import icon_categories from '../assets/images/icon_categories.png';
import icon_female from '../assets/images/icon_female.png';
import icon_gift from '../assets/images/icon_gift.png';
import icon_pet from '../assets/images/icon_pet.png';
import icon_browse from '../assets/images/icon_browse.png';
import {
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Contacts from 'react-native-contacts';

export default function HomeScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [genderType, setGenderType] = useState('Female');
  const [searchInput, setSearchInput] = useState(null);
  const loadContacts = () => {
    Contacts.getAll()
      .then((contacts) => {
        console.log(contacts);
      })
      .catch((e) => {
        console.log(e);
      });

    Contacts.getCount().then((count) => {
      console.log(`Search ${count} contacts`);
    });

    Contacts.checkPermission();
  };

  useFocusEffect(
    React.useCallback(() => {
      const requestContactsPermission = async () => {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          },
        ).then(() => {
          loadContacts();
        });
      };
      requestContactsPermission();
    }, []),
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#94181c" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width: '100%'}}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Teen');
                  setModalVisible(false);
                }}>
                Teen
              </Text>
            </View>
            <View style={{width: '100%'}}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Babies');
                  setModalVisible(false);
                }}>
                Babies
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Older Adults');
                  setModalVisible(false);
                }}>
                Older Adults
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Female');
                  setModalVisible(false);
                }}>
                Female
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Male');
                  setModalVisible(false);
                }}>
                Male
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Boys');
                  setModalVisible(false);
                }}>
                Boys
              </Text>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Girls');
                  setModalVisible(false);
                }}>
                Girls
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{backgroundColor: '#b41f23', height: 102, width: windowWidth}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 18,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={hamburger}
              style={{width: 24, height: 15, marginLeft: 16}}
            />
          </TouchableOpacity>

          <Image source={Logo_Text_white} style={{width: 119, height: 16}} />
          <Text
            style={{
              color: '#FFFFFF',
              fontStyle: 'normal',
              fontFamily: 'Roboto-Medium',
              fontSize: 16,
              lineHeight: 20,
              right: 16,
            }}>
            Skip
          </Text>
        </View>
        <View style={styles.searchBox}>
          {/* <Image
            source={search}
            style={{width: 24, height: 20, marginLeft: 16}}
          /> */}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 19,
              alignItems: 'center',
            }}>
            <View>
              <Icon name="search" size={17.49} color="#E4E9EA" />
            </View>
            <View style={{width: '85%'}}>
              <TextInput
                style={{
                  paddingLeft: 10,
                  width: '100%',
                  color: 'gray',
                }}
                placeholderTextColor="#E4E9EA"
                placeholder="What are You looking for?"
                onChangeText={(text) => setSearchInput(text)}
                value={searchInput}
              />
            </View>

            {/* <Text
              style={{
                height: 20,
                marginLeft: 10,
                color: '#E4E9EA',
                fontStyle: 'normal',
                fontFamily: 'Roboto-Medium',
                fontSize: 14,
                lineHeight: 20,
              }}>
              
            </Text> */}
          </View>
          <View style={{paddingRight: 16}}>
            <Icon1 name="microphone" size={20} color="#E4E9EA" />
          </View>
        </View>

        <View></View>
      </View>
      <View style={styles.firstDivider}></View>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          flexDirection: 'row',
          marginTop: 24.5,
          justifyContent: 'space-between',
          width: windowWidth - 60,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image source={icon_female} style={{marginLeft: 2}} />
          </View>
          <Text style={styles.iconText}>{genderType}</Text>
        </View>

        <View>
          {/* <Icon2 name="caretright" size={18} color="#E4E9EA" /> */}
          {modalVisible ? (
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Icon2 name="caretup" size={18} color="#d2a749" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Icon2 name="caretdown" size={18} color="#d2a749" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.firstDivider}></View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: 24.5,
          justifyContent: 'space-between',
          width: windowWidth - 60,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image source={icon_pet} style={{marginLeft: 2}} />
          </View>
          <Text style={styles.iconText}>Pets</Text>
        </View>

        <View>
          <Icon2 name="caretright" size={18} color="#E4E9EA" />
        </View>
      </TouchableOpacity>

      <View style={styles.firstDivider}></View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: 24.5,
          justifyContent: 'space-between',
          width: windowWidth - 60,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image source={icon_categories} style={{marginLeft: 2}} />
          </View>
          <Text style={styles.iconText}>Categories</Text>
        </View>

        <View>
          <Icon2 name="caretright" size={18} color="#E4E9EA" />
        </View>
      </TouchableOpacity>

      <View style={styles.firstDivider}></View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: 24.5,
          justifyContent: 'space-between',
          width: windowWidth - 60,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image source={icon_browse} style={{marginLeft: 2}} />
          </View>
          <Text style={styles.iconText}>Browse</Text>
        </View>

        <View>
          <Icon2 name="caretright" size={18} color="#E4E9EA" />
        </View>
      </TouchableOpacity>

      <View style={styles.firstDivider}></View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: 24.5,
          justifyContent: 'space-between',
          width: windowWidth - 60,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image source={icon_gift} style={{marginLeft: 2}} />
          </View>
          <Text style={styles.iconTextGift}>Gift Under $50</Text>
        </View>

        <View>
          <Icon2 name="caretright" size={18} color="#E4E9EA" />
        </View>
      </TouchableOpacity>
      <View style={styles.firstDivider}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  searchBox: {
    height: 48,
    // width: '100%',
    backgroundColor: '#ffffff',
    left: 8,
    marginRight: 16,
    marginTop: 8,
    // borderWidth: 1,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firstDivider: {
    marginTop: 30.5,
    borderBottomColor: '#E4E9EA',
    // borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: windowWidth - 60,
    justifyContent: 'center',
    paddingLeft: 30,
    // marginRight: 60,
  },
  iconText: {
    marginLeft: 25.5,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 19,
    color: '#474D52',
    marginTop: 2,
  },
  iconTextGift: {
    marginLeft: 25.5,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 19,
    color: '#4F81BD',
    marginTop: 2,
  },
  //modal style
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginTop: 180,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 25,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '70%',
    height: 400,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 35,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
  },
});
