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
import newpet from '../assets/images/newpet.jpg';
import {useFocusEffect} from '@react-navigation/native';

export default function PetOccasions(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [occasions, setoccasions] = useState([]);
  const [value, setvalue] = useState(props.occasion ? props.occasion : null);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      // alert(props.pet_id);
      var pet_id = null;
      if (props.pet_id) {
        pet_id = props.pet_id;
      }
      const getAllOccasions = async () => {
        try {
          let occasionsresult;
          occasionsresult = wizardActions.getAllOccasions(pet_id);
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(occasionsresult);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          console.log(resultData);
          setoccasions(resultData.occasions);
          setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      getAllOccasions();
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
                      {value == null ? 'Select Occassions' : value}{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
                {occasions.map((occasion, index) => {
                  var occasion_name = occasion.occasion_name;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setvalue(occasion_name);
                        props.onChange(occasion);
                        setModalVisible(!modalVisible);
                      }}
                      key={index}
                      style={{
                        width: '100%',
                        padding: 10,
                        // marginBottom: 20,
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
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={newpet}
          style={{
            width: windowWidth / 1.4,
            height: windowWidth / 1.5,
            // marginLeft: 16,
            marginTop: 50,
          }}
        />
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
        What is the occasion?
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
          {value == null ? 'Select Occasions' : value}
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
