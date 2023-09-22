import React, {useState, useEffect} from 'react';
import {LogBox, Platform} from 'react-native';
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
import {useFocusEffect} from '@react-navigation/native';
import cat from '../assets/images/cat.png';
import {useDispatch} from 'react-redux';
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.png';
import * as productActions from '../store/actions/products';
// import {ScrollView} from 'react-native-gesture-handler';
import ProductListing from '../components/ProductListing';
import HeaderBrowse from '../components/HeaderBrowse';
// import products from '../constants/products';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';
import * as authActions from '../store/actions/auth';
import {useSelector} from 'react-redux';
import styles from '../styles/homeStyle';
import Carousel from 'react-native-banner-carousel';
import CarouselSnap from 'react-native-snap-carousel';
import FastImage from '../components/FastImageComponent';


export default function BrowseScreen({navigation}) {
  const images = [banner1, banner2];
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => !!state.auth.token);
  const userData = useSelector((state) => state.auth);
  const c_details = userData.contact_details;
  const [categories, setcategories] = useState([]);
  const [products, setproducts] = useState([]);
  const [favouriteproducts, setfavouriteproducts] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [msg, setmsg] = React.useState('');
  const [c_modal, setCmodal] = React.useState(false);
  const [c_msg, setCmsg] = React.useState('Syncing contacts please wait...');
  const [c_load, setCload] = React.useState(false);
  const [p_load, setPload] = React.useState(false);
  const [reload, setreload] = React.useState(0);
  const [_carousel, setcarousel] = React.useState('');
  var user_id = userData.userId;
  // alert(userData.userId);
// useFocusEffect(
//     React.useCallback(() => {
//       setLoading(true);
//       setTimeout(() => {
//         setLoading(false);
//       }, 3000);
//       // console.log('newwwww' + JSON.stringify(userData));

//       const browseCategories = async () => {
//         setCload(true);
//         try {
//           let browseCategories;
//           browseCategories = productActions.getBrowseCategories();
//           // console.log('=====================');
//           // console.log(otpaction);
//           const result = await dispatch(browseCategories);
//           const resultData = JSON.parse(result);
//           // console.log('-----------');
//           // console.log(resultData);
//           setcategories(resultData.browsemenu);
//           setLoading(false);
//           setCload(false);
//           // console.log(resultData.state);
//         } catch (err) {
//           // alert('Error,Something went wrong');
//           setLoading(false);
//           setCload(false);
//         }
//       };
//       browseCategories();
//       const getProducts = async () => {
//         setPload(true);
//         try {
//           let browseProducts;
//           browseProducts = productActions.getProducts(user_id);
//           // console.log('=====================');
//           // console.log(otpaction);
//           const result = await dispatch(browseProducts);
//           const resultData = JSON.parse(result);
//           // console.log('-----------');
//           // console.log(resultData);

//           setfavouriteproducts(resultData.favourite);
//           setproducts(resultData.items);
//           setPload(false);
//           //setLoading(false);
//           // console.log(resultData.state);
//         } catch (err) {
//           // alert('Error,Something went wrong');
//           setLoading(false);
//           setPload(false);
//         }
//       };
//       getProducts();
//     }, [reload]),
//   );
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // console.log('newwwww' + JSON.stringify(userData));

    const browseCategories = async () => {
      setCload(true);
      try {
        let browseCategories;
        browseCategories = productActions.getBrowseCategories();
        // console.log('=====================');
        // console.log(otpaction);
        const result = await dispatch(browseCategories);
        const resultData = JSON.parse(result);
        // console.log('-----------');
        // console.log(resultData);
        setcategories(resultData.browsemenu);
        setLoading(false);
        setCload(false);
        // console.log(resultData.state);
      } catch (err) {
        // alert('Error,Something went wrong');
        setLoading(false);
        setCload(false);
      }
    };
    browseCategories();
    const getProducts = async () => {
      setPload(true);
      try {
        let browseProducts;
        browseProducts = productActions.getProducts(user_id);
        // console.log('=====================');
        // console.log(otpaction);
        const result = await dispatch(browseProducts);
        const resultData = JSON.parse(result);
        // console.log('-----------');
        // console.log(resultData);

        setfavouriteproducts(resultData.favourite);
        setproducts(resultData.items);
        setPload(false);
        //setLoading(false);
        // console.log(resultData.state);
      } catch (err) {
        // alert('Error,Something went wrong');
        setLoading(false);
        setPload(false);
      }
    };
    getProducts();
  }, [reload]);
  const navigationFunction = (product, favoriteIndex) => {
    navigation.navigate('BrowseDescription', {
      product: product,
      product_name: product.productname,
      product_id: product.productId,
      navscreen: 'Browse',
      favoriteIndex: favoriteIndex,
    });
  };
  function renderPage(image, index) {
    return (
      <View key={index}>
        <Image style={{width: windowWidth, height: 100}} source={image} />
      </View>
    );
  }

  const _renderItem = ({item, index}) => {
    // console.log('item ---------------' + JSON.stringify(item));
    let cat_id = item.id;
    return (
      <View
        style={{
          // flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          left: -40,
          // backgroundColor:'yellow',
          marginRight: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Categories', {
              screen: 'CategoryProduct',
              params: {
                cat_name: item.browse_name,
                cat_id: cat_id,
                navscreen: 'Browse',
              },
            })
          }
          key={index}
          style={{
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 5,
            shadowOpacity: 0.6,
            // height: 100,
            width: 130,
            borderRadius: 2,
            padding: 10,
            alignItems: 'center',
            // borderWidth: 1,
            //borderColor: 'red',

            //backgroundColor: '#80808012',

            elevation: 2,
            marginTop: 20,
          }}>
              <FastImage
          style={{
            width: 130,
            height: 70,
            //alignSelf: 'center',
           
          }}
         uri={item.image_name}
         // resizeMode={FastImage.resizeMode.contain}
        />
         
        </TouchableOpacity>

        <Text style={{marginBottom: 50}}>{item.browse_name}</Text>
      </View>
    );
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

      <HeaderBrowse
        drawer={true}
        loading={loading}
        icon={true}
        search={true}
        heading={true}
        height={true}
      />

      {/* slider */}
      <View style={{height: 120}}>
        <CarouselSnap
          ref={(c) => {
            setcarousel(c);
          }}
          data={categories}
          renderItem={_renderItem}
          sliderWidth={windowWidth * 2}
          itemWidth={150}
          left={-30}
        />
      </View>

      <View>
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
      </View>
      <View style={{marginBottom: Platform.OS == 'ios' ? 330 : 280}}>
        <ProductListing
          onChange={(value) => {
            setreload(value);
          }}
          onNavigate={(product, fav) => navigationFunction(product, fav)}
          products={products}
          favorite={favouriteproducts}
          navscreen={'Browse'}
          loading={loading}
        />
      </View>
      <SafeAreaView></SafeAreaView>
    </View>
  );
}
