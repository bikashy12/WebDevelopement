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
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Loader from '../components/Loader';
import { ScrollView } from 'react-native-gesture-handler';
// import FastImage from 'react-native-fast-image';
import FastImage from '../components/FastImageComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import products from '../constants/products';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as productActions from '../store/actions/products';
import * as loadingActions from '../store/actions/loader';

import Notifications from '../components/Notifications';
import styles from '../styles/productdescriptionStyle';
import noimage from '../assets/images/noimage.png';
import { useFocusEffect } from '@react-navigation/native';

export default function SuggestedProDescScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { product_id } = route.params;
  const { user_contact_id } = route.params;
  const [favcolor, setfavcolor] = React.useState(false);
  //   alert(user_contact_id);
  const { product_name } = route.params;
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => !!state.auth.token);
  const { navscreen } = route.params;
  const { product } = route.params;
  const { wizard_detail } = route.params;
  const { wizard_type } = route.params;
  const { pet_id } = route.params;
  const { occasion_id } = route.params;

  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
  // console.log(product);
  const { favoriteIndex } = route.params;
  const userData = useSelector((state) => state.auth);
  const [favIndexdisp, setfavIndexdisp] = useState(favoriteIndex);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [linkurl, setlinkurl] = React.useState(null);
  const [coupons, setcoupons] = React.useState([]);
  const backAction = () => {
    navigation.goBack();
    return true;
  };
  // alert(favIndexdisp);
 
  useFocusEffect(
    React.useCallback(() => {
      //setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 3000);
      // console.log('newwwww' + JSON.stringify(userData));

      const getcouponDetails = async () => {
        // setCload(true);
        await dispatch(loadingActions.setprofileloader(true));

        try {
          let couponDetails;
          couponDetails = productActions.getcouponDetails(product_id);
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(couponDetails);
          const resultData = JSON.parse(result);
          console.log('-----------');
          //console.log(resultData);
          await dispatch(loadingActions.setprofileloader(false));
          setcoupons(resultData.coupons);
          setlinkurl(resultData.linkurl);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          // setLoading(false);
          await dispatch(loadingActions.setprofileloader(false));
        }
      };
      getcouponDetails();
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );

  const userfavorite = async () => {
    await dispatch(loadingActions.setprofileloader(true));
    try {
      var user_id = userData.userId;
      var pro = product;
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

        setmsg(resultData.message + '..!!');
        setnotification(true);
      } else {
        setfavIndexdisp(0);
        setmsg(resultData.message + '..!!');
        setnotification(true);
        // setTimeout(() => {
        //   setnotification(false);
        // }, 1200);
      }
      await dispatch(loadingActions.setprofileloader(false));
    } catch (err) {
      alert(err);
      // setLoading(false);
      await dispatch(loadingActions.setprofileloader(false));
    }
  };
  const userwishlist = async () => {
    try {
      var user_id = userData.userId;
      var pro = product;
      await dispatch(loadingActions.setprofileloader(true));
      let wishlistResult;
      wishlistResult = productActions.userwishlist(
        user_id,
        pro,
        product_id,
        wizard_detail,
        wizard_type,
        pet_id,
        occasion_id,
      );
      const result = await dispatch(wishlistResult);
      const resultData = JSON.parse(result);

      if (resultData.state == true) {
        // setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      } else {
        // setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      }
      await dispatch(loadingActions.setprofileloader(false));
    } catch (err) {
      alert(err);
      await dispatch(loadingActions.setprofileloader(false));
    }
  };
  const deleteuserwishlist = async (product_id) => {
    // setLoading(true);
    try {
      var user_id = userData.userId;

      // console.log('================================');
      // console.log(product_id);
      // console.log('++++++++++++++++++++++++++++++');
      // console.log(pro);

      let deletewishlistResult;
      deletewishlistResult = productActions.deleteuserwishlist(
        user_id,
        product_id,
      );
      const result = await dispatch(deletewishlistResult);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      // console.log(resultData);
      // setcategories(resultData.browsemenu);

      // console.log(resultData.state);
      if (resultData.state == true) {
        // alert('Hiiii');
        setfavIndexdisp(0);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      } else {
        // props.onChange(reload + 2);
        setfavIndexdisp(1);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      }
    } catch (err) {
      // alert(err);
    }
  };
  const deleteProduct = async (product_id) => {
    await dispatch(loadingActions.setprofileloader(true));
    try {
      var user_id = userData.userId;

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
      // console.log('-----------');
      // console.log(resultData);
      // setcategories(resultData.browsemenu);

      // console.log(resultData.state);
      if (resultData.state == true) {
        // alert('Hiiii');
        setfavIndexdisp(0);
        await dispatch(loadingActions.setprofileloader(false));
        setmsg(resultData.message + '..!!');
        setnotification(true);
      } else {
        await dispatch(loadingActions.setprofileloader(false));
        setmsg(resultData.message + '..!!');
        setnotification(true);
      }
    } catch (err) {
      // alert(err);
      await dispatch(loadingActions.setprofileloader(false));
    }
  };

  const saveGiftee = async () => {
    await dispatch(loadingActions.setprofileloader(true));
    try {
      var user_id = userData.userId;
      var pro = product;
      // setLoading(true);
      let giftResult;
      giftResult = productActions.savegift(
        user_id,
        pro,
        product_id,
        user_contact_id,
        wizard_detail,
        occasion_id,
        null
      );
      const result = await dispatch(giftResult);
      const resultData = JSON.parse(result);

      if (resultData.state == true) {
        // setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      } else {
        // setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      }
      await dispatch(loadingActions.setprofileloader(false));
    } catch (err) {
      await dispatch(loadingActions.setprofileloader(false));
    }
  };
  const saveforpets = async () => {
    await dispatch(loadingActions.setprofileloader(true));
    try {
      var user_id = userData.userId;
      var pro = product;
      // setLoading(true);
      let giftResult;
      giftResult = productActions.savegift(
        user_id,
        pro,
        product_id,
        null,
        null,
        occasion_id,
        pet_id
      );
      const result = await dispatch(giftResult);
      const resultData = JSON.parse(result);

      if (resultData.state == true) {
        // setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      } else {
        // setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      }
      await dispatch(loadingActions.setprofileloader(false));
    } catch (err) {
      await dispatch(loadingActions.setprofileloader(false));
    }
  };
  const SaveClickDatas = async (linkurl) => {
    try {
      var user_id = userData.userId;
      var pro = product;
      await dispatch(loadingActions.setprofileloader(true));
      let clickdataResult;
      clickdataResult = productActions.SaveClickDatas(
        user_id,
        pro,
        product_id,
        wizard_detail,
      );
      const result = await dispatch(clickdataResult);
      const resultData = JSON.parse(result);

      if (resultData.state == true) {
        // setLoading(false);
        // setmsg(resultData.message + '..!!');
        // setnotification(true);
        Linking.openURL(linkurl);
      } else {
        // setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      }
      await dispatch(loadingActions.setprofileloader(false));
    } catch (err) {
      alert(err);
      await dispatch(loadingActions.setprofileloader(false));
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
  var protocol = product.imageurl.slice(0, 5);
  // console.log(protocol);
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
  return (
    <View style={styles.container}>
      {loading && <Loader loading={loading} />}
      {notification && (
        <Notifications
          msg={msg}
          // response={response}
          navscreen={'Suggestedproductdescription'}
          onChange={() => setnotification(false)}
        />
      )}
      <StatusBar backgroundColor="#B60612" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              margin: 10,
              marginTop: 100,
              backgroundColor: 'white',
              borderRadius: 2,
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
              width: '43%',
              height: 120,
              justifyContent: 'space-around',
            }}>
            <View style={{ width: '100%' }}>
              <TouchableOpacity
                onPress={() => {
                  userfavorite();
                  setModalVisible(false);
                }}>
                <Text style={styles.modalText}>Add to Favorite</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%' }}>
              <TouchableOpacity
                onPress={() => {
                  userwishlist();
                  setModalVisible(false);
                }}>
                <Text style={styles.modalText}>Add to my Wishlist</Text>
              </TouchableOpacity>
            </View>
            {wizard_type == 'User' && user_contact_id != null ? (
              <View style={{ width: '100%' }}>
                <TouchableOpacity
                  onPress={() => {
                    saveGiftee();
                    setModalVisible(false);
                  }}>
                  <Text style={styles.modalText}>Save for Giftee</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
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
            alignItems: 'center',
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
          {/* <TouchableOpacity
            style={{marginTop: 20, right: 10}}
            onPress={() => checkAuthentication(1)}>
            <EntypoIcon name="dots-three-vertical" size={20} color="#000" />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: 20,
              zIndex: 100,
            }}
            // onPress={() => checkAuthentication(1)}
            onPress={() => {
              setfavcolor(true);
              userfavorite();
              setModalVisible(false);
            }}>
            {favcolor == true ? (
              <EntypoIcon name="heart" size={30} color="#e1ac4b" />
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
            })}}
            >
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
              height: 35,
              width: 180,
              backgroundColor: '#e1ac4b',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              flexDirection: 'row',
            }}
            onPress={() => {
              userwishlist();
              setModalVisible(false);
            }}>
            <MaterialIcons name="card-giftcard" size={20} color="#ffffff" />
            <Text style={{ textAlign: 'center', color: '#ffffff' }}>
              {wizard_type == 'User' ?'  Add to my wishlist':"  Add to pet's wishlist"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 35,
              width: 180,
              backgroundColor: '#e1ac4b',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              flexDirection: 'row',
              // marginBottom:10
            }}
            onPress={() => {
          giftchatnavigation()
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
          {/* <TouchableOpacity
            style={{
              height: 30,
              width: 160,
              backgroundColor: '#e1ac4b',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              flexDirection: 'row',
            }}
            onPress={() => {
              userwishlist();
              setModalVisible(false);
            }}>
            <MaterialIcons name="card-giftcard" size={20} color="#ffffff" />
            <Text style={{textAlign: 'center', color: '#ffffff'}}>
              {'  '}Add to wishlist
            </Text>
          </TouchableOpacity> */}
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
                paddingTop: 5
              }}>
              Product Description
          </Text>
            {/* <TouchableOpacity
            style={{
              height: 30,
              width: 160,
              backgroundColor: '#e1ac4b',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              flexDirection: 'row',
              marginBottom:10
            }}
            onPress={() => {navigation.navigate('ChatContacts',{
              params: {
                product: product,
                chatId:null,
                previousmobilenumber:''
              },                                      
            })}}
          >
            <MaterialIcons name="chat" size={20} color="#ffffff" />
            <Text style={{textAlign: 'center', color: '#ffffff'}}>
              {'  '}Start gift chat
            </Text>
          </TouchableOpacity> */}
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

      {/* {favIndexdisp == 1 ? (
          <TouchableOpacity
            style={[styles.iconbtn, styles.shadow]}
            onPress={() => deleteProduct(mid)}>
            <Icon name="heart" size={17.49} color="#d4a040" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.iconbtn, styles.shadow]}
            onPress={() => checkAuthentication(0)}>
            <Icon name="heart" size={17.49} color="#a6a2a2" />
          </TouchableOpacity>
        )} */}
      {wizard_type == 'User' ? (
        <View style={[styles.buyButtonContainer, styles.shadow]}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '50%',
              backgroundColor: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 0,
              fontSize: 20,
            }}
            onPress={() => {
              saveGiftee();
              setModalVisible(false);
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Roboto-Medium',
                fontSize: 18,
              }}>
              Save for Giftee
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buybtngiftee,
              styles.shadow,
              { alignSelf: 'flex-end' },
            ]}
            onPress={() => SaveClickDatas(product.linkurl)}>
            <Text style={styles.btntxt}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.buyButtonContainer, styles.shadow]}>
            <TouchableOpacity
            style={{
              height: '100%',
              width: '50%',
              backgroundColor: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 0,
              fontSize: 20,
            }}
            onPress={()=>{saveforpets()}}
           >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Roboto-Medium',
                fontSize: 18,
              }}>
              Save for Pet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buybtngiftee,
              styles.shadow,
              { alignSelf: 'flex-end' },
            ]}
            onPress={() => SaveClickDatas(product.linkurl)}>
            <Text style={styles.btntxt}>Buy Now</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.buybtngiftee, styles.shadow, { width: '100%' }]}
            onPress={() => SaveClickDatas(product.linkurl)}>
            <Text style={styles.btntxt}>Buy Now</Text>
          </TouchableOpacity> */}
        </View>
      )}
      <SafeAreaView></SafeAreaView>
    </View>
  );
}
