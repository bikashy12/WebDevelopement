import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  FlatList,
  Linking,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import products from '../constants/products';
import styles from '../styles/productdescriptionStyle';
import FastImage from '../components/FastImageComponent';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Notifications from '../components/Notifications';
import * as productActions from '../store/actions/products';
import wizard from '../assets/images/wizard.png';

export default function FriendWishlistDescriptionScreen({route, navigation}) {
  const dispatch = useDispatch();
  const {product_id} = route.params;
  const {product_name} = route.params;
  const {navscreen} = route.params;
  const {product} = route.params;
  const {friend} = route.params;
  const [loading, setLoading] = React.useState(false);
  const [modalvisible, setmodalvisible] = React.useState(false);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [linkurl, setlinkurl] = React.useState(null);
  const [coupons, setcoupons] = React.useState([]);
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 3000);
      // console.log('newwwww' + JSON.stringify(userData));
      console.log('***********************');
      console.log(friend);
      const getcouponDetails = async () => {
        // setCload(true);
        try {
          let couponDetails;
          couponDetails = productActions.getcouponDetails(product_id);
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(couponDetails);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          // console.log(resultData);
          setLoading(false);
          setcoupons(resultData.coupons);
          setlinkurl(resultData.linkurl);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
          console.log(err);
        }
      };
      getcouponDetails();
      console.log('***********************');
    }, []),
  );
  const updatestatus = async () => {
    // setCload(true);
    setLoading(true);
    try {
      let user_id = friend.id;
      let buynow_status = 'True';
      let updatestatus;
      updatestatus = productActions.updatestatus(
        product_id,
        user_id,
        buynow_status,
      );
      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(updatestatus);
      const resultData = JSON.parse(result);
      console.log('-----------');
      // console.log(resultData);
      setLoading(false);

      // console.log(resultData.state);
      if (resultData.state == true) {
        Linking.openURL(product.linkurl);
      } else {
        setnotification(true);
        setmsg(resultData.message);
      }
    } catch (err) {
      // alert('Error,Something went wrong');
      setLoading(false);
      // console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      {notification && (
        <Notifications
          msg={msg}
          // response={response}
          navscreen={'FriendsWishlistDescription'}
          onChange={() => setnotification(false)}
        />
      )}
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={modalvisible}
        onRequestClose={() => {
          // console.log('close modal');
          setmodalvisible(false);
        }}>
        <View style={{flex: 1, backgroundColor: '#000000ad'}}>
          <View
            style={{
              top: 250,
              margin: 20,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <Text
              style={{
                marginBottom: 20,
                textAlign: 'center',
                fontSize: 16,
                color: 'gray',
                fontFamily: 'Roboto-Medium',
              }}>
              Buying this item will remove it from the wishlist. However, your
              friend, or family member will not see that it was purchased.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setmodalvisible(false);
                }}
                style={{
                  backgroundColor: '#cb9b27',
                  padding: 10,
                  elevation: 2,
                  width: 100,
                  backgroundColor: '#cb9b27',
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setmodalvisible(false);
                  // navigation.navigate(navscreen);
                  updatestatus();
                }}
                style={{
                  backgroundColor: '#cb9b27',
                  padding: 10,
                  elevation: 2,
                  width: 100,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar backgroundColor="#B60612" />

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
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{width: 100}}>
            <Icon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{paddingLeft: 20}}
            />
          </TouchableOpacity>
          <Image source={Logo_Text_white} style={{width: 119, height: 16}} />
          <View style={{width: 90, height: 16}}></View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <FastImage
          style={[styles.product_image]}
         uri={product.imageurl}
         // resizeMode={FastImage.resizeMode.contain}
        />

        <View style={styles.detailsView}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              width: '50%',
            }}>
            {product.productName ? product.productName : product.productname}
          </Text>
        </View>
        <View style={styles.detailsView}>
          <Text style={{color: 'black', fontSize: 13, fontWeight: 'bold'}}>
            Price :{' '}
            {typeof product.price === 'string' ? (
              <Text style={{fontWeight: 'normal'}}>{product.price} </Text>
            ) : (
              <Text style={{fontWeight: 'normal'}}>
                {product.price['@currency']}
                {product.price['#text']}
              </Text>
            )}
          </Text>
        </View>
        <View style={styles.descriptionView}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              paddingBottom: 7,
              borderBottomWidth: 2,
              borderBottomColor: '#c1bcbc',
            }}>
            Product Description
          </Text>
          <Text>
            {product.description['long'] == null
              ? product.description['short']
              : product.description['long']}
          </Text>
        </View>
        <View style={styles.descriptionView}>
          {coupons != null && coupons.length > 0 && (
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
                paddingBottom: 7,
                borderBottomWidth: 2,
                borderBottomColor: '#c1bcbc',
              }}>
              Coupons
            </Text>
          )}

          {coupons.map((coupon, index) => {
            // console.log(coupon);
            return (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  width: windowWidth - 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // height: 100,
                  marginTop: 10,
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: '#B60612',
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingBottom: 7,
                    // borderBottomWidth: 2,
                    // borderBottomColor: '#c1bcbc',
                  }}>
                  {coupon.promotiontypes.promotiontype[0]['#text']}
                  {/* {JSON.stringify(coupon.promotiontypes.promotiontype)} */}
                </Text>
                <Text
                  style={{
                    color: '#B60612',
                    fontSize: 15,
                    fontWeight: 'bold',
                    // paddingBottom: 7,
                    // padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                  }}>
                  {coupon.offerdescription}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: 13,
                        fontWeight: 'bold',
                        // paddingBottom: 7,
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}>
                      Start date : {coupon.offerstartdate}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: 13,
                        fontWeight: 'bold',
                        // paddingBottom: 7,
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}>
                      End date : {coupon.offerenddate}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  // onPress={() => Linking.openURL(coupon.clickurl)}
                  onPress={() => {
                    setlinkurl(coupon.clickurl);
                    setmodalvisible(true);
                  }}
                  style={{
                    backgroundColor: '#B60612',
                    height: 30,
                    width: 100,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: 16,
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}>
                    Buy Now
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.buyButtonContainer}>
        {/* <TouchableOpacity style={[styles.iconbtn, styles.shadow]}>
          <Icon name="heart" size={17.49} color="#a6a2a2" />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.buybtn, styles.shadow, {width: windowWidth}]}
          // onPress={() => Linking.openURL(product.linkurl)}
          onPress={() => {
            setlinkurl(product.linkurl);
            setmodalvisible(true);
          }}>
          <Text style={styles.btntxt}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView></SafeAreaView>
    </View>
  );
}
