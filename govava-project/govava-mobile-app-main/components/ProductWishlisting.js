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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as productActions from '../store/actions/products';
import { useFocusEffect } from '@react-navigation/native';
import Notifications from '../components/Notifications';
import FastImage from './FastImageComponent';

import Icon2 from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import empty from '../assets/images/empty.png';
import ContentLoader, { Rect, Circle, List } from 'react-content-loader/native';
import noimage from '../assets/images/noimage.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductWishlisting(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(true);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [value, setvalue] = React.useState(0);

  const [pro, setpro] = React.useState([]);
  // const [product_id, setproduct_id] = React.useState(null);
  const [product_index, setproduct_index] = React.useState(null);
  const { products, navscreen, ...attributes } = props;
  const [newproducts, setnewproducts] = React.useState(products);

  console.log(products.length + '99999999999999');
  const userData = useSelector((state) => state.auth);
  // const {navigation, products} = this.props;
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }),
  );
  console.log(
    'dddddddddddddddddddddd' + JSON.stringify(products.product_decrypt),
  );
  const navigationRedirect = (product) => {
    // console.log('_________________________');
    // console.log(product);
    if (product.product_decrypt.length == 0) {
      return null;
    } else {
      navigation.navigate('ProductWishlistDescription', {
        product: product,
        product_name: product.product_decrypt.title,
        product_id: product.product_decrypt.productId,
        navscreen: navscreen,
      });
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
        setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
        var allproducts = newproducts;
        allproducts.splice(i, 1);
        console.log(allproducts);

        setnewproducts(allproducts);
      } else {
        // props.onChange(reload + 2);
        setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      }
    } catch (err) {
      // alert(err);
      setLoading(false);
    }
  };
  // console.log('proo' + props.products.length);
  var reload = value;
  if (products.length == 0 && loading == false) {
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ height: 200, width: 200 }}>
            <Image
              style={{
                width: 180,
                height: 180,
                resizeMode: 'contain',
                // backgroundColor: '#f1efef73',
                padding: 10,
                // marginTop: 0,
              }}
              source={empty}
            />
          </View>
          <Text style={{ color: '#cb9b27', fontSize: 18 }}>
            Product list is empty....!
          </Text>
        </View>
      </ScrollView>
    );
  } else if (products.length > 0) {
    return (
      <ScrollView contentContainerStyle={styles.productsHolder}>
        {notification && (
          <Notifications
            msg={msg}
            // response={response}
            navscreen={navscreen}
            onChange={() => setnotification(false)}
          />
        )}
        {newproducts.map((product, i) => {
          // console.log('products are--------------');
          // console.log(product);

          var product_id = product.product_id;
          if (product.product_id != null) {
            reload = reload + 1;
            // console.log('products are--------------');
            // console.log(product.product_decrypt.price);
            return (
              <View
                key={'pro_' + i}
                style={[styles.productContainer, styles.shadow]}>
                <TouchableOpacity
                  onPress={() => navigationRedirect(product)}
                  key={'product_' + i}
                  style={{ width: '80%', flexDirection: 'row' }}>
                  <View style={{ width: '40%' }}>
                    {/* <Image
                      style={
                        product.product_decrypt.imageurl
                          ? product.product_decrypt.imageurl.slice(0, 11) !=
                              'https://cdn' &&
                            product.product_decrypt.imageurl.slice(0, 11) !=
                              'https://bl.' &&
                            product.product_decrypt.imageurl.slice(0, 20) !=
                              'https://www.herbspro'
                            ? {
                                height: windowWidth / 4.5,
                                aspectRatio: 1 / 1,
                                resizeMode: 'contain',
                                margin: 5,
                              }
                            : {
                                width: '80%',
                                height: '80%',
                                paddingBottom: 10,
                                marginTop: 10,
                              }
                          : {
                              width: '80%',
                              height: '80%',
                              paddingBottom: 10,
                              marginTop: 10,
                            }
                      }
                      source={
                        product.product_decrypt.imageurl
                          ? product.product_decrypt.imageurl.slice(0, 11) !=
                              'https://cdn' &&
                            product.product_decrypt.imageurl.slice(0, 11) !=
                              'https://bl.' &&
                            product.product_decrypt.imageurl.slice(0, 20) !=
                              'https://www.herbspro'
                            ? {uri: product.product_decrypt.imageurl}
                            : noimage
                          : noimage
                      }
                    /> */}
                    <FastImage
                      style={{
                        height: windowWidth / 4.5,
                        aspectRatio: 1 / 1,
                        resizeMode: 'contain',
                        margin: 5,
                      }}

                      uri={product.product_decrypt.imageurl}

                    />
                  </View>
                  <View
                    style={{
                      width: '60%',
                      flexDirection: 'column',
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        // textAlign: 'center',
                        //alignSelf: 'center',
                        width: '100%',
                        paddingVertical: 3,
                        paddingHorizontal: 3,
                        color: '#525252',
                      }}>
                      {product.product_decrypt.productname &&
                        product.product_decrypt.productname.length > 60
                        ? product.product_decrypt.productname.substring(0, 60) +
                        ' ....'
                        : product.product_decrypt.productname}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 12,
                        // textAlign: 'center',
                        //alignSelf: 'center',
                        width: '100%',
                        paddingVertical: 3,
                        paddingHorizontal: 3,
                        color: '#525252',
                      }}>
                      {/* {product.product_decrypt.price['#text']} */}
                      {/* {product.product_decrypt.price[0]} */}
                      {product.product_decrypt.price &&
                        product.product_decrypt.price['@currency']}{' '}
                      {product.product_decrypt.price &&
                        product.product_decrypt.price['#text']}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setvalue(reload + 2);
                    deleteuserwishlist(product_id);
                  }}
                  style={{
                    height: '100%',
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ececec',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  <Icon2 name="delete" size={20} color="black" />
                </TouchableOpacity>
              </View>
            );
          }
        })}
        {products.length % 2 == 0 ? null : (
          <View style={[styles.productContainer]}></View>
        )}
      </ScrollView>
    );
  } else
    return (
      <ScrollView contentContainerStyle={styles.productsHolder}>
        <View style={[styles.productContainer]}>
          <ContentLoader
            backgroundColor="#d6d6d6"
            gradientRatio={0.5}
            height={500}
            width={windowWidth}
            {...props}>
            <Rect x="0" y="0" width={windowWidth} height={100} />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            backgroundColor="#d6d6d6"
            gradientRatio={0.5}
            height={500}
            width={windowWidth}
            {...props}>
            <Rect x="0" y="0" width={windowWidth} height={100} />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            backgroundColor="#d6d6d6"
            gradientRatio={0.5}
            height={500}
            width={windowWidth}
            {...props}>
            <Rect x="0" y="0" width={windowWidth} height={100} />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            backgroundColor="#d6d6d6"
            gradientRatio={0.5}
            height={500}
            width={windowWidth}
            {...props}>
            <Rect x="0" y="0" width={windowWidth} height={100} />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            backgroundColor="#d6d6d6"
            gradientRatio={0.5}
            height={500}
            width={windowWidth}
            {...props}>
            <Rect x="0" y="0" width={windowWidth} height={100} />
          </ContentLoader>
        </View>
      </ScrollView>
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
  horizontalImage: {
    height: 100,
    width: 'auto',
  },

  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  //Products
  productsHolder: {
    flexDirection: 'row',
    // padding: 10,
    width: windowWidth,
    // alignItems:'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productContainer: {
    width: windowWidth - 20,
    height: windowWidth / 4,
    backgroundColor: 'white',
    margin: 7,
    flexDirection: 'row',
    borderRadius: 10,
    // justifyContent: 'space-between',
  },
});
