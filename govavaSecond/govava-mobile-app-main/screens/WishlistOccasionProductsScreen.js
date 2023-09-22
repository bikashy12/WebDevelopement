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
  PermissionsAndroid,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
// import {Images} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../components/Loader';
import {useDispatch} from 'react-redux';
import * as productActions from '../store/actions/products';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import ProductListingOccasionWishlist from '../components/ProductListingOccasionWishlist';
import Notifications from '../components/Notifications';
// import products from '../constants/products';
import ToggleSwitch from 'toggle-switch-react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import styles from '../styles/wishlistStyles';
import wizard from '../assets/images/wizard.png';

export default function WishlistOccasionProductsScreen({route, navigation}) {
  const dispatch = useDispatch();
  const {product} = route.params;
  const [products, setproducts] = useState(product);
  const [loading, setLoading] = React.useState(false);
  const userData = useSelector((state) => state.auth);
  const [reload, setreload] = React.useState(0);
  const [occasion_lists, setoccasion_lists] = React.useState(null);
  const [toggleStatus, settoggleStatus] = React.useState('Public');
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  console.log('0000000000000' + products.length);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#B60612" />
      {notification && (
        <Notifications
          msg={msg}
          // response={response}
          navscreen={'Wishlist'}
          onChange={() => setnotification(false)}
        />
      )}
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
            justifyContent: 'space-between',
            width:'100%'
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
              Wishlist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 15,alignItems:'center',marginTop:Platform.OS=='ios'?-8:-5 }}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
           })
            }>
            <Image
              style={{ width: Platform.OS == 'ios' ? 68 : 65, height: 23, marginLeft: 16 }}
              source={wizard}
            />
            <Text style={{ color: '#ffffff', fontSize: Platform.OS == 'ios' ? 15 : 12, left: 5 }}>Wizard</Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={{paddingBottom: 20}}></View>

      <ProductListingOccasionWishlist
        products={products}
        navscreen={'Wishlist'}
        // onChange={(value) => {
        //   setreload(value);
        // }}
      />
    </View>
  );
}
