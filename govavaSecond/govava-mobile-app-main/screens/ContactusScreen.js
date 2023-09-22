import React, {useState, useEffect} from 'react';
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
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
// import {Images} from '../constants';
import Loader from '../components/Loader';
import {useDispatch} from 'react-redux';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import loading_logo from '../assets/images/loading_logo.png';
import Logo_Text from '../assets/images/Logo_Text.png';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import Notifications from '../components/Notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as authActions from '../store/actions/auth';
import {useFocusEffect} from '@react-navigation/native';

export default function ContactusScreen({route, navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const {success_status} = route.params;
  const [firstname_input, setfirstName_input] = React.useState('');
  const [lastname_input, setlastName_input] = React.useState('');
  const [email_input, setEmail_input] = React.useState('');
  const [mobile_input, setMobile_input] = React.useState('');
  const [subject_input, setsubject_input] = React.useState('');
  const [message_input, setmessage_input] = React.useState('');
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [navscreen, setnavscreen] = React.useState('');
  const [success, setsuccess] = React.useState(success_status);

  const [errors, setErrors] = React.useState({
    firstname_error: null,
    lastname_error: null,
    mobile_error: null,
    email_error: null,
    subject_error: null,
    message_error: null,
  });
  useFocusEffect(
    React.useCallback(() => {
      if (firstname_input != '') {
        setfirstName_input('');
        setlastName_input('');
        setEmail_input('');
        setMobile_input('');
        setsubject_input('');
        setmessage_input('');
        setErrors({
          ...errors,
          ['subject_error']: '',
          ['mobile_error']: null,
          ['firstname_error']: null,
          ['lastname_error']: null,
          ['email_error']: null,
          ['message_error']: null,
        });
      }
    }, [success]),
  );
  //validation
  useEffect(() => {
    setfirstName_input('');
    setlastName_input('');
    setEmail_input('');
    setMobile_input('');
    setsubject_input('');
    setmessage_input('');
    setErrors({
      ...errors,
      ['subject_error']: '',
      ['mobile_error']: null,
      ['firstname_error']: null,
      ['lastname_error']: null,
      ['email_error']: null,
      ['message_error']: null,
    });
    setsuccess(false);
  }, [success]);

  const ValidationProcess = (props) => {
    var errror_exists = 0;
    var first_name = firstname_input.trim();
    var last_name = lastname_input.trim();
    var email = email_input.trim();
    var mobile = mobile_input.trim();
    var subject = subject_input.trim();
    var message = message_input.trim();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //error messages
    var fname_msg = null;
    var lname_msg = null;
    var email_msg = null;
    var mobile_msg = null;
    var sub_msg = null;
    var msg_msg = null;

    // alert(name);
    // if (
    //   first_name == '' &&
    //   last_name == '' &&
    //   email == '' &&
    //   mobile == '' &&
    //   subject == '' &&
    //   message == ''
    // ) {
    //   return;
    // }
    if (first_name == '') {
      fname_msg = 'First name is required *';
      errror_exists = 1;
    } else {
      fname_msg = null;
    }
    if (last_name == '') {
      lname_msg = 'Last name is required *';
      errror_exists = 1;
    } else {
      lname_msg = null;
    }
    if (email == '') {
      email_msg = 'Email is required *';
      errror_exists = 1;
    } else if (reg.test(email) === false) {
      email_msg = 'email is invalid *';
      errror_exists = 1;
    } else {
      email_msg = null;
    }

    if (mobile == '') {
      mobile_msg = 'Mobile is required *';
      errror_exists = 1;
    } else {
      mobile_msg = null;
    }
    if (subject == '') {
      sub_msg = 'Subject is required *';
      errror_exists = 1;
    } else {
      sub_msg = null;
    }
    if (message == '') {
      msg_msg = 'Message is required *';
      errror_exists = 1;
    } else {
      msg_msg = null;
      // saveContactForm();
    }
    setErrors({
      ...errors,
      ['firstname_error']: fname_msg,
      ['lastname_error']: lname_msg,
      ['email_error']: email_msg,
      ['mobile_error']: mobile_msg,
      ['subject_error']: sub_msg,
      ['message_error']: msg_msg,
    });
    if (errror_exists == 0) {
      saveContactForm();
    }
  };
  async function saveContactForm(props) {
    setLoading(true);
    try {
      var first_name = firstname_input.trim();
      var last_name = lastname_input.trim();
      var email = email_input.trim();
      var mobile = mobile_input.trim();
      var subject = subject_input.trim();
      var message = message_input.trim();
      let action;
      action = authActions.saveContactForm(
        first_name,
        last_name,
        mobile,
        email,
        subject,
        message,
      );

      const result = await dispatch(action);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      console.log(resultData.state);

      if (resultData.state == true) {
        setsuccess(true);
        setLoading(false);
        setnavscreen('Home');
        setmsg(resultData.message_op);
        setnotification(true);
      } else {
        setLoading(false);
        setnavscreen('Contact');
        setmsg(resultData.message_op);
        setnotification(true);
      }
    } catch (err) {
      //   alert('Error,Something went wrong');
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      {/* {notification && (
        <Notifications
          msg={msg}
          navscreen={'Browse'}
          onChange={() => setnotification(false)}
        />
      )} */}
      {notification && (
        <Notifications
          msg={msg}
          reset={true}
          navscreen={navscreen}
          notification={notification}
          onChange={() => setnotification(false)}
        />
      )}
      <StatusBar backgroundColor="#B60612" />
      {loading && <Loader loading={loading} />}
      <View
        style={{
          backgroundColor: '#B60612',
          height: Platform.OS == 'ios' ? 100 : 55,
          width: windowWidth,
          zIndex: 100,
        }}>
        <SafeAreaView></SafeAreaView>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row'}}>
            <Icon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{paddingLeft: 16}}
            />
            <Text
              style={{
                color: '#ffffff',
                fontStyle: 'normal',
                fontFamily: 'Roboto-Medium',
                fontSize: 18,
                lineHeight: 20,
                paddingLeft: 20,
                // padding: 20,
                // paddingBottom: 10,
                // right: 16,
              }}>
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' && 'padding'}
        style={{width: '100%', flex: 1}}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          contentInsetAdjustmentBehavior={'always'}
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            flexGrow: 1,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image style={styles.image} source={loading_logo} />
            <Image style={styles.imageText} source={Logo_Text} />
          </View>

          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 10,
            }}
            placeholderTextColor="#808080"
            placeholder="First Name"
            onChangeText={(text) => setfirstName_input(text)}
            value={firstname_input}
          />
          {errors['firstname_error'] != null && (
            <Text style={styles.error}>{errors['firstname_error']}</Text>
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
            placeholder="Last Name"
            onChangeText={(text) => setlastName_input(text)}
            value={lastname_input}
          />
          {errors['lastname_error'] != null && (
            <Text style={styles.error}>{errors['lastname_error']}</Text>
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
            placeholder="Email "
            onChangeText={(text) => {
              setEmail_input(text);
            }}
            value={email_input}
          />
          {errors['email_error'] != null && (
            <Text style={styles.error}>{errors['email_error']}</Text>
          )}
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 10,
            }}
            keyboardType="numeric"
            placeholderTextColor="#808080"
            placeholder="Mobile"
            onChangeText={(text) => {
              setMobile_input(text);
            }}
            value={mobile_input}
          />
          {errors['mobile_error'] != null && (
            <Text style={styles.error}>{errors['mobile_error']}</Text>
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
            placeholder="Subject"
            onChangeText={(text) => {
              setsubject_input(text);
            }}
            value={subject_input}
          />
          {errors['subject_error'] != null && (
            <Text style={styles.error}>{errors['subject_error']}</Text>
          )}
          <TextInput
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 10,
              height: Platform.OS == 'ios' ? 100 : 50,
            }}
            multiline
            numberOfLines={3}
            placeholderTextColor="#808080"
            placeholder="Message"
            onChangeText={(text) => {
              setmessage_input(text);
            }}
            value={message_input}
          />
          {errors['message_error'] != null && (
            <Text style={styles.error}>{errors['message_error']}</Text>
          )}
          <View
            style={
              {
                // backgroundColor: 'white'
              }
            }>
            <TouchableOpacity
              onPress={() => ValidationProcess()}
              style={{
                backgroundColor: '#dd0304',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                shadowColor: 'black',
                shadowOpacity: 0.26,
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 2,
                elevation: 5,
              }}>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontSize: 20,
                  color: '#ffffff',
                  fontFamily: 'Roboto-Medium',
                }}>
                SUBMIT{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    marginTop: 20,
    width: 100,
    height: 100,
  },
  imageText: {
    marginTop: 20,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginBottom: 10,
    left: 5,
  },
});
