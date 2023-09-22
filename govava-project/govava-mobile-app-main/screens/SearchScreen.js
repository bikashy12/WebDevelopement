import React, {useState, useEffect} from 'react';
import {LogBox} from 'react-native';
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
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
// import {Images} from '../constants';
import Loader from '../components/Loader';
import {useFocusEffect} from '@react-navigation/native';
import cat from '../assets/images/cat.png';
import {useDispatch} from 'react-redux';
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.png';
import * as productActions from '../store/actions/products';
// import {ScrollView} from 'react-native-gesture-handler';
import SearchListing from '../components/SearchListing';
import HeaderBrowse from '../components/HeaderBrowse';
// import products from '../constants/products';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';
import * as authActions from '../store/actions/auth';
import {useSelector} from 'react-redux';
import styles from '../styles/homeStyle';
import Carousel from 'react-native-banner-carousel';
import CarouselSnap from 'react-native-snap-carousel';

const windowHeight = Dimensions.get('window').height;

export default function SearchScreen({navigation, route}) {
  const images = [banner1, banner2];
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const dispatch = useDispatch();

  const {product} = route.params;
  const {searchInput} = route.params;
  const {totalPages} = route.params;
  const isAuth = useSelector((state) => !!state.auth.token);
  const userData = useSelector((state) => state.auth);
  const c_details = userData.contact_details;
  const [categories, setcategories] = useState([]);
  const [products, setproducts] = useState(product);
  const [favouriteproducts, setfavouriteproducts] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [c_modal, setCmodal] = React.useState(false);
  const [c_msg, setCmsg] = React.useState('Syncing contacts please wait...');
  const [c_load, setCload] = React.useState(false);
  const [p_load, setPload] = React.useState(false);
  const [reload, setreload] = React.useState(0);
  const [_carousel, setcarousel] = React.useState('');
  const [pageno, setpageno] = React.useState(1);
  // const [totalPages, settotalPages] = React.useState(1);
  var user_id = userData.userId;
  // alert(userData.userId);

  const navigationFunction = (product, favoriteIndex) => {
    navigation.navigate('BrowseProductDescription', {
      product: product,
      product_name: product.productname,
      product_id: product.productId ? product.productId : product.sku,
      navscreen: 'Category',
      favoriteIndex: favoriteIndex,
    });
  };

  const keyword_search = async () => {
    setLoading(true);
    // alert('hi');
    try {
      let res;
      var page = pageno + 1;
      res = productActions.keyword_search(searchInput, page);

      const result = await dispatch(res);
      const resultData = JSON.parse(result);
      // alert(resultData);
      console.log('***************************');
      // console.log(resultData.items);
      console.log(Array.isArray(products));
      console.log(Array.isArray(resultData.items));
      // setproducts(products.push(resultData.items));
      // console.log(products);
      var pro = products.concat(resultData.items);
      console.log('++++++++++++' + resultData.items);
      setproducts(pro);
      // if (resultData.state) {
      //   // alert('hlo');
      setpageno(pageno + 1);
      console.log(resultData.item.length);
      //   var pro = products;
      //   pro.push(resultData.items);
      //   setproducts(pro);
      //   console.log('pro pushed ====' + pro);
      //   setLoading(false);
      // } else {
      //   setLoading(false);
      //   // setmsg('Something went wrong,Try again');
      // }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // alert('Error,Something went wrong');
      // setLoading(false);
      // setnotification(true);
      // setmsg('Network Error,Try again');
    }
  };
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={c_modal}
        onRequestClose={() => {
          // console.log('close modal');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{c_msg}</Text>
            {c_load ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setCmodal(!c_modal);
                }}
                style={{
                  ...styles.openButton,
                  backgroundColor: '#cb9b27',
                }}>
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      <StatusBar backgroundColor="#B60612" />
      {loading && <Loader loading={loading} />}
      <View
        style={{
          backgroundColor: '#B60612',
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
            onPress={() => navigation.navigate('Browse')}
            style={{flexDirection: 'row'}}>
            <Icon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{paddingLeft: 16}}
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
              {searchInput.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View>
        <Text
          style={{
            color: '#b41f23',
            fontStyle: 'normal',
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            lineHeight: 20,
            padding: 20,
            paddingBottom: 10,
            // right: 16,
          }}>
          TRENDING GIFT IDEAS
        </Text>
      </View> */}
      <View style={{flex: 1, paddingTop: 20, marginBottom: 20}}>
        <SearchListing
          onChange={(value) => {
            setreload(value);
          }}
          onNavigate={(product, fav) => navigationFunction(product, fav)}
          onMore={() => keyword_search()}
          products={products}
          totalPages={totalPages}
          pageno={pageno}
          favorite={favouriteproducts}
          navscreen={'Search'}
          loading={loading}
        />
      </View>
      {/* <View style={styles.bottom}>
       
      </View> */}
    </View>
  );
}
