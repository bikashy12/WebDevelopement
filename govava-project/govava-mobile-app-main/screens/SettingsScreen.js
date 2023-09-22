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
  TouchableOpacity,
} from 'react-native';
// import {Images} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
import hamburger from '../assets/images/hamburger.png';
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import cat from '../assets/images/cat.png';
import {useDispatch} from 'react-redux';
import * as productActions from '../store/actions/products';
import {ScrollView} from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import * as authActions from '../store/actions/auth';
import Notifications from '../components/Notifications';
import styles from '../styles/settingsStyle';
import DeviceInfo from 'react-native-device-info';
import Loader from '../components/Loader';
import * as loadingActions from '../store/actions/loader';

export default function Settingscreen({navigation}) {
  const version = DeviceInfo.getVersion();
  const build = DeviceInfo.getBuildNumber();
  //    const version=1;
  //  const build=2;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalvisible, setmodalvisible] = useState(false);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');

  const isAuth = useSelector((state) => !!state.auth.token);
  const userData = useSelector((state) => state.auth);
  const redirectlink = () => {
    if (isAuth) {
      navigation.navigate('Personal');
    } else {
      navigation.navigate('Login');
    }
  };
  const deleteAccount = async () => {
    try {
      await dispatch(loadingActions.setprofileloader(true));
      var user_id = userData.userId;
      let action;
      action = authActions.deleteAccount(user_id);
      const result = await dispatch(action);
      const resultData = JSON.parse(result);
      console.log('-----------result is ++++++++++++');
      console.log(resultData.state);
      await dispatch(loadingActions.setprofileloader(false));
      if (resultData.state == true) {
        dispatch(authActions.removeDeviceToken(userData.userId));
        dispatch(authActions.logout());

      } else {
        setmsg(resultData.message);
        setnotification(true);
      }

      // console.log(resultData.state);
    } catch (err) {
      // alert('Error,Something went wrong');
      await dispatch(loadingActions.setprofileloader(false));
    }
  };

  useFocusEffect(React.useCallback(() => {}, []));
  return (
    <View style={styles.container}>
      {/* {loading && <Loader loading={loading} />} */}
      {notification && (
        <Notifications
          msg={msg}
          // response={response}
          navscreen={navscreen}
          onChange={() => setnotification(false)}
        />
      )}
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={modalvisible}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure ? Do you want to delete account ?
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  setmodalvisible(false);
                }}
                style={{
                  ...styles.openButton,
                  backgroundColor: '#cb9b27',
                  marginRight: 10,
                }}>
                <Text style={styles.textStyle}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setmodalvisible(false);
                  deleteAccount();
                }}
                style={{
                  ...styles.openButton,
                  backgroundColor: '#cb9b27',
                }}>
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Header
        loading={loading}
        govavaicon={true}
        icon={true}
        close={false}
        search={true}
        wizardicon={true}
      />
      <ScrollView contentContainerStyle={styles.productsHolder}>
        <View style={[styles.profileContainer, styles.shadow]}>
          <View style={styles.ProfileIcon}>
            <Icon name="user" size={30} color="#c5c4c4" />
          </View>
          <View>
            {isAuth ? (
              <View style={styles.detailsView}>
                <Text style={styles.name}>{userData.name}</Text>
                <Text style={styles.detail}>{userData.email}</Text>
                <Text style={styles.detail}>{userData.mobile}</Text>
              </View>
            ) : (
              <View style={styles.detailsView}>
                <Text tyle={styles.name}>Hello User</Text>
                <Text tyle={styles.detail}>Please Login</Text>
              </View>
            )}
          </View>
          <View style={styles.linkView}>
            <Text onPress={() => redirectlink()} style={styles.link}>
              {isAuth ? 'Edit' : 'Sign In'}
            </Text>
          </View>
        </View>
        {/* <TouchableOpacity style={styles.buttonView}>
          <Icon
            name="angle-right"
            size={20}
            color="#c5c4c4"
            style={{paddingRight: 10}}
          />
          <Text style={styles.btnText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView}>
          <Icon
            name="angle-right"
            size={20}
            color="#c5c4c4"
            style={{paddingRight: 10}}
          />
          <Text style={styles.btnText}>More</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Contact', {
              success_status: true,
            });
          }}
          style={styles.buttonView}>
          <Icon
            name="angle-right"
            size={20}
            color="#c5c4c4"
            style={{paddingRight: 10}}
          />
          <Text style={styles.btnText}>Contact us</Text>
        </TouchableOpacity>
        {isAuth ? (
          <TouchableOpacity
            onPress={() => {
              setmodalvisible(true);
            }}
            style={styles.buttonView}>
            <Icon
              name="angle-right"
              size={20}
              color="#c5c4c4"
              style={{paddingRight: 10}}
            />
            <Text style={styles.btnText}>Delete account</Text>
          </TouchableOpacity>
        ) : null}
        {isAuth ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Reset');
            }}
            style={styles.buttonView}>
            <Icon
              name="angle-right"
              size={20}
              color="#c5c4c4"
              style={{paddingRight: 10}}
            />
            <Text style={styles.btnText}>Reset password</Text>
          </TouchableOpacity>
        ) : null}
        {isAuth ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ContactEdit');
            }}
            style={styles.buttonView}>
            <Icon
              name="angle-right"
              size={20}
              color="#c5c4c4"
              style={{paddingRight: 10}}
            />
            <Text style={styles.btnText}>Edit contacts</Text>
          </TouchableOpacity>
        ) : null}
         {isAuth ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PetListing');
            }}
            style={styles.buttonView}>
            <Icon
              name="angle-right"
              size={20}
              color="#c5c4c4"
              style={{paddingRight: 10}}
            />
            <Text style={styles.btnText}>Edit pets</Text>
          </TouchableOpacity>
        ) : null}
        
        {isAuth ? (
          <TouchableOpacity
            onPress={() => {
              //setLoading(true);
              dispatch(authActions.removeDeviceToken(userData.userId));
              dispatch(authActions.logout());
              // setLoading(false);
        
            }}
            style={styles.logoutBtn}>
            <Text style={styles.btnText}>SIGNOUT</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.version}>
          Version {version}
          {build}
        </Text>
      </ScrollView>
    </View>
  );
}
