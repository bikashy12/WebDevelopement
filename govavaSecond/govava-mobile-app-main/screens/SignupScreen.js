import React, {Component} from 'react';
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
import loading_logo from '../assets/images/logo.png';
import Logo_Text from '../assets/images/Logo_Text.png';
import Loader from '../components/Loader';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Notifications from '../components/Notifications';
import styles from '../styles/signupStyle';
import CountryPicker from 'react-native-country-picker-modal';
import Icon2 from 'react-native-vector-icons/AntDesign';
// import {CountryCode, Country} from './src/types';
import * as loadingActions from '../store/actions/loader';

const SignupScreen = ({route, navigation}) => {
  const {isregistered} = route.params;
  const {provider} = route.params;
  const {userdetail} = route.params;
  const {apple_id} = route.params;
  const [notification, setnotification] = React.useState(false);
  const [resendOtp, setresenOtp] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [navscreen, setnavscreen] = React.useState('');
  const [name_input, setName_input] = React.useState(isregistered!=null?userdetail.name:'');
  const [username_input, setUsername_input] = React.useState('');
  const [email_input, setEmail_input] = React.useState(isregistered!=null?userdetail.email:'');
  const [gender_input, setGender_input] = React.useState('Female');
  const [mobile_input, setMobile_input] = React.useState('');
  const [otp_input, setOtp_input] = React.useState('');
  const [password_input, setPassword_input] = React.useState('');
  const [cpassword_input, setCpassword_input] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [otpmodal, setotpmodal] = React.useState(false);
  const [otperr, setotperr] = React.useState(false);
  const [tempotpalert, settempotpalert] = React.useState(false);
  const [otpSuccess, setotpSuccess] = React.useState(false);
  const [emailMobileStatus, setemailMobileStatus] = React.useState(false);
  const [mobileStatus, setMobileStatus] = React.useState(false);
  const [emailverifymsg, setemailverifymsg] = React.useState(null);
  const [usernameverifymsg, setusernameverifymsg] = React.useState(null);
  const [mobileverifymsg, setmobileverifymsg] = React.useState(null);
  var defaultcountry = {
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  };
  // {
  //   callingCode: ['91'],
  //   cca2: 'IN',
  //   currency: ['INR'],
  //   flag: 'flag-in',
  //   name: 'India',
  //   region: 'Asia',
  //   subregion: 'Southern Asia',
  // };

  const [countryCode, setCountryCode] = React.useState('US');
  const [countryPhoneCode, setPhoneCode] = React.useState(1);

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
  const onSelect = (country) => {
    console.log(country.callingCode[0]);
    setPhoneCode(country.callingCode[0]);
    setCountryCode(country.cca2);
    setCountry(country);
  };
  const switchVisible = () => setVisible(!visible);
  const [errors, setErrors] = React.useState({
    username_error: null,
    name_error: null,
    mobile_error: null,
    gender_error: null,
    email_error: null,
    password_error: null,
    cpassword_error: null,
  });
  const dispatch = useDispatch();

  //validation
  const ValidationProcess = async (props) => {
    // console.log(props);
    await dispatch(loadingActions.setprofileloader(true));
    var username = username_input.trim();
    var name = name_input.trim();
    var email = email_input.trim();
    var mobile = mobile_input.trim();
    var password = password_input.trim();
    var cpassword = cpassword_input.trim();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //error messages
    var username_msg = null;
    var name_msg = null;
    var email_msg = null;
    var mobile_msg = null;
    var password_msg = null;
    var cpass_msg = null;
    var error_exists = 0;
    console.log(error_exists);
    // alert(name);
    // if (
    //   username == '' &&
    //   name == '' &&
    //   email == '' &&
    //   mobile == '' &&
    //   password == ''
    // ) {
    //   return;
    // }
    if (username == '') {
      username_msg = 'Username is required *';
      setusernameverifymsg(username_msg);
      error_exists = 1;
    } else {
      var usr_err;
      usr_err = await usernameVerification(username);

      if (usr_err) {
        //email_msg='Email already exists';
        error_exists = 1;
      }
    }
    console.log(error_exists);
    if (name == '') {
      name_msg = 'Name is required *';
      error_exists = 1;
    }
    console.log(error_exists);
    if (email == '') {
      setemailverifymsg('Email is required *');
      error_exists = 1;
    } else if (reg.test(email) === false) {
      setemailverifymsg('Email is invalid *');
      error_exists = 1;
    } else {
      var nw_err;
      nw_err = await emailVerification(email);

      if (nw_err) {
        //email_msg='Email already exists';
        error_exists = 1;
      }
    }
    console.log(error_exists);
    if (mobile == '') {
      setmobileverifymsg('Mobile number is required *');
      error_exists = 1;
    } else if (/^\d+$/.test(mobile)) {
      console.log(/^\d+$/.test(mobile));
      var m_err = 0;
      m_err = await mobileVerification(mobile);

      if (m_err) {
        // mobile_msg='Mobile number already exists';
        error_exists = m_err;
      }
    } else {
      setmobileverifymsg('Enter valid mobile number');
      error_exists = 1;
    }
    console.log(error_exists);
    // if (gender_input == '') {
    //   setErrors({
    //     ...errors,
    //     ['gender_error']: 'gender is required',
    //     ['mobile_error']: null,
    //     ['username_error']: null,
    //     ['name_error']: null,
    //     ['email_error']: null,
    //   });
    // } else
    if (password == '') {
      password_msg = 'Password is required *';
      error_exists = 1;
    } else if (password.length < 8) {
      password_msg = 'Password minimum length is 8 *';
      error_exists = 1;
    } else if (/[^a-zA-Z@!#$0-9\-\/]/.test(password)) {
      password_msg = 'Password is invalid *';
      error_exists = 1;
    }
    console.log(error_exists);
    if (cpassword == '') {
      cpass_msg = 'Password is required *';
      error_exists = 1;
    } else if (password != cpassword) {
      cpass_msg = "Passwords don't match *";
      error_exists = 1;
    }
    console.log(error_exists);
    if (email_msg == null) {
      email_msg = emailverifymsg;
    }
    if (mobile_msg == null) {
      mobile_msg = mobileverifymsg;
    }
    setErrors({
      ...errors,
      // ['username_error']: username_msg,
      ['name_error']: name_msg,
      ['cpassword_error']: cpass_msg,
      ['password_error']: password_msg,
      // ['mobile_error']: mobile_msg,

      // ['email_error']: email_msg,
    });

    console.log(error_exists);
    if (error_exists == 0) {
      // setotpmodal(true);
      console.log('otp trueee');
      //await dispatch(loadingActions.setprofileloader(false));
      // setLoading(false);
      sendOtp();
      // alert('success');
    } else {
      console.log('otp false');
      await dispatch(loadingActions.setprofileloader(false));
      //setLoading(false);
    }
  };
  async function sendOtp(props) {
    var country_code = country.callingCode;

    console.log('otp');
    var email = email_input.trim();
    var mobile = mobile_input.trim();
    // await dispatch(loadingActions.setprofileloader(true));
    //setLoading(true);
    try {
      let otpaction;
      otpaction = authActions.sendOtp(email, mobile, countryPhoneCode);
      // console.log('=====================');
      // console.log(otpaction);

      const result = await dispatch(otpaction);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      console.log(resultData.state);

      if (resultData.state == true) {
        await dispatch(loadingActions.setprofileloader(false));
        //setLoading(false);
        setotpmodal(true);
      } else {
        //setLoading(false);
        await dispatch(loadingActions.setprofileloader(false));
        setnavscreen('signup');
        setmsg(resultData.message);
        setnotification(true);
      }
    } catch (err) {
      console.log(err);
      // alert('Error,Something went wrong');
      //setLoading(false);
      await dispatch(loadingActions.setprofileloader(false));
    }
  }
  async function otpVerification(props) {
    var email = email_input.trim();
    var mobile = mobile_input.trim();
    var otp = otp_input;
    //setLoading(true);
    await dispatch(loadingActions.setprofileloader(true));
    try {
      let otpaction;
      otpaction = authActions.otpVerification(otp, email, mobile);
      // console.log('=====================');
      // console.log(otpaction);

      const result = await dispatch(otpaction);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      console.log(resultData.state);

      if (resultData.state == true) {
        await dispatch(loadingActions.setprofileloader(false));
        //setLoading(false);
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
        await dispatch(loadingActions.setprofileloader(false));
        //setLoading(false);
        settempotpalert(true);
        setmsg(resultData.message);
      }
    } catch (err) {
      // alert('Error,Something went wrong');
      // setLoading(false);
      await dispatch(loadingActions.setprofileloader(false));
    }
  }

  async function signupProcess(props) {
    // alert(country.cca2);
    var callingCode = country.callingCode;
    var countryCode = country.cca2;
    // setLoading(true);
    await dispatch(loadingActions.setprofileloader(true));
    try {
      var login_mode = 'Manual';
      var unique_id = null;
      var username = username_input.trim();
      var name = name_input.trim();
      var email = email_input.trim();
      var mobile = mobile_input.trim();
      var password = password_input.trim();
      if(isregistered!=null){
         login_mode = provider;
         unique_id = userdetail.id;
      } 
      
      let action;
      action = authActions.signup(
        username,
        name,
        mobile,
        email,
        gender_input,
        password,
        callingCode,
        countryCode,
        login_mode,
        unique_id,
        isregistered,
        apple_id
      );

      const result = await dispatch(action);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      console.log(resultData.state);

      if (resultData.state == true) {
        await dispatch(loadingActions.setprofileloader(false));
        // setLoading(false);
        navigation.navigate('Login');
      } else {
        await dispatch(loadingActions.setprofileloader(false));
        //setLoading(false);
        setnavscreen('signup');
        setmsg(resultData.message);
        setnotification(true);
      }
    } catch (err) {
      // alert('Error,Something went wrong');
      //setLoading(false);
      await dispatch(loadingActions.setprofileloader(false));
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
  async function emailVerification(email_input) {
    try {
      var email = email_input.trim();
      let action;
      action = authActions.emailVerification(email);

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
        setemailverifymsg('Email already exists');

        setemailMobileStatus(true);
        return 1;
      } else {
        setemailMobileStatus(false);
        console.log('not already exist');
        // setErrors({
        //   ...errors,
        //   ['email_error']: null,
        //   ['username_error']: errors['username_error'],
        //   ['name_error']: errors['name_error'],
        //   ['cpassword_error']: errors['cpassword_error'],
        //   ['password_error']: errors['password_error'],
        //   ['mobile_error']: errors['mobile_error'],
        // });

        setemailverifymsg(null);
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
  async function mobileVerification(mobile_input) {
    try {
      var mobile = mobile_input.trim();
      let action;
      action = authActions.mobileVerification(mobile);

      const result = await dispatch(action);
      const resultData = JSON.parse(result);
      console.log('----Mobile-------');
      console.log(resultData);
      console.log(resultData.state);

      if (resultData.state == 200) {
        // setErrors({
        //   ...errors,
        //   ['mobile_error']: 'Mobile number already exists',
        // });
        setmobileverifymsg('Mobile number already exists');
        setMobileStatus(true);

        return 1;
      } else {
        console.log('not already exist');
        setMobileStatus(false);
        // setErrors({
        //   ...errors,

        //   ['mobile_error']: null,
        //   ['email_error']: errors['email_error'],
        //   ['username_error']: errors['username_error'],
        //   ['name_error']: errors['name_error'],
        //   ['cpassword_error']: errors['cpassword_error'],
        //   ['password_error']: errors['password_error'],
        // });
        setmobileverifymsg(null);

        return 0;
      }
    } catch (err) {
      // alert('Error,Something went wrong');
      setErrors({
        ...errors,

        ['mobile_error']: 'Loaing error',
      });
      return 1;
    }
  }
  return (
    <View style={{flex: 1}}>
      {/* <KeyboardAvoidingView behavior="padding" style={styles.container}> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <SafeAreaView style={{backgroundColor: '#ffffff'}}></SafeAreaView>
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
                        borderColor: '#808080',
                        borderBottomWidth: 1,
                        width: 150,
                      }}
                      keyboardType="numeric"
                      placeholderTextColor="#808080"
                      placeholder="Enter OTP here"
                      onChangeText={(text) => setOtp_input(text)}
                      value={otp_input}
                    />
                    {otperr != null && (
                      <Text style={styles.error}>{otperr}</Text>
                    )}

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginBottom: 20,
                      }}>
                      <TouchableOpacity onPress={() => setotpmodal(false)}>
                        <Text style={{color: '#808080', fontSize: 14}}>
                          Edit mobile number
                        </Text>
                      </TouchableOpacity>
                      {/* {resendOtp?null:  */}
                      <TouchableOpacity
                        onPress={() => {
                          sendOtp();
                          settempotpalert(true);
                          setmsg('OTP sent successfully.');
                          setresenOtp(true);
                          setTimeout(() => {
                            settempotpalert(false);
                          }, 5000);
                        }}>
                        <Text style={{color: '#808080', fontSize: 14}}>
                          Resend OTP
                        </Text>
                      </TouchableOpacity>
                      {/* // } */}
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
        <ScrollView
          style={{
            width: '100%',
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image style={styles.image} source={loading_logo} />
            {/* <Image style={styles.imageText} source={Logo_Text} /> */}
          </View>
{apple_id!=null?<Text style={{fontSize:13,alignSelf:'center',textAlign:'center'}}>Please fill these datas to enable apple login ..</Text>:null}
          <TextInput
            style={{
              marginTop: 20,
              height: 40,
              borderColor: '#808080',
              borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 10,
            }}
            placeholderTextColor="#808080"
            placeholder="Username"
            onChangeText={(text) => setUsername_input(text)}
            value={username_input}
          />
          {/* {errors['username_error'] != null && (
            <Text style={styles.error}>{errors['username_error']}</Text>
          )} */}
          {usernameverifymsg != null && (
            <Text style={styles.error}>{usernameverifymsg}</Text>
          )}
          <TextInput
            style={{
              height: 40,
              borderColor: '#808080',
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
              borderColor: '#808080',
              borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 10,
            }}
            placeholderTextColor="#808080"
            placeholder="Email"
            onChangeText={(text) => {
              setEmail_input(text);
              // emailVerification(text);
            }}
            value={email_input}
          />
          {emailverifymsg != null && (
            <Text style={styles.error}>{emailverifymsg}</Text>
          )}
          <View style={{flexDirection: 'row', width: '100%'}}>
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
                  // excludeCountries: ['FR'],
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
            <TextInput
              style={{
                height: 40,
                width: '70%',
                borderColor: '#808080',
                borderWidth: 1,
                marginBottom: 10,
                paddingLeft: 10,
                marginLeft: '3%',
              }}
              keyboardType="numeric"
              placeholderTextColor="#808080"
              placeholder="Mobile number"
              onChangeText={(text) => {
                // mobileVerification(text);
                setMobile_input(text);
              }}
              value={mobile_input}
            />
          </View>
          {mobileverifymsg != null && (
            <Text style={styles.error}>{mobileverifymsg}</Text>
          )}
          {/* <TextInput
          style={{
            height: 40,
            borderColor: '#808080',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor='#808080'
          placeholder="Gender"
          onChangeText={(text) => setGender_input(text)}
          value={gender_input}
        /> */}
          <View style={{flexDirection: 'row'}}>
            {/* <CountryPicker
            theme={dark ? DARK_THEME : {}}
            {...{
              countryCode,
              // withFilter,
              // excludeCountries: ['FR'],
              withFlag,
              withCurrencyButton,
              withCallingCodeButton,
              // withCountryNameButton,
              // withAlphaFilter,
              // withCallingCode,
              // withCurrency,
              // withEmoji,
              // withModal,
              // withFlagButton,
              // onSelect,
              // disableNativeModal,
              // preferredCountries: ['US', 'GB'],
              // modalProps: {
              //   visible,
              // },
              // onClose: () => setVisible(false),
              // onOpen: () => setVisible(true),
            }}
          /> */}
            {/* {country !== null && (
            <Text style={styles.data}>
              {JSON.stringify(country, null, 2)}
              {country.callingCode}
            </Text>
          )} */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={{paddingLeft: 10, color: '#808080', fontSize: 16}}>
              Gender
            </Text>
            <TouchableOpacity
              onPress={() => setGender_input('Female')}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderColor: '#808080',
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: gender_input == 'Female' ? '#808080' : null,
                }}></View>
              <Text style={{color: '#808080', fontSize: 14}}>{'  '}Female</Text>
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
                  borderColor: '#808080',
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: gender_input == 'Male' ? '#808080' : null,
                }}></View>
              <Text style={{color: '#808080', fontSize: 14}}>{'  '}Male</Text>
            </TouchableOpacity>
          </View>
          {errors['gender_error'] != null && (
            <Text style={styles.error}>{errors['gender_error']}</Text>
          )}
          <TextInput
            style={{
              height: 40,
              borderColor: '#808080',
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
              borderColor: '#808080',
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
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontStyle: 'normal',
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                lineHeight: 20,
                paddingTop: 3,
                textAlign: 'center',

                color: '#808080',
              }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{
                alignItems: 'center',
                //backgroundColor: '#e7af2d',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,

                  color: 'black',
                  fontFamily: 'Roboto-Medium',
                }}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 100}}></View>
        </ScrollView>

        <View style={styles.bottom}>
          <View
            style={{
              height: Platform.OS === 'ios' ? 70 : 50,
              backgroundColor: '#B60612',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              //  onPress={() => ValidationProcess()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
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
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView></SafeAreaView>
    </View>
  );
};

export default SignupScreen;
