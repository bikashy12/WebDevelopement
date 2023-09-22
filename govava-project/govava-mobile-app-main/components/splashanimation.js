import React from 'react';
import LottieView from 'lottie-react-native';

export default class SplashAnimation extends React.Component {
  render() {
    // return <LottieView source={require('../assets/json/splash.json')} autoPlay loop={false} />;
    return (
      <LottieView
        source={require('../assets/json/animation.json')}
        autoPlay
        loop={false}
      />
    );
  }
}
