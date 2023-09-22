import React, { Component } from 'react';
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
  Dimensions
} from 'react-native';
import loading_logo from '../assets/images/logo.png';
import Logo_Text from '../assets/images/Logo_Text.png';
import Loader from '../components/Loader';
import * as authActions from '../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Notifications from '../components/Notifications';
import styles from '../styles/signupStyle';
import CountryPicker from 'react-native-country-picker-modal';
import Icon2 from 'react-native-vector-icons/AntDesign';
// import {CountryCode, Country} from './src/types';
import * as loadingActions from '../store/actions/loader';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;

const ValidationScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);

  const [notification, setnotification] = React.useState(false);
  const [resendOtp, setresenOtp] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [navscreen, setnavscreen] = React.useState('');
  const [mobile_input, setMobile_input] = React.useState('');
  const [otp_input, setOtp_input] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [otpmodal, setotpmodal] = React.useState(false);
  const [otperr, setotperr] = React.useState(false);
  const [tempotpalert, settempotpalert] = React.useState(false);
  const [otpSuccess, setotpSuccess] = React.useState(false);
  const [mobileverifymsg, setmobileverifymsg] = React.useState(null);

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
  const [withFilter, setWithFilter] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [dark, setDark] = React.useState(false);
  const [disableNativeModal, setDisableNativeModal] = React.useState(false);
  var defaultcountry = {
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  };
  const onSelect = (country) => {
    console.log(country.callingCode[0]);
    setPhoneCode(country.callingCode[0]);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  async function sendMobileOtp(props) {
    //   var country_code = country.callingCode;

    // console.log('otp');

    var mobile = mobile_input.trim();
    if (/^\d{10}$/.test(mobile)) {
      try {
        await dispatch(loadingActions.setprofileloader(true));
        let otpaction;
        otpaction = authActions.sendMobileOtp(mobile, countryPhoneCode, userData);
        const result = await dispatch(otpaction);
        const resultData = JSON.parse(result);
        console.log('-----------');
        console.log(resultData);
        console.log(resultData.state);

        if (resultData.state == true) {
          await dispatch(loadingActions.setprofileloader(false));
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
        setmsg(err.message);
        setnotification(true);
      }
    } else {
      setmobileverifymsg('Invalid number');
    }
  }
  async function otpVerification() {
    console.log('otpppp');
    try {
      var mobile = mobile_input.trim();
    var otp = otp_input;
    //setLoading(true);
    await dispatch(loadingActions.setprofileloader(true));
      let otpaction;
      otpaction = authActions.mobileOtpVerification(otp, mobile, userData);

      const result = await dispatch(otpaction);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      console.log(resultData.state);

      if (resultData.state == true) {
        await dispatch(loadingActions.setprofileloader(false));
        setmsg(resultData.message);

        setotpSuccess(true);
        settempotpalert(true);
        setTimeout(() => {
          setotpmodal(false);
          AsyncStorage.setItem(
            'userDataMC',
            JSON.stringify({
              token: resultData.customer['api_token'],
              mobile: resultData.customer['mobile'],
              country: resultData.customer['country'],
              country_code: resultData.customer['country_code'],
              username: resultData.customer['username'],
              name: resultData.customer['name'],
              email: resultData.customer['email'],
              gender: resultData.customer['gender'],
              userId: resultData.customer['id'],
            }),
          );
        
          dispatch(
            authActions.authenticate(
              resultData.customer['id'],
              resultData.customer['mobile'],
              resultData.customer['country'],
              resultData.customer['country_code'],
              resultData.customer['username'],
              resultData.customer['name'],
              resultData.customer['email'],
              resultData.customer['gender'],
              resultData.customer['api_token'],
            ),
          );
        }, 3000);

      } else {
        await dispatch(loadingActions.setprofileloader(false));
        //setLoading(false);
        settempotpalert(true);
        setmsg(resultData.message);
      }
    } catch (err) {
       alert('Error,Something went wrong');
      // setLoading(false);
      await dispatch(loadingActions.setprofileloader(false));
      settempotpalert(true);
      setmsg(err.message);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <KeyboardAvoidingView behavior="padding" style={styles.container}> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1, flexDirection: 'column', width: '100%', justifyContent: 'center' }}>
        <SafeAreaView style={{ backgroundColor: '#ffffff' }}></SafeAreaView>
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
                  <TouchableOpacity >
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
                        <Text style={{ color: '#808080', fontSize: 14 }}>
                          Edit mobile number
                        </Text>
                      </TouchableOpacity>
                      {/* {resendOtp?null:  */}
                      <TouchableOpacity
                        onPress={() => {
                          sendMobileOtp();
                          settempotpalert(true);
                          setmsg('OTP sent successfully.');
                          setresenOtp(true);
                          setTimeout(() => {
                            settempotpalert(false);
                          }, 5000);
                        }}>
                        <Text style={{ color: '#808080', fontSize: 14 }}>
                          Resend OTP
                        </Text>
                      </TouchableOpacity>
                      {/* // } */}
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        otpVerification();
                      }}
                      style={{
                        ...styles.openButton,
                        backgroundColor: '#cb9b27',
                      }}>
                      <Text style={styles.textStyle}>VERIFY</Text>
                    </TouchableOpacity>
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
              style={{ width: 100 }}>
              <Icon3
                name="chevron-left"
                size={17.49}
                color="#E4E9EA"
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>

            <View style={{ width: 90, height: 16 }}></View>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.image} source={loading_logo} />
          {/* <Image style={styles.imageText} source={Logo_Text} /> */}
        </View>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Please enter mobile number to enable this feature.</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', justifyContent: 'center', padding: 15 }}>
          <View
            style={{
              width: '25%',
              height: 60,
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
              height: 60,
              width: '70%',
              borderColor: '#808080',
              borderWidth: 1,
              paddingHorizontal: 10,
              // marginBottom: 10,
              marginLeft: 25
            }}
            keyboardType="numeric"
            placeholderTextColor="#808080"
            placeholder="Mobile number"
            onChangeText={(text) => {
              setmobileverifymsg(null);
              setMobile_input(text);
            }}
            value={mobile_input}
          />
        </View>
        {mobileverifymsg != null && (
          <Text style={styles.error}>{mobileverifymsg}</Text>
        )}

        <View style={{ marginBottom: 100 }}></View>


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
                sendMobileOtp();

              }}>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontSize: 20,
                  color: '#ffffff',
                  fontFamily: 'Roboto-Medium',
                }}>SEND OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView></SafeAreaView>
    </View>
  );
};

export default ValidationScreen;
