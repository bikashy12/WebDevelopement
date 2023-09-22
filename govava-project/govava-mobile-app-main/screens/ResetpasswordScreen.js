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
//Personal
import {useSelector} from 'react-redux';
import styles from '../styles/resetStyle';

const ResetPasswordScreen = ({navigation}) => {
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

  //validation
  const ValidationProcess = (props) => {
    // console.log(props);
    var current_password = current_password_input.trim();
    var password = password_input.trim();
    var cpassword = cpassword_input.trim();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // alert(name);
    if (password == '' && current_password == '' && cpassword == '') {
      return;
    } else if (current_password == '') {
      setErrors({
        ...errors,
        ['current_error']: 'Current password is required',
      });
    } else if (current_password.length < 8) {
      setErrors({
        ...errors,
        ['current_error']: 'Password minimum length is 8',
      });
    } else if (/[^a-zA-Z@!#$0-9\-\/]/.test(current_password)) {
      setErrors({
        ...errors,
        ['current_error']: 'Password is invalid',
      });
    } else if (password == '') {
      setErrors({
        ...errors,
        ['password_error']: 'Password is required',
        ['current_error']: null,
      });
    } else if (password.length < 8) {
      setErrors({
        ...errors,
        ['password_error']: 'Password minimum length is 8',
        ['current_error']: null,
        ['cpassword_error']: null,
      });
    } else if (/[^a-zA-Z@!#$0-9\-\/]/.test(password)) {
      setErrors({
        ...errors,
        ['password_error']: 'Password is invalid',
        ['cpassword_error']: null,
        ['current_error']: null,
      });
    } else if (cpassword == '') {
      setErrors({
        ...errors,
        ['cpassword_error']: 'Password is required',
        ['password_error']: null,
        ['current_error']: null,
      });
    } else if (password != cpassword) {
      setErrors({
        ...errors,
        ['cpassword_error']: "Passwords don't match",
        ['password_error']: null,
        ['current_error']: null,
      });
    } else {
      setErrors({
        ...errors,
        ['cpassword_error']: null,
        ['password_error']: null,
      });
      changePassword();
    }
  };

  async function changePassword(props) {
    setLoading(true);
    try {
      var current_password = current_password_input.trim();
      var password = password_input.trim();
      var cpassword = cpassword_input.trim();
      var userId = userData.userId;
      let action;
      action = authActions.resetPassword(
        current_password,
        password,
        cpassword,
        userId,
      );

      const result = await dispatch(action);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      console.log(resultData.state);

      if (resultData.state == true) {
        setLoading(false);
        setnavscreen('Settings');
        setmsg(resultData.message);
        setnotification(true);
      } else {
        setLoading(false);
        setnavscreen('Reset');
        setmsg(resultData.message);
        setnotification(true);
      }
    } catch (err) {
      // alert('Error,Something went wrong');
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
            justifyContent: 'space-between',
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
      <View>
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
      </View>
      <ScrollView
        style={{
          width: '100%',
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 20,
        }}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor="#808080"
          placeholder="Current Password"
          secureTextEntry
          onChangeText={(text) => setcurrent_password_input(text)}
          value={current_password_input}
        />
        {errors['current_error'] != null && (
          <Text style={styles.error}>{errors['current_error']}</Text>
        )}
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor="#808080"
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword_input(text)}
          value={password_input}
        />
        {errors['password_error'] != null && (
          <Text style={styles.error}>{errors['password_error']}</Text>
        )}
        <TextInput
          secureTextEntry
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor="#808080"
          placeholder="Confirm Password"
          onChangeText={(text) => setCpassword_input(text)}
          value={cpassword_input}
        />
        {errors['cpassword_error'] != null && (
          <Text style={styles.error}>{errors['cpassword_error']}</Text>
        )}
        <View style={{marginBottom: 100}}></View>
      </ScrollView>

      <View style={styles.bottom}>
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
    </View>
  );
};

export default ResetPasswordScreen;
