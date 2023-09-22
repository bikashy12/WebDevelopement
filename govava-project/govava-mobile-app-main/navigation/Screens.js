import * as React from 'react';
import {Button, View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import SearchScreen from '../screens/SearchScreen';
import GiftSearchScreen from '../screens/GiftSearchScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductDescriptionScreen from '../screens/ProductDescriptionScreen';
import SearchProDescScreen from '../screens/SearchProDescScreen';
import SuggestedProDescScreen from '../screens/SuggestedProDescScreen';
import ProductWishlistDescriptionScreen from '../screens/ProductWishlistDescriptionScreen';
import ProductGiftDescriptionScreen from '../screens/ProductGiftDescriptionScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import PetsScreen from '../screens/PetsScreen';
import ProfileWizardScreen from '../screens/ProfileWizardScreen';
import ContactEditScreen from '../screens/ContactEditScreen';
import PetListingScreen from '../screens/PetListing';
import PetEditScreen from '../screens/PetEditScreen';

import PetWizardScreen from '../screens/PetWizardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignupScreen from '../screens/SignupScreen';
import ValidationScreen from '../screens/ValidationScreen';

import ResetpasswordScreen from '../screens/ResetpasswordScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import TermsScreen from '../screens/TermsScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import ContactusScreen from '../screens/ContactusScreen';
import PersonalScreen from '../screens/PersonalScreen';
import SuggestedItemsScreen from '../screens/SuggestedItemsScreen';
import WishlistScreen from '../screens/WishlistScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import GiftScreen from '../screens/GiftScreen';
import GiftPetsScreen from '../screens/GiftPetsScreen';

import GiftProductsScreen from '../screens/GiftProductsScreen';
import WishlistOccasionProductsScreen from '../screens/WishlistOccasionProductsScreen';
import ProductWishOccasionDescScreen from '../screens/ProductWishOccasionDescScreen';
import GiftOccasion from '../screens/GiftOccasion';

import SplashScreen from '../screens/SplashScreen';

import FriendswishlistProductsScreen from '../screens/FriendswishlistProductsScreen';
import FriendsWishlistScreen from '../screens/FriendsWishlistScreen';
import FriendWishlistDescriptionScreen from '../screens/FriendWishlistDescriptionScreen';
import FriendswishlistOcasionScreen from '../screens/FriendswishlistOcasionScreen';

import PetwishlistProductsScreen from '../screens/PetwishlistProductsScreen';
import PetWishlistScreen from '../screens/PetWishlistScreen';
import PetWishlistDescriptionScreen from '../screens/PetWishlistDescriptionScreen';
import PetOccasionScreen from '../screens/PetOccasionScreen';
import PetWishlistNames from '../screens/PetWishlistNameScreen';
import ChatScreen from '../screens/chat';
import ChatListScreen from '../screens/chatList';
import ChatContactsScreen from '../screens/chatContacts';
import ChatDescriptionScreen from '../screens/chatDescription';
import * as chatActions from "../store/actions/chat";
import AsyncStorage from '@react-native-community/async-storage';

import CustomSidebarMenu from './Menu';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import icon_home from '../assets/images/icon_home.png';
import icon_cata from '../assets/images/icon_cata.png';
import icon_pets from '../assets/images/icon_pets.png';
import icon_browse from '../assets/images/icon_browse.png';
import {useSelector,useDispatch} from 'react-redux';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const LoginStack = () => {

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgot"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const chatstack = () => {
  return (
    <Stack.Navigator
    initialRouteName="Chat"
    >
      {/* <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      /> */}
        <Stack.Screen
        name="Chat"
        component={ChatListScreen}
        options={{
          headerShown: false,
          
        }}
      />
       <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="ChatDescription"
        component={ChatDescriptionScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="Chatproductdescription"
        component={ProductDescriptionScreen}
        options={{
          headerShown: false,
        }}
      />
       {/* <Stack.Screen
        name="ChatContacts"
        component={ChatContactsScreen}
        options={{
          headerShown: false,
        }}
      /> */}
     
      {/* <Stack.Screen
        name="ProfileWizard"
        component={ProfileWizardScreen}
        options={{
          headerShown: false,
        }}
      />
     */}
    </Stack.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={ProfileWizardScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="Suggestedproductdescription"
        component={ProductDescriptionScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="ProfileWizard"
        component={ProfileWizardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PetWizard"
        component={PetWizardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SuggestedItems"
        component={SuggestedItemsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Suggestedproductdescription"
        component={SuggestedProDescScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const SettingsStack = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactusScreen}
        options={{
          headerShown: false,
        }}
      />

      {isAuth && (
        <Stack.Screen
          name="Personal"
          component={PersonalScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
      {isAuth && (
        <Stack.Screen
          name="Reset"
          component={ResetpasswordScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
      {isAuth && (
        <Stack.Screen
          name="ContactEdit"
          component={ContactEditScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
        {isAuth && (
        <Stack.Screen
          name="PetListing"
          component={PetListingScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
       {isAuth && (
        <Stack.Screen
          name="EditPet"
          component={PetEditScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};
const CategoryStack = () => {
  return (
    <Stack.Navigator initialRouteName="Category">
      <Stack.Screen
        name="Category"
        component={CategoriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CategoryProduct"
        component={ProductScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Categoryproductdescription"
        component={ProductDescriptionScreen}
        options={{
          headerShown: false,
        }}
      />
    
    </Stack.Navigator>
  );
};
const WishlistStack = () => {
  return (
    <Stack.Navigator initialRouteName="Wishlist">
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="WishlistOccasionProductsScreen"
        component={WishlistOccasionProductsScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="ProductWishOccasionDescScreen"
        component={ProductWishOccasionDescScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="ProductWishlistDescription"
        component={ProductWishlistDescriptionScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="FriendsWishlist"
        component={FriendsWishlistScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="FriendsWishlistProducts"
        component={FriendswishlistProductsScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="FriendswishlistOcasion"
        component={FriendswishlistOcasionScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="FriendsWishlistDescription"
        component={FriendWishlistDescriptionScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="PetWishlist"
        component={PetWishlistScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="PetWishlistOccasions"
        component={PetOccasionScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="PetWishlistNames"
        component={PetWishlistNames}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="PetWishlistProducts"
        component={PetwishlistProductsScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="PetWishlistDescription"
        component={PetWishlistDescriptionScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
const BrowseStack = () => {
  return (
    <Stack.Navigator initialRouteName="Browse">
      <Stack.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="BrowseProductDescription"
        component={SearchProDescScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="SearchProDescScreen"
        component={SearchProDescScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="BrowseDescription"
        component={ProductDescriptionScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
const GiftCardStack = () => {
  return (
    <Stack.Navigator initialRouteName="GiftCard">
      <Stack.Screen
        name="GiftCard"
        component={GiftSearchScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />

      <Stack.Screen
        name="BrowseProductDescription"
        component={SearchProDescScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
const FavoriteStack = () => {
  return (
    <Stack.Navigator initialRouteName="Favorite">
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="FavoriteDescription"
        component={ProductWishlistDescriptionScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
const GiftStack = () => {
  return (
    <Stack.Navigator initialRouteName="Gift">
      <Stack.Screen
        name="Gift"
        component={GiftScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="GiftOccasion"
        component={GiftOccasion}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="GiftProducts"
        component={GiftProductsScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Stack.Screen
        name="ProductGiftDescription"
        component={ProductGiftDescriptionScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
       <Stack.Screen
        name="GiftPets"
        component={GiftPetsScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
function AppDrawer() {
  const isAuth = useSelector((state) => !!state.auth.token);
  const chatData = useSelector((state) => state.chat);
  const mob = useSelector((state) => state.auth.mobile);

  console.log('token is' + isAuth);
  const dispatch2 = useDispatch();
  const [count, setcount] = React.useState('0');
  let reloadChatMessages = useSelector(
    (state) => state.chat.reloadChatMessages,
  );
React.useEffect(() => {
 
  async function fetchMyAPI() {
    
    const counting = await AsyncStorage.getItem('count');
   
    try {
     
      chatUserList = chatActions.getUnOpenedChatscount();
      const result = await dispatch2(chatUserList);
      const resultData = JSON.parse(result);
      console.log(resultData);
      if (resultData.state) {     
        await AsyncStorage.setItem('count', resultData.result.unopenedChatCount.toString());
        const counting = await AsyncStorage.getItem('count');
        setcount(counting);
      } else {

      }
     
    } catch (err) {
      console.log(err);
    }

  }

  fetchMyAPI()
  
}, [reloadChatMessages]);
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#b41f23',
      }}
      screenOptions={{swipeEnabled: false}} 
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
      // drawerContent={(props) => (
      //   <CustomDrawerContent {...props} profile={profile} />
      // )}
      drawerContentOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: 'white',
        itemStyle: {marginVertical: 5},
        
      }}>
      {/* <Drawer.Screen name="Root" component={Root} /> */}
      {isAuth && (
        <Drawer.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            drawerLabel: () => null,
            title: null,
            drawerIcon: () => null,
            swipeEnabled: false,
          }}
        />
      )}
         {isAuth && (
        <Drawer.Screen
          name="ChatContacts"
          component={ChatContactsScreen}
          options={{
            drawerLabel: () => null,
            title: null,
            drawerIcon: () => null,
          }}
        />
      )}
         {isAuth && ( mob==null||mob==''?<Drawer.Screen
          name="ValidationScreen"
          component={ValidationScreen}
          options={{
            drawerIcon: (config) => (
              // <Icon name="search" size={17.49} color="#E4E9EA" />
              <Image source={icon_cata} />
            )
          }}
        />:null
         )}
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: (config) => (
            <FeatherIcon name="home" size={23} color="#E4E9EA" />
            // <Image source={icon_home} />
          ),
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoryStack}
        options={{
          drawerIcon: (config) => (
            // <Icon name="search" size={17.49} color="#E4E9EA" />
            <Image source={icon_cata} style={{width: 23, height: 23}} />
          ),
        }}
      />
      <Drawer.Screen
        name="Browse"
        component={BrowseStack}
        options={{
          drawerIcon: (config) => (
            <Icon name="search" size={23} color="#E4E9EA" />
          ),
        }}
      />

      {/* {isAuth && (
        <Drawer.Screen
          name="Personal"
          component={PersonalScreen}
          options={{
            drawerIcon: (config) => (
              // <Icon name="search" size={17.49} color="#E4E9EA" />
              <Image source={icon_cata} />
            ),
          }}
        />
      )}*/}
     
       
      {isAuth && (
        <Drawer.Screen
          name="Gift"
          component={GiftStack}
          options={{
            drawerIcon: (config) => (
              <Icon1 name="gift-outline" size={23} color="#E4E9EA" />
            ),
            drawerLabel: 'Giftee',
            swipeEnabled: false,
          }}
        />
      )}
      {isAuth && (
        <Drawer.Screen
          name="Giftcard"
          component={GiftCardStack}
          options={{
            drawerIcon: (config) => (
              <Icon1 name="card-text" size={23} color="#E4E9EA" />
            ),
            drawerLabel: 'Gift Card',
            swipeEnabled: false,
          }}
        />
      )}
     {isAuth && (
       mob==null||mob==''?
       <Drawer.Screen
       name="Chats"
       component={ValidationScreen}
       options={{
         drawerIcon: (config) => (
           <View style={{alignItems:'center',justifyContent:'center',marginRight:-7}}>
             <Icon1 name="chat" size={30} color="#E4E9EA" />
           <Text style={{position:'absolute',color:'#B60612',textAlign:'center',paddingBottom:3,
         fontSize:11,fontWeight:'bold'}}>{chatData.total_chat_count!='0' && chatData.total_chat_count}</Text>
           </View>
         ),
         drawerLabel: 'Gift Chats',
         
         swipeEnabled: false,
       }}
       //  options={{
       //   drawerLabel: () => null,
       //   title: null,
       //   drawerIcon: () => null,
       // }}
     />:
        <Drawer.Screen
          name="Chats"
          component={chatstack}
          options={{
            drawerIcon: (config) => (
              <View style={{alignItems:'center',justifyContent:'center',marginRight:-7}}>
                <Icon1 name="chat" size={30} color="#E4E9EA" />
              <Text style={{position:'absolute',color:'#B60612',textAlign:'center',paddingBottom:3,
            fontSize:11,fontWeight:'bold'}}>{chatData.total_chat_count!='0' && chatData.total_chat_count}</Text>
              </View>
            ),
            drawerLabel: 'Gift Chats',
            
            swipeEnabled: false,
          }}
          //  options={{
          //   drawerLabel: () => null,
          //   title: null,
          //   drawerIcon: () => null,
          // }}
        />
      )}
   
      {isAuth && (
        <Drawer.Screen
          name="Favorite"
          component={FavoriteStack}
          options={{
            drawerIcon: (config) => (
              <Icon1 name="heart-outline" size={23} color="#E4E9EA" />
            ),
            drawerLabel: 'Favorite',
            swipeEnabled: false,
          }}
        />
      )}
      
      {isAuth && (
        <Drawer.Screen
          name="Wishlist"
          component={WishlistStack}
          options={{
            drawerIcon: (config) => (
              <Icon name="card-giftcard" size={23} color="#E4E9EA" />
            ),
            drawerLabel: 'Friends/Family Wishlist',
            swipeEnabled: false,
          }}
        />
      )}

      {/* <Drawer.Screen
        name="Contact"
        component={ContactusScreen}
        options={{
          drawerIcon: (config) => (
            <Icon1 name="email-plus-outline" size={22} color="#E4E9EA" />
          ),
          drawerLabel: ' Contact Us',
          swipeEnabled: false,
        }}
      /> */}
      <Drawer.Screen
        name="Terms"
        component={TermsScreen}
        options={{
          drawerIcon: (config) => (
            <Icon name="app-registration" size={23} color="#E4E9EA" />
          ),
          drawerLabel: 'Terms & Condition',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyScreen}
        options={{
          drawerIcon: (config) => (
            <Icon name="privacy-tip" size={23} color="#E4E9EA" />
          ),
          drawerLabel: 'Privacy Policy',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          drawerIcon: (config) => (
            <Icon name="settings" size={23} color="#E4E9EA" />
            // <Image source={icon_pets} />
          ),
        }}
      />

      {!isAuth && (
        <Drawer.Screen
          name="Login"
          component={LoginStack}
          options={{
            drawerIcon: (config) => (
              <Icon name="login" size={23} color="#E4E9EA" />
            ),
            drawerLabel: 'Login',
            swipeEnabled: false,
          }}
        />
      )}
   
    </Drawer.Navigator>
  );
}

export default AppDrawer;
