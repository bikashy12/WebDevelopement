import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import icon_categories from '../assets/images/icon_categories.png';
import icon_female from '../assets/images/icon_female.png';
import icon_gift from '../assets/images/icon_gift.png';
import icon_pet from '../assets/images/icon_pet.png';
import icon_browse from '../assets/images/icon_browse.png';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useSelector } from 'react-redux';
import Notifications from '../components/Notifications';
import LoginNotifications from '../components/LoginNotifications';

import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import * as wizardActions from '../store/actions/wizard';
import { useDispatch } from 'react-redux';

export default function ProfileWizardMenu(props) {
  const userData = useSelector((state) => state.auth);
  const isAuth = useSelector((state) => !!state.auth.token);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);

  const [wizardType, setwizardType] = useState('Profile');
  const [loading, setLoading] = React.useState(false);
  const [genderType, setGenderType] = useState('Boys');
  const [menu, setmenu] = useState([]);
  const [msg, setmsg] = useState('');
  const [notification, setnotification] = useState(false);
  const [loginnotification, setloginnotification] = useState(false);
  const scrollViewRef = useRef();
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      const menuList = async () => {
        try {
          let menulistresult;
          menulistresult = wizardActions.menuList();
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(menulistresult);
          const resultData = JSON.parse(result);
          console.log('-----------result is ++++++++++++');
          console.log(resultData);
          if (resultData.menu) {
            setmenu(resultData.menu);
          }
          // console.log(resultData);
          //   setagerange(resultData.agerange);
          setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      menuList();
    }, []),
  );
  const checkAuthentication = async () => {
    if (isAuth) {
      navigation.navigate('PetWizard');
    } else {
      setmsg('This requires login so that you can save items for Giftees. \n\nYou can still browse and search the site');
      setloginnotification(true);
    }
  };
  const checkAuthenticationWizard = async () => {
    if (isAuth) {

      setwizardType('Profile');
      setModalVisible(!modalVisible)
    } else {
      setmsg('This requires login so that you can save items for Giftees. \n\nYou can still browse and search the site');
      setloginnotification(true);
    }
  };
  const checkAuthenticationmenu = async (menutype) => {
    if (isAuth) {
      var gender = menutype.wizard_decrypt.gender;
      var genderVisibility = false;
      if (menutype.wizard_decrypt.gender == 'Both') {
        genderVisibility = true;
      } else {
        genderVisibility = false;
      }
      // alert('dfjsf' + wizardType);
      setModalVisible(false);
      setGenderType(menutype.label);
      props.onChange(menutype, genderVisibility, gender, wizardType);
      // props.onChangegendervisibility(genderVisibility, gender);
    } else {
      setmsg('This requires login so that you can save items for Giftees. \n\nYou can still browse and search the site');
      setloginnotification(true);
    }
  };
  const checkAuthentication1 = async () => {
    if (isAuth) {
      setModalVisible(!modalVisible);
    } else {
      setmsg('This requires login so that you can save items for Giftees. \n\nYou can still browse and search the site');
      setloginnotification(true);
    }
  };
  return (
    <View style={{ flex: 1, marginTop: 0 }}>
      <StatusBar backgroundColor="#B60612" />
      {notification && (
        <Notifications
          msg={msg}
          navscreen={'Home'}
          notification={notification}
          onChange={() => setnotification(false)}
        />
      )}
      {loginnotification && (
        <LoginNotifications
          msg={msg}
          navscreen={'Home'}
          notification={loginnotification}
          onChange={() => setloginnotification(false)}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          onPressOut={() => setModalVisible(!modalVisible)}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.popupHeader}>
                <Text style={styles.popupHeaderText}>Select wizard</Text>
              </View>
              {/* <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 15,
                  right: 15,
                  padding: 10,
                  zIndex: 100,
                }}
                onPress={() =>
                  scrollViewRef.current.scrollToEnd({animated: true})
                }>
                <Icon2 name="downcircle" size={25} color="#d2a749" />
              </TouchableOpacity> */}

              <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}
                style={{ width: '100%' }}>
                <View>
                  {menu.length > 0 ? menu.map((menutype, index) => {
                    var type = menutype.label;
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedAge(menutype);
                        }}
                        style={{ width: '100%', borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 5 }} key={index}>
                        <Text
                          style={styles.modalText}
                        >
                          {menutype.label}
                        </Text>
                        {selectedAge != null && selectedAge.id == menutype.id ? <Icon2 name="checkcircle" style={{ marginRight: 15 }} size={22} color="green" /> : null}
                      </TouchableOpacity>
                    );
                  }) : null}
                </View>
              </ScrollView>
              <View style={styles.popupFooter}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={[styles.footerBtn, { backgroundColor: 'white' }]}><Text style={[styles.popupHeaderText, { color: 'black' }]}>Close</Text></TouchableOpacity>
                <TouchableOpacity disabled={selectedAge == null ? true : false} onPress={() => {
                  if (selectedAge != null) {
                    checkAuthenticationmenu(selectedAge);
                  } else {
                    alert('Please select any option.');
                  }
                }} style={[styles.footerBtn, { backgroundColor: '#B60612' }]}><Text style={styles.popupHeaderText}>Next</Text></TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.firstDivider}></View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 24.5,
            justifyContent: 'space-between',
            width: windowWidth - 60,
          }}>
          {menu.map((menutype, index) => {
            var type = menutype.label;
            if (index == 0) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    checkAuthenticationWizard();

                  }}
                  style={{ flexDirection: 'row', width: '70%' }}>
                  <View>
                    <Image source={icon_female} style={{ marginLeft: 2 }} />
                  </View>
                  <Text style={styles.iconText}>Wizard</Text>
                </TouchableOpacity>
              );
            }
          })}

          <View style={{ width: '10%' }}>
            {/* <Icon2 name="caretright" size={18} color="#E4E9EA" /> */}
            {modalVisible ? (
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                }}
                onPress={() => {
                  isAuth
                    ? setModalVisible(!modalVisible)
                    : checkAuthentication1();
                }}>
                <Icon2 name="caretright" size={18} color="#E4E9EA" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                }}
                onPress={() => {
                  isAuth
                    ? setModalVisible(!modalVisible)
                    : checkAuthentication1();
                }}>
                <Icon2 name="caretright" size={18} color="#E4E9EA" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.firstDivider}></View>
        <TouchableOpacity
          onPress={() => checkAuthentication()}
          style={{
            flexDirection: 'row',
            marginTop: 24.5,
            justifyContent: 'space-between',
            width: windowWidth - 60,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Image source={icon_pet} style={{ marginLeft: 2 }} />
            </View>
            <Text style={styles.iconText}>Pets</Text>
          </View>

          <View>
            <Icon2 name="caretright" size={18} color="#E4E9EA" />
          </View>
        </TouchableOpacity>

        <View style={styles.firstDivider}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Categories')}
          style={{
            flexDirection: 'row',
            marginTop: 24.5,
            justifyContent: 'space-between',
            width: windowWidth - 60,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Image source={icon_categories} style={{ marginLeft: 2 }} />
            </View>
            <Text style={styles.iconText}>Categories</Text>
          </View>

          <View>
            <Icon2 name="caretright" size={18} color="#E4E9EA" />
          </View>
        </TouchableOpacity>

        <View style={styles.firstDivider}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Browse')}
          style={{
            flexDirection: 'row',
            marginTop: 24.5,
            justifyContent: 'space-between',
            width: windowWidth - 60,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Image source={icon_browse} style={{ marginLeft: 2 }} />
            </View>
            <Text style={styles.iconText}>Browse</Text>
          </View>

          <View>
            <Icon2 name="caretright" size={18} color="#E4E9EA" />
          </View>
        </TouchableOpacity>

        <View style={styles.firstDivider}></View>
        <TouchableOpacity
          onPress={() => {
            setwizardType('Gift');
            isAuth ? setModalVisible(!modalVisible) : checkAuthentication1();
          }}
          style={{
            flexDirection: 'row',
            marginTop: 24.5,
            justifyContent: 'space-between',
            width: windowWidth - 60,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Image source={icon_gift} style={{ marginLeft: 2 }} />
            </View>
            <Text style={styles.iconTextGift}>Gift Under $50</Text>
          </View>

          <View>
            <Icon2 name="caretright" size={18} color="#E4E9EA" />
          </View>
        </TouchableOpacity>
        <View style={styles.firstDivider}></View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  searchBox: {
    height: 48,
    // width: '100%',
    backgroundColor: '#ffffff',
    left: 8,
    marginRight: 16,
    marginTop: 8,
    // borderWidth: 1,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
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
    marginLeft: 25.5,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 19,
    color: '#474D52',
    marginTop: 2,
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#2f35415e',
  },
  modalView: {

    backgroundColor: '#e3e3e3',
    borderRadius: 2,
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '95%',
    maxHeight: '60%',
    flexDirection: 'column'
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
    paddingTop: 20,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 27,
  },
  popupHeader: {
    width: '100%',
    backgroundColor: '#B60612',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    // margin:-25
  },
  popupHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  popupFooter: {
    width: '100%',
    // backgroundColor: '#B60612',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 10,

  }
});
