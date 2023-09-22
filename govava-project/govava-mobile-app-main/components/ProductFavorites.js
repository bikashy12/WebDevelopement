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
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as productActions from '../store/actions/products';
import Notifications from './Notifications';
import Icon2 from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import ContentLoader, {Rect, Circle, List} from 'react-content-loader/native';
import empty from '../assets/images/empty.png';
import noimage from '../assets/images/noimage.png';
import FastImage from './FastImageComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductFavorites(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [value, setvalue] = React.useState(0);

  const [pro, setpro] = React.useState([]);
  // const [product_id, setproduct_id] = React.useState(null);
  const [product_index, setproduct_index] = React.useState(null);
  const [modalvisibility, setmodalvisibility] = React.useState(false);
  const [delete_id, setdelete_id] = React.useState(null);

  const [reload_value, setreload_value] = React.useState(0);
  const {products, navscreen, ...attributes} = props;
  const nullArray = new Array(products.length%3).fill(null);

  const userData = useSelector((state) => state.auth);
  // const {navigation, products} = this.props;

  console.log(products);
  const navigationRedirect = (product) => {
    if (product.product_decrypt.length == 0) {
      return null;
    } else {
      // alert(product.product_decrypt.productId);
      navigation.navigate('FavoriteDescription', {
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
        props.onChange(reload + 2);
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
  const deleteProduct = async (product_id) => {
    // setLoading(true);
    // alert(product_id);
    // return;
    setvalue(reload + 2);
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
        setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
        props.onChange(reload + 2);
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
  console.log('length is ' + JSON.stringify(props.products));
  var reload = value;
  if (products.length == 0) {
    return (
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{height: 200, width: 200}}>
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
          <Text style={{color: '#cb9b27', fontSize: 18}}>
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
        <View>
          <Modal
            transparent={true}
            animationType={'fade'}
            visible={modalvisibility}
            onRequestClose={() => {
              console.log('close modal');
            }}>
            <View style={styles.centeredView}>
              <View style={[styles.modalView, styles.shadow]}>
                <Text style={styles.modalText}>Do you want to delete ?</Text>

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setmodalvisibility(false);
                    }}
                    style={{
                      ...styles.openButton,
                      backgroundColor: '#cb9b27',
                      marginRight: 10,
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setmodalvisibility(false);
                      setvalue(reload_value);
                      deleteProduct(delete_id);
                    }}
                    style={{
                      ...styles.openButton,
                      backgroundColor: '#cb9b27',
                    }}>
                    <Text style={styles.textStyle}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        {products.map((product, i) => {
          console.log('products are--------------');

          var product_id = product.product_id;
          if (product.product_id != null && product.product_decrypt.mid) {
            reload = reload + 1;
            console.log('products are--------------');
            console.log(product);
            return (
              <View style={[styles.productContainer, styles.shadow]} key={i}>
                <TouchableOpacity
                  onPress={() => navigationRedirect(product)}
                  key={'product_' + i}
                  style={[styles.productsView]}>
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
                              width: '100%',
                              height: windowWidth / 3.2,
                              resizeMode: 'contain',
                              marginTop: 3,
                            }
                          : {
                              width: '100%',
                              height: windowWidth / 3.2,
                              resizeMode: 'contain',
                              marginTop: 10,
                            }
                        : {
                            width: '100%',
                            height: windowWidth / 3.2,
                            resizeMode: 'contain',
                            marginTop: 10,
                          }
                    }
                    // source={{
                    //   uri: product.product_decrypt.imageurl
                    //     ? product.product_decrypt.imageurl
                    //     : product.product_decrypt.imageurl,
                    // }}
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
                  uri={product.product_decrypt.imageurl}
                 
                />

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
                    {product.product_decrypt.productname.length > 60
                      ? product.product_decrypt.productname.substring(0, 60) +
                        ' ....'
                      : product.product_decrypt.productname}
                  </Text>
                  {product.product_decrypt.price ? (
                    typeof product.product_decrypt.price === 'string' ? (
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
                        {/* {product.product_decrypt.price['#text']} */}
                        {/* {product.product_decrypt.price[0]} */}
                        {'USD '}
                        {product.product_decrypt.price}
                      </Text>
                    ) : (
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
                        {/* {product.product_decrypt.price['#text']} */}
                        {/* {product.product_decrypt.price[0]} */}
                        {product.product_decrypt.price['@currency']}{' '}
                        {product.product_decrypt.price['#text']}
                      </Text>
                    )
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                // onPress={()=>alert(product_id)}
                  onPress={() => {
                    setdelete_id(product_id);
                    setreload_value(reload + 2);
                    setmodalvisibility(true);
                  }}
                  style={{
                    width: '100%',
                    height: 22,

                    borderColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#b3b2b2c2',
                  }}>
                  <Text style={{color: 'white'}}>Remove</Text>
                </TouchableOpacity>
              </View>
            );
          }
        })}
         {nullArray.map((pronullData, i) => {
         
            return (
              <View style={[styles.productContainer]}></View>
            )})
            }
      </ScrollView>
    );
  } else
    return (
      <ScrollView contentContainerStyle={styles.productsHolder}>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>

        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
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
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 2,
  },
  //Products
  productsHolder: {
    flexDirection: 'row',
    // padding: 10,
    width: windowWidth,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productContainer: {
    width: windowWidth / 3.5,
    height: windowWidth / 1.5,
    backgroundColor: 'white',
    margin: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productsView: {
    height: '90%',
    backgroundColor: 'white',

    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  modalView: {
    top: 250,
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    fontFamily: 'Roboto-Medium',
  },
  openButton: {
    backgroundColor: '#cb9b27',
    padding: 10,
    elevation: 2,
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    // backgroundColor: '#000000ad',
  },
});
