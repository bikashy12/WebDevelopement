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
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

export default function RenderItems(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [bordervalue, setBordervalue] = React.useState(false);
  useFocusEffect(() => {
    // console.log(props);
    if (props.style == 'Charecter') {
      props.item.id == props.lists
        ? setBordervalue(true)
        : setBordervalue(false);
    } else {
      props.lists.includes(props.item.id)
        ? setBordervalue(true)
        : setBordervalue(false);
    }
  });
  const changeStyle = () => {
    // console.log('set ' + props.item.id + ' ' + !bordervalue);
    setBordervalue(!bordervalue);
    props.manageItems(props.item);
    // console.log(props.item);
  };
  //console.log(props.item);
  return (
    <TouchableOpacity
      onPress={() => changeStyle()}
      style={[
        {
          //flex: 1,
          flexDirection: 'column',
          margin: 5,
          backgroundColor: 'white',
          borderColor: 'red',
          borderWidth: bordervalue ? 2 : 0,
        },
        styles.shadow,
      ]}>
      <Image style={styles.imageThumbnail} source={{uri: props.img_icon}} />
      {(props.style == 'Pesona' || props.style == 'Lifestyle') && (
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Roboto-Regular',
            width: 100,
            padding: 5,
          }}>
          {props.item.name}
        </Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
