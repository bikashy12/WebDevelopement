import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.png';
import * as wizardActions from '../store/actions/wizard';
import {useDispatch} from 'react-redux';
import ContentLoader, {Rect, Circle, List} from 'react-content-loader/native';

//import { ScrollView } from 'react-native-gesture-handler';

const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = (props) => {
  const dispatch = useDispatch();

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      const getBannerImages = async () => {
        try {
          let bannerresult;
          bannerresult = wizardActions.getBannerImages();
          //  console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(bannerresult);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          console.log(resultData);
          if (resultData.state) {
            setBanners(resultData.items);
          }
          setLoading(false);
          // console.log(resultData.state);
        } catch (err) {
          // alert('Error,Something went wrong');
          setLoading(false);
          console.log(err);
        }
      };
      getBannerImages();
    }, []),
  );

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <Image
          style={{
            width: screenWidth,
            // height: screenWidth / 2.6,
            height: '100%',
            resizeMode: 'stretch',
            // resizeMode: 'contain',
          }}
          source={{uri: item.mobile_slider}}
        />
      </View>
    );
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <ContentLoader
          backgroundColor="#d6d6d6"
          gradientRatio={0.5}
          height={120}
          width={screenWidth}
          {...props}>
          <Rect x="0" y="0" width={screenWidth} height={120} />
        </ContentLoader>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Carousel
            autoplay={true}
            loop={true}
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth / 2.6}
            itemWidth={screenWidth}
            data={banners}
            renderItem={renderItem}
            // hasParallaxImages={true}
          />
          <View
            style={{
              marginTop: 0,
              borderWidth: 3,
              borderColor: '#cb9b27',
            }}></View>
        </View>
      </ScrollView>
    );
  }
};
export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenWidth / 2.6,
  },
  item: {
    // paddingTop:5,
    width: screenWidth,
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
