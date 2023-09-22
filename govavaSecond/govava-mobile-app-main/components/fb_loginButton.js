import React, { Component } from 'react';
import { View,Button,TouchableOpacity,Text} from 'react-native';
import { LoginButton,LoginManager,AccessToken } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import * as loadingActions from '../store/actions/loader';
import { useNavigation } from '@react-navigation/native';
const FBLoginButton= (props)=> {
const provider='Facebook';
    const loginWithFacebook = () => {
       // LoginManager.setLoginBehavior('NATIVE_ONLY');
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
          function(result) {
            if (result.isCancelled) {
              console.log('Login cancelled');
            } else {
              console.log(
                'Login success with permissions: ' +
                  result.grantedPermissions.toString(),
              );
              console.log(result);
              AccessToken.getCurrentAccessToken().then(data => {
                const { accessToken } = data;
                props.onChange(accessToken,provider);
              });
            }
          },
          function(error) {
            console.log(error);
            alert('Error in login');
            LoginManager.logOut();
          },
        );
     
    
      };
 

    return (
      <View style={{height:70,width:70,backgroundColor:'white',marginHorizontal:15,borderRadius:35,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{height:50,width:50,alignItems:'center',flexDirection:'row',justifyContent:'center',
         shadowColor: 'black',
         shadowOpacity: 0.26,
         shadowOffset: { width: 0, height: 2},
         shadowRadius: 2,
         elevation: 5,borderRadius:7,
         backgroundColor: 'white'}}  onPress={() =>loginWithFacebook()}>
          <Icon name="facebook" size={25} color="#4267B2" />
         
          </TouchableOpacity>
      </View>
    );
  
};

module.exports = FBLoginButton;