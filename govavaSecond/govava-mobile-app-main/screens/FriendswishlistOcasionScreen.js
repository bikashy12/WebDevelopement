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
} from 'react-native';
// import {Images} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../components/Loader';
import {useDispatch} from 'react-redux';
import * as productActions from '../store/actions/products';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import FriendOccasion from '../components/FriendOccasion';
// import products from '../constants/products';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import styles from '../styles/wishlistStyles';
import wizard from '../assets/images/wizard.png';

export default function FriendswishlistOcasionScreen({route, navigation}) {
  const dispatch = useDispatch();
  const {friend, occasion_lists, pet_wishlist} = route.params;
  const [loading, setLoading] = React.useState(false);
  const [showData, setshowData] = React.useState(false);
  const userData = useSelector((state) => state.auth);
  const [newoccasion, setnewoccasion] = React.useState(occasion_lists);
  console.log('************************' + occasion_lists);
  useFocusEffect(
    React.useCallback(() => {
      // browseCategories();
    }, []),
  );
  const removeProduct = (index) => {
    var allproducts = newProducts;
    allproducts.splice(index, 1);
    setnewProducts(allproducts);
  };
  const navigationRedirect = (item) => {
   console.log(JSON.stringify(item))
   navigation.navigate('FriendsWishlistProducts', {
    products: item,
friend:friend
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
              Friend's Occasions
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
<View style={{margin:20,width:'95%'}}>
{(pet_wishlist!=null && pet_wishlist.length>0) &&    <TouchableOpacity
                onPress={() =>navigationRedirect(pet_wishlist)}
                style={{ flexDirection: 'row',backgroundColor:'#B60612',padding:10,alignContent:'center',
                marginBottom:10,width:'100%'}}>
                <View
                  style={{ flexDirection: 'column', }}>
                  <Text
                    style={{
                      fontSize: 15,
                      // textAlign: 'center',
                      alignSelf: 'center',
                      width: '100%',
                     fontWeight:'bold',
                      color: '#ffffff',
                    }}>
                 Pet wishlist
                  </Text>
                
                </View>
              </TouchableOpacity>
             }
      
    <TouchableOpacity
                onPress={() =>setshowData(!showData)}
                style={{ }}>
                <View
                  style={{ flexDirection: 'row',backgroundColor:'#B60612',padding:10,alignContent:'center',
                  justifyContent:'space-between',}}>
                  <Text
                    style={{
                      fontSize: 15,
                      // textAlign: 'center',
                      alignSelf: 'center',
                     fontWeight:'bold',
                      color: '#ffffff',
                      
                    }}>
                  Occasions
                  </Text>
                  {showData?<Icon
              name="arrow-up"
              size={17.49}
              color="#ffffff"
              style={{paddingLeft: 16}}
            />:<Icon
              name="arrow-down"
              size={17.49}
              color="#ffffff"
              style={{paddingLeft: 16}}
            />}
                  
                </View>
              </TouchableOpacity>
             
</View>
{showData &&    <View style={{paddingTop: 20}}>
    
  
       
    <Text
           style={{
             color: '#B60612',
 
             fontFamily: 'Roboto-Italic',
             fontSize: 20,
 
             textAlign: 'center',
 
             fontStyle: 'italic',
             // right: 16,
           }}>
           Occasions saved for {friend.name}
         </Text>
         <FriendOccasion
           //products={products}
           occasion_lists={occasion_lists}
           navscreen={'FriendsWishlist'}
           friendwishlist={true}
           friend={friend}
           // onChange={(index)=>{removeProduct(index)}}
         />
       </View>
    }
    </View>
  );
}
