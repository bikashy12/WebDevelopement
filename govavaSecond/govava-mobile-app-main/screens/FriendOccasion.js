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
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as productActions from '../store/actions/products';
import Notifications from '../components/Notifications';
import Icon2 from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import ContentLoader, {Rect, Circle, List} from 'react-content-loader/native';
import emptygift from '../assets/images/empty_gift.png';
import FastImage from 'react-native-fast-image';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FriendOccasion(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [value, setvalue] = React.useState(0);

  const [pro, setpro] = React.useState([]);
  // const [product_id, setproduct_id] = React.useState(null);
  const [product_index, setproduct_index] = React.useState(null);
  const {products, navscreen, occasion_lists, ...attributes} = props;

  const userData = useSelector((state) => state.auth);
  // const {navigation, products} = this.props;

  // console.log(products);
  const navigationRedirect = (product) => {
    if (product.product_decrypt.length == 0) {
      return null;
    } else {
      navigation.navigate('FriendsWishlistDescription', {
        product: product,
        product_name: product.product_decrypt.title,
        product_id: product.product_decrypt.product_id,
        navscreen: 'FriendsWishlist',
      });
    }
  };
  console.log('proo' + props.occasion_lists.length);
  var reload = value;
  if (occasion_lists.length > 0) {
    return (
      <View style={styles.productsHolder}>
        {notification && (
          <Notifications
            msg={msg}
            // response={response}
            navscreen={navscreen}
            onChange={() => setnotification(false)}
          />
        )}
        <FlatList
          data={occasion_lists}
          // ListHeaderComponent={()=>()}
          renderItem={({item, index}) => (
            <View style={[styles.productContainer, styles.shadow]}>
              <TouchableOpacity
                onPress={() => navigationRedirect(item)}
                style={{width: '80%', flexDirection: 'row'}}>
                <View
                  style={{width: '60%', flexDirection: 'column', marginTop: 5}}>
                  <Text
                    style={{
                      fontSize: 12,
                      // textAlign: 'center',
                      //alignSelf: 'center',
                      width: '100%',
                      paddingVertical: 3,
                      paddingHorizontal: 3,
                      color: '#525252',
                    }}>
                    {index}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 12,
                      // textAlign: 'center',
                      //alignSelf: 'center',
                      width: '100%',
                      paddingVertical: 3,
                      paddingHorizontal: 3,
                      color: '#525252',
                    }}>
                    {/* {item.product_decrypt.price['#text']} */}
                    {/* {item.product_decrypt.price[0]} */}
                    {/* {item.product_decrypt.price['@currency']}{' '}
                    {item.product_decrypt.price['#text']} */}
                    shdfsgjfjshf
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
  } else
    return (
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
        <Text style={{color: '#cb9b27', fontSize: 18}}>Empty Wishlist</Text>
      </View>
    );
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
    flexDirection: 'column',
    // padding: 10,
    width: windowWidth,
    flex: 1,
    paddingBottom: 70,
    // alignItems:'center',
    //flexWrap: 'wrap',
    //justifyContent: 'space-around',
  },
  productContainer: {
    width: windowWidth - 20,
    height: windowWidth / 4,
    backgroundColor: 'white',
    margin: 7,
    flexDirection: 'row',
    borderRadius: 10,
    // justifyContent: 'space-between',
  },
});
