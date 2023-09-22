import React, {useState} from 'react';
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
} from 'react-native';
// import {Images} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
import hamburger from '../assets/images/hamburger.png';
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import cat from '../assets/images/cat.png';
import {useDispatch} from 'react-redux';
import * as productActions from '../store/actions/products';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import ProductListing from './ProductListing';
import wizard from '../assets/images/wizard.png';
// import products from '../constants/products';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import Loader from './Loader';
import WizardLoader from './WizardLoader';

import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';
import styles from '../styles/headerStyle';
import loading_logo from '../assets/images/loading_logo.png';
import logo_icon from '../assets/images/logo_icon.png';

export default function Header(props) {
  const navigation = useNavigation();
  const isAuth = useSelector((state) => !!state.auth.token);
  const {loading, govavaicon, icon, search, wizardicon, ...attributes} = props;
  console.log(Platform.OS);
  return (
    <View
      style={{
        backgroundColor: '#B60612',
        height: Platform.OS == 'ios' ? 100 : 55,
        width: windowWidth,
        justifyContent: 'center',
        // borderBottomRightRadius: 10,
        //  borderBottomLeftRadius: 10,
        // borderRadius: 10,
      }}>
      <StatusBar backgroundColor="#B60612" />
      {true
        ? loading && <WizardLoader loading={loading} />
        : loading && <Loader loading={loading} />}
      <SafeAreaView></SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '25%',
            // alignItems: 'flex-start',
           // justifyContent: 'center',
            alignItems: 'center',
            //  backgroundColor:'green'
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{}}>
            <Image source={hamburger} style={{width:Platform.OS == 'ios' ?33: 27, 
            height: Platform.OS == 'ios' ?25:20,paddingTop:20}} />
          </TouchableOpacity>
          {govavaicon == true && (
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.openDrawer()}>
              <Image
                style={{width: Platform.OS == 'ios' ?55:50, height:Platform.OS == 'ios' ?55:50, 
                marginLeft: Platform.OS == 'ios' ?14:18}}
                source={logo_icon}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={Logo_Text_white} style={{width: Platform.OS == 'ios' ?119:119, height: Platform.OS == 'ios' ?16:16}} />
        </View>
        <View
          style={{
            flexDirection: 'row-reverse',
            width: '25%',
            // alignItems: 'flex-start',
            //justifyContent: 'center',
            alignItems: 'center',
            //  backgroundColor:'yellow'
          }}>
          {props.close && (
            <TouchableOpacity
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'HomeScreen' }]
             })
              }>
              <Icon name="remove" size={25} color="#E4E9EA" style={{}} />
            </TouchableOpacity>
          )}
          {wizardicon && !props.close ? (
            <TouchableOpacity   onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
           })
            }>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{width: Platform.OS == 'ios' ?68:65, height: 23, marginLeft: 16}}
                  source={wizard}
                />
                <Text style={{color: '#ffffff', fontSize: Platform.OS == 'ios' ?15:10, left: 5}}>
                  Wizard
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}
