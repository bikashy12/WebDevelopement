import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import google from '../assets/images/google.png';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import * as loadingActions from '../store/actions/loader';
import {useFocusEffect} from '@react-navigation/native';

export default function GOOGLELoginButton(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '137006400285-5qg39g92ct35pmk38h5gvulk5ut1uhau.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      iosClientId:'137006400285-pble9hemv4qh0j14022kd708ikkdv68i.apps.googleusercontent.com',
    });
  }, []);

  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
 
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // const {accessToken, idToken} = await GoogleSignin.signIn();
      const userinfo = await GoogleSignin.signIn();
      const currentUser = GoogleSignin.getTokens().then((res) => {
        console.log(res.accessToken);
        var nwuserinfo = res.accessToken;
        var provider = 'Google';
        props.onChange(nwuserinfo, provider);
      });
      console.log(userinfo);

      setloggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //  alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
        // console.log(error);
      }
    }
  };
  const saveRegister = async (userinfo) => {
   // alert('hi');
    // await dispatch(loadingActions.setprofileloader(true));
    try {
      var userdetail = userinfo;
      var provider = 'Google';

      action = authActions.saveRegister(userdetail, provider);

      const result = await dispatch(action);
      console.log(result);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      // console.log(resultData.state);

      // if (resultData.state == true) {
      //   await dispatch(loadingActions.setprofileloader(false));
      //   // setLoading(false);
      //   navigation.navigate('Login');
      // } else {
      //   await dispatch(loadingActions.setprofileloader(false));
      //   //setLoading(false);
      //   setnavscreen('signup');
      //   setmsg(resultData.message);
      //   setnotification(true);
      // }
    } catch (err) {
      // alert('Error,Something went wrong');
      //setLoading(false);
      // await dispatch(loadingActions.setprofileloader(false));
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        height: 70,
        width: 70,
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 2,
          elevation: 5,
          borderRadius: 7,
          backgroundColor: 'white',
        }}
        // onPress={() => this.signIn()}
        onPress={_signIn}>
        <Image style={{height: 25, width: 25}} source={google} />
      </TouchableOpacity>
      {/* {!loggedIn && <Text>You are currently logged out</Text>}
      {loggedIn && (
        <Button onPress={signOut} title="LogOut" color="red"></Button>
      )} */}
    </View>
  );
}
