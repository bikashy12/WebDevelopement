import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  Modal,
  TextInput,
  StatusBar,
  PermissionsAndroid,
  BackHandler,
  SafeAreaView,
} from 'react-native';
// import {Images} from '../constants';
import { useFocusEffect } from '@react-navigation/native';
import hamburger from '../assets/images/hamburger.png';
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import cat from '../assets/images/cat.png';
import { useDispatch } from 'react-redux';
import * as productActions from '../store/actions/products';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { Dimensions } from 'react-native';
import Header from '../components/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';
import styles from '../styles/categoriesStyle';
import FastImage from '../components/FastImageComponent';


export default function Categoriescreen({ navigation }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [categories, setcategories] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const browseCategories = async () => {
        try {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 5000);
          let browseCategories;
          browseCategories = productActions.getBrowseCategories();
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(browseCategories);
          const resultData = JSON.parse(result);
          if (resultData.browsemenu) {
            setcategories(resultData.browsemenu);
          }
          setTimeout(() => {
            setLoading(false);
          }, 50);
          // console.log('-----------');
          // console.log(resultData);

          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      browseCategories();
    }, []),
  );
  React.useEffect(() => {
    const backAction = () => {
      navigation.goBack();
        return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width: '100%' }}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Teen');
                  setModalVisible(false);
                }}>
                Teen
              </Text>
            </View>
            <View style={{ width: '100%' }}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Babies');
                  setModalVisible(false);
                }}>
                Babies
              </Text>
            </View>

            <View style={{ width: '100%' }}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Older Adults');
                  setModalVisible(false);
                }}>
                Older Adults
              </Text>
            </View>

            <View style={{ width: '100%' }}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Female');
                  setModalVisible(false);
                }}>
                Female
              </Text>
            </View>

            <View style={{ width: '100%' }}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Male');
                  setModalVisible(false);
                }}>
                Male
              </Text>
            </View>

            <View style={{ width: '100%' }}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Boys');
                  setModalVisible(false);
                }}>
                Boys
              </Text>
            </View>

            <View style={{ width: '100%' }}>
              <Text
                style={styles.modalText}
                onPress={() => {
                  setGenderType('Girls');
                  setModalVisible(false);
                }}>
                Girls
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <Header
        loading={loading}
        govavaicon={true}
        icon={true}
        close={false}
        search={true}
        wizardicon={true}
      />
      <ScrollView contentContainerStyle={styles.productsHolder}>
        {categories.map((category, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CategoryProduct', {
                  cat_name: category.browse_name,
                  cat_id: category.id,
                  navscreen: 'Category',
                })
              }
              key={index}
              style={[styles.productContainer, styles.shadow]}>
              <FastImage
                style={{
                  width: windowWidth / 2.3,
                  aspectRatio: 3 / 2,
                  //alignSelf: 'center',

                }}
                uri={category.image_name}
              // resizeMode={FastImage.resizeMode.contain}
              />


              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 12,
                  textAlign: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  marginVertical: 5,
                  paddingHorizontal: 3,
                  color: '#525252',
                  height: 20
                }}>
                {category.browse_name}
              </Text>

            </TouchableOpacity>
          );
        })}
        {categories.length % 2 == 0 ? null : (
          <View style={[styles.productContainer]}></View>
        )}
      </ScrollView>
      <SafeAreaView></SafeAreaView>
    </View>
  );
}
