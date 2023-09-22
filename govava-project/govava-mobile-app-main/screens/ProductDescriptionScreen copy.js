import React, {useState} from 'react';
import {View, StyleSheet, Text, StatusBar, Image, FlatList} from 'react-native';

import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Logo_Text_white from '../assets/images/Logo_Text_white.png';
import products from '../constants/products';

export default function ProductDescriptionScreen({route, navigation}) {
  const {product_id} = route.params;
  const {product_name} = route.params;
  const {navscreen} = route.params;
  const {product} = route.params;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#94181c" />

      <View
        style={{backgroundColor: '#b41f23', height: 55, width: windowWidth}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(navscreen)}
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
        
            <Image style={[styles.product_image]} source={{uri: product.imageUrl}} />
        

        <View style={styles.detailsView}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold',width:'50%'}}>
            {product.productName}
          </Text>
          <TouchableOpacity style={styles.buybtn}>
            <Text style={styles.btntxt}>Need help?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsView}>
          <Text style={{color: 'black', fontSize: 13, fontWeight: 'bold'}}>
            Price :{' '}
            <Text style={{fontWeight: 'normal'}}>{product.price['currency']}{' '}{product.price['text']}</Text>
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
            {product.description['long']==null?product.description['short']:product.description['long']}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buyButtonContainer}>
        <TouchableOpacity style={[styles.iconbtn, styles.shadow]}>
          <Icon name="heart" size={17.49} color="#a6a2a2" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buybtn, styles.shadow]}>
          <Text style={styles.btntxt}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: '#f7f6f6',
    height: windowHeight,
  },

  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  //details page
  body: {
    width: windowWidth,
    padding: 12,
  },
  product_image: {
    width: windowWidth / 1.2,
    height: windowWidth / 1.2,
    backgroundColor: 'transparent',
    padding: 10,
    margin: 10,
    resizeMode:'contain'
  },
  detailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
  },
  buyButtonContainer: {
    flexDirection: 'row',
    backgroundColor: '#f7f6f6',
    width: windowWidth / 2,
    elevation: 20,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconbtn: {
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buybtn: {
    height: 40,
    width: windowWidth / 2.5,
    backgroundColor: '#e1ac4b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btntxt: {
    textAlign: 'center',
    color: 'white',
  },
  descriptionView: {
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems:'center',
    marginVertical: 7,
  },
});
