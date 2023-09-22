import React, { Component, useEffect } from 'react';
import {
  TextInput,
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Platform, Alert
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import loading_logo from '../assets/images/logo.png';
import Logo_Text from '../assets/images/Logo_Text.png';
var FBLoginButton = require('../components/fb_loginButton');
// var GLoginButton = require('../components/google_loginButton');
import Loader from '../components/Loader';
import GLoginButton from '../components/google_loginButton';
import AppleButton from '../components/apple_LoginButtton';

import styles from '../styles/loginStyle';

import * as loadingActions from '../store/actions/loader';
import * as authActions from '../store/actions/auth';
import { useDispatch } from 'react-redux';
import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [error_msg, setError_msg] = React.useState('');
  const [userinfo, setuserinfo] = React.useState(null);
  const [FcmToken, setFcmToken] = React.useState(null);

  const dispatch = useDispatch();
  async function onAppBootstrap() {
    // Register the device with FCM
    // await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();
    console.log('FCM token is', token);
    // Save the token
    //  Alert.alert('Medi Connect', message, [{text: 'Ok'}]);
    // Alert.alert('FCM token is',token,[{text: 'Ok'}]);
    setFcmToken(token);
  }
  useEffect(() => {
    if (Platform.OS == ('ios')) {
      onAppBootstrap();
    }
    getToken();
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // ignoreInForeground: true,
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },


      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("apn TOKEN:", token);
        // console.log("Platform:", platform);
        //  alert(token.token+'-t-p-'+Platform.OS,);
        if (Platform.OS == 'android') {
          setFcmToken(token);
        }

      },
    });
  }, []);
  const getToken = async () => {
    PushNotification.createChannel(
      {
        // ignoreInForeground: true,
        groupSummary: true,
        channelId: "fcm_fallback_notification_channel", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.

      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

  }
  const authHandler = async () => {
    // alert(password);
    // return;
    if (username == '' || username == null || password == '' || password == null) {
      setError(true);
      setError_msg('username/password cannot be empty !!');
    } else {
      let action;
      console.log('auth');
      try {
        action = authActions.login(username, password, Platform.OS, FcmToken);
        setError(false);
        await dispatch(loadingActions.setprofileloader(true));
        const result = await dispatch(action);

        const resultData = JSON.parse(result);
        const { state, message, token, user_id } = resultData;
        console.log('Result data SignIN', state, message, token);
        if (state) {
          await dispatch(loadingActions.setprofileloader(false));

          // console.log('Sign In result data', resultData);

        } else {
          // Alert.alert('Medi Connect', message, [{text: 'Ok'}]);
          // setError('Some error occured, check mobile and password');message
          // console.log('Sign In Errr', message);
          setError(true);
          setError_msg(message);
          await dispatch(loadingActions.setprofileloader(false));
          return;
        }
      } catch (err) {
        setError(err.message);
        await dispatch(loadingActions.setprofileloader(false));
      }
    }
  };
  const saveRegister = async (userinfo, provider) => {
    // await dispatch(loadingActions.setprofileloader(true));
    let action;
    try {
      var userdetail = userinfo;
      var provider = provider;
      await dispatch(loadingActions.setprofileloader(true));

      action = authActions.saveRegister(userdetail, provider, Platform.OS, FcmToken);

      const result = await dispatch(action);
      console.log(result);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      const { state, userdetails, providers, isregistered, message, token } = resultData;
      if (state) {
        if (isregistered == true) {
          // console.log('Sign In result data', resultData);
          await dispatch(loadingActions.setprofileloader(false));

          signOut(provider);
        } else {
          await dispatch(loadingActions.setprofileloader(false));
          // navigation.navigate('signup');
          navigation.navigate('signup', {
            isregistered: isregistered,
            provider: providers,
            userdetail: userdetails,
            apple_id:null
          });
        }

      } else {
        await dispatch(loadingActions.setprofileloader(false));
        Alert.alert('Govava !!!!!', message, [{ text: 'Ok' }]);
        // setError('Some error occured, check mobile and password');message
        console.log('Sign In Errr', message);
        return;
      }
    } catch (err) {
      alert('Error,Something went wrong');
      console.log(err);
      //setLoading(false);
      await dispatch(loadingActions.setprofileloader(false));
    }
  };
  const signOut = async (provider) => {

    try {
      if (provider == 'Google') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } else {
        await LoginManager.logOut();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {isLoading && <Loader loading={isLoading} />}
        <StatusBar
          barStyle={Platform.OS == 'ios' ? 'dark-content' : 'default'}
          backgroundColor="#808080"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            position: 'absolute',
            padding: 10,
            zIndex: 500,
            top: Platform.OS == 'ios' ? 50 : 10,
            right: 10,
          }}>
          <Text
            style={{
              fontSize: 17,
              color: 'grey',
              fontFamily: 'Roboto-Medium',
            }}>
            {'Skip >> '}
          </Text>
        </TouchableOpacity>

        <Image style={styles.image} source={loading_logo} />
        <View
          style={{
            width: '100%',
            marginTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            maxWidth:700,
          }}>
          <TextInput
            style={{
              height: 40,
              borderColor: '#808080',
              borderWidth: 1,
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
            placeholderTextColor="#808080"
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />

          <TextInput
            secureTextEntry
            style={{
              height: 40,
              borderColor: '#808080',
              borderWidth: 1,
              //marginBottom: 10,
              paddingHorizontal: 10,
            }}
            placeholderTextColor="#808080"
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <View style={styles.bottom}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              height: 30,
              flexDirection: 'row-reverse',
              marginVertical: 5,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('forgot')}
              style={{
                paddingVertical: 3,
                paddingLeft: 5,
                alignItems: 'center',
                // backgroundColor: '#e9e9e9',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,

                  color: 'grey',
                  fontFamily: 'Roboto-Medium',
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            {error ? (
              <Text style={{ color: 'red', fontSize: 12 }}>{error_msg}</Text>
            ) : (
              <Text></Text>
            )}
          </View>
          <View
            style={{
              backgroundColor: '#dd0304',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              shadowColor: 'black',
              shadowOpacity: 0.26,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 2,
              elevation: 5,
              height: 50,
              // backgroundColor: 'white'
            }}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => authHandler()}>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontSize: 20,
                  color: '#ffffff',
                  fontFamily: 'Roboto-Medium',
                }}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginVertical: 10,
              alignSelf: 'center',
              fontStyle: 'normal',
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              lineHeight: 20,
              width: '100%',
              textAlign: 'center',
              marginLeft: 20,
              color: '#808080',
            }}>
            or sign in with
          </Text>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 10,
              //borderTopWidth:1,
              paddingTop: 10,
            }}>
            <FBLoginButton
              onChange={(userinfo, provider) => {
                setuserinfo(userinfo);
                saveRegister(userinfo, provider);
                // alert(userinfo.user.id);
              }}
            />
            <GLoginButton
              onChange={(userinfo, provider) => {
                setuserinfo(userinfo);
                saveRegister(userinfo, provider);
                // alert(userinfo.user.id);
              }}
            />
            {Platform.OS=='ios'?<AppleButton fcm_token={FcmToken}/>:null}
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
              flexDirection: 'row',
              paddingBottom: 10
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
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('signup', {
                isregistered: null,
                provider: 'Manual',
                userdetail: null,
                apple_id:null
              })}
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
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;
