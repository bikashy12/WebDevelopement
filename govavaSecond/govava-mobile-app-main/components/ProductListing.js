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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import * as productActions from '../store/actions/products';
import Notifications from '../components/Notifications';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import Loader from '../components/Loader';
import ContentLoader, {Rect, Circle, List} from 'react-content-loader/native';
import noimage from '../assets/images/noimage.png';
import empty from '../assets/images/empty.png';
// import FastImage from 'react-native-fast-image';
import FastImage from './FastImageComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductListing(props) {
  const isAuth = useSelector((state) => !!state.auth.token);
  // alert(isAuth);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loader, setLoading] = React.useState(true);
  const [notification, setnotification] = React.useState(false);
  const [msg, setmsg] = React.useState('');
  const [response, setresponse] = React.useState(false);

  const [prolength, setprolength] = React.useState(1);
  // const [product_id, setproduct_id] = React.useState(null);
  const [product_index, setproduct_index] = React.useState(null);
  const {
    products,
    navscreen,
    favorite,
    category,
    loading,
    ...attributes
  } = props;
  const userData = useSelector((state) => state.auth);
  const [value, setvalue] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        setresponse(true);
      }, 2000);
      setTimeout(() => {
        setresponse(true);

        if (products) {
          setprolength(products.length);
          console.log(prolength);
        }
      }, 300);

      // alert(products.length);
    }, []),
  );
  // const {navigation, products} = this.props;
  // alert(favorite);
  console.log('wishlist is ' + favorite);

  // console.log('proo' + props.products.length);
  var reload = value;
  console.log(products);
  if (loading == true || response == false) {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>

        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
        <View style={[styles.productContainer]}>
          <ContentLoader
            viewBox="0 0 200 200"
            height={200}
            width={200}
            {...props}>
            <Rect
              x="0"
              y="0"
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={windowWidth / 3.5}
            />
            <Rect
              x="0"
              y={115}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={20}
            />
            <Rect
              x="0"
              y={150}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={170}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={190}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={210}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
            <Rect
              x="0"
              y={230}
              rx="10"
              ry="10"
              width={windowWidth / 3.5}
              height={10}
            />
          </ContentLoader>
        </View>
      </ScrollView>
    );
  } else if (products.length == 0 && !loading && response) {
    return (
      <ScrollView contentContainerStyle={styles.productsHolder}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{height: 200, width: 200}}>
            <Image
              style={{
                width: 180,
                height: 180,
                resizeMode: 'contain',
                // backgroundColor: '#f1efef73',
                padding: 10,
                // marginTop: 0,
              }}
              source={empty}
            />
          </View>
          <Text style={{color: '#cb9b27', fontSize: 18}}>
            Product list is empty....!
          </Text>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View contentContainerStyle={styles.productsHolder}>
        {/* {loader && <Loader loading={loader} />} */}
        {notification && (
          <Notifications
            msg={msg}
            // response={response}
            navscreen={navscreen}
            onChange={() => setnotification(false)}
          />
        )}
        <FlatList
          // extraData={ch_styles}

          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          data={products}
          renderItem={({item, i}) => (
            <TouchableOpacity
            // onPress={()=>alert(item.productId)}
              onPress={() => {
                var favoriteIndex = 0;
                favorite != null && favorite.includes(item.productId)
                  ? (favoriteIndex = 1)
                  : (favoriteIndex = 0);
                props.onNavigate(item, favoriteIndex);
              }}
              key={'product_' + i}
              style={[styles.productContainer, styles.shadow]}>
              {category == true ? (
                // <FastImage
                //   style={{
                //     width: '100%',
                //     aspectRatio: 1 / 1,
                //     resizeMode: 'contain',
                //     backgroundColor: '#f1efef73',
                //   }}
                //   source={{
                //     uri: item.imageurl,
                //     headers: {Authorization: 'someAuthToken'},
                //     priority: FastImage.priority.normal,
                //   }}
                //   resizeMode={FastImage.resizeMode.contain}
                // />
                <FastImage
                  uri={item.imageurl}
                  styles={{
                    width: '100%',
                    aspectRatio: 1 / 1,
                    resizeMode: 'contain',
                    backgroundColor: '#f1efef73',
                  }}
                />
              ) : (
                // <FastImage
                //   style={{
                //     width: '100%',
                //     aspectRatio: 1 / 1,
                //     resizeMode: 'contain',
                //     backgroundColor: '#f1efef73',
                //   }}
                //   source={{
                //     uri: item.imageurl,
                //     headers: {Authorization: 'someAuthToken'},
                //     priority: FastImage.priority.normal,
                //   }}
                //   resizeMode={FastImage.resizeMode.contain}
                // />
                <FastImage
                  uri={item.imageurl}
                  styles={{
                    width: '100%',
                    aspectRatio: 1 / 1,
                    resizeMode: 'contain',
                    backgroundColor: '#f1efef73',
                  }}
                />
              )}

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
                {item.productname
                  ? item.productname.length > 60
                    ? item.productname.substring(0, 60) + ' ....'
                    : item.productname
                  : ''}
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
                {item.price['@currency']} {item.price['#text']}
              </Text>
            </TouchableOpacity>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
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
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  //Products
  productsHolder: {
    flexDirection: 'column',
    //alignItems:'center',
    justifyContent: 'center',
    // paddingBottom: 200,
  },
  productContainer: {
    width: windowWidth / 3.5,
    height: windowHeight / 3,
    maxHeight: 250,
    backgroundColor: 'white',
    margin: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
