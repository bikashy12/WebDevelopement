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
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as productActions from '../store/actions/products';
import NotificationsNav from '../components/NotificationsNav';
import Icon2 from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import ContentLoader, {Rect, Circle, List} from 'react-content-loader/native';
import emptygift from '../assets/images/empty_gift.png';
// import FastImage from 'react-native-fast-image';
import FastImage from './FastImageComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function GiftProductsList(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [delLoading, setDelLoading] = React.useState(false);

  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [value, setvalue] = React.useState(0);
  const [modalvisibility, setmodalvisibility] = React.useState(false);
  const [delete_id, setdelete_id] = React.useState(null);
  const [index_value, setindex_value] = React.useState(0);
  const [reload_value, setreload_value] = React.useState(0);
  const [pro, setpro] = React.useState([]);
  // const [product_id, setproduct_id] = React.useState(null);
  const [product_index, setproduct_index] = React.useState(null);
  const {products, navscreen, ...attributes} = props;

  const userData = useSelector((state) => state.auth);
  // const {navigation, products} = this.props;

  // console.log(products);
  const navigationRedirect = (product) => {
    if (product.length == 0) {
      return null;
    } else {
      navigation.navigate('ProductGiftDescription', {
        product: product,
        product_name: product.title,
        product_id: product.product_id,
        navscreen: 'GiftProducts',
      });
    }
  };
  const deleteusergift = async (product_id, index) => {
    setDelLoading(true);
    try {
      var user_id = userData.userId;

      // console.log('================================');
      // console.log(product_id);
      // console.log('++++++++++++++++++++++++++++++');
      // console.log(pro);

      let deletegiftResult;
      deletegiftResult = productActions.deletegiftResult(user_id, product_id);
      const result = await dispatch(deletegiftResult);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      // console.log(resultData);
      // setcategories(resultData.browsemenu);

      // console.log(resultData.state);
      if (resultData.state == true) {
        // alert('Hiiii');
        setmodalvisibility(false);
        setDelLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
        props.onChange(index);
      } else {
        // props.onChange(reload + 2);
        setmodalvisibility(false);
        setDelLoading(false);
        setmsg(resultData.message + '..!!');
        setnotification(true);
      }
    } catch (err) {
      // alert(err);
      setmodalvisibility(false);
      setDelLoading(false);
      setmsg(err.message + '..!!');
        setnotification(true);
    }
  };
  console.log('proo' + props.products.length);
  var reload = value;
  if (products.length > 0) {
    return (
      <View style={styles.productsHolder}>
        {notification && (
          <NotificationsNav
            msg={msg}
            // response={response}
            navscreen={'GiftOccasion'}
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
                disabled={delLoading}
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
                disabled={delLoading}
                  onPress={() => {
                    
                    setvalue(reload_value);
                    deleteusergift(delete_id, index_value);
                  }}
                  style={{
                    ...styles.openButton,
                    backgroundColor: '#cb9b27',
                  }}>
                    {delLoading?<ActivityIndicator size='small' color='white' />:
                  <Text style={styles.textStyle}>Yes</Text>}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <FlatList
          data={products}
          // ListHeaderComponent={()=>()}
          renderItem={({item, index}) => (
            <View style={[styles.productContainer, styles.shadow]}>
              <TouchableOpacity
                onPress={() => navigationRedirect(item)}
                style={{width: '80%', flexDirection: 'row'}}>
                <View style={{width: '40%'}}>
                  {/* <FastImage
                    style={{
                      height: windowWidth / 4.5,
                      aspectRatio: 1 / 1,
                      resizeMode: 'contain',
                      margin: 5,
                    }}
                    source={{
                      uri: item.imageUrl ? item.imageUrl : item.imageurl,
                    }}
                  /> */}
                  <FastImage
                    uri={item.imageUrl ? item.imageUrl : item.imageurl}
                    style={{
                      height: windowWidth / 4.5,
                      aspectRatio: 1 / 1,
                      resizeMode: 'contain',
                      margin: 5,
                    }}
                  />
                </View>
                <View
                  style={{width: '60%', flexDirection: 'column', marginTop: 5}}>
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
                    {item.productname.length > 60
                      ? item.productname.substring(0, 60) + ' ....'
                      : item.productname}
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
                    {/* {item.price['#text']} */}
                    {/* {item.price[0]} */}
                    {item.price['@currency']} {item.price['#text']}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setreload_value(reload + 2);
                  setindex_value(index);
                  setdelete_id(item.productId), setmodalvisibility(true);
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
          )}
          //Setting the number of column

          keyExtractor={(item, index) => 'key' + index}
        />
      </View>
    );
  } else
    return (
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
        <Text style={{color: '#cb9b27', fontSize: 18}}>Empty Gift Box</Text>
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
    flexDirection: 'column',
    // padding: 10,
    width: windowWidth,
    flex: 1,
    paddingBottom: 70,
    // alignItems:'center',
    //flexWrap: 'wrap',
    //justifyContent: 'space-around',
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
