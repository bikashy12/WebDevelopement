import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  FlatList,
  BackHandler,
  Modal,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
// import FastImage from 'react-native-fast-image';
import FastImage from '../components/FastImageComponent';
import Occasion_modal from '../components/occasion_modal';
//import products from '../constants/products';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import * as productActions from '../store/actions/products';
import Notifications from '../components/Notifications';
import styles from '../styles/productdescriptionStyle';
import noimage from '../assets/images/noimage.png';
import * as loadingActions from '../store/actions/loader';

export default function ProductDescriptionScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { product_id } = route.params;
  const { product_name } = route.params;
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => !!state.auth.token);
  const { navscreen } = route.params;
  const { product } = route.params;
  // console.log(product);
  const { favoriteIndex } = route.params;
  const userData = useSelector((state) => state.auth);
  const [favIndexdisp, setfavIndexdisp] = useState(favoriteIndex);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [favcolor, setfavcolor] = React.useState(false);
  const [linkurl, setlinkurl] = React.useState(null);
  const [coupons, setcoupons] = React.useState([]);
  const [occasion_id, setoccasion] = React.useState(null);

  const backAction = () => {
    console.log('goooooooooooo');
    navigation.goBack();
    return true;
  };
  // alert(favIndexdisp);
  React.useEffect(() => {
    
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 3000);
      // console.log('newwwww' + JSON.stringify(userData));

      const getcouponDetails = async () => {
        // setCload(true);
        try {
          await dispatch(loadingActions.setprofileloader(true));
          let couponDetails;
          couponDetails = productActions.getcouponDetails(product_id);
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(couponDetails);
          const resultData = JSON.parse(result);
          console.log('-----------');
          console.log(resultData);
          await dispatch(loadingActions.setprofileloader(false));
          setcoupons(resultData.coupons);
          setlinkurl(resultData.linkurl);
          // console.log(resultData.state);
        } catch (err) {
          await dispatch(loadingActions.setprofileloader(false));

          alert('Error,Something went wrong');
        }
      };
      getcouponDetails();
      BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );

  const userfavorite = async () => {
    if (!isAuth) {
      setmsg('Login to continue..!!');
      setnotification(true);
      return;
    }
    setfavcolor(true);
    //setLoading(true);
    try {
      await dispatch(loadingActions.setprofileloader(true));
      var user_id = userData.userId;
      var pro = product;
      var wizard_detail = null;
      // console.log('================================');
      // console.log(product_id);
      // console.log('++++++++++++++++++++++++++++++');
      // console.log(pro);

      let wishlistResult;
      wishlistResult = productActions.userfavorite(
        user_id,
        pro,
        product_id,
        wizard_detail,
      );
      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(wishlistResult);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      // console.log(resultData);
      // setcategories(resultData.browsemenu);

      // console.log(resultData.state);
      if (resultData.state == true) {
        setfavIndexdisp(1);
        // setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      } else {
        setfavIndexdisp(0);
        //setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
        // setTimeout(() => {
        //   setnotification(false);
        // }, 1200);
      }
      await dispatch(loadingActions.setprofileloader(false));
    } catch (err) {
      // alert(err);
      // setLoading(false);
      await dispatch(loadingActions.setprofileloader(false));
    }
  };
  const userwishlist = async (occ_id) => {
    if (!isAuth) {
      setmsg('Login to continue..!!');
      setnotification(true);
      return;
    }
    await dispatch(loadingActions.setprofileloader(true));
    try {
      var user_id = userData.userId;
      var pro = product;
      var wizard_detail = null;
      var wizard_type = 'User';
      var pet_id = null;

      let wishlistResult;
      wishlistResult = productActions.userwishlist(
        user_id,
        pro,
        product_id,
        wizard_detail,
        wizard_type,
        pet_id,
        occ_id,
      );
      const result = await dispatch(wishlistResult);
      const resultData = JSON.parse(result);

      if (resultData.state == true) {
        // setLoading(false);
        setTimeout(() => {
          setmsg(resultData.message + '..!!');
          setnotification(true);
        }, 100);
      } else {
        //setLoading(false);
        setTimeout(() => {
          setmsg(resultData.message + '..!!');
          setnotification(true);
        }, 100);
      }
      await dispatch(loadingActions.setprofileloader(false));
    } catch (err) {
      // setLoading(false);
      // alert(err);
      await dispatch(loadingActions.setprofileloader(false));
    }
  };

  const loadOccasion = () => {
    if (!isAuth) {
      setmsg('Login to continue..!!');
      setnotification(true);
      return;
    } else {
      setModalVisible(true);
    }
  };
  const giftChat = () => {
    if (!isAuth) {
      setmsg('Login to continue..!!');
      setnotification(true);
      return;
    }



  }
  const deleteProduct = async (product_id) => {
    // setLoading(true);
    try {
      var user_id = userData.userId;
      await dispatch(loadingActions.setprofileloader(true));
      // console.log('================================');
      // console.log(product_id);
      // console.log('++++++++++++++++++++++++++++++');
      // console.log(pro);
      let deletefavoriteResult;
      deletefavoriteResult = productActions.deleteFavoriteProduct(
        user_id,
        product_id,
      );
      const result = await dispatch(deletefavoriteResult);
      const resultData = JSON.parse(result);
      console.log('-----------');
      console.log(resultData);
      // setcategories(resultData.browsemenu);

      // console.log(resultData.state);
      if (resultData.state == true) {
        // alert('Hiiii');
        setfavIndexdisp(0);
        //setLoading(false);
        setTimeout(() => {
          setmsg(resultData.message + '..!!');
          setnotification(true);
        }, 100);
      } else {
        // setLoading(false);
        setTimeout(() => {
          setmsg(resultData.message + '..!!');
          setnotification(true);
        }, 100);
      }
      await dispatch(loadingActions.setprofileloader(false));
    } catch (err) {
      // alert(err);
      // setLoading(false);
      await dispatch(loadingActions.setprofileloader(false));
      console.log(err);
    }
  };
  const checkAuthentication = async (id) => {
    if (isAuth == false) {
      setmsg('Login to continue..!!');
      setnotification(true);
    } else {
      // userwishlist();
      if (id == 1) {
        setModalVisible(true);
      } else {
        userfavorite();
      }
    }
  };
  const setOccasionDetails = (id) => {
    console.log('iddd' + id);
    setoccasion(id);
    setModalVisible(false);
    setTimeout(() => {
      userwishlist(id);
    }, 100);
  };
  const giftchatnavigation=()=>{
    console.log(userData);
    if(userData.nobile==null||userData.mobile==''){
navigation.navigate('ValidationScreen');
    }else{
    navigation.navigate('ChatContacts', {
      params: {
        product: product,
        chatId: null,
        previousmobilenumber: ''
      },
    })
  }
}
  var protocol = product.imageurl.slice(0, 5);
  console.log(protocol);
  return (
    <View style={styles.container}>
      {loading && <Loader loading={loading} />}
      {notification && (
        <Notifications
          msg={msg}
          // response={response}
          navscreen={'Categoryproductdescription'}
          onChange={() => setnotification(false)}
        />
      )}
      <StatusBar backgroundColor="#B60612" />
      <Occasion_modal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onChange={(id) => {
          setOccasionDetails(id);
        }}
      />
      <Modal animationType="slide" transparent={true} visible={false}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}></View>
        </View>
      </Modal>

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
            style={{ width: 100 }}>
            <Icon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{ paddingLeft: 20 }}
            />
          </TouchableOpacity>
          <Image source={Logo_Text_white} style={{ width: 119, height: 16 }} />
          <View style={{ width: 90, height: 16 }}></View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <Image
            style={[styles.product_image]}
            source={
              product.imageurl.slice(0, 5) == 'https'
                ? {uri: product.imageurl}
                : noimage
            }
          /> */}
          {/* <FastImage
            style={[styles.product_image]}
            source={{
              uri: product.imageurl,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          /> */}
          <FastImage uri={product.imageurl} styles={styles.product_image} />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              zIndex: 100,
              // alignSelf:'flex-start',
              // width:'100%'
            }}
            // onPress={() => checkAuthentication(1)}
            onPress={() => {
              userfavorite();
              setModalVisible(false);
            }}>
            {favcolor == true ? (
              <EntypoIcon name="heart" size={40} color="#e1ac4b" />
            ) : (
              <EntypoIcon name="heart-outlined" size={40} color="#e1ac4b" />
            )}
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              zIndex: 100,
            }}
            // onPress={() => checkAuthentication(1)}
            onPress={() => {navigation.navigate('ChatContacts',{
                                                  params: {
                                                    product: product,
                                                    chatId:null,
                                                    previousmobilenumber:''
                                                  },                                      
            })}}>
              <FeatherIcon name="message-circle" size={40} color="#e1ac4b" />
          
          </TouchableOpacity> */}
        </View>

        <View style={styles.detailsView}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              width: '100%',
              marginTop: 5,
              textAlign: 'center'
            }}>
            {product.productname}
          </Text>

        </View>
        <View style={styles.detailsView}>
          <TouchableOpacity
            style={{
              height: 30,
              width: 160,
              backgroundColor: '#e1ac4b',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              flexDirection: 'row',
            }}
            onPress={() => {
              //userwishlist();

              loadOccasion();
            }}>
            <MaterialIcons name="card-giftcard" size={20} color="#ffffff" />
            <Text style={{ textAlign: 'center', color: '#ffffff' }}>
              {'  '}Add to my wishlist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 30,
              width: 160,
              backgroundColor: '#e1ac4b',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              flexDirection: 'row',
              // marginBottom:10
            }}
            onPress={() => {
              isAuth ? giftchatnavigation() : giftChat()
            }}
          >
            <MaterialIcons name="chat" size={20} color="#ffffff" />
            <Text style={{ textAlign: 'center', color: '#ffffff' }}>
              {'  '}Gift chat
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsView}>
          <Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold' }}>
            Price :{' '}
            <Text style={{ fontWeight: 'normal' }}>
              {product.price['@currency']} {product.price['#text']}
            </Text>
          </Text>

        </View>
        <View style={styles.descriptionView}>
          <View style={{
            borderBottomWidth: 2,
            alignContent: 'flex-start',
            borderBottomColor: '#c1bcbc',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>


            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
                paddingBottom: 7,
                textAlign: 'center',
                //  paddingTop:5
              }}>
              Product Description
          </Text>

          </View>
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
        {/* <TouchableOpacity style={[styles.savebtn, styles.shadow]}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontFamily: 'Roboto-Medium',
            }}>
            Add to wishlist
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.buybtn, styles.shadow]}
          onPress={() => Linking.openURL(product.linkurl)}>
          <Text style={styles.btntxt}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView></SafeAreaView>
    </View>
  );
}
