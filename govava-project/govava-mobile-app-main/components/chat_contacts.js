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
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../components/Header';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
// import Loader from './Loader';
import WizardLoader from './WizardLoader';
import {useDispatch} from 'react-redux';
import * as wizardActions from '../store/actions/wizard';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {selectContactPhone} from 'react-native-select-contact';
import {useSelector} from 'react-redux';
import styles from '../styles/friendStyle';
import Notifications from '../components/Notifications';
import ContentLoader, {Rect, Circle, List} from 'react-content-loader/native';
import PersonCharacter from '../components/PersonCharacter';
import PersonStyle from '../components/PersonStyle';
import PersonPersona from '../components/PersonPersona';
import Loader from './Loader';

export default function Contacts(props) {
  const userData = useSelector((state) => state.auth);
  const [ischecked,setischecked] = useState(false);
  const selectedmobilenumber = props.selectedmobilenumber;
  const previousmobilenumber = props.previousmobilenumber;
  console.log("chat_contact componrnt previous no "+previousmobilenumber);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibledelete, setModalVisibledelete] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [fname, setFname] = useState('');
  const [fphone, setFphone] = useState('');
  const [error_n, setError_n] = useState(null);
  const [error_p, setError_p] = useState(null);
  const [error_e, setError_e] = useState(null);
  const [f_email, setF_email] = useState('');
  const [gender_input, setGender_input] = useState('Male');
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [count, setcount] = React.useState(0);

  const [friend, setFriend] = useState(props.friend ? props.friend : null);
  const [allfriends, setAllfriends] = useState(null);
  const [friendsearch, setFriendsearch] = useState(null);
  const [searchterm, setSearchterm] = useState(null);
  const [visibility, setvisibility] = useState(false);
  const [charaslected, setcharaslected] = useState(false);
  const [personaslected, setpersonaslected] = useState(false);
  const [styleslected, setstyleslected] = useState(false);
  const [type, settype] = useState(false);
  const [errors, setErrors] = React.useState({
    name_error: null,
    mobile1_error: null,
    mobile2_error: null,
    gender_error: null,
    email_error: null,
    chara_err: null,
    persona_err: null,
    style_err: null,
  });
  const [params, setparams] = React.useState({
    contact_id: null,
    gender: 'Female',
    contact_name: null,
    email: null,
    mobile1: null,
    mobile2: null,
    styles_id: null,
    personas_id: null,
    character: null,
    character_id: null,
    // searchText: '',
    // countryCode: RNLocalize.getCountry(),
  });

  const filterUnwanted = (arr) => {
    const required = arr.filter((el) => {
      return el.contact_name;
    });
    return required;
  };
  useFocusEffect(
    React.useCallback(() => {
      setSearchterm('');
      setFriendsearch(null);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 10000);
      const getFriends = async () => {
        try {
          let friendsresult;
          friendsresult = wizardActions.getFriends(userData);
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(friendsresult);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          if (resultData.state) {
            if (resultData.friends != null) {
              var sorted = filterUnwanted(resultData.friends);
              sorted.sort((a, b) =>
                a.contact_name > b.contact_name
                  ? 1
                  : b.contact_name > a.contact_name
                  ? -1
                  : 0,
              );
              setFriendsearch(sorted);
              // console.log(sorted);
              setAllfriends(sorted);
            } else {
              setFriendsearch(resultData.friends);
              // console.log(sorted);
              setAllfriends(resultData.friends);
            }
          } else {
            console.log('server error');
          }
          //console.log(allfriends.length);

          setLoading(false);

          console.log(resultData.friends.length);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
          console.log(err);
        }
      };
      getFriends();
    }, []),
  );
  useEffect(() => {
    // console.log('noo');
    setFriend(props.friend);
  }, [props.friend]);

  const savefriend = async () => {
    console.log('****************************________________________');
    console.log(params);
    var name = null;

    var email = null;
    var mobile1 = null;
    var mobile2 = null;
    if (params['contact_name'] != null) {
      name = params['contact_name'].trim();
    }

    if (params['email'] != null) {
      email = params['email'].trim();
    }
    if (params['mobile1'] != null) {
      mobile1 = params['mobile1'].trim();
    }
    if (params['mobile2'] != null) {
      mobile2 = params['mobile2'].trim();
    }
    let contact_id = params['contact_id'];
    var user_id = userData.userId;
    setLoading(true);
    try {
      let newfriend;
      newfriend = wizardActions.usercontact(
        name,
        email,
        mobile1,
        mobile2,
        contact_id,
        user_id,
        params,
      );
      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(newfriend);
      // console.log(result);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      // console.log(resultData);
      //setAllfriends(resultData.friend);
      setLoading(false);
      if (resultData.state == true) {
        navigation.navigate('Settings');
      } else {
        // setnavscreen('Settings');
        setmsg(resultData.message);
        setnotification(true);
      }

      // console.log(resultData.state);
    } catch (err) {
      console.log(err.message);
      // alert('Error,Something went wrong');
      setLoading(false);
    }
  };
  const searchFriend = (term) => {
    setSearchterm(term);
    if (term != '') {
      let search_rslt1 =
        allfriends == null
          ? null
          : allfriends.filter(
              (item) =>
                item.contact_name != null && item.contact_name.toLowerCase().includes(term.toLowerCase()),
            );
      setFriendsearch(search_rslt1);
      // this.setState({ search_rslt: search_rslt1 });
    } else {
      setFriendsearch(allfriends);
    }
  };
  const ValidationProcess = (props) => {
    // var regex = /^[A-Za-z0-9 +]+$/;

    // console.log(/^\d+$/.test(params['mobile2']));
    // console.log(regex.test(params['mobile2']));
    // return;
    var name = null;
    var email = null;
    var mobile1 = null;
    var mobile2 = null;
    if (params['contact_name'] != null) {
      name = params['contact_name'].trim();
    }

    if (params['email'] != null) {
      email = params['email'].trim();
    }
    if (params['mobile1'] != null) {
      mobile1 = params['mobile1'].trim();
    }
    if (params['mobile2'] != null) {
      mobile2 = params['mobile2'].trim();
    }

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var regex = /^[0-9]+$/;
    var namex = /^[A-Za-z0-9. )+(]+$/;

    // alert(name);
    if (name == '' && email == '' && mobile1 == '' && mobile2 == '') {
      return;
    } else if (name == '' || name == null) {
      setErrors({...errors, ['name_error']: 'Name is required'});
    } else if (namex.test(name) == false) {
      setErrors({
        ...errors,
        ['name_error']: 'Name format is not valid',
      });
    } else if (email != '' && email != null && reg.test(email) === false) {
      setErrors({
        ...errors,
        ['email_error']: 'Email is invalid',
        ['name_error']: null,
      });
    } else if (mobile1 == '' || mobile1 == null) {
      setErrors({
        ...errors,
        ['mobile1_error']: 'Mobile number is required',
        ['username_error']: null,
        ['name_error']: null,
        ['email_error']: null,
      });
    } else if (regex.test(mobile1) == false) {
      setErrors({
        ...errors,
        ['mobile1_error']: 'Enter valid mobile number',
        ['username_error']: null,
        ['name_error']: null,
        ['email_error']: null,
      });
    } else if (
      regex.test(mobile2) == false &&
      mobile2 != null &&
      mobile2 != ''
    ) {
      setErrors({
        ...errors,
        ['mobile2_error']: 'Enter valid number',
        ['mobile1_error']: null,
        ['username_error']: null,
        ['name_error']: null,
        ['email_error']: null,
      });
    } else {
      setErrors({
        ...errors,

        ['gender_error']: null,
        ['mobile2_error']: null,
        ['mobile1_error']: null,
        ['username_error']: null,
        ['name_error']: null,
        ['email_error']: null,
      });
      savefriend();
      // setotpmodal(true);
    }
  };

  const deleteFriend = async () => {
    setLoading(true);
    setModalVisibledelete(false);
    try {
      let contact_id = params['contact_id'];
      let friendsresult;
      friendsresult = wizardActions.deleteFriend(contact_id);
      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(friendsresult);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      console.log(resultData);
      if (resultData.state == true) {
        navigation.navigate('Settings');
      } else {
        // setnavscreen('Settings');
        setmsg(resultData.message);
        setnotification(true);
      }

      setLoading(false);
    } catch (err) {
      // alert('Error,Something went wrong');
      setLoading(false);
      console.log(err);
    }
  };
  const visible = async (contact_id) => {
    setparams({
      ...params,
      ['contact_id']: contact_id,
    });
    // setModalVisibledelete(true);
  };
  const renderItem = ({item}) => {
    console.log('item is',item);
    let input_index = 0;
    if(item.mobile1!=null && item.mobile1.length>=10 ){
      input_index = item.mobile1.slice(item.mobile1.length - 10);
    }else{
      input_index = item.mobile1!=null&& item.mobile1!=''?item.mobile1:0;
    }
    console.log('input_indexinput_indexinput_indexinput_indexinput_index',input_index)
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          justifyContent: 'space-between',
          backgroundColor:selectedmobilenumber.includes(input_index) || previousmobilenumber.includes(input_index)  ?'#80808070' :null,
          borderRadius:5
        }}>
        <TouchableOpacity
          style={{
            // width: windowWidth - 15,
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            // backgroundColor: 'white',
            padding: 7,
            width: '70%',
            // backgroundColor: 'green',
          }}
          disabled={previousmobilenumber.includes(input_index)}
          // onPress={() => {navigation.navigate('Chats',{screen:'ChatScreen'});}}
          onPress={()=>{
            if(item.mobile1!==null &&item.mobile1!='' ){
            props.storeMobileNumbers(ischecked,input_index,item);}else{
              alert('No contact information found !!!');
            }}}
          >
          {item.contact_name != '' &&
          item.contact_name != null &&
          item.contact_name != 'null' ? (
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: 'black',
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 15}}>
                {item.contact_name.slice(0, 1)}
              </Text>
            </View>
          ) : null}

          <View>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {item.contact_name}
            </Text>
            <Text style={{fontSize: 13}}>{item.mobile1}{(previousmobilenumber.includes(input_index) ) && 
            ' ( Already selected )'}</Text>
          </View>
        </TouchableOpacity>
     {(selectedmobilenumber.includes(input_index)  || previousmobilenumber.includes(input_index) )&&   <TouchableOpacity
          style={{
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            marginRight: 20,
          }}
          onPress={() => visible(item.id)}>
          <Icon name="checkcircle" size={20} color="gray" />
        </TouchableOpacity>}
      
      </View>
    );
  };
  const renderComponent = () => {
    if (loading) {
      return (
        <ScrollView>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              height: 70,
            }}>
            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              height: 70,
            }}>
            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              height: 70,
            }}>
            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              height: 70,
            }}>
            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              height: 70,
            }}>
            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              height: 70,
            }}>
            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              height: 70,
            }}>
            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              height: 70,
            }}>
            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              height: 70,
            }}>
            <ContentLoader viewBox="0 0 380 70">
              <Circle cx="30" cy="30" r="30" />
              <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
              <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </View>
        </ScrollView>
      );
    } else {
      if (friendsearch && friendsearch.length > 0) {
        if (visibility == true) {
          return null;
        } else {
          return (
            <View>
              <Modal
                transparent={true}
                animationType={'fade'}
                visible={modalVisibledelete}
                onRequestClose={() => {
                  console.log('close modal');
                }}>
                <View style={{flex: 1, backgroundColor: '#000000ad'}}>
                  <View
                    style={{
                      top: 250,
                      margin: 20,
                      backgroundColor: '#ffffff',
                      borderRadius: 10,
                      padding: 20,
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}>
                    <Text style={styles.modalText}>
                      Are you sure? Do you want to delete the contact?
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingHorizontal: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisibledelete(false);
                        }}
                        style={{
                          backgroundColor: '#cb9b27',
                          padding: 10,
                          elevation: 2,
                          width: '45%',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          // props.loadPetdetails(item.petwizardDetails);
                          deleteFriend();
                        }}
                        style={{
                          backgroundColor: '#cb9b27',
                          padding: 10,
                          elevation: 2,
                          width: '45%',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <FlatList
                data={friendsearch}
                // ListHeaderComponent={()=>()}
                renderItem={renderItem}
                //Setting the number of column
                keyExtractor={(item, index) => {return 'key' + index}}
                style={{height:'80%'}}
                contentContainerStyle={{paddingBottom:100}}
              />
            </View>
          );
        }
      } else {
        return (
          <View
            style={{
              height: windowHeight / 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16}}>No contacts</Text>
          </View>
        );
      }
    }
  };
  if (visibility == true) {
    return (
      <ScrollView
        style={{
          width: '100%',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        {notification && (
          <Notifications
            msg={msg}
            navscreen={'ContactEdit'}
            onChange={() => setnotification(false)}
          />
        )}
        {loading && <Loader loading={loading} />}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <SafeAreaView></SafeAreaView>
          <View
            style={{
              marginTop: 20,
              // backgroundColor: '#ffffff',
              backgroundColor: '#dadce0',
              height: windowHeight,
              borderRadius: 2,
              flexDirection: 'column',
              alignItems: 'center',
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              // borderRadius: 5,
            }}>
            {type == 'character' && (
              <PersonCharacter
                params={params}
                onChange={(character) => {
                  setparams({
                    ...params,
                    ['character']: character,
                    ['character_id']: character ? character.id : null,
                  });
                }}
              />
            )}
            {type == 'persona' && (
              <PersonPersona
                params={params}
                onChange={(ids) => {
                  // console.log(ids),
                  setparams({
                    ...params,
                    ['personas_id']: ids,
                  });
                }}
              />
            )}
            {type == 'style' && (
              <PersonStyle
                params={params}
                onChange={(ids) =>
                  setparams({
                    ...params,
                    ['styles_id']: ids,
                  })
                }
              />
            )}

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                {
                  type == 'character' && setcharaslected(true);
                }
                {
                  type == 'persona' && setpersonaslected(true);
                }
                {
                  type == 'style' && setstyleslected(true);
                }
              }}
              style={{
                height: 40,
                backgroundColor: 'red',
                width: '90%',
                backgroundColor: '#B60612',
                margin: 10,
                alignContent: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  //   paddingTop: 10,
                  // paddingBottom: 10,
                  fontSize: 20,
                  color: '#ffffff',
                  fontFamily: 'Roboto-Medium',
                  textAlign: 'center',
                }}>
                DONE
              </Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView></SafeAreaView>
        </Modal>
        <TextInput
          style={{
            marginTop: 20,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor="#808080"
          placeholder="Contact name"
          onChangeText={(text) =>
            setparams({
              ...params,
              ['contact_name']: text,
            })
          }
          value={params['contact_name']}
        />
        {errors['name_error'] != null && (
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginBottom: 10,
              left: 10,
            }}>
            {errors['name_error']}
          </Text>
        )}
        <TextInput
          style={{
            marginTop: 20,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor="#808080"
          placeholder="Email"
          onChangeText={(text) =>
            setparams({
              ...params,
              ['email']: text,
            })
          }
          value={params['email']}
        />
        {errors['email_error'] != null && (
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginBottom: 10,
              left: 10,
            }}>
            {errors['email_error']}
          </Text>
        )}
        <TextInput
          style={{
            marginTop: 20,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor="#808080"
          placeholder="Mobile number 1"
          onChangeText={(text) =>
            setparams({
              ...params,
              ['mobile1']: text,
            })
          }
          value={params['mobile1']}
        />
        {errors['mobile1_error'] != null && (
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginBottom: 10,
              left: 10,
            }}>
            {errors['mobile1_error']}
          </Text>
        )}
        <TextInput
          style={{
            marginTop: 20,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor="#808080"
          placeholder="Mobile number 2"
          onChangeText={(text) =>
            setparams({
              ...params,
              ['mobile2']: text,
            })
          }
          value={params['mobile2']}
        />
        {errors['mobile2_error'] != null && (
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginBottom: 10,
              left: 10,
            }}>
            {errors['mobile2_error']}
          </Text>
        )}
        {/* <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor="#808080"
          placeholder="Name"
          onChangeText={(text) => setName_input(text)}
          value={name_input}
        />
        {errors['name_error'] != null && (
          <Text style={{ color: 'red',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    left: 10,}}>{errors['name_error']}</Text>
        )} */}
        {/* <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor="#808080"
          
          placeholder="Email"
          onChangeText={(text) => {
            setEmail_input(text);
            emailVerification(text);
          }}
          value={email_input}
        />
        {errors['email_error'] != null && (
          <Text style={{ color: 'red',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    left: 10,}}>{errors['email_error']}</Text>
        )} */}
        {/* <View style={{flexDirection: 'row', width: '100%'}}>
          <View
            style={{
              width: '27%',
              height: 40,
              backgroundColor: '#f3f3f3',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              borderWidth: 1,
            }}>
            <Icon2 name="caretdown" size={10} color="#808080" />
            <CountryPicker
              theme={dark ? DARK_THEME : {}}
              {...{
                countryCode,
                withFilter,
                // excludeCountries: ['FR'],
                withFlag,
                withCurrencyButton,
                withCallingCodeButton,

                onSelect,
                disableNativeModal,
                preferredCountries: ['US', 'IN'],
                modalProps: {
                  visible,
                },
                onClose: () => setVisible(false),
                onOpen: () => setVisible(true),
              }}
            />
          </View>
          <TextInput
            style={{
              height: 40,
              width: '70%',
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 10,
              marginLeft: '3%',
            }}
            keyboardType="numeric"
            placeholderTextColor="#808080"
            placeholder="Mobile"
            onChangeText={(text) => {
              mobileVerification(text);
              setMobile_input(text);
            }}
            value={mobile_input}
          />
        </View>
        {errors['mobile_error'] != null && (
          <Text style={{ color: 'red',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    left: 10,}}>{errors['mobile_error']}</Text>
        )} */}

        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{paddingLeft: 10, color: 'gray', fontSize: 16}}>
            Gender
          </Text>
          <TouchableOpacity
            onPress={() =>
              setparams({
                ...params,
                ['gender']: 'Female',
              })
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 15,
                height: 15,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 15,
                backgroundColor: params['gender'] == 'Female' ? 'gray' : null,
              }}></View>
            <Text style={{color: 'gray', fontSize: 14}}>{'  '}Female</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setparams({
                ...params,
                ['gender']: 'Male',
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <View
              style={{
                width: 15,
                height: 15,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 15,
                backgroundColor: params['gender'] == 'Male' ? 'gray' : null,
              }}></View>
            <Text style={{color: 'gray', fontSize: 14}}>{'  '}Male</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignSelf: 'flex-start',
            marginBottom: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              paddingLeft: 10,
              color: 'gray',
              fontSize: 16,
              textAlign: 'left',
              //   marginTop: 10,
              width: '40%',
            }}>
            Character trait
          </Text>
          <TouchableOpacity
            onPress={() => {
              params['gender'] == null && setnotification(true);
              params['gender'] == null && setmsg('Select gender first');
              params['gender'] != null && setModalVisible(true);
              settype('character');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
              width: '60%',
              backgroundColor: '#B60612',
              alignContent: 'center',
              height: 30,
            }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                color: '#ffffff',
                fontSize: 20,
                width: '100%',
              }}>
              {charaslected ? 'Change' : 'Select'}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignSelf: 'flex-start',
            marginBottom: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              paddingLeft: 10,
              color: 'gray',
              fontSize: 16,
              textAlign: 'left',
              //   marginTop: 10,
              width: '40%',
            }}>
            Persona
          </Text>
          <TouchableOpacity
            onPress={() => {
              params['gender'] == null && setnotification(true);
              params['gender'] == null && setmsg('Select gender first');
              params['gender'] != null && setModalVisible(true);
              settype('persona');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
              width: '60%',
              backgroundColor: '#B60612',
              alignContent: 'center',
              height: 30,
            }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                color: '#ffffff',
                fontSize: 20,
                width: '100%',
              }}>
              {personaslected ? 'Change' : 'Select'}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignSelf: 'flex-start',
            marginBottom: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              paddingLeft: 10,
              color: 'gray',
              fontSize: 16,
              textAlign: 'left',
              //   marginTop: 10,
              width: '40%',
            }}>
            Active lifestyle
          </Text>
          <TouchableOpacity
            onPress={() => {
              params['gender'] == null && setnotification(true);
              params['gender'] == null && setmsg('Select gender first');
              params['gender'] != null && setModalVisible(true);
              settype('style');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
              width: '60%',
              backgroundColor: '#B60612',
              alignContent: 'center',
              height: 30,
            }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                color: '#ffffff',
                fontSize: 20,
                width: '100%',
              }}>
              {styleslected ? 'Change' : 'Select'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* {errors['gender_error'] != null && (
          <Text style={{ color: 'red',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
    left: 10,}}>{errors['gender_error']}</Text>
        )} */}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 0,
            width: '100%',
          }}>
          <TouchableOpacity
            //  onPress={() => ValidationProcess()}
            onPress={() => {
              params['gender'] == null && setnotification(true);
              params['gender'] == null && setmsg('Select gender first');
              params['gender'] != null && ValidationProcess();
              
            }}>
            <View
              style={{
                height: Platform.OS == 'ios' ? 50 : 50,
                backgroundColor: '#B60612',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontSize: 20,
                  color: '#ffffff',
                  fontFamily: 'Roboto-Medium',
                }}>
                SAVE
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={{marginBottom: 100}}></View> */}
      </ScrollView>
    );
  } else {
    return (
      <View style={{alignItems: 'center',height:'100%'}}>
        

        {friend != null ? (
          <View
            style={{
              width: windowWidth - 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              elevation: 2,
              marginVertical: 10,
              backgroundColor: 'white',
              padding: 7,
              borderRadius: 8,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  backgroundColor: 'black',
                  marginRight: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 15}}>
                  {friend.contact_name.slice(0, 1)}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {friend.contact_name}
                </Text>
                <Text style={{fontSize: 13}}>{friend.mobile1}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => props.onChange(null)}>
              <Icon name="closecircle" size={18} color="red" />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={[styles.card,{paddingBottom:20,height:'100%'}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderBottomWidth: 1,
                width: '100%',
                marginVertical: 10,
                alignSelf: 'flex-start',
              }}
              placeholder="Search"
              placeholderTextColor="#838484" 
              onChangeText={(text) => searchFriend(text)}
              value={searchterm}
            />
            {/* <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                elevation: 5,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: -5,
                right: 0,
              }}>
              <Icon name="plus" size={25} color="black" />
            </TouchableOpacity> */}
          </View>

          {renderComponent()}
        </View>
      </View>
    );
  }
}
