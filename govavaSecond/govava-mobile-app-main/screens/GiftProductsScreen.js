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
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
// import {Images} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../components/Loader';
import {useDispatch} from 'react-redux';
import * as productActions from '../store/actions/products';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import GiftProductsList from '../components/GiftProductsList';
// import products from '../constants/products';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import styles from '../styles/wishlistStyles';

export default function GiftProductsScreen({route, navigation}) {
  const dispatch = useDispatch();
  const {products, friend} = route.params;
  const [loading, setLoading] = React.useState(false);
  const userData = useSelector((state) => state.auth);
  const {petGift} = route.params;

  const [newProducts, setnewProducts] = React.useState(products);
  useFocusEffect(
    React.useCallback(() => {
      // browseCategories();
    }, []),
  );
  const removeProduct = (index) => {
    var allproducts = newProducts;
    allproducts.splice(index, 1);
    setnewProducts(allproducts);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#B60612" />
      {loading && <Loader loading={loading} />}
      <View
        style={{
          backgroundColor: '#b41f23',
          height: Platform.OS === 'ios' ? 100 : 55,
          width: windowWidth,
        }}>
        <SafeAreaView></SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row'}}>
            <Icon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{paddingLeft: 16}}
            />
            <Text
              style={{
                color: '#ffffff',
                fontStyle: 'normal',
                fontFamily: 'Roboto-Medium',
                fontSize: 18,
                lineHeight: 20,
                paddingLeft: 20,
                // padding: 20,
                // paddingBottom: 10,
                // right: 16,
              }}>
              Gifts
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{paddingTop: 20}}>
        <Text
          style={{
            color: '#B60612',

            fontFamily: 'Roboto-Italic',
            fontSize: 20,

            textAlign: 'center',

            fontStyle: 'italic',
            // right: 16,
          }}>
          Saved gifts for {petGift?JSON.parse(friend.petwizard_details).name:friend.contact_name}
        </Text>
        <GiftProductsList
          products={newProducts}
          navscreen={'Gifts'}
          onChange={(index) => {
            removeProduct(index);
          }}
        />
      </View>
    </View>
  );
}
