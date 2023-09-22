import React, {Component} from 'react';
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
} from 'react-native';
import loading_logo from '../assets/images/loading_logo.png';
import Logo_Text from '../assets/images/Logo_Text.png';
var FBLoginButton = require('../components/fb_loginButton');
var GLoginButton = require('../components/google_loginButton');
import Notifications from '../components/Notifications';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import Loader from '../components/Loader';
import styles from '../styles/forgotStyle';

const ForgotpasswordScreen = ({navigation}) => {
  const [email_input, setemail_input] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [navscreen, setnavscreen] = React.useState('');
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();
  const resetPassword = async () => {
    var email = email_input.trim();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == '') {
      setError('email is required');
    } else if (reg.test(email) === false) {
      setError('email is invalid');
    } else {
      setError(null);
      setLoading(true);
      try {
        let action;
        action = authActions.resendPassword('', email);
        const result = await dispatch(action);
        console.log(result);
        const resultData = JSON.parse(result);

        setLoading(false);
        setmsg(resultData.message);
        setnavscreen('Login');
        setnotification(true);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    }
    // let action;
    // action = authActions.resendPassword('', email);
    // setError(null);
    // setIsLoading(true);
    // try {
    //   const result = await dispatch(action);
    //   console.log(result);
    //   //   const resultData = JSON.parse(result);
    //   //   const {state, message, token} = resultData;
    //   //   console.log('Result data SignIN', state, message, token);
    //   //   if (state) {
    //   //     // console.log('Sign In result data', resultData);
    //   //     setIsLoading(false);
    //   //     navigation.navigate('Home');
    //   //   } else {
    //   //     // Alert.alert('Medi Connect', message, [{text: 'Ok'}]);
    //   //     // setError('Some error occured, check mobile and password');message
    //   //     // console.log('Sign In Errr', message);
    //   //     setError(message);
    //   //     setIsLoading(false);
    //   //     return;
    //   //   }
    // } catch (err) {
    //   setError(err.message);
    //   setIsLoading(false);
    // }
  };

  return (
    <View style={styles.container}>
      {loading && <Loader loading={loading} />}
      {/* <Notifications msg={msg} navscreen={navscreen} /> */}
      {notification && (
        <Notifications
          msg={msg}
          navscreen={navscreen}
          onChange={() => setnotification(false)}
        />
      )}
      <StatusBar backgroundColor="#B60612" />
      <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%'}}>
      <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            // position: 'relative',
            padding: 10,
            zIndex: 500,
            top: Platform.OS == 'ios' ? 50 : 10,
            left: 10,
          }}>
          <Text
            style={{
              fontSize: 17,
              color: 'grey',
              fontFamily: 'Roboto-Medium',
            }}>
            {' << Back'}
          </Text>
        </TouchableOpacity>
      
      </View>
    <Image style={styles.image} source={loading_logo} />
      <Image style={styles.imageText} source={Logo_Text} />
      <View
        style={{
          width: '100%',
          marginTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholder="Email"
          onChangeText={(text) => setemail_input(text)}
          value={email_input}
        />
        {error != null && <Text style={styles.error}>{error}</Text>}
      </View>
      <View style={styles.bottom}>
        <View
          style={{
            //heig: 100,
            backgroundColor: '#dd0304',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <TouchableOpacity onPress={() => resetPassword()}>
            <Text
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                fontSize: 20,
                color: '#ffffff',
                fontFamily: 'Roboto-Medium',
              }}>
              SEND
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotpasswordScreen;
