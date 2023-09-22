import React, {Component, useState} from 'react';
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
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import hamburger from '../assets/images/hamburger.png';
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import Loader from '../components/Loader';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Notifications from '../components/Notifications';
import {useFocusEffect} from '@react-navigation/native';
//Personal
import Friends from '../components/Contacts';
import {useSelector} from 'react-redux';
import styles from '../styles/resetStyle';

const ContactEditScreen = ({navigation}) => {
  const userData = useSelector((state) => state.auth);
  console.log(userData);
  const [searchInput, setSearchInput] = useState(null);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [navscreen, setnavscreen] = React.useState('');
  const [otp_input, setOtp_input] = React.useState('');
  const [current_password_input, setcurrent_password_input] = React.useState(
    '',
  );
  const [password_input, setPassword_input] = React.useState('');
  const [cpassword_input, setCpassword_input] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [otpmodal, setotpmodal] = React.useState(false);
  const [otperr, setotperr] = React.useState(false);
  const [tempotpalert, settempotpalert] = React.useState(false);
  const [otpSuccess, setotpSuccess] = React.useState(false);
  const [emailStatus, setemailStatus] = React.useState(false);

  const [errors, setErrors] = React.useState({
    current_error: null,
    password_error: null,
    cpassword_error: null,
  });
  const dispatch = useDispatch();

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
      <Modal transparent={true} animationType={'fade'} visible={otpmodal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {tempotpalert && <Text style={styles.modalText}>{msg}</Text>}
            {otpSuccess ? (
              <TouchableOpacity onPress={() => signupProcess()}>
                <Icon name="checkcircle" size={60} color="#cb9b27" />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderBottomWidth: 1,
                    width: 150,
                  }}
                  keyboardType="numeric"
                  placeholderTextColor="#808080"
                  placeholder="Enter OTP here"
                  onChangeText={(text) => setOtp_input(text)}
                  value={otp_input}
                />
                {otperr != null && <Text style={styles.error}>{otperr}</Text>}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: 20,
                  }}>
                  <TouchableOpacity onPress={() => setotpmodal(false)}>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      Edit mobile number
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      settempotpalert(true);
                      setmsg('OTP sent successfully.');
                      setTimeout(() => {
                        settempotpalert(false);
                      }, 5000);
                    }}>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableHighlight
                  onPress={() => {
                    // setotpmodal(false);
                    otpVerification();
                  }}
                  style={{
                    ...styles.openButton,
                    backgroundColor: '#cb9b27',
                  }}>
                  <Text style={styles.textStyle}>VERIFY</Text>
                </TouchableHighlight>
              </View>
            )}
          </View>
        </View>
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
            style={{width: 100}}>
            <Icon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{paddingLeft: 20}}
            />
          </TouchableOpacity>

          <Image source={Logo_Text_white} style={{width: 119, height: 16}} />
          <View style={{width: 90, height: 16}}></View>
        </View>
      </View>
      {/* <View>
        <Text
          style={{
            color: 'red',
            fontStyle: 'normal',
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
            lineHeight: 20,
            padding: 20,
            paddingBottom: 0,
            // right: 16,
          }}>
          RESET PASSWORD
        </Text>
      </View> */}
      <Friends
      //   friend={params['friend']}
      // onChange={(friend) => loadfrienddata(friend)}
      />
      {/* <View style={styles.bottom}>
        <View
          style={{
            height: Platform.OS == 'ios' ? 80 : 50,
            backgroundColor: '#B60612',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            //  onPress={() => ValidationProcess()}
            onPress={() => {
              ValidationProcess();
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
          </TouchableOpacity>
        </View>
      </View>
    */}
    </View>
  );
};

export default ContactEditScreen;
