import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Button,
  Text,
  SafeAreaView,
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
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import MyCarousel from '../components/Image_carousel';
import Confirmation from '../components/Confirm_modal';

export default function GiftWizardScreen({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const [wizardicon, setwizardicon] = React.useState(true);

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
  });
  useEffect(
    React.useCallback(() => {
      if (count == 0) {
        setClose(false);
      } else {
        setClose(true);
      }
    }, [count]),
  );
  var output = [];
  for (let i = 1; i < 10; i++) {
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
  const increaseCount = () => {
    setLoading(true);
    setcount(count + 1);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const decreaseCount = () => {
    setLoading(true);
    if (count == 9 && active_lifestatus != 1 && persona_status != 1) {
      setcount(count - 3);
    } else if (
      (count == 9 && active_lifestatus != 1 && persona_status == 1) ||
      (count == 4 && genderVisibility != true)
    ) {
      setcount(count - 2);
    } else if (count == 8 && persona_status == 1) {
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
    if (count == 2 && params['friend'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select a Friend');
      setnotification(true);
      return;
    }
    if (count == 3 && params['gender'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Gender');
      setnotification(true);
      return;
    }
    if (count == 4 && params['age_label'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Age');
      setnotification(true);
      return;
    }
    if (count == 5 && params['character_id'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Character Trait');
      setnotification(true);
      return;
    }
    if (count == 6 && params['relation_id'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Relationship');
      setnotification(true);
      return;
    }
    if (count == 7 && params['personas_id'].length == 0) {
      setnavscreen('ProfileWizard');
      setmsg("Please Select Person's Persona");
      setnotification(true);
      return;
    }
    if (count == 8 && params['styles_id'].length == 0) {
      setnavscreen('ProfileWizard');
      setmsg("Please Select Person's Style");
      setnotification(true);
      return;
    }
    // if (count == 9 && params['price_range'] == null) {
    //   setnavscreen('ProfileWizard');
    //   setmsg('Please Select Price');
    //   setnotification(true);
    //   return;
    // }

    if (count == 9 && params['relation_id'] != null) {
      //navigation.navigate('SuggestedItems');
      //console.log(params);
      // navigation.navigate('SuggestedItems');
      getWizardProducts();
      return;
    }
    increaseCount();
  };
  const loadfrienddata = (friend) => {
    //console.log(friend);
    setparams({...params, ['friend']: friend});
    let wizard_data =
      friend && friend.wizard_details
        ? JSON.parse(friend.wizard_details)
        : null;
    if (wizard_data != null) {
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
    // console.log(wizard_data);
    // console.log(wizard_data != null);
    if (wizard_data != null) {
      console.log('wizard');
      setLoading(true);
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
      });
      setcount(9);
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
      });
    }
    setConfirm(false);
  };
  const getWizardProducts = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      let wizardProducts;
      wizardProducts = wizardActions.getWizardProducts(params, userData);

      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(wizardProducts);
      const resultData = JSON.parse(result);
      console.log('-----------');
      if (resultData.state) {
        // console.log(resultData.items);
        // setproducts(resultData.items);
        setLoading(false);
        console.log(params['friend']['id']);
        var user_contact_id = params['friend']['id'];
        navigation.navigate('SuggestedItems', {
          products: resultData.items,
          wizard_detail: resultData.wizard_detail,
          suggesteditems: resultData.suggesteditems,
          user_contact_id: user_contact_id,
          wizard_type: 'User',
          pet_id: null,
          occasion_id: params['occasion_id'],
        });
      } else {
        setLoading(false);
        setnotification(true);
        setmsg(resultData.message);
      }
      // console.log(resultData.state);
    } catch (err) {
      // alert('Error,Something went wrong');
      setLoading(false);
      setnotification(true);
      setmsg('Network Error,Try again');
    }
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
      <StatusBar backgroundColor="#B60612" />
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
        wizardicon={wizardicon}
      />

      {count == 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            width: windowWidth,
          }}>
          <View style={{height: windowWidth / 3.5}}>
            <MyCarousel />
            <View
              style={{
                marginTop: 5,
                borderWidth: 3,
                borderColor: '#cb9b27',
              }}></View>
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
            onChange={(menutype, genderVisibility, gender) => {
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
            setparams({
              ...params,
              ['occasion']: occasion_name,
              ['occasion_id']: occasion_name.id,
            });
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
      {count == 3 && genderVisibility != true && increaseCount()}
      {count == 4 && (
        <Age
          type={params['type']}
          ageRange_id={params['ageRange_id']}
          age_label={params['age_label']}
          onChange={(age_label) =>
            setparams({
              ...params,
              ['age_label']: age_label,
              ['ageRange_id']: age_label.id,
            })
          }
        />
      )}
      {count == 5 && (
        <PersonCharacter
          params={params}
          onChange={(character) =>
            setparams({
              ...params,
              ['character']: character,
              ['character_id']: character ? character.id : null,
            })
          }
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
      {count == 7 && persona_status != 1 && increaseCount()}
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
      {count == 8 && active_lifestatus != 1 && increaseCount()}

      {count == 9 && (
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
      {/* navigation Buttons */}
      {count != 0 && (
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
          <View style={{flexDirection: 'row'}}>{output}</View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  bottom: {
    flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
    width: '100%',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
