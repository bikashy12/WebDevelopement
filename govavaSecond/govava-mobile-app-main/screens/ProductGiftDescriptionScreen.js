import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  FlatList,
  Linking,
  SafeAreaView,
} from 'react-native';

import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import products from '../constants/products';
import styles from '../styles/productdescriptionStyle';
// import FastImage from 'react-native-fast-image';
import FastImage from '../components/FastImageComponent';

export default function ProductGiftDescriptionScreen({route, navigation}) {
  const {product_id} = route.params;
  const {product_name} = route.params;
  const {navscreen} = route.params;
  const {product} = route.params;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#B60612" />

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
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{width: 100}}>
            <Icon
              name="chevron-left"
              size={17.49}
              color="#E4E9EA"
              style={{paddingLeft: 20}}
            />
          </TouchableOpacity>
          <Image source={Logo_Text_white} style={{width: 119, height: 16}} />
          <View style={{width: 90, height: 16}}></View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <FastImage
            style={[styles.product_image]}
            source={{uri: product.imageurl}}
            resizeMode={FastImage.resizeMode.contain}
          /> */}
          <FastImage uri={product.imageurl} styles={styles.product_image} />
        </View>
        <View style={styles.detailsView}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              width: '50%',
            }}>
            {product.productName}
          </Text>
        </View>
        <View style={styles.detailsView}>
          <Text style={{color: 'black', fontSize: 13, fontWeight: 'bold'}}>
            Price :{' '}
            <Text style={{fontWeight: 'normal'}}>
              {product.price['@currency']} {product.price['#text']}
            </Text>
          </Text>
        </View>
        <View style={styles.descriptionView}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              paddingBottom: 7,
              borderBottomWidth: 2,
              borderBottomColor: '#c1bcbc',
            }}>
            Product Description
          </Text>
          <Text>
            {product.description['long'] == null
              ? product.description['short']
              : product.description['long']}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buyButtonContainer}>
        {/* <TouchableOpacity style={[styles.iconbtn, styles.shadow]}>
          <Icon name="heart" size={17.49} color="#a6a2a2" />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.buybtn, styles.shadow, , {width: windowWidth}]}
          onPress={() => Linking.openURL(product.linkurl)}>
          <Text style={styles.btntxt}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView></SafeAreaView>
    </View>
  );
}
