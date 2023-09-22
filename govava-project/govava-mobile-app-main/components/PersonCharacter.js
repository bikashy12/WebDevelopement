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
import Loader from './Loader';
import RenderItems from './FlatlistItem';
import * as loadingActions from '../store/actions/loader';

export default function PersonCharacter(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [caricatures, setCaricatures] = React.useState(null);
  const [ch_styles, setChstyle] = React.useState([]);
  const [p_ids, setPids] = React.useState(props.params['character_id']);

  useFocusEffect(
    React.useCallback(() => {
      
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      if (props.params.character != null) {
        setPids(props.params.character.id);
      }
      const getPersonas = async () => {
        await dispatch(loadingActions.setprofileloader(true));

        const ch_style = 'character_trait';
        const type = 'Occasion';
        try {
          let personaresult;
          console.log(props);
          personaresult = wizardActions.getPersonas(
            ch_style,
            props.params['type'],
            props.params['gender'],
          );
          console.log('1111');
          console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(personaresult);
          const resultData = JSON.parse(result);
          setCaricatures(resultData.caricatures);
          console.log('-----------');
          console.log(resultData);
          resultData.caricatures.map((character, index) => {
            // var age_label = age.age_label;
            if (props.params['character_id'] == character.id) {
              setChstyle(character);
              props.onChange(character);
              // setModalVisible(!modalVisible);
            }
          });
          // setoccasions(resultData.occasions);
          setLoading(false);
          await dispatch(loadingActions.setprofileloader(false));

          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
           dispatch(loadingActions.setprofileloader(false));

        }
      };
      getPersonas();
    }, []),
  );
  const manageCharacters = (character) => {
    if (p_ids == character.id) {
      setChstyle(null);
      props.onChange(null);
      setPids(null);
    } else {
      setChstyle(character);
      props.onChange(character);
      setPids(character.id);
    }
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
          marginBottom: 20,
        }}>
        What is their Character trait?
      </Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          extraData={ch_styles}
          data={caricatures}
          renderItem={({item}) => (
            <RenderItems
              style={'Charecter'}
              lists={p_ids}
              item={item}
              img_icon={item.icon_name}
              manageItems={(nwitem) => manageCharacters(nwitem)}
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
    justifyContent: 'center',
    backgroundColor: 'white',
    width: windowWidth - 10,
    height: windowHeight - 250,
    alignItems: 'center',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
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
