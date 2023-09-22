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
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import {Dimensions} from 'react-native';
import gift from '../assets/images/gift.png';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import * as wizardActions from '../store/actions/petwizard';
import {useFocusEffect} from '@react-navigation/native';

export default function PetPreference(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [preferences, setpreferences] = useState([]);
  const [value, setvalue] = useState(
    props.preference ? props.preference : null,
  );

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      const getAllPreferences = async () => {
        try {
          let preferenceresult;
          preferenceresult = wizardActions.getAllPreferences();
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(preferenceresult);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          console.log(resultData);
          setpreferences(resultData.preferences);
          setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      getAllPreferences();
    }, []),
  );
  return (
    <View style={{alignItems: 'center'}}>
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
              <ScrollView>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={{
                    width: windowWidth / 1.2,
                    backgroundColor: '#cb9b27',
                    padding: 10,
                  }}>
                  <View>
                    <Text style={styles.modalText}>
                      {value == null ? 'Select likes or preferences' : value}{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
                {preferences.map((preference, index) => {
                  var keyword = preference.keyword;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setvalue(keyword);
                        props.onChange(preference);
                        setModalVisible(!modalVisible);
                      }}
                      key={index}
                      style={{
                        width: '100%',
                        padding: 10,
                        // marginBottom: 20,
                      }}>
                      <View>
                        <Text style={styles.modalText}>{keyword}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={gift}
          style={{
            width: windowWidth / 1.4,
            height: windowWidth / 1.5,
            // marginLeft: 16,
            marginTop: 50,
          }}
        />
        <TouchableOpacity onPress={props.onSkip}>
          <Text
            style={{
              fontSize: 13,
              padding: 7,
              backgroundColor: 'white',
              marginTop: 45,
              borderRadius: 3,
              borderColor: '#c57700',
              borderWidth: 1,
            }}>
            SKIP
          </Text>
        </TouchableOpacity>
        <View></View>
      </View>

      <Text
        style={{
          textAlign: 'left',
          fontFamily: 'Roboto-Regular',
          fontSize: 18,
          marginTop: 20,
          marginBottom: 20,
        }}>
        LIKES OR PREFERENCES?
      </Text>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{
          width: windowWidth / 1.2,
          height: 40,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            textAlign: 'left',
            fontFamily: 'Roboto-Regular',
            fontSize: 16,
            // marginTop: 20,
            // marginBottom: 20,
            color: value == null ? 'gray' : 'red',
          }}>
          {value == null ? 'Select likes or preferences' : value}
        </Text>
        <Icon name="caretdown" size={16} color="#000000" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
    marginTop: Platform.OS == 'ios' ? 50 : 10,
    backgroundColor: 'white',
    borderRadius: 2,
    paddingTop: 0,
    paddingBottom: 10,
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
