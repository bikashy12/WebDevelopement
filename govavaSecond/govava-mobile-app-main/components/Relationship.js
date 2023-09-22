import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from './Header';
import {Dimensions} from 'react-native';
import family from '../assets/images/families.jpeg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import * as wizardActions from '../store/actions/wizard';
import {useFocusEffect} from '@react-navigation/native';

export default function Gender(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setvalue] = React.useState(
    props.relation ? props.relation.relation_name : null,
  );
  const [relation, setrelation] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      const getAllRelations = async () => {
        try {
          let realtionresult;
          realtionresult = wizardActions.getAllRelations();
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(realtionresult);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          // console.log(resultData);
          setrelation(resultData.relation);
          setLoading(false);
          resultData.relation.map((item, index) => {
            // var age_label = age.age_label;
            if (props.relation_id == item.id) {
              setvalue(item.relation_name);
              props.onChange(item);
              // setModalVisible(!modalVisible);
            }
          });
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      getAllRelations();
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
              {/* <TouchableOpacity onPress={() => alert('Hiii')}>
              <Text>hsdgshfghsfgh</Text>
            </TouchableOpacity> */}
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
                      {value == null ? 'Select Relationship' : value}
                    </Text>
                  </View>
                </TouchableOpacity>
                {relation.map((rel, index) => {
                  var relation = rel.relation_name;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setvalue(relation);
                        props.onChange(rel);
                        setModalVisible(!modalVisible);
                      }}
                      key={index}
                      style={{
                        width: windowWidth / 1.2,
                        padding: 10,
                      }}>
                      <View>
                        <Text style={styles.modalText}>
                          {rel.relation_name}
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
          source={family}
          style={{
            width: windowWidth / 1.4,
            height: windowWidth / 1.5,
            // marginLeft: 16,
            marginTop: 50,
            resizeMode:'contain'
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
        What is your relationship to this person?
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
              {value == null ? 'Select Relationship' : value}
            </Text>
            <Icon name="caretdown" size={16} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#cb9b2729',
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
    height: 400,
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
