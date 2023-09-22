import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  Modal,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from './Header';
import {Dimensions} from 'react-native';
import gift from '../assets/images/gift.png';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import * as wizardActions from '../store/actions/wizard';
import {
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import RenderItems from './FlatlistItem';
import Loader from './Loader';
import * as loadingActions from '../store/actions/loader';

export default function PersonPersona(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [GridListItems, setgridlistItems] = React.useState([]);
  const [caricatures, setCaricatures] = React.useState(null);
  //const [personas, setPersonas] = React.useState(props.params['personas'] ? props.params['personas'] : []);
  const [p_ids, setPids] = React.useState(
    props.params['personas_id'] ? props.params['personas_id'] : [],
  );
  // console.log(props);
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      const getPersonas = async () => {
        await dispatch(loadingActions.setprofileloader(true));

        const ch_style = 'persona';
        const type = 'Occasion';
        try {
          let personaresult;
          personaresult = wizardActions.getPersonas(
            ch_style,
            props.params['type'],
            props.params['gender'],
          );
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(personaresult);
          const resultData = JSON.parse(result);
          setCaricatures(resultData.caricatures);
          // console.log('++++++++++++++++++++++++');
          // console.log(resultData.caricatures);
          // resultData.caricatures.map((persona, index) => {
          //   // var age_label = age.age_label;

          // });

          // console.log('-----------');
          // console.log(resultData.caricatures);
          // setoccasions(resultData.occasions);
          setLoading(false);
          await dispatch(loadingActions.setprofileloader(false));

          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
           dispatch(loadingActions.setprofileloader(false));

          setLoading(false);
        }
      };
      getPersonas();
    }, []),
  );
  const managePersonas = (persona) => {
    let ids = p_ids;
    if (p_ids.includes(persona.id)) {
      //  console.log('includes '+persona.id);
      for (var i = 0; i < ids.length; i++) {
        if (ids[i] === persona.id) {
          ids.splice(i, 1);
          // console.log('id spliced at '+i);
        }
      }
    } else {
      // console.log('not include');
      // if(nwids.length<3){
      if (ids.length < 3) {
        ids.push(persona.id);
      }
    }

    setPids(ids);
    props.onChange(ids);

    // console.log('ids');
    // console.log(ids);
  };

  return (
    <View style={{alignItems: 'center'}}>
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => alert('Hiii')}>
              <Text>hsdgshfghsfgh</Text>
            </TouchableOpacity>
            {/* <ScrollView>
              <TouchableOpacity
                onPress={() => alert('hlo')}
                style={{
                  width: '100%',
                  backgroundColor: 'red',
                  padding: 10,
                }}>
                <View>
                  <Text style={styles.modalText}>Select Occassions</Text>
                </View>
              </TouchableOpacity>
              {occasions.map((occasion, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => alert('hlo')}
                    key={index}
                    style={{
                      width: '100%',
                      //   backgroundColor: 'green',
                      marginBottom: 20,
                    }}>
                    <View>
                      <Text style={styles.modalText}>
                        {occasion.occasion_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
           */}
          </View>
        </View>
      </Modal>

      <Text
        style={{
          textAlign: 'left',
          fontFamily: 'Roboto-Regular',
          fontSize: 18,
          marginTop: 20,
          // marginBottom: 20,
        }}>
        What is their persona?
      </Text>
      <Text
        style={{
          textAlign: 'left',
          fontFamily: 'Roboto-Regular',
          fontSize: 14,
          color: 'blue',
          marginTop: 10,
          marginBottom: 20,
        }}>
        Please choose 1 to 3 persona
      </Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={caricatures}
          extraData={p_ids}
          renderItem={({item}) => (
            <RenderItems
              style={'Pesona'}
              item={item}
              lists={p_ids}
              img_icon={item.icon_persona}
              manageItems={(nwitem) => managePersonas(nwitem)}
            />
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: windowWidth - 10,
    height: Platform.OS == 'ios' ? windowHeight - 300 : windowHeight - 250,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  //modal style
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: windowWidth / 1.2,
    height: 420,
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
    // marginBottom: 20,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
  },
});
