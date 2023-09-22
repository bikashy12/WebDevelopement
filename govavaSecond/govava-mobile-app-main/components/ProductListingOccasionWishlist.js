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
import {useFocusEffect} from '@react-navigation/native';
import Notifications from '../components/Notifications';
import FastImage from './FastImageComponent';
import Icon2 from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import empty from '../assets/images/empty.png';
import ContentLoader, {Rect, Circle, List} from 'react-content-loader/native';
import noimage from '../assets/images/noimage.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductListingOccasionWishlist(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(true);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [value, setvalue] = React.useState(0);

  const [pro, setpro] = React.useState([]);
  // const [product_id, setproduct_id] = React.useState(null);
  const [product_index, setproduct_index] = React.useState(null);
  const [modalvisibility, setmodalvisibility] = React.useState(false);
  const {products, navscreen, ...attributes} = props;
  //console.log(products.length + '99999999999999');
  const [delete_id, setdelete_id] = React.useState(null);
  const [index_value, setindex_value] = React.useState(0);
  const [reload_value, setreload_value] = React.useState(0);
  const [newproducts, setnewproducts] = React.useState(products);

  const userData = useSelector((state) => state.auth);
  // const {navigation, products} = this.props;
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }),
  );
  // console.log(
  //   'dddddddddddddddddddddd' + JSON.stringify(products),
  // );
  const navigationRedirect = (product) => {
    // console.log('_________________________');
    // console.log(product);
    if (product.length == 0) {
      return null;
    } else {
      navigation.navigate('ProductWishOccasionDescScreen', {
        product: product,
        product_name: product.productname
          ? product.productname
          : product.merchantname,
        product_id: product.productId ? product.product_id : product.sku,
        navscreen: navscreen,
      });
    }
  };
  const deleteuserwishlist = async (product_id, i) => {
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
      console.log('-----------');
      console.log(resultData);
      // setcategories(resultData.browsemenu);

      // console.log(resultData.state);
      if (resultData.state == true) {
        // alert('Hiiii');
        setLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
        console.log('fff');
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
            navscreen={'Wishlist'}
            onChange={() => setnotification(false)}
          />
        )}
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
                    deleteuserwishlist(delete_id, index_value);
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

        {newproducts.map((product, i) => {
          //console.log('products are--------------');
          // console.log(product);

          var product_id = product.productId;

          // console.log('products are--------------');
          // console.log(product.price);
          return (
            <View
              key={'pro_' + i}
              style={[styles.productContainer, styles.shadow]}>
              <TouchableOpacity
                onPress={() => navigationRedirect(product)}
                key={'product_' + i}
                style={{width: '80%', flexDirection: 'row'}}>
                <View style={{width: '40%'}}>
                  <FastImage
                    style={{
                      height: windowWidth / 4.5,
                      aspectRatio: 1 / 1,
                      resizeMode: 'contain',
                      margin: 5,
                    }}
                      uri={ product.imageurl}
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
                    {product.productname && product.productname.length > 60
                      ? product.productname.substring(0, 60) + ' ....'
                      : product.productname}
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
                    {/* {product.price['#text']} */}
                    {/* {product.price[0]} */}
                    {product.price
                      ? typeof product.price === 'string'
                        ? product.price
                        : product.price['@currency']
                      : null}{' '}
                    {product.price && typeof product.price != 'string'
                      ? product.price['#text']
                      : null}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setreload_value(reload + 2);
                  setindex_value(i);
                  setdelete_id(product_id);
                  setmodalvisibility(true);
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
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    shadowOpacity: 0.5,
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

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: '#000000a0',
    backgroundColor: '#000000ad',
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
