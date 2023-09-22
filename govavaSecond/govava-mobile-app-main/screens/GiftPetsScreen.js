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
  FlatList,
  SafeAreaView,
} from 'react-native';
// import {Images} from '../constants';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import * as productActions from '../store/actions/products';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import ProductWishlisting from '../components/ProductWishlisting';
// import products from '../constants/products';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import styles from '../styles/wishlistStyles';
import emptygift from '../assets/images/empty_gift.png';

export default function GiftScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const [pets, setPets] = useState([]);
  const [petsWizard, setPetWizard] = useState({});

  const [loading, setLoading] = React.useState(false);
  const userData = useSelector((state) => state.auth);
  const petsData = useSelector((state) => state.pet);
  console.log(petsData);
  const [reload, setreload] = React.useState(0);

  const navigationRedirect = (product) => {
    if (product.length == 0) {
      return null;
    } else {
      navigation.navigate('GiftOccasion', {
        product: product,
        product_name: product.title,
        product_id: product.productId,
        occasion_lists: product.occasion_lists,
        navscreen: 'GiftScreen',
        petGift: true,
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setPets(petsData.petGifts);
      petsData.petGifts.forEach(element => console.log(JSON.parse(element.petwizard_details)));

    }, []),
  );
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
            style={{ flexDirection: 'row' }}>
            <Icon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{ paddingLeft: 16 }}
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

      <View style={{ paddingTop: 20, alignItems: 'center' }}>
        {pets.length > 0 ? (
          <Text
            style={{
              color: '#B60612',

              fontFamily: 'Roboto-Italic',
              fontSize: 20,

              textAlign: 'center',

              fontStyle: 'italic',
              // right: 16,
              // backgroundColor: 'green',
              width: windowWidth,
            }}>
            Select a Pet
          </Text>
        ) : null}
        <View
          style={{
            width: windowWidth,
            height: windowHeight - 110,
            paddingVertical: 15,
            alignItems: 'center',
          }}>
          {pets.length > 0 ? (
            <FlatList
              data={pets}
              // ListHeaderComponent={()=>()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('GiftProducts', {
                    //   products: item.gifts,
                    //   friend: item,
                    //   navscreen: 'Gifts',
                    // });
                    navigationRedirect(item);
                  }}
                  style={{
                    width: windowWidth - 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    backgroundColor: 'white',
                    padding: 7,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      backgroundColor: 'black',
                      marginRight: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {item.pet_image != null || item.pets.pet_icon!=null?
                    <Image
                      source={{ uri: item.pet_image == null ? item.pets.pet_icon : item.pet_image }}
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 27,
                        // marginLeft: 16,
                        resizeMode: 'contain',
                      }}
                    />:
 <Text style={{ color: 'white', fontSize: 19 }}>
                      {item.name.slice(0, 1).toUpperCase()}
                    </Text>}
                  </View>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                      {item.name}
                    </Text>

                  </View>
                </TouchableOpacity>
              )}
              //Setting the number of column

              keyExtractor={(item, index) => 'key' + index}
            />
          ) : !loading ? (
            <View
              style={{
                height: windowHeight - 200,
                width: windowWidth,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={emptygift}
                style={{
                  height: 300,
                  width: 170,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
              <Text style={{ color: '#cb9b27', fontSize: 18 }}>
                Empty Gift Box
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
