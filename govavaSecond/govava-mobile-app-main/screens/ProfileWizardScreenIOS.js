
// Copy and paste contents of ProfileWizardScreenIOS.js for ios and ProfileWizardScreenandroid.js for android
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Button,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Image
} from 'react-native';
import Header from '../components/Header';
import ProfileWizardMenu from '../components/ProfileWizardMenu';
import Occasions from '../components/Occasions';
import Age from '../components/Age';
import Gender from '../components/Gender';
import PersonStyle from '../components/PersonStyle';
import PersonPersona from '../components/PersonPersona';
import PersonCharacter from '../components/PersonCharacter';
import PriceRange from '../components/PriceRange';
import Relationship from '../components/Relationship';
import Icon from 'react-native-vector-icons/FontAwesome';
import Notifications from '../components/Notifications';
import Friends from '../components/Friends_new';
import * as wizardActions from '../store/actions/wizard';
import * as authActions from '../store/actions/auth';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import MyCarousel from '../components/Image_carousel';
import Confirmation from '../components/Confirm_modal';
import {useFocusEffect} from '@react-navigation/native';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as RNLocalize from 'react-native-localize';
//import {useFocusEffect} from '@react-navigation/native';
import * as chatActions from "../store/actions/chat";
import ai from '../assets/images/AI_photo.jpg';

export default function ProfileWizardScreen({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const  chatData = useSelector((state) => state.chat);

  const [wizardicon, setwizardicon] = React.useState(true);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [count, setcount] = React.useState(0);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [navscreen, setnavscreen] = React.useState('');
  const [close, setClose] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [persona_status, setpersona_status] = React.useState(null);
  const [active_lifestatus, setactive_lifestatus] = React.useState(null);
  const [genderVisibility, setgenderVisibility] = useState(false);
  const [wizardTypee, setwizardTypee] = useState(false);
  const [special_occasion, setSpecial] = useState(false);

  const [params, setparams] = React.useState({
    occasion: null,
    occasion_id: null,
    age_label: null,
    ageRange_id: null,
    age_group: null,
    gender: null,
    price_range: null,
    price_range_id: null,
    friend: null,
    friend_id: null,
    relation: null,
    relation_id: null,
    type: null,
    styles: [],
    styles_id: [],
    personas: [],
    personas_id: [],
    character: null,
    character_id: null,
    searchText: '',
    countryCode: RNLocalize.getCountry(),
  });
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setBtnLoading(false);
       };
    }, [])
  );
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const checkAuth = async () => {
  //       try {
  //         action = authActions.checkAuth();

  //         const result = await dispatch(action);

  //         const resultData = JSON.parse(result);
  //         if (resultData.auth_status == false) {
  //           // console.log('Sign In result data', resultData);
  //           dispatch(authActions.logout());
  //         }
  //       } catch (err) {}
  //     };
  //     checkAuth();
  //   }),
  // );
  useEffect(() => {
    PushNotificationIOS.requestPermissions(["alert"]);
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  }, []);
  const onRemoteNotification = (notification) => {
   // alert('88888');
    PushNotificationIOS.getInitialNotification();
    const isClicked = notification.getData().userInteraction === 1;
 
    if (isClicked) {
      // Navigate user to another screen
   //   alert('77777');

      navigation.navigate('Chats',{screen:'ChatScreen',params:{
        chatId:notification.getData().data.chat_id,
        product: JSON.parse(notification.getData().data.productDetails),
        chatTitle: notification.getData().data.chatTitle,
        chat_user : JSON.parse(notification.getData().data.chat_user),
      }})
    } else {
      // Do something else with push notification
      //alert('9999999999');

    }
  };
  PushNotification.configure({
    
    // ignoreInForeground: true,
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",notification)
      //  alert('222222222222222222222');
              // console.log("NOTIFICATION DETAILS:", JSON.stringify(notification));
 
      if (notification.foreground && !notification.userInteraction) {
       // alert('3333333');
        PushNotificationIOS.localNotification(notification);
        dispatch(chatActions.getAllChats());

       
      } else if (notification.remote && !notification.userInteraction) {
        PushNotificationIOS.localNotification(notification);
        dispatch(chatActions.getAllChats());

       // alert('4444444');
        
      }
     
      notification.finish(PushNotificationIOS.FetchResult.NoData);
      const clicked = notification.userInteraction;
      if (clicked) {
       // alert('55555');
        // console.log("NOTIFICATION DETAILS:", (notification.data.chatTitle));
        navigation.navigate('Chats',{screen:'ChatScreen',params:{
          chatId:notification.data.chat_id,
          product: JSON.parse(notification.data.productDetails),
          chatTitle: notification.data.chatTitle,
          chat_user : JSON.parse(notification.data.chat_user),
        }})
     
      } else {
       // alert('666666');

      }
      // process the notification
      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false,
    // if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
  useEffect(
    React.useCallback(() => {
      console.log(RNLocalize.getCountry());
      if (count == 0) {
        setClose(false);
      } else {
        setClose(true);
      }
    }, [count]),
  );
  var output = [];
  var last = 10;
  if (wizardTypee == 'Gift') {
    last = 9;
  }
  for (let i = 1; i < last; i++) {
    if (count == i) {
      var element = (
        <Icon
          key={i}
          name="dot-circle-o"
          size={15}
          color="#cb9b27"
          style={{paddingRight: 5}}
        />
      );
    } else {
      var element = (
        <Icon
          key={i}
          name="circle"
          size={15}
          color="#cb9b27"
          style={{paddingRight: 5}}
        />
      );
    }

    output[i] = element;
  }
  // console.log('params are' + JSON.stringify(params));
  const setOccasion = (occasion_details) => {
    //code for specal occasions
    if (occasion_details.special_occasion == 'True') {
      //  setSpecial(true);
      setSpecial(false);
    } else {
      setSpecial(false);
    }
    setparams({
      ...params,
      ['occasion']: occasion_details,
      ['occasion_id']: occasion_details.id,
    });
  };
  const increaseCount = () => {
    setLoading(true);
    // alert(wizardTypee);
    console.log(count);
    if (special_occasion) {
      if (count == 1 && wizardTypee == 'Gift') {
        getWizardProducts();
        return;
      } else {
        setcount(9);
      }
    } else {
      if (count == 2 && genderVisibility != true) {
        setcount(4);
        console.log('new' + 4);
      } else {
        if (count == 6 && persona_status != 1) {
          if (active_lifestatus != 1) {
            if (wizardTypee == 'Gift') {
              getWizardProducts();
            } else {
              setcount(count + 3);
              console.log('new' + count + 3);
            }
          } else {
            setcount(count + 2);
            console.log('new' + count + 2);
          }
        } else {
          setcount(count + 1);
          console.log('new');
          console.log(count);
        }
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const decreaseCount = () => {
    if (special_occasion) {
      setLoading(true);
      if (count == 9) {
        setcount(1);
      } else {
        setcount(count - 1);
      }

      setLoading(false);
      return;
    }
    setLoading(true);
    // alert(count);
    if (count == 9 && active_lifestatus != 1 && persona_status != 1) {
      setcount(count - 3);
    } else if (
      (count == 9 && active_lifestatus != 1 && persona_status == 1) ||
      (count == 4 && genderVisibility != true)
    ) {
      setcount(count - 2);
    } else if (count == 8 && persona_status != 1) {
      setcount(count - 2);
    } else {
      setcount(count - 1);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const validation = () => {
    if (count == 1 && params['occasion'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Occasions');
      setnotification(true);
      return;
    }
    if (!special_occasion && count == 2 && params['friend'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select a Friend');
      setnotification(true);
      return;
    }
    if (!special_occasion && count == 3 && params['gender'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Gender');
      setnotification(true);
      return;
    }
    if (!special_occasion && count == 4 && params['age_label'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Age');
      setnotification(true);
      return;
    }
    if (!special_occasion && count == 5 && params['character_id'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Character Trait');
      setnotification(true);
      return;
    }
    if (!special_occasion && count == 6 && params['relation_id'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Relationship');
      setnotification(true);
      return;
    }
    if (!special_occasion && count == 7 && params['personas_id'].length == 0) {
      setnavscreen('ProfileWizard');
      setmsg("Please Select Person's Persona");
      setnotification(true);
      return;
    }
    if (!special_occasion && count == 8 && params['styles_id'].length == 0) {
      setnavscreen('ProfileWizard');
      setmsg("Please Select Person's Style");
      setnotification(true);
      return;
    }
    if (count == 9 && params['price_range'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Price');
      setnotification(true);
      return;
    }
    if (
      count == 8 &&
      (params['styles_id'].length != 0 || special_occasion) &&
      wizardTypee == 'Gift'
    ) {
      getWizardProducts();
      return;
    }

    if (count == 9) {
      // alert('hii');
      //navigation.navigate('SuggestedItems');
      //console.log(params);
      // navigation.navigate('SuggestedItems');
      getWizardProducts();
      return;
    }
    increaseCount();
  };
  const loadfrienddata = (friend) => {
    //console.log(JSON.parse(friend.character) + 'jkhkjhkjhkj');
    setparams({...params, ['friend']: friend});
    let wizard_data =
      friend && friend.wizard_details
        ? JSON.parse(friend.wizard_details)
        : null;
    let character_data =
      friend && friend.character != null ? JSON.parse(friend.character) : null;
    if (wizard_data != null && character_data != null) {
      setConfirm(true);
    }
    // console.log(params);
  };
  const setFrienddata = () => {
    var friend = params['friend'];
    let wizard_data =
      friend && friend.wizard_details
        ? JSON.parse(friend.wizard_details)
        : null;
    let character_data =
      friend && friend.character != null ? JSON.parse(friend.character) : null;
    // console.log(wizard_data);
    // console.log(wizard_data != null);
    if (wizard_data != null && character_data != null) {
      // console.log('wizard');
      setLoading(true);
      console.log('fff');
      console.log(character_data.icon_name);
      setparams({
        ...params,
        ['friend']: friend,
        ['friend_id']: friend.id,
        ['age_group']: wizard_data.ageGroup,
        ['ageRange_id']: wizard_data.ageRange,
        ['character_id']: wizard_data.characterTrait,
        ['character']: character_data,
        ['styles_id']: wizard_data.activeLifeStyle,
        ['personas_id']: wizard_data.persona,
        ['relation_id']: wizard_data.relation,
        ['gender']: wizard_data.gender,
        ['searchText']: wizard_data.searchText ? wizard_data.searchText : '',
      });
      if (wizardTypee == 'Profile') {
        setcount(9);
      }
      if (wizardTypee == 'Gift') {
        if (active_lifestatus != 1) {
          getWizardProducts();
        } else {
          setcount(8);
        }
      }
      setLoading(false);
      // console.log(count);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else if (wizard_data != null) {
      // console.log('wizard');
      setLoading(true);
      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
      console.log(wizard_data);
      setparams({
        ...params,
        ['friend']: friend,
        ['friend_id']: friend.id,
        ['age_group']: wizard_data.ageGroup,
        ['ageRange_id']: wizard_data.ageRange,
        ['character_id']: wizard_data.characterTrait,
        ['styles_id']: wizard_data.activeLifeStyle,
        ['personas_id']: wizard_data.persona,
        ['relation_id']: wizard_data.relation,
        ['gender']: wizard_data.gender,
        ['searchText']: wizard_data.searchText ? wizard_data.searchText : '',
      });
      if (wizardTypee == 'Profile') {
        setcount(9);
      }
      if (wizardTypee == 'Gift') {
        setcount(8);
      }
      setLoading(false);
      // console.log(count);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setparams({
        ...params,
        ['friend']: friend,
        ['friend_id']: null,
        ['ageRange_id']: null,
        ['character_id']: null,
        ['styles_id']: [],
        ['personas_id']: [],
        ['relation_id']: null,
        ['gender']: null,
        ['searchText']: '',
      });
    }
    setConfirm(false);
    setLoading(false);
  };
  const getWizardProducts = async () => {
    try {
      setLoading(true);
      setBtnLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 10000);
      let wizardProducts;
      if (wizardTypee == 'Profile') {
        wizardProducts = wizardActions.getWizardProducts(params, userData);
      }
      if (wizardTypee == 'Gift') {
        wizardProducts = wizardActions.getGiftWizardProducts(params, userData);
      }

      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(wizardProducts);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      // console.log(resultData);
      if (resultData.state) {
        // console.log(resultData.items);
        // setproducts(resultData.items);
        setLoading(false);
        // console.log(params['friend']['id']);
        var user_contact_id = special_occasion ? null : params['friend']['id'];
        navigation.navigate('SuggestedItems', {
          products: resultData.items,
          wizard_detail: resultData.wizard_detail,
          request_body: resultData.request_body,
          totalPages: resultData.totalPages,
          suggesteditems: resultData.suggesteditems,
          user_contact_id: user_contact_id,
          wizard_type: 'User',
          pet_id: null,
          occasion_id: params['occasion_id'],
          character: params['character'],
        });
      } else {
        // setnotification(true);
        // setmsg(resultData.message);
        var user_contact_id = special_occasion ? null : params['friend']['id'];
        setLoading(false);
        navigation.navigate('SuggestedItems', {
          products: resultData.items,
          wizard_detail: resultData.wizard_detail,
          request_body: resultData.request_body,
          totalPages: resultData.totalPages,
          suggesteditems: resultData.suggesteditems,
          user_contact_id: user_contact_id,
          wizard_type: 'User',
          pet_id: null,
          occasion_id: params['occasion_id'],
          character: params['character'],
        });
      }
      // console.log(resultData.state);
    } catch (err) {
      // alert('Error,Something went wrong');
      setLoading(false);
      setBtnLoading(false);

      setnotification(true);
      setmsg('Network Error,Try again');
    }
  };
  const setAgelabeldetails = (age_label) => {
    let searchText;
    if (params['gender'] == 'Male') {
      searchText = age_label.male_search_text ? age_label.male_search_text : '';
    } else {
      searchText = age_label.female_search_text
        ? age_label.female_search_text
        : '';
    }
    setparams({
      ...params,
      ['age_label']: age_label,
      ['ageRange_id']: age_label.id,
      ['searchText']: searchText,
    });
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        // backgroundColor: ,
        backgroundColor: count == 0 ? '#ffffff' : '#e3e3e3',
        flexDirection: 'column',
      }}>
      <Confirmation
        confirm={confirm}
        friend={params['friend']}
        closeConfirm={() => setConfirm(false)}
        onChange={() => setFrienddata()}
        msg={''}
      />
      <StatusBar barStyle='light-content' backgroundColor="#B60612" />
      {notification && (
        <Notifications
          msg={msg}
          navscreen={navscreen}
          notification={notification}
          onChange={() => setnotification(false)}
        />
      )}
      <Header
        loading={loading}
        govavaicon={true}
        icon={wizardicon}
        close={close}
        search={true}
        wizardicon={count>0?true:false}
      />

      {count == 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            width: windowWidth,
          }}>
          <View style={{height: windowWidth / 2.5}}>
            <MyCarousel />
          </View>
          <Text
            style={{
              color: '#B60612',
              fontStyle: 'normal',
              fontFamily: 'Roboto-Italic',
              fontSize: 20,
              lineHeight: 20,
              padding: 20,
              textAlign: 'center',
              paddingTop: 30,
              paddingBottom: -10,
              // fontStyle: 'italic',
              // right: 16,
            }}>
            FIND THE PERFECT GIFT
          </Text>
          <ProfileWizardMenu
            type={params['type']}
            onChange={(menutype, genderVisibility, gender, wizardType) => {
              setwizardTypee(wizardType);
              var gendertype = null;
              genderVisibility != true ? (gendertype = gender) : null;
              setparams({
                ...params,
                ['type']: menutype.label,
                ['gender']: gendertype,
              });
              setpersona_status(menutype.persona_status);
              setactive_lifestatus(menutype.active_lifestatus);
              setgenderVisibility(genderVisibility);
              increaseCount();
            }}
          />
           <View style={{width:windowWidth,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingBottom:Platform.OS=='ios'?25:15}}>
          <Image
              style={{ width:windowWidth>700?130:82, height:windowWidth>700?90:60}}
              source={ai}
            />
            <Text style={{ color: 'black', fontSize: Platform.OS == 'ios' ? 15 : 12,alignSelf:'flex-end'}}>Powered by{'\n'}Govava<Text style={{color:'blue',fontWeight:'bold', fontSize: Platform.OS == 'ios' ? 15 : 12}}> AI</Text></Text>
         
          </View>
          {/* <ProfileWizardMenu
            type={params['type']}
            onChange={(menutype, genderVisibility, gender) => {
              var type = menutype.label;
              setparams({...params, ['type']: 'Boys'});

              
              alert(params['gender']);
              genderVisibility != true &&
                setparams({...params, ['gender']: 'gender'});
              setgenderVisibility(genderVisibility);
              increaseCount();
            }}
          /> */}
        </View>
      )}
      {count == 1 && (
        <Occasions
          occasion={params['occasion']}
          occation_id={params['occasion_id']}
          onChange={(occasion_name) => {
            setOccasion(occasion_name);
          }}
        />
      )}
      {count == 2 && (
        <Friends
          friend={params['friend']}
          onChange={(friend) => loadfrienddata(friend)}
        />
      )}
      {count == 3 && genderVisibility == true && (
        <Gender
          gender={params['gender']}
          onChange={(gender) => setparams({...params, ['gender']: gender})}
        />
      )}
      {/* {count == 3 && genderVisibility != true && increaseCount()} */}
      {count == 4 && (
        <Age
          type={params['type']}
          ageRange_id={params['ageRange_id']}
          age_label={params['age_label']}
          onChange={(age_label) => setAgelabeldetails(age_label)}
        />
      )}
      {count == 5 && (
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
      {count == 6 && (
        <Relationship
          relation={params['relation']}
          relation_id={params['relation_id']}
          onChange={(relation) =>
            setparams({
              ...params,
              ['relation']: relation,
              ['relation_id']: relation.id,
            })
          }
        />
      )}
      {count == 7 && persona_status == 1 && (
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

      {count == 8 && active_lifestatus == 1 && (
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
      {/* {count == 8 && active_lifestatus != 1 && increaseCount()} */}

      {count == 9 && wizardTypee == 'Profile' && (
        <PriceRange
          changeCount={() => setcount(count + 1)}
          price_range={params['price_range']}
          price_range_id={params['price_range_id']}
          onChange={(price_range) =>
            setparams({
              ...params,
              ['price_range']: price_range,
              ['price_range_id']: price_range.id,
            })
          }
          onSkip={() => validation()}
        />
      )}
      {/* {count == 9 && wizardTypee == 'Gift' && validation()} */}
      {/* navigation Buttons */}
      {count != 0 && (
         btnLoading?
         <View style={styles.bottom}>
            <ActivityIndicator size="small" color="#B60612" style={{padding:10,alignSelf:'center'}} />
         </View>:
        <View style={styles.bottom}>
          {count == 1 && (
            <TouchableOpacity
              onPress={() => {
                validation();
              }}>
              <Icon
                name="chevron-circle-right"
                size={45}
                color="#cb9b27"
                style={{padding: 5}}
              />
            </TouchableOpacity>
          )}
          {count > 1 && (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  decreaseCount();
                }}>
                <Icon
                  name="chevron-circle-left"
                  size={45}
                  color="#cb9b27"
                  style={{padding: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  validation();
                }}>
                <Icon
                  name="chevron-circle-right"
                  size={45}
                  color="#cb9b27"
                  style={{padding: 5}}
                />
              </TouchableOpacity>
            </View>
          )}
          <SafeAreaView style={{flexDirection: 'row'}}>{output}</SafeAreaView>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  bottom: {
    position: 'absolute',
    bottom: 10,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
    width: '100%',
    //alignSelf:'flex-end',
    maxHeight: 200,
    zIndex: 500,
    //flexDirection:'column-reverse'
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 2,
  },
});
