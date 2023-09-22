import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  Modal,
  TextInput,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import { Dimensions } from 'react-native';
import gift from '../assets/images/gift.png';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Loader from './Loader';
import WizardLoader from './WizardLoader';
import { useDispatch } from 'react-redux';
import * as wizardActions from '../store/actions/wizard';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { selectContactPhone } from 'react-native-select-contact';
import { useSelector } from 'react-redux';
import styles from '../styles/friendStyle';
import ContentLoader, { Rect, Circle, List } from 'react-content-loader/native';


export default function Friends(props) {
  const userData = useSelector((state) => state.auth);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [fname, setFname] = useState('');
  const [fphone, setFphone] = useState('');
  const [error_n, setError_n] = useState(null);
  const [error_p, setError_p] = useState(null);
  const [error_e, setError_e] = useState(null);
  const [f_email, setF_email] = useState('');
  const [gender_input, setGender_input] = useState('Male');

  const [friend, setFriend] = useState(props.friend ? props.friend : null);
  const [allfriends, setAllfriends] = useState(null);
  const [friendsearch, setFriendsearch] = useState(null);
  const [searchterm, setSearchterm] = useState(null);
  const filterUnwanted = (arr) => {
    const required = arr.filter((el) => {
      return el.contact_name;
    });
    return required;
  };
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 10000);
      const getFriends = async () => {
        try {
          let friendsresult;
          friendsresult = wizardActions.getFriends(userData);
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(friendsresult);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          if (resultData.state) {
            if (resultData.friends != null) {
              var sorted = filterUnwanted(resultData.friends);
              sorted.sort((a, b) =>
                a.contact_name > b.contact_name
                  ? 1
                  : b.contact_name > a.contact_name
                    ? -1
                    : 0,
              );
              setFriendsearch(sorted);
              // console.log(sorted);
              setAllfriends(sorted);
            } else {
              setFriendsearch(resultData.friends);
              // console.log(sorted);
              setAllfriends(resultData.friends);
            }
          } else {
            console.log('server error');
          }
          //console.log(allfriends.length);

          setLoading(false);

          console.log(resultData.friends.length);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
          console.log(err);
        }
      };
      getFriends();
    }, []),
  );
  useEffect(() => {
    // console.log('noo');
    setFriend(props.friend);
  }, [props.friend]);
  const getPhoneNumber = async () => {
    return selectContactPhone().then((selection) => {
      if (!selection) {
        return null;
      }
      // console.log(selection);
      var frnd = [];
      let { contact, selectedPhone } = selection;
      frnd['name'] = contact.name;
      frnd['phone'] = selectedPhone.number;
      console.log(
        `Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`,
      );
      setFriend(frnd);
      props.onChange(frnd);
    });
  };
  const validate = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mob = /^[0-9]+$/;
    var email = f_email.trim();
    var error_status = 0;
    if (fname == '') {
      setError_n('*Required');
      error_status = 1;
    } else {
      setError_n(null);
    }
    // if (fphone == '') {
    //   setError_p('*Required');
    //   error_status = 1;
    // } else 
    if (fphone != '' && mob.test(fphone) === false) {
      console.log(mob.test(fphone));
      setError_p('Number is invalid');
      error_status = 1;
    } else {
      setError_p(null);
    }
    if (email != '' && email != null && reg.test(email) === false) {
      setError_e('Email is invalid');
      error_status = 1;
    } else {
      setError_e(null);
    }
    if (error_status == 0) {
      savefriend();
    }
  };

  const savefriend = async () => {
    setLoading(true);
    try {
      let newfriend;
      newfriend = wizardActions.addFriends(
        fname,
        fphone,
        f_email,
        gender_input,
        userData,
      );
      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(newfriend);
      // console.log(result);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      // console.log(resultData);
      //setAllfriends(resultData.friend);
      setLoading(false);
      if (resultData.state) {
        props.onChange(resultData.friend);
        setModalVisible(!modalVisible);
        allfriends.push(resultData.friend);
      }

      // console.log(resultData.state);
    } catch (err) {
      console.log(err.message);
      // alert('Error,Something went wrong');
      setLoading(false);
    }
  };
  const searchFriend = (term) => {
    setSearchterm(term);
    if (term != '') {
      let search_rslt1 =
        allfriends == null
          ? null
          : allfriends.filter(
            (item) =>
              item.contact_name != null && item.contact_name.includes(term),
          );
      setFriendsearch(search_rslt1);
      // this.setState({ search_rslt: search_rslt1 });
    } else {
      setFriendsearch(allfriends);
    }
  };
  const renderItem = ({ item }) => {

    return (
      <TouchableOpacity
        onPress={() => {
          props.onChange(item);
        }}
        style={{
          width: windowWidth - 15,
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: 7,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}>
        {item.contact_name != '' &&
          item.contact_name != null &&
          item.contact_name != 'null' ? (
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: 'black',
              marginRight: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 15 }}>
              {item.contact_name.slice(0, 1)}
            </Text>
          </View>
        ) : null}

        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            {item.contact_name}
          </Text>
          <Text style={{ fontSize: 13 }}>{item.mobile1}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  const renderComponent = () => {
    if (loading) {
      return (
        <ScrollView>
          <View style={{ flexDirection: 'column', justifyContent: 'center', height: 70 }}>

            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', height: 70 }}>

            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', height: 70 }}>

            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', height: 70 }}>

            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', height: 70 }}>

            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', height: 70 }}>

            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', height: 70 }}>

            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', height: 70 }}>

            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', height: 70 }}>

            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
        </ScrollView>
      );
    } else {
      if (friendsearch && friendsearch.length > 0) {
        return (
          <FlatList
            data={friendsearch}
            // ListHeaderComponent={()=>()}
            renderItem={renderItem}
            //Setting the number of column

            keyExtractor={(item, index) => 'key' + index}
          />
        );
      } else {
        return (
          <View style={{ height: windowHeight / 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16 }}>No contacts</Text>
          </View>
        );
      }
    }
  }

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={[styles.centeredView, { marginTop: 70 }]}
          onPressOut={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalView}>
            <Icon
              onPress={() => setModalVisible(!modalVisible)}
              name="closecircle"
              style={{ position: 'absolute', padding: 10, right: 0, top: 0 }}
              size={25}
              color="red"
            />
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 25 }}>
              Add New Friend
              </Text>
            <View style={{ height: 40, width: '100%', marginVertical: 10 }}>
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderBottomWidth: 1,
                  width: '100%',
                }}
                placeholder="Friend's Name"
                placeholderTextColor="#919292"
                onChangeText={(text) => setFname(text)}
                value={fname}
              />
              {error_n != null ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 10,
                    position: 'absolute',
                    right: 0,
                    top: 12,
                  }}>
                  {error_n}
                </Text>
              ) : null}
            </View>
            <View style={{ height: 40, width: '100%', marginVertical: 10 }}>
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderBottomWidth: 1,
                  width: '100%',
                  // marginVertical: 10,
                }}
                type="number"
                keyboardType="numeric"
                placeholder="Phone Number"
                placeholderTextColor="#919292"
                onChangeText={(text) => setFphone(text)}
                value={fphone}
              />
              {error_p != null ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 10,
                    position: 'absolute',
                    right: 0,
                    top: 12,
                  }}>
                  {error_p}
                </Text>
              ) : null}
            </View>
            <View style={{ height: 40, width: '100%', marginVertical: 10 }}>
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderBottomWidth: 1,
                  width: '100%',
                  // marginVertical: 10,
                }}
                placeholder="Email"
                placeholderTextColor="#919292"
                onChangeText={(text) => setF_email(text)}
                value={f_email}
              />
              {error_e != null ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 10,
                    position: 'absolute',
                    right: 0,
                    top: 12,
                  }}>
                  {error_e}
                </Text>
              ) : null}
            </View>
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'green',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text style={{ paddingLeft: 10, color: 'gray', fontSize: 16 }}>
                Gender
                </Text>
              <TouchableOpacity
                onPress={() => setGender_input('Female')}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 15,
                    backgroundColor: gender_input == 'Female' ? 'gray' : null,
                  }}></View>
                <Text style={{ color: 'gray', fontSize: 14 }}>
                  {'  '}Female
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setGender_input('Male')}
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
                    backgroundColor: gender_input == 'Male' ? 'gray' : null,
                  }}></View>
                <Text style={{ color: 'gray', fontSize: 14 }}>{'  '}Male</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#B60612',
                textAlign: 'center',
                fontSize: 15,

              }}>
              Please make sure the number is correct,
              otherwise you won't be able to see their Wishlist. If this is for an infant, you can skip it.
              </Text>
            <TouchableOpacity
              onPress={() => validate()}
              style={{
                width: 150,
                backgroundColor: 'grey',
                borderRadius: 10,
                padding: 10,
                marginTop: 30,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 15,
                }}>
                SAVE
                </Text>
            </TouchableOpacity>

            {/* <ScrollView>
              <TouchableOpacity
                onPress={() => alert('hlo')}
                style={{
                  width: '100%',
                  backgroundColor: 'red',
                  padding: 10,
                }}>
                <View>
                  <Text style={styles.modalText}>Select Occassions</Text>
                </View>
              </TouchableOpacity>
              {occasions.map((occasion, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => alert('hlo')}
                    key={index}
                    style={{
                      width: '100%',
                      //   backgroundColor: 'green',
                      marginBottom: 20,
                    }}>
                    <View>
                      <Text style={styles.modalText}>
                        {occasion.occasion_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
           */}
          </View>
        </TouchableOpacity>
      </Modal>
      <Text
        style={{
          textAlign: 'left',
          fontFamily: 'Roboto-Regular',
          fontSize: 18,
          marginTop: 20,
          marginBottom: 20,
        }}>
        Who are you gifting for?
      </Text>

      {friend != null ? (
        <View
          style={{
            width: windowWidth - 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            elevation: 2,
            marginVertical: 10,
            backgroundColor: 'white',
            padding: 7,
            borderRadius: 8,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: 'black',
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 15 }}>
                {friend.contact_name.slice(0, 1)}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                {friend.contact_name}
              </Text>
              <Text style={{ fontSize: 13 }}>{friend.mobile1}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => props.onChange(null)}>
            <Icon name="closecircle" size={18} color="red" />
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.card}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'flex-start' }}>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderBottomWidth: 1,
              width: '100%',
              marginVertical: 10,
              alignSelf: 'flex-start',
            }}
            placeholder="Search"
            onChangeText={(text) => searchFriend(text)}
            value={searchterm}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              flexDirection: 'row',
              height: 50,
              width: 180,
              borderRadius: 25,
              elevation: 5,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: -5,
              right: 0,
            }}>
            <Text> ADD NEW CONTACT </Text>
            <Icon name="plus" size={25} color="black" />
          </TouchableOpacity>
        </View>

        {renderComponent()}


      </View>
    </View>
  );
}
