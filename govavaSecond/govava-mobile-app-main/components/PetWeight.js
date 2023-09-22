import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  Modal,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import Header from './Header';
import {Dimensions} from 'react-native';
import petwizard from '../assets/images/petwizard.png';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import * as wizardActions from '../store/actions/wizard';
import {useFocusEffect} from '@react-navigation/native';
import styles from '../styles/genderStyle';

export default function PetWeight(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  // const [value, setvalue] = React.useState(props.weight ? props.weight : '');
  // console.log(props.weight);
  const {weight, ...attributes} = props;
  console.log(JSON.stringify(weight));
  const [value, setvalue] = React.useState(
    weight != null ? weight.toString() : '',
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <TouchableOpacity onPress={() => alert('Hiii')}>
              <Text>hsdgshfghsfgh</Text>
            </TouchableOpacity> */}

            <ScrollView>
              <TouchableOpacity
                onPress={() => {
                  setvalue('Female');
                  props.onChange('Female');
                  setModalVisible(!modalVisible);
                }}
                style={{
                  width: windowWidth / 1.2,
                  padding: 10,
                }}>
                <View>
                  <Text style={styles.modalText}>Female</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setvalue('Male');
                  props.onChange('Male');
                  setModalVisible(!modalVisible);
                }}
                style={{
                  width: windowWidth / 1.2,
                  padding: 10,
                }}>
                <View>
                  <Text style={styles.modalText}>Male</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={petwizard}
          style={{
            width: windowWidth / 1.4,
            height: windowWidth / 1.5,
            resizeMode: 'contain',
            // marginLeft: 16,
            alignSelf: 'center',
            marginTop: 50,
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
        Please enter your pet's weight
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View>
          {/* <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
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
                marginTop: 20,
                marginBottom: 20,
                color: value == null ? 'gray' : 'red',
              }}>
              {value == null ? 'Select Gender' : value}
            </Text>
            <Icon name="caretdown" size={16} color="#000000" />
          </TouchableOpacity>
         */}
          {/* <TextInput
            onChange={(text) => {
              // setvalue(text);
              // props.onBlur(20);
              alert(text);
            }}
            onBlur={() => alert(value)}
            
            keyboardType="numeric"
            
            value={value}
          /> */}
          <TextInput
            style={{
              width: windowWidth / 1.2,
              height: 40,
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              paddingRight: 10,
              justifyContent: 'space-between',
              color: value == null ? 'gray' : 'red',
            }}
            keyboardType="numeric"
            placeholderTextColor="#808080"
            placeholder="Enter Weight (LBS)"
            onChangeText={(text) => {
              setvalue(text);
              props.onChange(text);
            }}
            value={value}
          />
        </View>
      </View>
    </View>
  );
}
