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
  const [occasion_lists, setOccasions] = useState([]);
  const [pet_lists, setPets] = useState([]);
const pet=[0,1,2,3];

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
          console.log(resultData.pet_lists);
          setOccasions(resultData.occasion_lists);
           setPets(resultData.pet_lists);
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
  const navigateProducts=(item)=>{
    navigation.navigate('PetWishlistProducts', {
      products: item.products,
      pet: item,
      navscreen: 'PetWishlistOccasions',
    });
  }
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
      <View style={{width:'100%',height:50,alignSelf:'center',alignItems:'center',justifyContent:'center',marginVertical:10}}><Text style={styles.iconText}>Saved pets</Text></View>
      <FlatList
        // extraData={ch_styles}
        contentContainerStyle={{flex: 1, paddingBottom: 100}}
        data={pet_lists}
        renderItem={({item, i}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PetWishlistOccasions', {
                occasion_lists: item.occasion_lists,
                pet_name: item.name,
                navscreen: 'PetWishlistNames',
               
              })
            }
            key={'product_' + i}
            style={[styles.productContainer, styles.shadow]}>
         
           
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                height: 50,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  // textAlign: 'center',
                  // alignSelf: 'center',
                  // width: '100%',
                  paddingVertical: 3,
                  paddingHorizontal: 3,
                  color: '#525252',
                }}>
                {item.name}
              </Text>
          
            </View>
          </TouchableOpacity>
        )}
        //Setting the number of column
        numColumns={1}
        keyExtractor={(item, index) =>'pet'+index}
      />
    </View>
  );
}
