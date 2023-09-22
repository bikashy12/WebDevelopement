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
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import products from '../constants/products';
import styles from '../styles/productdescriptionStyle';
import FastImage from '../components/FastImageComponent';
import * as productActions from '../store/actions/products';
import {useDispatch} from 'react-redux';

export default function PetWishlistDescriptionScreen({route, navigation}) {
  const dispatch = useDispatch();
  const {product_id} = route.params;
  const {product_name} = route.params;
  const {navscreen} = route.params;
  const {product} = route.params;
  const [loading, setLoading] = React.useState(false);
  const [linkurl, setlinkurl] = React.useState(null);
  const [coupons, setcoupons] = React.useState([]);
  useFocusEffect(
   
    React.useCallback(() => {
      console.log(route.params);
      setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 3000);
      // console.log('newwwww' + JSON.stringify(userData));

      const getcouponDetails = async () => {
        // setCload(true);
        try {
          let couponDetails;
          couponDetails = productActions.getcouponDetails(product_id);
          // console.log('=====================');
           console.log(couponDetails);
          const result = await dispatch(couponDetails);
          const resultData = JSON.parse(result);
          console.log('-----------');
          console.log(resultData);
          setLoading(false);
          setcoupons(resultData.coupons);
          setlinkurl(resultData.linkurl);
          // console.log(resultData.state);
        } catch (err) {
          console.log(err)
          // alert('Error,Something went wrong');
          // setLoading(false);
        }
      };
      getcouponDetails();
    }, []),
  );
  return (
    <View style={styles.container}>
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
         uri={ product.imageurl}
        />

        <View style={styles.detailsView}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              width: '50%',
            }}>
            {product.productName}
          </Text>
        </View>
        <View style={styles.detailsView}>
          <Text style={{color: 'black', fontSize: 13, fontWeight: 'bold'}}>
            Price :{' '}
            <Text style={{fontWeight: 'normal'}}>
              {product.price['@currency']}{' '}
              {product.price['#text']}
            </Text>
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
            console.log(coupon);
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
                  onPress={() => Linking.openURL(coupon.clickurl)}
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
          style={[styles.buybtn, styles.shadow, , {width: windowWidth}]}
          onPress={() => Linking.openURL(product.linkurl)}>
          <Text style={styles.btntxt}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
