import React from 'react';
//import { withNavigation } from '@react-navigation/compat';
import {
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductListing(props) {
  const navigation = useNavigation();
  const {products, navscreen, ...attributes} = props;
  // const {navigation, products} = this.props;
  // console.log(products);
if(products){
  return (
    <ScrollView contentContainerStyle={styles.productsHolder}>
      {products.map((product, i) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('productdescription', {
                product:product,
                product_name: product.title,
                product_id: product.i,
                navscreen: navscreen,
              })
            }
            key={'product_' + i}
            style={[styles.productContainer, styles.shadow]}>
            <Image
              style={{width: '100%', height: windowWidth / 3.2,resizeMode:'contain',marginTop:3}}
              source={{uri: product.imageUrl}}
            />
            <Icon2
              name="hearto"
              style={{position: 'absolute', top: 3, right: 3}}
              size={20}
              color="#d4a040"
            />
            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                alignSelf: 'center',
                width: '100%',
                paddingVertical: 3,
                paddingHorizontal: 3,
                color: '#525252',
              }}>
              {product.productName}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
                alignSelf: 'center',
                width: '100%',
                paddingVertical: 3,
                color: '#525252',
              }}>
              {product.price['currency']} {product.price['text']}
            </Text>
          </TouchableOpacity>
        );
      })}
      {products.length % 2 == 0 ? null : (
        <View style={[styles.productContainer]}></View>
      )}
    </ScrollView>
  );
      }else return null;
}

const styles = StyleSheet.create({
  product: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderWidth: 0,
    minHeight: 114,
    alignItems: 'center',
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: 10 / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: 10 / 2,
    marginTop: 0,
  },
  horizontalImage: {
    height: 100,
    width: 'auto',
  },

  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  //Products
  productsHolder: {
    flexDirection: 'row',
    // padding: 10,
    width: windowWidth,
    // alignItems:'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productContainer: {
    width: windowWidth / 2.3,
    height: windowHeight / 3,
    backgroundColor: 'white',
    margin: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
