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
  FlatList
} from 'react-native';
// import {Images} from '../constants';
import { useFocusEffect } from '@react-navigation/native';
import hamburger from '../assets/images/hamburger.png';
import Logo_Text_white from '../assets/images/Logo_Text_white.png';

import {
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import products from '../constants/products';
import ProductListing from '../components/ProductListing';

export default function HomeScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [genderType, setGenderType] = useState('Female');
  const [searchInput, setSearchInput] = useState(null);
  

  useFocusEffect(
    React.useCallback(() => {
      console.log(products);
    }, [])
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#B60612" />
     

      <View
        style={{backgroundColor: '#b41f23', height: 50, width: windowWidth}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 18,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={hamburger}
              style={{width: 24, height: 15, marginLeft: 16}}
            />
          </TouchableOpacity>

          <Image source={Logo_Text_white} style={{width: 119, height: 16}} />
          <Text
            style={{
              color: '#FFFFFF',
              fontStyle: 'normal',
              fontFamily: 'Roboto-Medium',
              fontSize: 16,
              lineHeight: 20,
              right: 16,
            }}>
            Skip
          </Text>
        </View>
      

      </View>
    <ScrollView  contentContainerStyle={styles.body}>
    <FlatList
    horizontal={true}
        data={products}
        renderItem={({ item}) => (
          <Image style={[styles.product_image]} source={{ uri: item.image }} />
        )}
        keyExtractor={(item, index) => `feed_${index}`}
      />
     
<View style={styles.detailsView}>
  <Text style={{color:'black',fontSize:15,fontWeight:'bold'}}>{products[0].title}</Text>
  <TouchableOpacity style={styles.buybtn}>
      <Text style={styles.btntxt}>Need Help?</Text>
      </TouchableOpacity>
</View>
<View style={styles.detailsView}>

  <Text style={{color:'black',fontSize:13,fontWeight:'bold'}}>Price : <Text style={{fontWeight:'normal'}}>{products[0].price}</Text></Text>
</View>
<View style={styles.descriptionView}>

  <Text style={{color:'black',fontSize:15,fontWeight:'bold',paddingBottom:7,borderBottomWidth:2,borderBottomColor:'#c1bcbc'}}>Product Description</Text>
  <Text>Did you know that Barack Obama promised his daughters a new puppy if he was elected President? And that George and Barbara Bush\\'s Springer Spaniel, Millie, \"wrote\" a best-selling book that outsold her masters\\' memoirs? From George Washington\\'s hounds and horses to President Obama\\'s pooch Bo, First Pet offers an eclectic view of the daily lives of our Presidents and the pets that were present throughout. Through the lenses of Associated Press photographers and the vast AP photo collection, key moments in Presidential pet history come to life. Highlights include pictures of Checkers, the dog that was the focal point of Nixon\\'s 1952 \"Checkers\" speech; the Clintons\\' beloved and highly photographed cat, Socks; and pictures of President Obama\\'s happy Portuguese Water Dog, Bo, dragging the POTUS across the White House lawn. First Pet is a first family tribute to pet ownership and its special rewards. It showcases with its unique photographs this endearing aspect of the American presidency that is dear to animal lovers and history buffs of all ages. With an introduction by Claire McLean, Founder and Director of the Presidential Pet Museum, First Pet brings to life the loveable, Presidential sidekicks that continue to play a part in our nation\\'s history.</Text>
</View>
    </ScrollView>
    <View style={styles.buyButtonContainer}>
    <TouchableOpacity style={[styles.iconbtn,styles.shadow]}>
    <Icon name="heart" size={17.49} color="#a6a2a2" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buybtn,styles.shadow]}>
      <Text style={styles.btntxt}>Buy Now</Text>
      </TouchableOpacity>
     
    </View>
     
   
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width:windowWidth,
    alignItems: 'center',
    backgroundColor: '#f7f6f6',
    height:windowHeight-StatusBar.currentHeight
  },
  searchBox: {
    height: 48,
    // width: '100%',
    backgroundColor: '#ffffff',
    left: 8,
    marginRight: 16,
    marginTop: 8,
    // borderWidth: 1,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firstDivider: {
    marginTop: 30.5,
    borderBottomColor: '#E4E9EA',
    // borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: windowWidth - 60,
    justifyContent: 'center',
    paddingLeft: 30,
    // marginRight: 60,
  },
  iconText: {
    marginLeft: 25.5,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 19,
    color: '#474D52',
    marginTop: 2,
  },
  iconTextGift: {
    marginLeft: 25.5,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 19,
    color: '#4F81BD',
    marginTop: 2,
  },
  //modal style
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginTop: 180,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 25,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '70%',
    height: 400,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 35,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
  },
  
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  //details page
  body:{
    width:windowWidth,
    padding:12,
  
  },
  product_image:
  {
    width:windowWidth/1.2,
    height:windowWidth/1.2,
  backgroundColor:'white',
  padding:10,
    margin:10
},
detailsView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:7
  },
  buyButtonContainer:{
    flexDirection:'row',
    backgroundColor:'#f7f6f6',
    width:windowWidth/2,
 elevation:20,
  height:60,
  width:'100%',
 alignItems:'center',
 justifyContent:'space-around'
  },
  iconbtn:{
    height:40,
    width:40,
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5
  },
  buybtn:{
    height:40,
    width:windowWidth/2.5,
    backgroundColor:'#e1ac4b',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10
  },
  btntxt:{
    textAlign:'center',
    color:'white'
  },
  descriptionView:{
    flexDirection:'column',
    justifyContent:'center',
    //alignItems:'center',
    marginVertical:7
  },
});
