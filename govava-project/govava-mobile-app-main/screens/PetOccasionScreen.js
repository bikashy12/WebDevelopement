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
  const {occasion_lists} = route.params;
  const {pet_name} = route.params;
  const {navscreen} = route.params;
  const [loading, setLoading] = React.useState(false);


  useFocusEffect(
    React.useCallback(() => {
     
    }, []),
  );
 
  const navigateProducts=(item)=>{
    navigation.navigate('PetWishlistProducts', {
      products: item.products,
      pet: pet_name,
      occasion:item.name,
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
      <View style={{width:'100%',height:50,alignSelf:'center',alignItems:'center',justifyContent:'center',marginVertical:10}}><Text style={styles.iconText}>Saved occasions for pet {pet_name}</Text></View>
      <FlatList
        data={occasion_lists}
        // ListHeaderComponent={()=>()}
        renderItem={({item, index}) => (
          <View style={[styles.productContainer, styles.shadow]}>
            <TouchableOpacity
              onPress={() =>navigateProducts(item)}
              style={{width: '100%', flexDirection: 'row'}}>
              <View
                style={{width: '100%', flexDirection: 'column', marginTop: 5}}>
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
     
    </View>
  );
}
