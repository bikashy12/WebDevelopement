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
import price from '../assets/images/moneybag2.png';
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
  const [pricerange, setpricerange] = useState([]);
  const [value, setvalue] = React.useState(
    props.price_range
      ? props.price_range.from_price +
          ' To ' +
          props.price_range.to_price +
          ' $'
      : null,
  );

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      const getAllPriceRange = async () => {
        try {
          let priceresult;
          priceresult = wizardActions.getAllPriceRange();
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(priceresult);
          const resultData = JSON.parse(result);
          console.log('-----------');
          console.log(resultData);
          setpricerange(resultData.priceranges);
          setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      getAllPriceRange();
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
                    paddingRight: 0,
                  }}>
                  <View>
                    <Text style={styles.modalText}>Select Price</Text>
                  </View>
                </TouchableOpacity>
                {pricerange.map((price, index) => {
                  // var price_range =
                  //   price.from_price + ' To ' + price.to_price + ' $';
                  var price_range =
                    '$' + price.from_price + ' To' + ' $' + price.to_price;
                  var from_price = price.from_price;
                  var to_price = price.to_price;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setvalue(price_range);
                        // props.onChange({from_price,to_price});
                        props.onChange(price);
                        setModalVisible(!modalVisible);
                      }}
                      key={index}
                      style={{
                        width: windowWidth / 1.2,
                        //   backgroundColor: 'green',
                        // marginBottom: 20,
                        padding: 10,
                      }}>
                      <View>
                        <Text style={styles.modalText}>
                          ${price.from_price} To ${price.to_price}
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
          source={price}
          style={{
            width: windowWidth / 1.4,
            height: windowWidth / 1.5,
            resizeMode: 'contain',
            marginBottom: 20,
            // marginLeft: 16,
            marginTop: 50,
          }}
        />
        {/* <TouchableOpacity onPress={props.onSkip}>
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
        </TouchableOpacity> */}
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
        Please select your price range
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
              {value == null ? 'Select Price' : value}
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
    width: windowWidth / 1.2,
    // margin: 20,
    marginTop: Platform.OS == 'ios' ? 50 : 10,
    backgroundColor: 'white',
    borderRadius: 2,
    //padding: 10,
    paddingTop: 0,
    paddingLeft: 0,
    // alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
