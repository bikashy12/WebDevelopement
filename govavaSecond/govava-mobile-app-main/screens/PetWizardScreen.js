import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Button,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import Header from '../components/Header';
import PetOccasions from '../components/PetOccasions';
import PetPreference from '../components/PetPreference';
import Species from '../components/Species';
import SavedPets from '../components/SavedPets';
import Breed from '../components/Breed';
import PetAge from '../components/PetAge';
import PetImage from '../components/PetImage';
import PetGender from '../components/PetGender';
import PetWeight from '../components/PetWeight';
import PetName from '../components/PetName';
import PersonStyle from '../components/PersonStyle';
import PersonPersona from '../components/PersonPersona';
import PersonCharacter from '../components/PersonCharacter';
import PriceRange from '../components/PetPriceRange';
import Relationship from '../components/Relationship';
import Icon from 'react-native-vector-icons/FontAwesome';
import Notifications from '../components/Notifications';
import {useFocusEffect} from '@react-navigation/native';
import * as wizardActions from '../store/actions/petwizard';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import MyCarousel from '../components/Image_carousel';
import Confirmation from '../components/Confirm_modal';
import * as RNLocalize from 'react-native-localize';

export default function PetWizardScreen({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const [wizardicon, setwizardicon] = React.useState(true);

  const [loading, setLoading] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const [count, setcount] = React.useState(1);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [navscreen, setnavscreen] = React.useState('');
  const [close, setClose] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [pets, setPets] = React.useState([]);

  const [params, setparams] = React.useState({
    species: null,
    species_id: null,
    breed: null,
    breed_id: null,
    age_label: null,
    ageRange_id: null,
    age_group: null,
    gender: null,
    weight: null,
    name: null,
    occasion: null,
    occasion_id: null,
    image: null,
    price_range: null,
    price_range_id: null,
    preference: null,
    preference_id: null,
    pet_id: null,
    countryCode: RNLocalize.getCountry(),
  });
  useEffect(
    React.useCallback(() => {
      console.log(count);
      if (count == 0) {
        setClose(true);
      } else {
        setClose(true);
      }
    }, [count]),
  );
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setBtnLoading(false);
       };
    }, []),
  );
  var output = [];
  for (let i = 1; i < 9; i++) {
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
  const removePet=(id)=>{
    pets.splice(pets.findIndex(function(i){
      return i.id == id;
  }), 1);
  }
  const loadPetdetails = (petdetails) => {
    console.log('loadingggg');
    setparams({
      ...params,
      ['pet_id']: petdetails.pet_id,
      ['species']: petdetails.type.pet_name,
      ['species_id']: petdetails.type.id,
      ['breed']: petdetails.breed.breed_name,
      ['breed_id']: petdetails.breed.id,
      ['gender']: petdetails.gender,
      ['age_label']: petdetails.ageRange.age_label,
      ['ageRange_id']: petdetails.ageRange.id,
      ['weight']: petdetails.weight,
      ['name']: petdetails.name,
      ['preference']: petdetails.preferences.keyword,
      ['preference_id']: petdetails.preferences.id,
      ['occasion']: petdetails.occasion
        ? petdetails.occasion.occasion_name
        : null,
      ['occasion_id']: petdetails.occasion ? petdetails.occasion.id : null,
    });
    if (petdetails.occasion) {
      // setcount(8);
      setcount(6);
    } else {
      setcount(6);
    }
  };
  const increaseCount = () => {
    if (count == 0) {
      setcount(9);
    } else {
      setcount(count + 1);
    }
  };
  const decreaseCount = () => {
    setcount(count - 1);
  };
  const validation = () => {
    if (count == 1 && params['species'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please select your pet');
      setnotification(true);
      return;
    }
    if (count == 2 && params['breed'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please select a breed');
      setnotification(true);
      return;
    }
    if (count == 3 && params['gender'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please select gender');
      setnotification(true);
      return;
    }
    if (count == 4 && params['age_label'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please select age');
      setnotification(true);
      return;
    }
    // if (count == 5 && params['weight'] == null) {
    //   setnavscreen('ProfileWizard');
    //   setmsg('Please Enter Pet Weight');
    //   setnotification(true);
    //   return;
    // }
    if (count == 5 && params['name'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please enter Pet Name');
      setnotification(true);
      return;
    }
    if (count == 6 && params['occasion'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please select occasions');
      setnotification(true);
      return;
    }
    if (count == 8 && params['price_range_id'] == null) {
      setnavscreen('ProfileWizard');
      setmsg('Please select price');
      setnotification(true);
      return;
    }

    if (count == 8 && params['price_range_id'] != null) {
      //navigation.navigate('SuggestedItems');
      //console.log(params);
      // navigation.navigate('SuggestedItems');
      getWizardPetProducts();
      return;
    }
    increaseCount();
  };
  useEffect(() => {
  
      const getPetwizardDetails = async () => {
        try {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          var user_id = userData.userId;
          let wizardPetProducts;
          wizardPetProducts = wizardActions.getPetwizardDetails(user_id);

          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(wizardPetProducts);
          const resultData = JSON.parse(result);
          setPets(resultData.pets);
          setLoading(false);
          if (resultData.pets.length == 0) {
            setcount(1);
          } else {
            setcount(0);
          }

          //   console.log(params['friend']['id']);
          //   var user_contact_id = params['friend']['id'];
          //   navigation.navigate('SuggestedItems', {
          //     products: resultData.items,
          //     suggesteditems: resultData.suggesteditems,
          //     user_contact_id: user_contact_id,
          //   });
          // } else {
          //   setLoading(false);
          //   setnotification(true);
          //   setmsg('Something went wrong,Try again');
          // }
          // console.log(resultData.state);
        } catch (err) {
          // alert(err);
          setLoading(false);
          // setnotification(true);
        }
      };
      getPetwizardDetails();
    }, []);
  const getWizardPetProducts = async () => {
    try {
      setLoading(true);
      setBtnLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 8000);
      let wizardPetProducts;
      wizardPetProducts = wizardActions.getWizardPetProducts(params, userData);

      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(wizardPetProducts);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      if (resultData.state) {
        // console.log(resultData.items);
        // setproducts(resultData.items);
        setLoading(false);
        navigation.navigate('SuggestedItems', {
          products: resultData.products,
          wizard_detail: resultData.wizard_detail,
          request_body: resultData.request_body,
          totalPages: resultData.totalPages,
          suggesteditems: resultData.suggesteditems,
          user_contact_id: null,
          wizard_type: 'Pet',
          pet_id: resultData.pet_id,
          occasion_id: params['occasion_id'],
        });
      } else {
        setLoading(false);
        // setnotification(true);
        // setmsg('Something went wrong,Try again');
        navigation.navigate('SuggestedItems', {
          products: resultData.products,
          wizard_detail: resultData.wizard_detail,
          request_body: resultData.request_body,
          totalPages: resultData.totalPages,
          suggesteditems: resultData.suggesteditems,
          user_contact_id: null,
          wizard_type: 'Pet',
          pet_id: resultData.pet_id,
          occasion_id: params['occasion_id'],
        });
      }
    } catch (err) {
      // alert(err);
      setBtnLoading(false);
      setLoading(false);
      // setnotification(true);
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
        <SavedPets
        editPet={false}
          pets={pets}
          species={params['species']}
          species_id={params['species_id']}
          loadPetdetails={(petdetails) => loadPetdetails(petdetails)}
          removePet={removePet}
          onChange={(item) =>
            setparams({
              ...params,
              ['species']: item.pet_name,
              ['species_id']: item.id,
            })
          }
          onSkip={() => setcount(1)}
        />
      )}
      <ScrollView>
        <KeyboardAvoidingView
          style={{justifyContent: 'space-between', height: windowHeight - 85}}>
          <View>
            {count == 1 && (
              <Species
                species={params['species']}
                species_id={params['species_id']}
                onChange={(item) =>
                  setparams({
                    ...params,
                    ['species']: item.pet_name,
                    ['species_id']: item.id,
                  })
                }
              />
            )}
            {count == 2 && (
              <Breed
                species_id={params['species_id']}
                breed={params['breed']}
                breed_id={params['breed_id']}
                onChange={(breed) =>
                  setparams({
                    ...params,
                    ['breed']: breed.breed_name,
                    ['breed_id']: breed.id,
                  })
                }
              />
            )}
            {count == 3 && (
              <PetGender
                gender={params['gender']}
                onChange={(gender) =>
                  setparams({...params, ['gender']: gender})
                }
              />
            )}
            {count == 4 && (
              <PetAge
                ageRange_id={params['ageRange_id']}
                age_label={params['age_label']}
                onChange={(age) =>
                  setparams({
                    ...params,
                    ['age_label']: age.age_label,
                    ['ageRange_id']: age.id,
                  })
                }
              />
            )}
            {/* {count == 5 && (
              <PetWeight
                // weight={params['weight']}
                weight={params['weight']}
                onChange={(text) => {
                  setparams({...params, ['weight']: text});
                }}
              />
            )} */}
            {count == 5 && (
              <PetName
                name={params['name']}
                onChange={(name) => setparams({...params, ['name']: name})}
              />
            )}

            {count == 6 && (
              <PetOccasions
                occasion={params['occasion']}
                occation_id={params['occasion_id']}
                pet_id={params['species_id']}
                onChange={(occasion) => {
                  setparams({
                    ...params,
                    ['occasion']: occasion.occasion_name,
                    ['occasion_id']: occasion.id,
                  });
                }}
              />
            )}
            {count == 7 && (
              <PetImage
                image={params['image']}
                onChange={(photo) =>
                  setparams({
                    ...params,
                    ['image']: photo,
                  })
                }
                onSkip={() => validation()}
              />
            )}

            {/* {count == 8 && (
              <PetPreference
                preference={params['preference']}
                preference_id={params['preference_id']}
                onChange={(preference) => {
                  setparams({
                    ...params,
                    ['preference']: preference.keyword,
                    ['preference_id']: preference.id,
                  });
                }}
                onSkip={() => validation()}
              />
            )} */}
            {count == 8 && (
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
          </View>
          {/* navigation Buttons */}
          {count != 0 && (
            btnLoading?
            <View style={styles.bottom}>
            <ActivityIndicator size="small" color="#B60612" style={{padding:10,alignSelf:'center'}} /></View>:
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
        </KeyboardAvoidingView>
      </ScrollView>
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
    marginBottom: Platform.OS == 'ios' ? 40 : 10,
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
