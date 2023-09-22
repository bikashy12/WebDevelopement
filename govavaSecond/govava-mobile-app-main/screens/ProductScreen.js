import React, {useState, useEffect} from 'react';
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
  Alert,
  SafeAreaView,
} from 'react-native';
// import {Images} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../components/Loader';
import {useDispatch} from 'react-redux';
import * as productActions from '../store/actions/products';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import ProductListing from '../components/ProductListing';
// import products from '../constants/products';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';
import styles from '../styles/productStyle';
import empty_img from '../assets/images/empty.png';
import {useNavigation, CommonActions} from '@react-navigation/native';

export default function ProductScreen({route, navigation}) {
  const dispatch = useDispatch();
  const {cat_id} = route.params;
  const {cat_name} = route.params;
  const {navscreen} = route.params;
  const [products, setproducts] = useState([]);
  const [msg, setmsg] = useState(null);
  const [catId, setcatId] = useState(cat_id);
  const [loading, setLoading] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [favouriteproducts, setfavouriteproducts] = useState([]);
  useEffect(() => {
    // alert(cat_id);
    const getProductsCategorywise = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 10000);
        let browseCategories;
        browseCategories = productActions.getProductsCategorywise(cat_id);
        // console.log('=====================');
        // console.log(otpaction);
        const result = await dispatch(browseCategories);
        const resultData = JSON.parse(result);
        // console.log('-----------');
        //  setLoading(false);
        if (resultData.state) {
          console.log(resultData);
          setTotal(resultData.total);
          setproducts(resultData.items);
          console.log('{{{{{{{{{{{{{');
          console.log(resultData.items);
          setfavouriteproducts(resultData.favourite);
          if (resultData.total == 0) {
            setmsg('No products available in this category..!!!');
            setEmpty(true);
          } else {
            setmsg(null);
          }
        } else {
          setTotal(0);
          // Alert.alert('Error..Something went wrong');
        }
        setTimeout(() => {
          setLoading(false);
        }, 100);
        // console.log(resultData.state);
      } catch (err) {
        // alert('Error,Something went wrong');
        // alert(err);
        setLoading(false);
      }
    };
    getProductsCategorywise();
  }, [cat_id]);

  const navigationFunction = (product, favoriteIndex) => {
    navigation.navigate('Categoryproductdescription', {
      product: product,
      product_name: product.productname,
      product_id: product.productId,
      navscreen: 'Category',
      favoriteIndex: favoriteIndex,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#B60612" />

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
            onPress={() => navigation.navigate('Category')}
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
              {cat_name.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1, paddingTop: 20}}>
        <ProductListing
          products={products}
          navscreen={navscreen}
          category={true}
          favorite={favouriteproducts}
          loading={loading}
          onNavigate={(product, fav) => navigationFunction(product, fav)}
        />
      </View>
      <SafeAreaView></SafeAreaView>
    </View>
  );
}
