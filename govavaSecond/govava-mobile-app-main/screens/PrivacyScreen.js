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
import loading_logo from '../assets/images/loading_logo.png';
import Logo_Text from '../assets/images/Logo_Text.png';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import HTML from 'react-native-render-html';

export default function PrivacyScreen({route, navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [page, setpage] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      const terms = async () => {
        try {
          let termsresult;
          termsresult = productActions.getPages();
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(termsresult);
          const resultData = JSON.parse(result);
          console.log('-----------');
          console.log(resultData);
          setpage(resultData.page);
          setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
        }
      };
      terms();
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#B60612" />
      {loading && <Loader loading={loading} />}
      <View
        style={{
          backgroundColor: '#B60612',
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
            onPress={() => navigation.navigate('Home')}
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
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <ScrollView
        style={{
          width: '100%',
          paddingLeft: 20,
          paddingRight: 20,
        }}> */}
      {/* <View style={{alignItems: 'center'}}>
          <Image style={styles.image} source={loading_logo} />
          <Image style={styles.imageText} source={Logo_Text} />
        </View> */}
      {page.map((term, index) => {
        console.log('+++++++++++++++++++++');
        console.log(term);
        if (term.slug == 'privacy_policy') {
          const htmlContent = term.description;
          return (
            // <Text
            //   key={index}
            //   style={{
            //     fontStyle: 'normal',
            //     fontFamily: 'Roboto-Medium',
            //     fontSize: 16,
            //     lineHeight: 20,
            //     color: 'gray',
            //     textAlign: 'justify',
            //   }}>
            //   {term.description}
            // </Text>
            // <WebView source={{html: ' <P>ghsgfhsdgfgsdfkj</P>'}} />
            <ScrollView
              style={{flex: 1, paddingLeft: 20, paddingRight: 20}}
              key={index}>
              <HTML
                source={{html: htmlContent}}
                contentWidth={windowWidth}
                color={'gray'}
              />
            </ScrollView>
          );
        }
      })}
      {/* </ScrollView> */}

      <View style={{paddingTop: 20}}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    marginTop: 56,
    width: 100,
    height: 100,
  },
  imageText: {
    marginTop: 20,
    marginBottom: 20,
  },
});
