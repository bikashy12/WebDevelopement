import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text, Button} from 'react-native';
// import {Images} from '../constants';
import loading_logo from '../assets/images/loading_logo.png';
import Logo_Text from '../assets/images/Logo_Text.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import SplashAnimation from '../components/splashanimation';
import styles from '../styles/loadingStyle';
import animation from '../assets/images/animation.gif';
import FastImage from 'react-native-fast-image';

export default function LoadingScreen({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    let last_contact=null;
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userDataMC');

      const contact_string = await AsyncStorage.getItem('contact_details');

      const nwcontact_details = JSON.parse(contact_string);

      //  checkStorage();
      if (!userData) {
        // props.navigation.navigate('Auth');
        setTimeout(() => {
          dispatch(authActions.setDidTryAL());
        }, 3000);
        return;
      }
      console.log('UserDataMC', userData);
      const transformedData = JSON.parse(userData);
      const {
        token,
        mobile,
        country,
        country_code,
        name,
        email,
        userId,
        gender,
        username,
      } = transformedData;
      if (contact_string) {
        if (nwcontact_details.userId == userId) {
          console.log('Usercontact', nwcontact_details);
          last_contact=nwcontact_details;
          dispatch(authActions.contactDetails(nwcontact_details));
        } else {
          await AsyncStorage.removeItem('contact_details');
          last_contact=null;
        }
      }
      if (!token || !userId) {
        // props.navigation.navigate('Auth');
        setTimeout(() => {
          dispatch(authActions.setDidTryAL());
        }, 3000);
        // dispatch(authActions.setDidTryAL());
        return;
      } else {
        
        const result = await dispatch(
          authActions.authCheck(
            token,
            userId
          ),
        );
        const resultData = JSON.parse(result);
        if (resultData.state == true) {
          setTimeout(() => {
            dispatch(
              authActions.authenticate(
                resultData.user.id,
                resultData.user.mobile,
                resultData.user.country,
                resultData.user.country_code,
                resultData.user.username,
                resultData.user.name,
                resultData.user.email,
                resultData.user.gender,
                resultData.user.api_token,
                ),
            );
          }, 3000);
         
        } else {
          setTimeout(() => {
          dispatch(authActions.removeDeviceToken(userId));
          dispatch(authActions.logout());
          return ;
        }, 3000);
        }
      }
    };

    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <SplashAnimation />
      {/* <FastImage
        style={{
          width: '100%',
          aspectRatio: 1 / 1,
          resizeMode: 'contain',
          backgroundColor: '#f1efef73',
        }}
        source={animation}
        resizeMode={FastImage.resizeMode.contain}
      /> */}
    </View>
  );
}
