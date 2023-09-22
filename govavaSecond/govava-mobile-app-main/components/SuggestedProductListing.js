import React from 'react';
//import { withNavigation } from '@react-navigation/compat';
import {
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
// import FastImage from 'react-native-fast-image';
import FastImage from './FastImageComponent';
import {useNavigation} from '@react-navigation/native';
import * as productActions from '../store/actions/products';
import Notifications from '../components/Notifications';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import ContentLoader, {Rect, Circle, List} from 'react-content-loader/native';
import noimage from '../assets/images/noimage.png';
import Icon1 from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SuggestedProductListing(props) {
  const isAuth = useSelector((state) => !!state.auth.token);
  // alert(isAuth);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [response, setresponse] = React.useState(null);

  const [pro, setpro] = React.useState([]);
  // const [product_id, setproduct_id] = React.useState(null);
  const [product_index, setproduct_index] = React.useState(null);
  const {
    products,
    suggesteditems,
    character,
    user_contact_id,
    navscreen,
    wizard_detail,
    request_body,
    totalPages,
    pageno,
    wizard_type,
    pet_id,
    occasion_id,
    ...attributes
  } = props;
  const userData = useSelector((state) => state.auth);

  // const {navigation, products} = this.props;
  // console.log('gggggggggggggggggggggggggggggggggggggggggggggg');
  // console.log(products);
  // console.log(user_contact_id);
  const userwishlist = async (product_id, product) => {
    setLoading(false);
    try {
      var user_id = userData.userId;
      var pro = product;
      // console.log('================================');
      // console.log(product_id);
      // console.log('++++++++++++++++++++++++++++++');
      // console.log(pro);

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
      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(wishlistResult);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      // console.log(resultData);
      // setcategories(resultData.browsemenu);

      // console.log(resultData.state);
      if (resultData.state == true) {
        setLoading(false);
        setresponse(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      } else {
        setLoading(false);
        setresponse(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
        // setTimeout(() => {
        //   setnotification(false);
        // }, 1200);
      }
    } catch (err) {
      // alert(err);
      // setLoading(false);
    }
  };
  const checkAuthentication = async (i, product, product_id) => {
    if (isAuth == false) {
      setmsg('Login to continue..!!');
      setnotification(true);
    } else {
      setproduct_index(i);
      setpro(product);
      userwishlist(product_id, product);
    }
  };
  // console.log('proo' + props.products.length);
  const footer = () => {
    if (totalPages > 1 && pageno < totalPages) {
      return (
        <View>
               <TouchableOpacity
          onPress={() => props.onMore()}
          style={{
            height: 40,
            backgroundColor: '#808080',
            alignItems: 'center',
            justifyContent: 'center',
            width: windowWidth / 1.5,
            padding: 10,
            alignContent: 'center',
            alignSelf: 'center',
            marginVertical: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Roboto-Medium',
              fontSize: 18,
            }}>
            MORE
          </Text>
        </TouchableOpacity>
        {suggesteditems && suggesteditems.length > 0 ? (
        <View style={{justifyContent:'center'}}>
          <Text
            style={{
              color: '#B60612',
              fontStyle: 'normal',
              fontFamily: 'Roboto-Medium',
              fontSize: 25,
              lineHeight: 20,
              padding: 20,
              paddingBottom: 10,
              alignContent:'center',
              alignItems:'center',
              alignSelf:'center'
            }}>
            SUGGESTED GIFTS{' '}
          </Text>
        </View>
      ) : null}
      <FlatList
        // extraData={ch_styles}
        contentContainerStyle={{flexGrow: 1}}
        data={suggesteditems}
        renderItem={({item, i}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Suggestedproductdescription', {
                occasion_id: occasion_id,
                product: item,
                wizard_detail: wizard_detail,
                product_name: item.productname,
                product_id: item.productId,
                navscreen: navscreen,
                user_contact_id: user_contact_id,
                wizard_type: wizard_type,
                pet_id: pet_id,
              })
            }
            key={'product_' + i}
            style={[styles.productContainer, styles.shadow]}>
            {/* <Image
              style={
                item.imageurl
                  ? item.imageurl.slice(0, 11) != 'https://cdn' &&
                    item.imageurl.slice(0, 11) != 'https://bl.' &&
                    item.imageurl.slice(0, 20) != 'https://www.herbspro' &&
                    item.imageurl.slice(0, 25) != 'http://assets.costway.com'
                    ? {
                        width: 100,
                        height: windowWidth / 3.2,
                        resizeMode: 'contain',
                        marginTop: 3,
                      }
                    : {
                        width: '100%',
                        height: '50%',
                        paddingBottom: 10,
                        marginTop: 10,
                      }
                  : {
                      width: '100%',
                      height: 50,
                      paddingBottom: 10,
                      marginTop: 20,
                    }
              }
              source={
                item.imageurl
                  ? item.imageurl.slice(0, 11) != 'https://cdn' &&
                    item.imageurl.slice(0, 11) != 'https://bl.' &&
                    item.imageurl.slice(0, 20) != 'https://www.herbspro' &&
                    item.imageurl.slice(0, 25) != 'http://assets.costway.com'
                    ? {uri: item.imageurl}
                    : noimage
                  : noimage
              }
            /> */}
            {/* <FastImage
              style={{
                width: '100%',
                height: windowWidth / 3.2,
                resizeMode: 'contain',
                marginTop: 3,
              }}
              source={{
                uri: item.imageurl,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            /> */}
            <FastImage uri={item.imageurl} styles={styles.productstyle} />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 3,
                right: 3,
                width: 60,
                height: 60,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
              }}>
              {/* {product_index == i ? (
                  <Icon2 name="heart" size={20} color="#d4a040" />
                ) : (
                  <Icon2 name="hearto" size={20} color="#d4a040" />
                )} */}
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                alignSelf: 'center',
                width: '100%',
                paddingVertical: 3,
                paddingHorizontal: 3,
                color: '#525252',
              }}>
              {item.productname
                ? item.productname.length > 60
                  ? item.productname.substring(0, 60) + ' ....'
                  : item.productname
                : ''}
              {/* {item.imageurl} */}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
                alignSelf: 'center',
                width: '100%',
                paddingVertical: 3,
                color: '#525252',
              }}>
              {item.price['@currency']} {item.price['#text']}
            </Text>
          </TouchableOpacity>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
        </View>
   );
    } else {
      return (
        <View>
              
       {suggesteditems && suggesteditems.length > 0 ? (
          <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
         <Icon1 name="card-giftcard" size={23} color="#B60612" />
          <Text
            style={{
              color: '#B60612',
              fontStyle: 'normal',
              fontFamily: 'Roboto-Medium',
              fontSize: 25,
              lineHeight: 20,
              padding: 20,
              paddingBottom: 10,
              alignContent:'center',
              alignItems:'center',
              alignSelf:'center'
            }}>
            SUGGESTED GIFTS{' '}
          </Text>
          <Icon1 name="card-giftcard" size={23} color="#B60612" />
        </View>
      ) : null}
      <FlatList
        // extraData={ch_styles}
        contentContainerStyle={{flexGrow: 1}}
        data={suggesteditems}
        renderItem={({item, i}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Suggestedproductdescription', {
                occasion_id: occasion_id,
                product: item,
                wizard_detail: wizard_detail,
                product_name: item.productname,
                product_id: item.productId,
                navscreen: navscreen,
                user_contact_id: user_contact_id,
                wizard_type: wizard_type,
                pet_id: pet_id,
              })
            }
            key={'product_' + i}
            style={[styles.productContainer, styles.shadow]}>
            {/* <Image
              style={
                item.imageurl
                  ? item.imageurl.slice(0, 11) != 'https://cdn' &&
                    item.imageurl.slice(0, 11) != 'https://bl.' &&
                    item.imageurl.slice(0, 20) != 'https://www.herbspro' &&
                    item.imageurl.slice(0, 25) != 'http://assets.costway.com'
                    ? {
                        width: 100,
                        height: windowWidth / 3.2,
                        resizeMode: 'contain',
                        marginTop: 3,
                      }
                    : {
                        width: '100%',
                        height: '50%',
                        paddingBottom: 10,
                        marginTop: 10,
                      }
                  : {
                      width: '100%',
                      height: 50,
                      paddingBottom: 10,
                      marginTop: 20,
                    }
              }
              source={
                item.imageurl
                  ? item.imageurl.slice(0, 11) != 'https://cdn' &&
                    item.imageurl.slice(0, 11) != 'https://bl.' &&
                    item.imageurl.slice(0, 20) != 'https://www.herbspro' &&
                    item.imageurl.slice(0, 25) != 'http://assets.costway.com'
                    ? {uri: item.imageurl}
                    : noimage
                  : noimage
              }
            /> */}
            {/* <FastImage
              style={{
                width: '100%',
                height: windowWidth / 3.2,
                resizeMode: 'contain',
                marginTop: 3,
              }}
              source={{
                uri: item.imageurl,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            /> */}
            <FastImage uri={item.imageurl} styles={styles.productstyle} />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 3,
                right: 3,
                width: 60,
                height: 60,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
              }}>
              {/* {product_index == i ? (
                  <Icon2 name="heart" size={20} color="#d4a040" />
                ) : (
                  <Icon2 name="hearto" size={20} color="#d4a040" />
                )} */}
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                alignSelf: 'center',
                width: '100%',
                paddingVertical: 3,
                paddingHorizontal: 3,
                color: '#525252',
              }}>
              {item.productname
                ? item.productname.length > 60
                  ? item.productname.substring(0, 60) + ' ....'
                  : item.productname
                : ''}
              {/* {item.imageurl} */}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
                alignSelf: 'center',
                width: '100%',
                paddingVertical: 3,
                color: '#525252',
              }}>
              {item.price['@currency']} {item.price['#text']}
            </Text>
          </TouchableOpacity>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
        </View>
   );
    }
  
  };
  return (
    <View style={styles.productsHolder}>
      {notification && (
        <Notifications
          msg={msg}
          // response={response}
          navscreen={navscreen}
          onChange={() => setnotification(false)}
        />
      )}
      <FlatList
        // extraData={ch_styles}
        contentContainerStyle={{flexGrow: 1}}
        data={products}
        renderItem={({item, i}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Suggestedproductdescription', {
                occasion_id: occasion_id,
                product: item,
                wizard_detail: wizard_detail,
                product_name: item.productname,
                product_id: item.productId,
                navscreen: navscreen,
                user_contact_id: user_contact_id,
                wizard_type: wizard_type,
                pet_id: pet_id,
              })
            }
            key={'product_' + i}
            style={[styles.productContainer, styles.shadow]}>
            {/* <Image
              style={
                item.imageurl
                  ? item.imageurl.slice(0, 11) != 'https://cdn' &&
                    item.imageurl.slice(0, 11) != 'https://bl.' &&
                    item.imageurl.slice(0, 20) != 'https://www.herbspro' &&
                    item.imageurl.slice(0, 25) != 'http://assets.costway.com'
                    ? {
                        width: 100,
                        height: windowWidth / 3.2,
                        resizeMode: 'contain',
                        marginTop: 3,
                      }
                    : {
                        width: '100%',
                        height: '50%',
                        paddingBottom: 10,
                        marginTop: 10,
                      }
                  : {
                      width: '100%',
                      height: 50,
                      paddingBottom: 10,
                      marginTop: 20,
                    }
              }
              source={
                item.imageurl
                  ? item.imageurl.slice(0, 11) != 'https://cdn' &&
                    item.imageurl.slice(0, 11) != 'https://bl.' &&
                    item.imageurl.slice(0, 20) != 'https://www.herbspro' &&
                    item.imageurl.slice(0, 25) != 'http://assets.costway.com'
                    ? {uri: item.imageurl}
                    : noimage
                  : noimage
              }
            /> */}
            {/* <FastImage
              style={{
                width: '100%',
                height: windowWidth / 3.2,
                resizeMode: 'contain',
                marginTop: 3,
              }}
              source={{
                uri: item.imageurl,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            /> */}
            <FastImage uri={item.imageurl} styles={styles.productstyle} />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 3,
                right: 3,
                width: 60,
                height: 60,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
              }}>
              {/* {product_index == i ? (
                  <Icon2 name="heart" size={20} color="#d4a040" />
                ) : (
                  <Icon2 name="hearto" size={20} color="#d4a040" />
                )} */}
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                alignSelf: 'center',
                width: '100%',
                paddingVertical: 3,
                paddingHorizontal: 3,
                color: '#525252',
              }}>
              {item.productname
                ? item.productname.length > 60
                  ? item.productname.substring(0, 60) + ' ....'
                  : item.productname
                : ''}
              {/* {item.imageurl} */}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
                alignSelf: 'center',
                width: '100%',
                paddingVertical: 3,
                color: '#525252',
              }}>
              {item.price['@currency']} {item.price['#text']}
            </Text>
          </TouchableOpacity>
        )}
        //Setting the number of column
        numColumns={3}
        ListHeaderComponent={    <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        <Icon1 name="card-giftcard" size={23} color="#B60612" />
       <Text
         style={{
           color: '#B60612',
           fontStyle: 'normal',
           fontFamily: 'Roboto-Medium',
           fontSize: 20,
           lineHeight: 20,
           padding: 20,
           paddingBottom: 10,
           // right: 16,
         }}>
         GOVAVA GIFT RESULTS
       </Text>
       <Icon1 name="card-giftcard" size={23} color="#B60612" />
     </View>
    }
        ListFooterComponent={footer}
        keyExtractor={(item, index) => index}
      />
      <SafeAreaView></SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderWidth: 0,
    minHeight: 114,
    alignItems: 'center',
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: 10 / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: 10 / 2,
    marginTop: 0,
  },
  productstyle: {
    width: '100%',
    height: windowWidth / 3.2,
    resizeMode: 'contain',
    marginTop: 3,
  },
  horizontalImage: {
    height: 100,
    width: 'auto',
  },

  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  //Products
  productsHolder: {
    flex: 1,
    flexDirection: 'column',
    // padding: 10,
    width: windowWidth,
    alignItems: 'center',
    //flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  productContainer: {
    width: windowWidth / 3.5,
    height: windowHeight / 3,
    backgroundColor: 'white',
    margin: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
