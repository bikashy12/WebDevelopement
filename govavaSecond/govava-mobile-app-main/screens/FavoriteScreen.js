import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  Modal,
  TextInput,
  StatusBar,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
// import {Images} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../components/Loader';
import {useDispatch} from 'react-redux';
import * as productActions from '../store/actions/products';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import ProductFavorites from '../components/ProductFavorites';
// import products from '../constants/products';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import styles from '../styles/wishlistStyles';

export default function FavoriteScreen({route, navigation}) {
  const dispatch = useDispatch();
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const userData = useSelector((state) => state.auth);
  const [reload, setreload] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      // browseCategories();
      const getfavoriteproducts = async () => {
        setLoading(true);
        try {
          var user_id = userData.userId;
          let wishlistresult;
          wishlistresult = productActions.getfavoriteproducts(user_id);
          // console.log('====================+++++++++++++++++++++++=');
          // console.log(otpaction);
          const result = await dispatch(wishlistresult);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          // console.log(resultData.wishlist);
          setproducts(resultData.wishlist);
          setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      getfavoriteproducts();
    }, [reload]),
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#B60612" />
      {loading && <Loader loading={loading} />}
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
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
              Favorites
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex:1,marginBottom:20,paddingTop: 20}}>
      <ProductFavorites
        products={products}
        loading={loading}
        navscreen={'Favorite'}
        onChange={(value) => {
          setreload(value);
        }}
      /><SafeAreaView></SafeAreaView></View>
    </View>
  );
}
