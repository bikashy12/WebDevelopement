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
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../components/Loader';
import {useDispatch} from 'react-redux';
import * as productActions from '../store/actions/products';
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

export default function GiftScreen({route, navigation}) {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const userData = useSelector((state) => state.auth);
  const [reload, setreload] = React.useState(0);

  const navigationRedirect = (product) => {
    if (product.length == 0) {
      return null;
    } else {
      navigation.navigate('GiftOccasion', {
        product: product,
        product_name: product.title,
        product_id: product.productId,
        occasion_lists: product.occasion_lists,
        navscreen: 'GiftScreen',
        petGift:false,
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // browseCategories();
      const getGiftProducts = async () => {
        setLoading(true);
        // alert('hloooooooooooooo');
        try {
          var user_id = userData.userId;
          let wishlistresult;
          wishlistresult = productActions.getGiftProducts(user_id);
          // console.log('====================+++++++++++++++++++++++=');
          // console.log(otpaction);
          const result = await dispatch(wishlistresult);
          const resultData = JSON.parse(result);
          if (resultData.state) {
            setContacts(resultData.contacts);
          }
          // console.log('-----------');
          // console.log(resultData.wishlist);
          // setproducts(resultData.wishlist);
          setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      getGiftProducts();
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
              Gifts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
<TouchableOpacity 
onPress={()=>navigation.navigate('GiftPets')}
style={[styles.shadow,{
  alignItems:'center',justifyContent:'center',
  width:windowWidth/1.1,alignSelf:'center',
   backgroundColor: '#ececec',height:40,marginTop:10,
   elevation:2
}]}>
  <Text style={{color:'black',fontSize:15,fontWeight:'bold'}}>Pet Gifts</Text>
  </TouchableOpacity>
      <View style={{paddingTop: 20, alignItems: 'center'}}>
        {contacts.length > 0 ? (
          <Text
            style={{
              color: '#B60612',

              fontFamily: 'Roboto-Italic',
              fontSize: 20,

              textAlign: 'center',

              fontStyle: 'italic',
              // right: 16,
              // backgroundColor: 'green',
              width: windowWidth,
            }}>
            Select a Friend
          </Text>
        ) : null}
        <View
          style={{
            width: windowWidth,
            height: windowHeight - 110,
            paddingVertical: 15,
            alignItems: 'center',
          }}>
          {contacts.length > 0 ? (
            <FlatList
              data={contacts}
              // ListHeaderComponent={()=>()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('GiftProducts', {
                    //   products: item.gifts,
                    //   friend: item,
                    //   navscreen: 'Gifts',
                    // });
                    navigationRedirect(item);
                  }}
                  style={{
                    width: windowWidth - 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    backgroundColor: 'white',
                    padding: 7,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      backgroundColor: 'black',
                      marginRight: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'white', fontSize: 15}}>
                      {item.contact_name.slice(0, 1)}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                      {item.contact_name}
                    </Text>
                    <Text style={{fontSize: 13}}>{item.mobile1}</Text>
                  </View>
                </TouchableOpacity>
              )}
              //Setting the number of column

              keyExtractor={(item, index) => 'key' + index}
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
                Empty Gift Box
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
