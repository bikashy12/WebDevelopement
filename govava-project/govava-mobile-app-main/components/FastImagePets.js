import React from 'react';
//import { withNavigation } from '@react-navigation/compat';
import { View, Dimensions,Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import nullimg from '../assets/images/cat404.png';

export default function PetImage(props) {
  //var noimg = 'http://govava.webbs.a2hosted.com/img/noimage.b63b5bb5.jpeg';
  const {
    item,
    styles,

    ...attributes
  } = props;

  const [img_error, setimg_error] = React.useState(false);
  const [nullerror, setnullerror] = React.useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  useFocusEffect(React.useCallback(() => {
    if(!item.petwizardDetails.type.pet_icon || item.petwizardDetails.type.pet_icon==null){
      setnullerror(true);
    }
   }));
  console.log('***********************************');
  console.log(item.petwizardDetails.type.pet_icon);
  if (img_error) {
    if (nullerror) {
      console.log('nulllll');
      return (
        <View>
          <Image
            source={nullimg}
            style={{
              width: windowWidth / 2.3,
              height: windowWidth / 3.2,
              resizeMode: 'contain',
              marginTop: 3,
            }}
          /></View>
      )
    } else {
      return (
        <View>
          <FastImage
            style={{
              width: windowWidth / 2.3,
              height: windowWidth / 3.2,
              resizeMode: 'contain',
              marginTop: 3,
            }}
            source={{
              uri: item.petwizardDetails.type.pet_icon,
            }}
            onError={() => {
              console.log('error');
              setnullerror(true);
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      );
    }
  } else {
    // alert(uri);
    return (
      <View>
        <FastImage
          style={{
            width: windowWidth / 2.3,
            height: windowWidth / 3.2,
            resizeMode: 'contain',
            marginTop: 3,
          }}
          source={{ uri: item.pet_image == null ? item.petwizardDetails.type.pet_icon : item.pet_image }}
          onError={() => {
            console.log('error');
            setimg_error(true);
          }}
          resizeMode={FastImage.resizeMode.contain}
        />

      </View>
    );
  }
}
