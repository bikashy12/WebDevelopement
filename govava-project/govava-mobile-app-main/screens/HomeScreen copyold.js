import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
// import {Images} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
import cat from '../assets/images/cat.png';
import {useDispatch} from 'react-redux';
import * as productActions from '../store/actions/products';
import {ScrollView} from 'react-native-gesture-handler';
import ProductListing from '../components/ProductListing';
import Header from '../components/Header';
// import products from '../constants/products';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';
import * as authActions from '../store/actions/auth';
import {useSelector} from 'react-redux';
import styles from '../styles/homeStyle';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => !!state.auth.token);
  const userData = useSelector((state) => state.auth);
  const c_details = userData.contact_details;
  const [categories, setcategories] = useState([]);
  const [products, setproducts] = useState([]);
  const [wishlistproducts, setwishlistproducts] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [msg, setmsg] = React.useState('');
  const [c_modal, setCmodal] = React.useState(false);
  const [c_msg, setCmsg] = React.useState('Syncing contacts please wait...');
  const [c_load, setCload] = React.useState(false);
  const [p_load, setPload] = React.useState(false);
  const [reload, setreload] = React.useState(0);
  var user_id = userData.userId;
  // alert(userData.userId);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      console.log('newwwww' + JSON.stringify(userData));

      const browseCategories = async () => {
        setCload(true);
        try {
          let browseCategories;
          browseCategories = productActions.getBrowseCategories();
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(browseCategories);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          console.log(resultData);
          setcategories(resultData.browsemenu);
          setLoading(false);
          setCload(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
          setCload(false);
        }
      };
      browseCategories();
      const getProducts = async () => {
        setPload(true);
        try {
          let browseCategories;
          browseCategories = productActions.getProducts(user_id);
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(browseCategories);
          const resultData = JSON.parse(result);
          console.log('-----------');
          console.log(resultData);

          setwishlistproducts(resultData.wishlist);
          setproducts(resultData.items);
          setPload(false);
          //setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
          setPload(false);
        }
      };
      getProducts();
    }, [reload, userData]),
  );
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={c_modal}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{c_msg}</Text>
            {c_load ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setCmodal(!c_modal);
                }}
                style={{
                  ...styles.openButton,
                  backgroundColor: '#cb9b27',
                }}>
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
      <StatusBar backgroundColor="#B60612" />

      <Header loading={loading} icon={true} search={true} />
      <View>
        <Text
          style={{
            color: '#b41f23',
            fontStyle: 'normal',
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            lineHeight: 20,
            padding: 20,
            paddingBottom: 10,
            // right: 16,
          }}>
          TRENDING GIFT IDEAS
        </Text>
      </View>
      {/* slider */}
      <View style={{flexDirection: 'row', width: windowWidth, padding: 10}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {categories.map((category, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Product', {
                    cat_name: category.browse_name,
                    cat_id: category.id,
                    navscreen: 'Home',
                  })
                }
                key={index}
                style={{
                  height: 100,
                  width: 150,
                  borderRadius: 2,
                  padding: 10,
                  alignItems: 'center',
                  // borderWidth: 1,
                  // borderColor: 'gray',
                  marginRight: 10,
                  // backgroundColor: '#80808012',
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 2},
                  shadowRadius: 1,
                  shadowOpacity: 0.1,
                  elevation: 2,
                }}>
                <Image
                  source={{uri: category.image_name}}
                  style={{
                    width: '100%',
                    height: 70,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                  }}
                />
                <Text style={styles.iconText}>{category.browse_name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <ProductListing
        onChange={(value) => {
          setreload(value);
        }}
        products={products}
        wishlist={wishlistproducts}
        navscreen={'Home'}
      />
    </View>
  );
}
