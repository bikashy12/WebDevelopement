import React, {Component, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

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
  TouchableWithoutFeedback,
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
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Notifications from '../components/NotificationsNav';
//Personal
import {useSelector} from 'react-redux';
import styles from '../styles/personalStyle';
import CountryPicker from 'react-native-country-picker-modal';
import Icon2 from 'react-native-vector-icons/AntDesign';

const PersonalScreen = ({navigation}) => {
  const userData = useSelector((state) => state.auth);
  // console.log(userData);
  // alert(userData.country);
  const [searchInput, setSearchInput] = useState(null);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  // const [numberdisp, setnumberdisp] = React.useState(userData.mobile!=null?);
  const [navscreen, setnavscreen] = React.useState('');
  const [name_input, setName_input] = React.useState(userData.name);
  const [username_input, setUsername_input] = React.useState(userData.username);
  const [email_input, setEmail_input] = React.useState(userData.email);
  const [gender_input, setGender_input] = React.useState(userData.gender);
  const [mobile_input, setMobile_input] = React.useState(userData.mobile);
  const [otp_input, setOtp_input] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [otpmodal, setotpmodal] = React.useState(false);
  const [otperr, setotperr] = React.useState(false);
  const [tempotpalert, settempotpalert] = React.useState(false);
  const [otpSuccess, setotpSuccess] = React.useState(false);
  const [emailMobileStatus, setemailMobileStatus] = React.useState(false);
  const [errors, setErrors] = React.useState({
    username_error: null,
    name_error: null,
    mobile_error: null,
    gender_error: null,
    email_error: null,
  });
  //countrycode picker
  var defaultcountry = {
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  };
  const [countryCode, setCountryCode] = React.useState(
    userData.country == null ? 'US' : userData.country,
  );
  const [country, setCountry] = React.useState(defaultcountry);
  const [withCountryNameButton, setWithCountryNameButton] = React.useState(
    false,
  );
  const [withCurrencyButton, setWithCurrencyButton] = React.useState(false);
  const [withFlagButton, setWithFlagButton] = React.useState(false);
  const [withCallingCodeButton, setWithCallingCodeButton] = React.useState(
    true,
  );
  // var defaultcountry ={"cca2":"IN","currency":}
  const [withFlag, setWithFlag] = React.useState(true);
  const [withEmoji, setWithEmoji] = React.useState(true);
  const [withFilter, setWithFilter] = React.useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = React.useState(false);
  const [withCallingCode, setWithCallingCode] = React.useState(true);
  const [withCurrency, setWithCurrency] = React.useState(false);
  const [withModal, setWithModal] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [dark, setDark] = React.useState(false);
  const [disableNativeModal, setDisableNativeModal] = React.useState(false);
  const [usernameverifymsg, setusernameverifymsg] = React.useState(null);
  const onSelect = (country) => {
    console.log(country);
    setCountryCode(country.cca2);
    setCountry(country);
  };
  const switchVisible = () => setVisible(!visible);

  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      const InitialSettings = async () => {};
      InitialSettings();
    }),
  );
  //validation
  const ValidationProcess = async (props) => {
    if (emailMobileStatus == true) {
      return;
    }
    // console.log(props)
    var username = null;
    var name = null;
    var email = null;
    var mobile = null;
    if (username_input != null) {
      username = username_input.trim();
    }
    if (name_input != null) {
      name = name_input.trim();
    }
    if (email_input != null) {
      email = email_input.trim();
    }
    if (mobile_input != null) {
      mobile = mobile_input.trim();
    }

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var regex = /^[0-9]+$/;
    if (userData.username==null && username != null) {
      var usr_err = await usernameVerification(username);
      if (usr_err) {
        return;
      }
    }
    // alert(name);
    if (username == '' && name == '' && email == '' && mobile == '') {
      return;
    }  else if (name == '') {
      setErrors({...errors, ['name_error']: 'Name is required'});
    } else if (email == '') {
      setErrors({
        ...errors,
        ['email_error']: 'Email is required',
        ['name_error']: null,
      });
    } else if (reg.test(email) === false) {
      setErrors({
        ...errors,
        ['email_error']: 'Email is invalid',
        ['name_error']: null,
      });
    } else if (mobile != null && regex.test(mobile) == false) {
      setErrors({
        ...errors,
        ['mobile_error']: 'Enter valid mobile number',
        ['username_error']: null,
        ['name_error']: null,
        ['email_error']: null,
      });
    } else if (gender_input == '') {
      setErrors({
        ...errors,
        ['gender_error']: 'Gender is required',
        ['mobile_error']: null,
        ['username_error']: null,
        ['name_error']: null,
        ['email_error']: null,
      });
    } else {
      setErrors({
        ...errors,

        ['gender_error']: null,
        ['mobile_error']: null,
        ['username_error']: null,
        ['name_error']: null,
        ['email_error']: null,
      });
      if(userData.mobile ==null && mobile!=null){
        sendOtp();
      }else{
        signupProcess();
      }
      // if (userData.mobile !=null  ) {
      //   signupProcess();
      // } else {
      //   // setotpmodal(true);
      //   sendOtp();
      // }
      // setotpmodal(true);
    }
  };
  async function sendOtp(props) {
    var email = null;
    var mobile = null;

    if (email_input != null) {
      email = email_input.trim();
    }
    if (mobile_input != null) {
      mobile = mobile_input.trim();
    }
    var callingCode = null;
    var countryCode = null;
    if(userData.mobile == null||userData.mobile == ''){
      callingCode = country.callingCode.toString();
      countryCode = country.cca2;
    }else{
      callingCode = userData.country_code;
    countryCode = userData.country;
    }
    // var email = email_input.trim();
    // var mobile = mobile_input.trim();
    // alert(countryCode);
    // return;
    setLoading(true);
    try {
      let otpaction;
      var country_code = callingCode;
      otpaction = authActions.sendOtp(email, mobile,country_code);
      // console.log('=====================');
      // console.log(otpaction);

      const result = await dispatch(otpaction);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      console.log(resultData.state);

      if (resultData.state == true) {
        setLoading(false);
        setotpmodal(true);
      } else {
        setLoading(false);
        setnavscreen('signup');
        setmsg(resultData.message);
        setnotification(true);
      }
    } catch (err) {
      // alert('Error,Something went wrong');
      setLoading(false);
    }
  }
  async function otpVerification(props) {
    var email = null;
    var mobile = null;

    if (email_input != null) {
      email = email_input.trim();
    }
    if (mobile_input != null) {
      mobile = mobile_input.trim();
    }
    // var email = email_input.trim();
    // var mobile = mobile_input.trim();
    var otp = otp_input;
    setLoading(true);
    try {
      let otpaction;
      otpaction = authActions.otpVerification(otp, email, mobile);
      // console.log('=====================');
      // console.log(otpaction);

      const result = await dispatch(otpaction);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      // console.log(resultData);
      // console.log(resultData.state);

      if (resultData.state == true) {
        setLoading(false);
        setmsg(resultData.message);

        setotpSuccess(true);
        settempotpalert(true);
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
        // navigation.navigate('Login');
      } else {
        setLoading(false);
        settempotpalert(true);
        setmsg(resultData.message);
      }
    } catch (err) {
      // alert('Error,Something went wrong');
      setLoading(false);
    }
  }

  async function signupProcess(props) {
    var callingCode = null;
    var countryCode = null;
    if(userData.mobile == null||userData.mobile == ''){
      callingCode = country.callingCode.toString();
      countryCode = country.cca2;
    }else{
      callingCode = userData.country_code;
    countryCode = userData.country;
    }
    // if (country != null) {
    //   callingCode = country.callingCode.toString();
    //   countryCode = country.cca2;
    // } else {
    // callingCode = userData.country_code;
    // countryCode = userData.country;
    // }
    // alert(country.cca2);
    // return;
    // console.log(callingCode);
    // alert(countryCode+'-'+callingCode)
    // return;
    setLoading(true);
    try {
      var username = null;
      var name = null;
      var email = null;
      var mobile = null;
      if (username_input != null) {
        username = username_input.trim();
      }
      if (name_input != null) {
        name = name_input.trim();
      }
      if (email_input != null) {
        email = email_input.trim();
      }
      if (mobile_input != null) {
        mobile = mobile_input.trim();
      }
      // var username = username_input.trim();
      // alert(username);
      // var name = name_input.trim();
      // var email = email_input.trim();
      // var mobile = mobile_input.trim();
      var userId = userData.userId;
      let action;
      action = authActions.updateProfile(
        username,
        name,
        mobile,
        email,
        gender_input,
        userId,
        callingCode,
        countryCode,
      );

      const result = await dispatch(action);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      // console.log(resultData);
      // console.log(resultData.state);

      if (resultData.state == 200) {
        setLoading(false);
        setnavscreen('Settings');
        setmsg(resultData.message);
        setnotification(true);
        // navigation.navigate('Settings');
      } else {
        setLoading(false);
        setnavscreen('Personal');
        setmsg(resultData.message);
        setnotification(true);
      }
    } catch (err) {
      // alert('Error,Something went wrong');
      setLoading(false);
    }
  }

  async function emailVerification(email_input) {
    var email = null;

    if (email_input != null) {
      email = email_input.trim();
    }
    try {
      if (userData.email == email) {
        setErrors({
          ...errors,
          ['email_error']: null,
        });
        return;
      }
      var email = email;
      let action;
      action = authActions.emailVerification(email);

      const result = await dispatch(action);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      console.log(resultData.state);

      if (resultData.state == 200) {
        setErrors({
          ...errors,
          ['email_error']: 'email already exists',
        });
        setemailMobileStatus(true);
      } else {
        setemailMobileStatus(false);
        setErrors({
          ...errors,
          ['email_error']: null,
        });
      }
    } catch (err) {
      // alert('Error,Something went wrong');
    }
  }
  async function mobileVerification(mobile_input) {
    try {
      if (userData.mobile == mobile_input.trim()) {
        return;
      }
      var mobile = mobile_input.trim();
      let action;
      action = authActions.mobileVerification(mobile);

      const result = await dispatch(action);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      console.log(resultData.state);

      if (resultData.state == 200) {
        setErrors({
          ...errors,
          ['mobile_error']: 'mobile number already exists',
        });
        setemailMobileStatus(true);
      } else {
        setemailMobileStatus(false);
        setErrors({
          ...errors,
          ['mobile_error']: null,
        });
      }
    } catch (err) {
      // alert('Error,Something went wrong');
    }
  }
  async function usernameVerification(username) {
    try {
      var email = email_input.trim();
      let action;
      action = authActions.usernameVerification(username);

      const result = await dispatch(action);
      const resultData = JSON.parse(result);
      console.log('----Email-------');
      console.log(resultData);
      console.log(resultData.state);

      if (resultData.state == 200) {
        // setErrors({
        //   ...errors,
        //   ['email_error']: 'Email already exists',
        // });
        setusernameverifymsg('Username already exists');

        // setemailMobileStatus(true);
        return 1;
      } else {
        setemailMobileStatus(false);
        console.log('not already exist');
        setusernameverifymsg(null);
        // setErrors({
        //   ...errors,
        //   ['email_error']: null,
        //   ['username_error']: errors['username_error'],
        //   ['name_error']: errors['name_error'],
        //   ['cpassword_error']: errors['cpassword_error'],
        //   ['password_error']: errors['password_error'],
        //   ['mobile_error']: errors['mobile_error'],
        // });

        // setemailverifymsg(null);
        return 0;
      }
    } catch (err) {
      // alert('Error,Something went wrong');

      setErrors({
        ...errors,

        ['email_error']: 'Loading error',
      });
      return 1;
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
        transparent={true}
        animationType={'fade'}
        visible={otpmodal}
        onRequestClose={() => {
          {
            otpSuccess == false && setotpmodal(!otpmodal);
          }
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          onPressOut={() => {
            otpSuccess == false && setotpmodal(!otpmodal);
          }}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              {tempotpalert && <Text style={styles.modalText}>{msg}</Text>}
              {otpSuccess ? (
                <TouchableOpacity
                  onPress={() => {
                    setOtp_input('');
                    setotpSuccess(false);
                    setmsg('');
                    settempotpalert(false);
                    setotpmodal(false);
                    signupProcess();
                  }}>
                  <AntDesignIcon name="checkcircle" size={60} color="#cb9b27" />
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
                        sendOtp();
                        settempotpalert(true);
                        setmsg('OTP sent successfully.');
                        setTimeout(() => {
                          settempotpalert(false);
                        }, 3000);
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
          PROFILE
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <TextInput
          style={{
            marginTop: 20,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          editable={userData.username==null?true:false}
          placeholderTextColor="#808080"
          placeholder="Username"
          onChangeText={(text) =>{usernameVerification(text); setUsername_input(text)}}
          value={username_input}
        />
        {/* {errors['username_error'] != null && (
          <Text style={styles.error}>{errors['username_error']}</Text>
        )}
         */}
          {usernameverifymsg != null && (
            <Text style={styles.error}>{usernameverifymsg}</Text>
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
          placeholder="Name"
          onChangeText={(text) => setName_input(text)}
          value={name_input}
        />
        {errors['name_error'] != null && (
          <Text style={styles.error}>{errors['name_error']}</Text>
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
          editable={false}
          placeholder="Email"
          onChangeText={(text) => {
            setEmail_input(text);
            emailVerification(text);
          }}
          value={email_input}
        />
        {errors['email_error'] != null && (
          <Text style={styles.error}>{errors['email_error']}</Text>
        )}
        <View style={{flexDirection: 'row', width: '100%'}}>
          {userData.mobile == null || userData.mobile == ''
            ? 
            <View
                style={{
                  width: '27%',
                  height: 40,
                  backgroundColor: '#f3f3f3',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  borderWidth: 1,
                }}>
                <Icon2 name="caretdown" size={10} color="#808080" />
                <CountryPicker
                  theme={dark ? DARK_THEME : {}}
                  {...{
                    countryCode,
                    withFilter,
                    withFlag,
                    withCurrencyButton,
                    withCallingCodeButton,

                    onSelect,
                    disableNativeModal,
                    preferredCountries: ['US', 'IN'],
                    modalProps: {
                      visible,
                    },
                    onClose: () => setVisible(false),
                    onOpen: () => setVisible(true),
                  }}
                />
              </View>
              
            : null}
          <TextInput
            style={{
              height: 40,
              width: userData.mobile != null ? '100%' : '70%',
              // width: '100%',

              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 10,
              marginLeft: userData.mobile == null ? '3%' : 0,
            }}
            keyboardType="numeric"
            placeholderTextColor="#808080"
            // editable={userData.mobile != null ? false : true}
            editable={userData.mobile == null?true:false}
            placeholder="Mobile number"
            onChangeText={(text) => {
              mobileVerification(text);
              setMobile_input(text);
            }}
            value={mobile_input}
          />
        </View>
        {errors['mobile_error'] != null && (
          <Text style={styles.error}>{errors['mobile_error']}</Text>
        )}
        {/* <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor = {Platform.OS=='ios' && 'gray'}
          placeholder="Gender"
          onChangeText={(text) => setGender_input(text)}
          value={gender_input}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{paddingLeft: 10, color: 'gray', fontSize: 16}}>
            Gender
          </Text>
          <TouchableOpacity
            onPress={() => setGender_input('Female')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 15,
                height: 15,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 15,
                backgroundColor: gender_input == 'Female' ? 'gray' : null,
              }}></View>
            <Text style={{color: 'gray', fontSize: 14}}>{'  '}Female</Text>
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
            <Text style={{color: 'gray', fontSize: 14}}>{'  '}Male</Text>
          </TouchableOpacity>
        </View>
        {errors['gender_error'] != null && (
          <Text style={styles.error}>{errors['gender_error']}</Text>
        )}

        <View style={{marginBottom: 100}}></View>
      </ScrollView>

      <View style={styles.bottom}>
        <View
          style={{
            height: 50,
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
      <SafeAreaView></SafeAreaView>
    </View>
  );
};

export default PersonalScreen;
