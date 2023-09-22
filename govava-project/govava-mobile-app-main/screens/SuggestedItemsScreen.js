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
  BackHandler,
  SafeAreaView,
} from 'react-native';
// import {Images} from '../constants';
import {useFocusEffect, useLinkProps} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import cat from '../assets/images/cat.png';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import * as productActions from '../store/actions/products';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import SuggestedProductListing from '../components/SuggestedProductListing';
//import ProductListing from '../components/ProductListing';
import Header from '../components/Header';
import HeaderBrowse from '../components/HeaderBrowse';
// import products from '../constants/products';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';
import styles from '../styles/suggestedStyles';
import * as wizardActions from '../store/actions/wizard';
import * as petwizardActions from '../store/actions/petwizard';

export default function SuggestedItemsScreen({route, navigation}) {
  const dispatch = useDispatch();
  const [categories, setcategories] = useState([]);

  const {products} = route.params;
  const {user_contact_id} = route.params;
  const {suggesteditems} = route.params;
  const {wizard_detail} = route.params;
  const {request_body} = route.params;
  const {totalPages} = route.params;
  const {wizard_type} = route.params;
  const {pet_id} = route.params;
  const {occasion_id} = route.params;
  const {character} = route.params;
  //console.log('@@@@@@@@@@@@44444444');
  //console.log(character.icon_name);
  var contact_id = user_contact_id;
  // const [products, setproducts] = useState([]);
  const [pageno, setpageno] = React.useState(1);
  const [product, setproduct] = React.useState(products);
  const [loading, setLoading] = React.useState(false);
  const backAction = () => {
    navigation.goBack();
    return true;
  };
  // console.log('====================');
  // console.log(suggesteditems.length);
  // console.log(products);
  const nextPage = async () => {
    setLoading(true);
    // alert('hi');
    try {
      let res;
      var page = pageno + 1;
      if (wizard_type == 'Pet') {
        res = petwizardActions.nextPage(request_body, page);
      } else {
        res = wizardActions.nextPage(request_body, page);
      }

      const result = await dispatch(res);
      const resultData = JSON.parse(result);
      // alert(resultData);
      console.log('***************************');

      var pro = product.concat(resultData.items);
      // console.log('++++++++++++' + resultData.items);
      setproduct(pro);
      // if (resultData.state) {
      //   // alert('hlo');
      setpageno(pageno + 1);
      // console.log(resultData.item.length);
      //   var pro = products;
      //   pro.push(resultData.items);
      //   setproducts(pro);
      //   console.log('pro pushed ====' + pro);
      //   setLoading(false);
      // } else {
      //   setLoading(false);
      //   // setmsg('Something went wrong,Try again');
      // }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // alert('Error,Something went wrong');
      // setLoading(false);
      // setnotification(true);
      // setmsg('Network Error,Try again');
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#B60612" />

      <HeaderBrowse
        loading={loading}
        icon={false}
        search={false}
        heading={true}
        height={false}
        image={character ? character.icon_name : false}
      />
      {products && products.length > 0 && (
        <SuggestedProductListing
          occasion_id={occasion_id}
          products={product}
          suggesteditems={suggesteditems}
          wizard_type={wizard_type}
          pet_id={pet_id}
          wizard_detail={wizard_detail}
          request_body={request_body}
          totalPages={totalPages}
          pageno={pageno}
          navscreen={'SuggestedItems'}
          user_contact_id={contact_id}
          onMore={() => nextPage()}
        />
      )}
      
      {products &&
      products.length == 0 &&
      suggesteditems &&
      suggesteditems.length == 0 ? (
        <Text style={{marginVertical: 20,fontSize:15}}>No products available </Text>
      ) : null}
      {suggesteditems && suggesteditems.length > 0 && !products.length > 0 ? (
      // {suggesteditems && suggesteditems.length > 0 ? (
        <View>
          <Text
            style={{
              color: 'black',
              fontStyle: 'normal',
              fontFamily: 'Roboto-Medium',
              fontSize: 20,
              lineHeight: 20,
              padding: 20,
              paddingBottom: 10,
            }}>
            SUGGESTED GIFTS{' '}
          </Text>
        </View>
      ) : null} 
      {suggesteditems && suggesteditems.length > 0 && !products.length > 0 ? (
    //{suggesteditems && suggesteditems.length > 0 ? (
        <SuggestedProductListing
          occasion_id={occasion_id}
          character={character}
          products={suggesteditems}
          wizard_type={wizard_type}
          pet_id={pet_id}
          wizard_detail={wizard_detail}
          request_body={request_body}
          totalPages={1}
          pageno={1}
          user_contact_id={contact_id}
          navscreen={'SuggestedItems'}
          onMore={() => nextPage()}
        />
      ) : null} 
    </View>
  );
}
