import React, { useState } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import * as productActions from '../store/actions/products';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import ProductWishlisting from '../components/ProductWishlisting';
import Notifications from '../components/Notifications';
// import products from '../constants/products';
import ToggleSwitch from 'toggle-switch-react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import styles from '../styles/wishlistStyles';
import { useNavigation, CommonActions } from '@react-navigation/native';
import wizard from '../assets/images/wizard.png';

export default function WishlistScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const userData = useSelector((state) => state.auth);
  const [reload, setreload] = React.useState(0);
  const [occasion_lists, setoccasion_lists] = React.useState([]);
  const [toggleStatus, settoggleStatus] = React.useState('Public');
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const navigationRedirect = (item) => {
    if (item.products == 0) {
      return null;
    } else {
      navigation.navigate('WishlistOccasionProductsScreen', {
        product: item.products,
      });
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // browseCategories();
      // alert(userData.wishlist_status);
      console.log(occasion_lists.length);
      const getwishlistProducts = async () => {
        setLoading(true);
        // alert('hloooooooooooooo');
        try {
          var user_id = userData.userId;
          let wishlistresult;
          let wizard_type = 'User';
          let pet_id = null;
          wishlistresult = productActions.getwishlistProducts(
            user_id,
            wizard_type,
            // pet_id,
          );
          // console.log('====================+++++++++++++++++++++++=');
          // console.log(otpaction);
          const result = await dispatch(wishlistresult);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          console.log(resultData.occasion_lists);
          setproducts(resultData.wishlist);
          setoccasion_lists(resultData.occasion_lists);
          setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      getwishlistProducts();
      const getwishlistStatus = async () => {
        setLoading(true);
        // alert('hloooooooooooooo');
        try {
          var user_id = userData.userId;
          let wishlistresult;
          wishlistresult = productActions.getwishlistStatus(user_id);
          // console.log('====================+++++++++++++++++++++++=');
          // console.log(otpaction);
          const result = await dispatch(wishlistresult);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          // console.log(resultData);
          if (resultData.status) {
            settoggleStatus(resultData.wishlist_status);
          }
          setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      getwishlistStatus();
    }, [reload]),
  );

  const changeWishlistStatus = async (wishlist_status) => {
    settoggleStatus(wishlist_status);
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      var user_id = userData.userId;
      let changeWishlistresult;
      changeWishlistresult = productActions.changeWishlistStatus(
        wishlist_status,
        user_id,
      );

      // console.log('=====================');
      // console.log(otpaction);
      const result = await dispatch(changeWishlistresult);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      // console.log(resultData);
      if (resultData.state == true) {
        setLoading(false);
        setmsg(resultData.message);
        setnotification(true);
      } else {
        setLoading(false);
        setmsg(resultData.message);
        setnotification(true);
      }
      // console.log(resultData.state);
    } catch (err) {
      alert(err);
      setLoading(false);
      // setnotification(true);
    }
  };
const navigateFriends=()=>{
  if(userData.mobile==null||userData.mobile==''){
    navigation.navigate('ValidationScreen')
  }else{
    navigation.navigate('FriendsWishlist')
  }
}
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
            width: '100%'
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flexDirection: 'row' }}>
            <Icon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{ paddingLeft: 16 }}
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
              Friends/Family Wishlist
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

      <View style={{ paddingBottom: 20 }}></View>
      <View
        style={{
          width: windowWidth,
          paddingHorizontal: 20,
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 20,
          borderBottomColor: 'blue',
          borderBottomWidth: 2,
        }}>
        <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
          <ToggleSwitch
            isOn={toggleStatus == 'Public' ? true : false}
            onColor="#B60612"
            offColor="gray"
            size="medium"
            onToggle={(isOn) =>
              toggleStatus == 'Public'
                ? changeWishlistStatus('Private')
                : changeWishlistStatus('Public')
            }
          />
          <Text
            style={{
              color: '#B60612',
              fontWeight: '900',
              fontSize: 13,
              fontFamily: 'Roboto-Regular',
            }}>
            Show your wishlist
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignSelf: 'center',
          }}>
          <View style={styles.ProfileIcon}>
            <Icon name="gift" size={30} color="#c5c4c4" />
          </View>
          <Text style={{ padding: 10, fontWeight: 'bold' }}>{userData.name}</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 20, width: windowWidth - 20 }}>
        <TouchableOpacity
          onPress={() =>navigateFriends()}
          style={{
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ececec',
            elevation: 2,
            borderRadius: 7,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
            View friends and family wishlist
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingBottom: 20, width: windowWidth - 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PetWishlistNames')}
          style={{
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ececec',
            elevation: 2,
            borderRadius: 7,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
            View Pet's wishlist
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 20,
          width: windowWidth - 40,
          textAlign: 'center',
          fontWeight: 'bold',
          // borderBottomWidth: 1,
          // borderColor: 'gray',
          marginTop: 10,
          marginBottom: 10,
          color: '#B60612',
        }}>
        Your wishlist occasions
      </Text>
      {!loading && occasion_lists.length == 0 ? (
        <Text style={{ color: 'black', fontSize: 15, paddingVertical: 20 }}>
          Your wishlist is empty !!
        </Text>
      ) : (
        <FlatList
          data={occasion_lists}
          // ListHeaderComponent={()=>()}
          renderItem={({ item, index }) => (
            <View style={[styles.productContainer, styles.shadow]}>
              <TouchableOpacity
                onPress={() => navigationRedirect(item)}
                style={{ width: '100%', flexDirection: 'row' }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'column',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      // textAlign: 'center',
                      //alignSelf: 'center',
                      width: '100%',
                      fontWeight: 'bold',
                      color: '#525252',
                    }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column

          keyExtractor={(item, index) => 'key' + index}
        />
      )}
      {/* <ProductWishlisting
        products={products}
        navscreen={'Wishlist'}
        onChange={(value) => {
          setreload(value);
        }}
      /> */}
    </View>
  );
}
