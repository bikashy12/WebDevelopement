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
} from 'react-native';
import Header from '../components/Header';
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

export default function Friends(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [occasions, setoccasions] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      const getOccasions = async () => {
        try {
          let occasionsresult;
          occasionsresult = wizardActions.getOccasions();
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
      getOccasions();
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
      <TouchableOpacity
        style={{
          backgroundColor: '#cb9b27',
          padding: 10,
          width: windowWidth / 1.3,
          height: 45,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          marginBottom: 40,
        }}>
        <Text
          style={{fontFamily: 'Roboto-Bold', fontSize: 20, color: '#ffffff'}}>
          Add new Friend
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#cb9b27',
          padding: 10,
          width: windowWidth,
          height: 45,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 0,
          marginBottom: 40,
        }}>
        <Text
          style={{fontFamily: 'Roboto-Bold', fontSize: 20, color: '#ffffff'}}>
          Connect Friends
        </Text>
      </TouchableOpacity>
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
