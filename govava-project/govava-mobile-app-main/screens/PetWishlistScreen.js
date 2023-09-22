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
  FlatList,
  SafeAreaView,
} from 'react-native';
// import {Images} from '../constants';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../components/Loader';
import {useDispatch} from 'react-redux';
import * as wizardActions from '../store/actions/petwizard';
import * as productActions from '../store/actions/products';
import PetWishlists from '../components/PetWishlists';

import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import ProductWishlisting from '../components/ProductWishlisting';
// import products from '../constants/products';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import styles from '../styles/wishlistStyles';
import emptygift from '../assets/images/empty_gift.png';
import wizard from '../assets/images/wizard.png';

export default function PetWishlistScreen({route, navigation}) {
  const dispatch = useDispatch();
  const [pets, setpets] = useState([]);
  // const [products, setproducts] = useState(null);
  const [petlength, setpetlength] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const userData = useSelector((state) => state.auth);
  const [reload, setreload] = React.useState(0);
  const [products, setproducts] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getwishlistProducts = async () => {
        setLoading(true);
        // alert('hloooooooooooooo');
        try {
          var user_id = userData.userId;
          let wishlistresult;
          let wizard_type = 'Pet';
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
          console.log('-----------');
          console.log(resultData);
          setproducts(resultData.wishlist);
          // setproducts(resultData.wishlist);
          setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      getwishlistProducts();
    }, [reload]),
  );
  const getwishlistProducts = async (item) => {
    setLoading(true);
    // alert('hloooooooooooooo');
    try {
      var user_id = userData.userId;
      let wishlistresult;
      let wizard_type = 'Pet';
      let pet_id = item.id;
      wishlistresult = productActions.getwishlistProducts(
        user_id,
        wizard_type,
        pet_id,
      );
      // console.log('====================+++++++++++++++++++++++=');
      // console.log(otpaction);
      const result = await dispatch(wishlistresult);
      const resultData = JSON.parse(result);
      // console.log('-----------');
      // console.log(resultData.wishlist);
      if (resultData.wishlist) {
        setLoading(false);
        navigation.navigate('PetWishlistProducts', {
          products: resultData.wishlist,
          pet: item,
          navscreen: 'PetWishlist',
        });
      }
      // setproducts(resultData.wishlist);
      setLoading(false);
      // console.log(resultData.state);
    } catch (err) {
      // alert('Error,Something went wrong');
      setLoading(false);
    }
  };
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
              Pet's wishlists
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

      <View style={{paddingTop: 20, alignItems: 'center'}}>
        {products.length > 0 ? (
          <Text
            style={{
              color: '#B60612',

              fontFamily: 'Roboto-Italic',
              fontSize: 20,

              textAlign: 'center',

              fontStyle: 'italic',
              // right: 16,
            }}>
            Pet's wishlists
          </Text>
        ) : null}
        <View
          style={{
            width: windowWidth,
            height: windowHeight - 110,
            paddingVertical: 15,
            alignItems: 'center',
          }}>
          {products.length > 0 ? (
            // <FlatList
            //   data={pets}
            //   // ListHeaderComponent={()=>()}
            //   renderItem={({item}) => (
            //     <TouchableOpacity
            //       onPress={() => {
            //         navigation.navigate('FriendsWishlistProducts', {
            //           products: item.wishlist,
            //           friend: item,
            //           navscreen: 'FriendsWishlist',
            //         });
            //       }}
            //       style={{
            //         width: windowWidth - 15,
            //         flexDirection: 'row',
            //         alignItems: 'center',
            //         // justifyContent: 'space-between',
            //         backgroundColor: 'white',
            //         padding: 7,
            //         borderBottomColor: 'grey',
            //         borderBottomWidth: 1,
            //       }}>
            //       <View
            //         style={{
            //           height: 40,
            //           width: 40,
            //           borderRadius: 20,
            //           backgroundColor: 'black',
            //           marginRight: 20,
            //           alignItems: 'center',
            //           justifyContent: 'center',
            //         }}>
            //         <Text style={{color: 'white', fontSize: 15}}>
            //           {item.name ? item.name.slice(0, 1) : '?'}
            //         </Text>
            //       </View>
            //       <View>
            //         <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            //           {item.name}
            //         </Text>
            //         <Text style={{fontSize: 13}}>{item.mobile}</Text>
            //       </View>
            //     </TouchableOpacity>
            //   )}
            //   //Setting the number of column

            //   keyExtractor={(item, index) => 'key' + index}
            // />
            <PetWishlists
              products={products}
              navscreen={'PetWishlist'}
              Petwishlist={true}
              // onChange={(index)=>{removeProduct(index)}}
            />
          ) : !loading ? (
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
              <Text style={{color: '#cb9b27', fontSize: 18}}>
                No datas available
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
