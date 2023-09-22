import React from 'react';
//import { withNavigation } from '@react-navigation/compat';
import {View, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import styles from '../styles/loginStyle';

export default function SearchListing(props) {
  var noimg = 'http://govava.webbs.a2hosted.com/img/noimage.b63b5bb5.jpeg';
  const {
    uri,
    style,

    ...attributes
  } = props;

  const [img_error, setimg_error] = React.useState(false);
  const [nwstyle, setnewstyle] = React.useState({});
  const [uriimg, seturiimg] = React.useState(noimg);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  useFocusEffect(React.useCallback(() => {
    seturiimg(uri);
if(style==null){
  setnewstyle({
    width: '100%',
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
    backgroundColor: '#f1efef73',
  })
}else{
  setnewstyle(style);
}
  },[props]));
const updateerrorimg=()=>{
  seturiimg(noimg);
}
  if (false) {
    // console.log('***********************************');
    // console.log(styles);
    return (
      <View>
        <FastImage
          // style={[styles]}
          style={nwstyle}
          //   style={{
          //     width: windowWidth / 1.2,
          //     height: windowWidth / 1.2,
          //     backgroundColor: 'transparent',
          //     padding: 10,
          //     margin: 10,
          //     resizeMode: 'contain',
          //   }}
          source={{
            uri: noimg,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  } else {
    // alert(uri);
    return (
      <View>
        <FastImage
          style={nwstyle}
          source={{
            uri: uriimg,
          }}
          onError={async () => {
          updateerrorimg()
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  }
}
