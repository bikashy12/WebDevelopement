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
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from './Header';
import {Dimensions} from 'react-native';
import age from '../assets/images/age.jpeg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import * as wizardActions from '../store/actions/wizard';
import {useFocusEffect} from '@react-navigation/native';
import styles from '../styles/ageStyle';

export default function Age(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setvalue] = React.useState(
    props.age_label ? props.age_label.age_label : null,
  );
  const [agerange, setagerange] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      const getAgerange = async () => {
        try {
          let ageresult;
          var type = props.type;
          ageresult = wizardActions.getAgerange(type);
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(ageresult);
          const resultData = JSON.parse(result);
          console.log('-----------');
          console.log(resultData);
          setagerange(resultData.agerange);
          setLoading(false);
          resultData.agerange.map((age, index) => {
            var age_label = age.age_label;
            if (props.ageRange_id == age.id) {
              setvalue(age_label);
              props.onChange(age);
              // setModalVisible(!modalVisible);
            }
          });
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      getAgerange();
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
                  style={{
                    backgroundColor: '#cb9b27',
                    padding: 10,
                    width: windowWidth / 1.2,
                  }}>
                  <View>
                    <Text style={styles.modalText}>
                      {value == null ? 'Select age' : value}
                    </Text>
                  </View>
                </TouchableOpacity>
                {agerange.map((age, index) => {
                  var age_label = age.age_label;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setvalue(age_label);
                        props.onChange(age);
                        setModalVisible(!modalVisible);
                      }}
                      key={index}
                      style={{
                        width: windowWidth / 1.2,
                        padding: 10,
                        // marginBottom: 20,
                      }}>
                      <View>
                        <Text style={styles.modalText}>{age_label}</Text>
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
          source={age}
          style={{
            width: windowWidth / 1.4,
            height: windowWidth / 1.7,
            // marginLeft: 16,
            marginTop: 50,
            resizeMode:'contain',
            marginBottom:20
          }}
        />
        <View></View>
      </View>

      <Text
        style={{
          textAlign: 'left',
          fontFamily: 'Roboto-Regular',
          fontSize: 16,
          marginTop: 0,
          marginBottom: 20,
          width: windowWidth / 1.4,
        }}>
        Need help finding the right gift, don't worry we're here to help you.
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View>
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
              marginBottom: 20,
            }}>
            <Text
              style={{
                textAlign: 'left',
                fontFamily: 'Roboto-Regular',
                fontSize: 14,
                // marginTop: 20,
                // marginBottom: 20,
                color: 'gray',
              }}>
              How old is the person ?
            </Text>
          </TouchableOpacity>

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
              {value == null ? 'Select Age' : value}
            </Text>
            <Icon name="caretdown" size={16} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
