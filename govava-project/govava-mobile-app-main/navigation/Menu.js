import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import profile from '../assets/images/profile.png';
import {useSelector} from 'react-redux';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomSidebarMenu = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const userData = useSelector((state) => state.auth);
  const chatData = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const {state, ...rest} = props;
  const newState = {...state}; //copy from state before applying any filter. do not change original state
  newState.routes = newState.routes.filter(
    (item) => item.name !== 'SplashScreen',
  ); //replace "Login' with your route name
  newState.routes = newState.routes.filter(
    (item) => item.name !== 'ChatContacts',
  );
  newState.routes = newState.routes.filter(
    (item) => item.name !== 'ValidationScreen',
  );
  newState.index -= state.routes.length - newState.routes.length;
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <View
        style={{
          flexDirection: 'row',
          // paddingTop: 20,
          alignItems: 'center',
          backgroundColor: '#ffffff',
          height: 70,
        }}>
        <View>
          <Image source={profile} style={styles.sideMenuProfileIcon} />
        </View>
        {isAuth && (
          <View style={{marginLeft: 16}}>
            <Text style={styles.profileTextMain}>{userData.name}</Text>
            <Text style={styles.profileText}>{userData.email.length > 20 ? 
                    userData.email.substring(0, 18) + "..." : 
                    userData.email}</Text>
          </View>
        )}
        {!isAuth && (
          <View style={{marginLeft: 16}}>
            <Text style={styles.profileTextMain}>Hello User</Text>
            {/* <Text style={styles.profileText}>jogndoe@gmail.com</Text> */}
          </View>
        )}
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop:15}}> 
        <DrawerItemList state={newState} {...rest} />
        {/* <DrawerItem
          label="Signout"
          // onPress={() => Linking.openURL('https://aboutreact.com/')}
        /> */}
        {/* {isAuth && (
          <TouchableOpacity
            style={styles.customItem}
            onPress={() => {
              dispatch(authActions.logout());
              props.navigation.closeDrawer();
            }}>
            <Icon name="logout" size={20} color="#E4E9EA" />
            <Text style={{color: '#ffffff', marginLeft: 37}}>Signout</Text>
           
          </TouchableOpacity>
        )} */}
      </DrawerContentScrollView>
      {/* <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey',
        }}>
        www.aboutreact.com
      </Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    // resizeMode: 'center',
    width: 42,
    height: 42,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  profileTextMain: {
    // resizeMode: 'center',
    // marginTop: 20,
    color: '#474D52',
    fontFamily: 'Roboto-Medium',
    lineHeight: 24,
    fontWeight: '500',
    fontStyle: 'normal',
  },
  profileText: {
    // resizeMode: 'center',
    // marginTop: 20,
    color: '#A4A4A4',
    fontFamily: 'Roboto-Medium',
    lineHeight: 24,
    fontWeight: '500',
    fontStyle: 'normal',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
