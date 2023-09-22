import React, {useEffect, useRef} from 'react';
import {LogBox} from 'react-native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Text,
  ScrollView,
  BackHandler,
  Alert,
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
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.png';
import Friends from '../components/Friends_new';
import * as wizardActions from '../store/actions/wizard';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import MyCarousel from '../components/Image_carousel';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const carouselRef = useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [wizardicon, setwizardicon] = React.useState(true);
  const [close, setclose] = React.useState(false);
  const [count, setcount] = React.useState(0);
  const [notification, setnotification] = React.useState(false);
  const [bannerVisible, setbannerVisible] = React.useState(true);
  const [msg, setmsg] = React.useState('');
  const [navscreen, setnavscreen] = React.useState('');
  const images = [banner1, banner2];
  const BannerHeight = 260;
  const [params, setparams] = React.useState({
    occasion: null,
    age_label: null,
    gender: null,
    price_range: null,
    friend: null,
    relation: null,
    type: 'Female',
    styles: null,
    personas: null,
    character: null,
    ageRange_id: null,
    character_id: null,
    styles_id: null,
    personas_id: null,
    relation_id: null,
    price_range_id: null,
  });

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
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const increaseCount = () => {
    setLoading(true);
    setcount(count + 1);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const decreaseCount = () => {
    setLoading(true);
    setcount(count - 1);
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
    if (count == 5 && params['character'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Character Trait');
      setnotification(true);
      return;
    }
    if (count == 6 && params['relation'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please Select Relationship');
      setnotification(true);
      return;
    }
    if (count == 7 && params['personas'] == null) {
      setnavscreen('ProfileWizard');
      setmsg("Please Select Person's Persona");
      setnotification(true);
      return;
    }
    if (count == 8 && params['styles'] == null) {
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

    if (count == 9 && params['relation'] != null) {
      //navigation.navigate('SuggestedItems');
      //console.log(params);
      // navigation.navigate('SuggestedItems');
      getWizardProducts();
      return;
    }
    increaseCount();
  };
  const loadfrienddata = (friend) => {
    console.log(friend);
    setparams({...params, ['friend']: friend});
    console.log(params);
    let wizard_data = friend ? JSON.parse(friend.wizard_details) : null;
    console.log(wizard_data);

    if (wizard_data != null) {
      setparams({
        ...params,
        ['friend']: friend,
        ['ageRange_id']: wizard_data.ageRange,
        ['character_id']: wizard_data.characterTrait,
        ['styles_id']: wizard_data.activeLifeStyle,
        ['personas_id']: wizard_data.persona,
        ['relation_id']: wizard_data.relation,
        ['gender']: wizard_data.gender,
      });
      setcount(9);
    } else {
      setparams({
        ...params,
        ['friend']: friend,
        ['ageRange_id']: null,
        ['character_id']: null,
        ['styles_id']: [],
        ['personas_id']: [],
        ['relation_id']: null,
        ['gender']: null,
      });
    }
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
      // console.log('-----------');
      if (resultData.state) {
        console.log(resultData.items);
        // setproducts(resultData.items);
        setLoading(false);
        navigation.navigate('SuggestedItems', {
          products: resultData.items,
        });
      } else {
        setLoading(false);
        setnotification(true);
        setmsg('Something went wrong,Try again');
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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        // backgroundColor: ,
        backgroundColor: count == 0 ? '#ffffff' : '#e3e3e3',
        flexDirection: 'column',
      }}>
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
      <View>
        <View
          style={{
            flex: 1,
            //justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'column',
          }}>
          {bannerVisible == true && (
            <View>
              <MyCarousel />

              <View
                style={{
                  marginTop: 5,
                  borderWidth: 3,
                  borderColor: '#cb9b27',
                }}></View>
              <View>
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
                    fontStyle: 'italic',
                    // right: 16,
                  }}>
                  FIND THE PERFECT GIFT
                </Text>
              </View>
            </View>
          )}

          {count == 0 && (
            <View style={{alignContent: 'center', alignItems: 'center'}}>
              <ProfileWizardMenu
                type={params['type']}
                onChange={(type) => {
                  setbannerVisible(false);
                  setwizardicon(false);
                  setclose(true);
                  setparams({...params, ['type']: type});
                  console.log(type);
                  increaseCount();
                }}
              />
            </View>
          )}
          {count == 1 && (
            <Occasions
              occasion={params['occasion']}
              occation_id={params['occasion_id']}
              onChange={(occasion_name) =>
                setparams({
                  ...params,
                  ['occasion']: occasion_name,
                  ['occasion_id']: occasion_name.id,
                })
              }
            />
          )}
          {count == 2 && (
            <Friends
              friend={params['friend']}
              onChange={(friend) => loadfrienddata(friend)}
            />
          )}
          {count == 3 && (
            <Gender
              gender={params['gender']}
              onChange={(gender) => setparams({...params, ['gender']: gender})}
            />
          )}
          {count == 4 && (
            <Age
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
          {count == 7 && (
            <PersonPersona
              params={params}
              onChange={(personas) =>
                setparams({
                  ...params,
                  ['personas']: personas,
                  ['personas_id']: personas ? personas.id : null,
                })
              }
            />
          )}
          {count == 8 && (
            <PersonStyle
              params={params}
              onChange={(styles) =>
                setparams({
                  ...params,
                  ['styles']: styles,
                  ['styles_id']: styles ? styles.id : null,
                })
              }
            />
          )}
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
      </View>
    </SafeAreaView>
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
