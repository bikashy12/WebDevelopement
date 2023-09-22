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
import browsewizard from '../assets/images/browsewizard.png';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import {useSelector} from 'react-redux';
//import {useNavigation} from '@react-navigation/native';

import {useNavigation, CommonActions} from '@react-navigation/native';

import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HeaderBrowse(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => !!state.auth.token);
  const {
    loading,
    govavaicon,
    icon,
    search,
    heading,
    height,
    image,
    ...attributes
  } = props;
  const [searchInput, setSearchInput] = useState(null);
  const [searchload, setsearchload] = useState(false);
  //const [headerheight, setHeaderheight] = useState(null);
  var headerheight;
  if (Platform.OS === 'ios') {
    headerheight = height == true ? 130 : 100;
  } else {
    headerheight = height == true ? 92 : 55;
  }

  const keyword_search = async () => {
    setsearchload(true);
    try {
      let res;
      var page = 1;
      res = productActions.keyword_search(searchInput, page);

      const result = await dispatch(res);
      const resultData = JSON.parse(result);
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      console.log(resultData);
      if (resultData.state) {
        setsearchload(false);
        navigation.navigate('Search', {
          product: resultData.items,
          searchInput: searchInput,
          totalPages:resultData.totalPages
        });
      } else {
        // setmsg('Something went wrong,Try again');
      }
      setsearchload(false);
    } catch (err) {
      setsearchload(false);
      // alert('Error,Something went wrong');
      // setLoading(false);
      // setnotification(true);
      // setmsg('Network Error,Try again');
    }
  };
  return (
    <View
      style={{
        backgroundColor: '#B60612',
        height: headerheight,
        width: windowWidth,
        justifyContent: 'center',
        // borderBottomRightRadius: 10,
        //  borderBottomLeftRadius: 10,
        // borderRadius: 10,
      }}>
      <StatusBar backgroundColor="#B60612" />
      <SafeAreaView></SafeAreaView>
      {loading && <Loader loading={loading} />}
      {searchload && <Loader loading={searchload} />}
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '10%',
            // alignItems: 'flex-start',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {props.drawer ? (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={hamburger}
                style={{width: Platform.OS == 'ios' ?30:25, height: Platform.OS == 'ios' ?23:20,
                paddingTop:20, 
                marginLeft: 16}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{width: 40, padding: 5}}
              onPress={() =>
                navigation.goBack()
              }>
              <Icon
                name="chevron-left"
                size={17.49}
                color="#E4E9EA"
                style={{
                  paddingLeft: 12,
                  marginTop: Platform.OS == 'ios' ? 15 : 0,
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            width: image ? '80%' : '73%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {heading == true ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: image ? '100%' : '60%',
                alignItems: 'center',
              }}>
              <Image
                source={Logo_Text_white}
                style={{
                  width: 119,
                  height: 16,
                  left: 20,
                  marginTop: search ? 0 : Platform.OS == 'ios' ? 15 : 0,
                }}
              />
              {image && (
                // <Image style={{width: 35, height: 35, marginTop:15}} source={{uri: image}} />
                <Image
                  style={{
                    width: 35,
                    height: 35,
                    marginTop: Platform.OS == 'ios' ? 15 : 0,
                  }}
                  source={{uri: image}}
                />
              )}
            </View>
          ) : (
            <Text
              style={{
                color: '#FFFFFF',
                fontStyle: 'normal',
                fontFamily: 'Roboto-Medium',
                fontSize: 20,
                lineHeight: 20,
                marginTop: Platform.OS == 'ios' ? 20 : 0,
                left: -20,
              }}>
              SEARCH RESULTS
            </Text>
          )}

          {search && (
            <View style={styles.searchBox}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 19,
                  alignItems: 'center',
                }}>
                <View style={{width: '90%', flexDirection: 'row'}}>
                  <TextInput
                    style={{
                      paddingLeft: 0,
                      paddingRight: 10,
                      width: '100%',
                      color: '#525252',
                    }}
                    returnKeyType="search"
                    onSubmitEditing={() => keyword_search()}
                    placeholderTextColor="#525252"
                    placeholder="Search"
                    onChangeText={(text) => setSearchInput(text)}
                    value={searchInput}
                  />
                  {searchInput != '' && searchInput != null && (
                    <TouchableOpacity
                      onPress={() => setSearchInput(null)}
                      style={{
                        right: 5,
                        alignSelf: 'center',
                        alignItems: 'center',
                        height: '100%',
                        alignContent: 'center',
                        textAlign: 'center',
                        paddingTop: 8,
                      }}>
                      <FontistoIcon
                        name="close"
                        size={20}
                        color="gray"
                        style={{
                          alignSelf: 'center',
                          alignItems: 'center',
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>
        {icon && (
          <View
            style={{
              width: '13%',
              // alignItems: 'flex-start',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              right: 10,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontStyle: 'normal',
                fontFamily: 'Roboto-Medium',
                fontSize: Platform.OS == 'ios' ?14:14,
                lineHeight: 20,

                left: 0,
              }}>
              Wizard
            </Text>
            <TouchableOpacity
               onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }]
             })
              }>
              <View style={{alignItems: 'flex-start'}}>
                <Image style={{width: Platform.OS == 'ios' ?68:65, height: 40}} source={wizard} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  sideMenuProfileIcon: {
    width: 60,
    height: 35,
    right: 16,
  },
  searchBox: {
    height: 38,
    // width: '100%',
    backgroundColor: '#ffffff',
    left: 8,
    marginRight: 16,
    marginTop: 8,
    // borderWidth: 1,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firstDivider: {
    marginTop: 30.5,
    borderBottomColor: '#E4E9EA',
    // borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: windowWidth - 60,
    justifyContent: 'center',
    paddingLeft: 30,
    // marginRight: 60,
  },
  iconText: {
    // marginLeft: 25.5,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 19,
    color: '#474D52',
    marginTop: 2,
    padding: 10,
  },
  iconTextGift: {
    marginLeft: 25.5,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 19,
    color: '#4F81BD',
    marginTop: 2,
  },
  //modal style
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginTop: 180,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 25,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '70%',
    height: 400,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 35,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
  },
});
