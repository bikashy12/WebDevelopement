import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';
// import {Images} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
const windowWidth = Dimensions.get('window').width;

import loading_logo from '../assets/images/logo.png';
import Logo_Text from '../assets/images/Logo_Text.png';
import wifi from '../assets/images/wifi.png';

import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import Contacts from 'react-native-contacts';
import {useSelector} from 'react-redux';
import ProgressBar from '../components/Progressbar';

export default function SplashScreen({navigation}) {
  const isAuth = useSelector((state) => !!state.auth.token);
  const userData = useSelector((state) => state.auth);
  const c_details = userData.contact_details;
  const progress = useRef();
  const [percentage, setPercentage] = useState(10);
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [msg, setmsg] = React.useState('');
  const [c_modal, setCmodal] = React.useState(false);
  const [c_msg, setCmsg] = React.useState('Syncing contacts please wait...');
  const [c_load, setCload] = React.useState(false);
  const [offline, setOffline] = React.useState(false);

  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      // console.log('newwwww' + JSON.stringify(userData));
      const requestContactsPermission = async () => {
        if (Platform.OS == 'android') {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts',
              message: 'This app would like to view your contacts.',
              buttonPositive: 'Please accept bare mortal',
            },
          ).then((permission) => {
            console.log(permission);
            if (permission === 'granted') {
              loadContacts();
            }else
            {
              setCmsg('Loading shop catalog ...');
              progress.current.onAnimation(100);
            }
           // loadContacts();
          });
        } else {
          Contacts.checkPermission().then(permission => {
            // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
            console.log(permission);
            if (permission === 'undefined') {
              Contacts.requestPermission().then(permission => {
                console.log(permission);
                if (permission === 'authorized') {
                  loadContacts();
                }
                if (permission === 'denied') {
                  setCmsg('Loading shop catalog ...');
                  progress.current.onAnimation(100);
                }
              })
            }
            if (permission === 'authorized') {
              loadContacts();
            }
            if (permission === 'denied') {
              setCmsg('Loading shop catalog ...');
              progress.current.onAnimation(100);
            }
          })
          //loadContacts();
        }
      };
      NetInfo.fetch().then((state) => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (state.isConnected) {
          if (isAuth && !userData.contact_upload) {
            console.log(userData);
            requestContactsPermission();
          } else {
            setCmsg('Loading shop catalog ...');
            progress.current.onAnimation(100);
            //condition for navigation
          }
        } else {
          setOffline(true);
          setCmsg('Network Error.....');
        }
      });
    }, [dispatch]),
  );

  async function uploadContacts(phn_contacts, contact_details) {
    try {
      let uploadcontact;
      uploadcontact = authActions.uploadContacts(
        phn_contacts,
        contact_details,
        userData,
      );
      // console.log('=====================');
      // console.log(otpaction);

      const result = await dispatch(uploadcontact);
      const resultData = JSON.parse(result);
      //  console.log('-----------');
      console.log(resultData);
      // console.log(resultData.state);

      if (resultData.state == true) {
        setCmsg(resultData.message);
        setTimeout(() => {
          console.log('dispatch');
          dispatch(authActions.setContactsUpload());
        }, 200);
        progress.current.onAnimation(100);
        setCmsg('Loading shop catalog ...');
        //set progress 100% and navigate

        // setuploadSuccess(true);
        // settempotpalert(true);
        // var username = username_input.trim();
        // var name = name_input.trim();
        // var email = email_input.trim();
        // var mobile = mobile_input.trim();
        // var password = password_input.trim();
        // let action;
        // action = authActions.signup(
        //   username,
        //   name,
        //   mobile,
        //   email,
        //   gender_input,
        //   password,
        // );
        // console.log(action);
        // const result = dispatch(action);
        // console.log(result);
      } else {
        // setCload(false);
        //  settempotpalert(true);
        setCmsg(resultData.message);
      }
    } catch (err) {
      // alert('Error,Something went wrong');
      // setCload(false);
      setCmsg(err.message);
    }
  }

  async function loadContacts() {
    if (Platform.OS == 'ios') {
      Contacts.getAll()
        .then((contacts) => {
          if(contacts.length>0){
          console.log(contacts);
          let contact_details = {};
          let lastcontact = contacts[contacts.length - 1];
          contact_details.total_length = contacts.length;
          contact_details.recordID = lastcontact.recordID;
          contact_details.last_index = contacts.length - 1;
          contact_details.userId = userData.userId;
          progress.current.onAnimation(60);
          //set progressbar to 60%

          // console.log(contacts.length); ̰

          // console.log(lastcontact);
          // console.log('hhhhhhhhhhhh')
          //  console.log(userData.contact_details);
          console.log(c_details);
       
            uploadContacts(contacts, contact_details);
          }else{
            console.log('no  contacts');
                    progress.current.onAnimation(100);
                    setCmsg('Loading shop catalog ...');
          }
          //console.log(nwcontacts);
          //uploadContacts(contacts,contact_details);
        })
        .catch((e) => {
          setCload(false);
          setCmsg('Contact sync error!!');
          console.log(e);
        });
    } else {
      Contacts.checkPermission().then((permission) => {
        // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
        if (permission === 'undefined') {
          //  Contacts.requestPermission().then(permission => {
          console.log(permission);
          // })
        }
        if (permission === 'authorized') {
          Contacts.getAll()
            .then((contacts) => {
              let contact_details = {};
              if(contacts.length>0){
              let lastcontact = contacts[contacts.length - 1];
              contact_details.total_length = contacts.length;
              contact_details.recordID = lastcontact.recordID;
              contact_details.last_index = contacts.length - 1;
              contact_details.userId = userData.userId;
              progress.current.onAnimation(60);
              //set progressbar to 60%

              // console.log(contacts.length);

              // console.log(lastcontact);
              // console.log('hhhhhhhhhhhh')
              //  console.log(userData.contact_details);
              console.log(userData);
              console.log(c_details);
              if (c_details != null) {
                if (c_details.userId == userData.userId) {
                  if (lastcontact.recordID > c_details.recordID) {
                    let i = contacts.length - 1;
                    let nwcontacts = [];
                    while (contacts[i].recordID > c_details.recordID) {
                      nwcontacts.push(contacts[i]);
                      i--;
                    }
                    let contactsnw = nwcontacts.reverse();
                    console.log(contactsnw.length + ' new');
                    uploadContacts(contactsnw, contact_details);
                  } else {
                    console.log('no new contacts');
                    progress.current.onAnimation(100);
                    setCmsg('Loading shop catalog ...');
                    //navigation options
                  }
                } else {
                  uploadContacts(contacts, contact_details);
                }
              } else {
                uploadContacts(contacts, contact_details);
              }
            }
              else {
                console.log('no contacts');
                progress.current.onAnimation(100);
                setCmsg('Loading shop catalog ...');
                //navigation options
              }
              //console.log(nwcontacts);
              //uploadContacts(contacts,contact_details);
            })
            .catch((e) => {
              setCload(false);
              setCmsg('Contact sync error!!');
              console.log(e);
            });
        }
        if (permission === 'denied') {
          setCload(false);
          setCmsg('Contact sync error. Please accept Permission');
          // console.log(e);
        }
      });
    }
  }
  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.box}>
        <Image style={styles.image} source={loading_logo} />
       
        <Text style={styles.heading}>FIND THE PERFECT GIFT</Text>
      </View>
      <View style={styles.box}>
        {offline ? <Image style={styles.offline} source={wifi} /> : null}
        {offline ? null : (
          <TouchableOpacity style={styles.blueButton}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <ProgressBar
                navigation={navigation}
                ref={progress}
                percentage={percentage}
              />
            </View>
          </TouchableOpacity>
        )}
        <Text style={styles.shoping}>{c_msg}</Text>
      </View>
      {offline ? null : (
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.welcomeButton}>
            <View>
              <Text style={styles.welcomeText}>Welcome to Govava</Text>
            </View>
            <View
              style={{
                marginTop: 5,
                borderWidth: 3,
                borderColor: '#cb9b27',
                width: '100%',
              }}></View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  image: {
   // marginTop: 56,
    width: windowWidth,
    height: windowWidth,
   resizeMode:'contain',
 //  backgroundColor:'red'
  },
  imageText: {
    marginTop: 37,
  },
  heading: {
    marginTop: 60,

    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    //  width: 162,
    height: 21,
    color: '#B60612',
    fontStyle: 'normal',
    fontFamily: 'Roboto-Italic',
  },
  shoping: {
    color: 'grey',
    fontSize: 13,
    fontWeight: '400',

    fontStyle: 'normal',
    fontFamily: 'Roboto-Regular',
    marginBottom: 5,
  },
  divider: {
    marginTop: 25.5,
    //borderBottomColor: '#E4E9EA',
    // borderBottomWidth: 1,
    width: '80%',
  },
  bottom: {
    // flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    width: windowWidth,
    paddingHorizontal: 40,
    alignSelf: 'flex-end',
  },
  welcomeButton: {
    height: 60,

    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    // fontWeight: '600',
    fontSize: 16,
    color: 'black',
    fontFamily: 'Roboto-Medium',
    marginBottom: 15,
  },
  blueButton: {
    height: 60,
    // backgroundColor: '#163053',
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  triangle: {
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ffffff',
    bottom: 22,
  },
  arrowDown: {
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offline: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
  box: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
});
