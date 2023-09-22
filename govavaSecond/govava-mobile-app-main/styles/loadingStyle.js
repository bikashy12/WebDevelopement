import {StyleSheet, Platform, StatusBar, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      justifyContent:'center'
    },
    image: {
      marginTop: 56,
      width: 142,
      height: 142,
    },
    imageText: {
      marginTop: 37,
    },
    heading: {
      marginTop: 40,
      color: '#474D52',
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 21,
      width: 162,
      height: 21,
      fontStyle: 'normal',
      fontFamily: 'Roboto-Medium',
    },
    shoping: {
      marginTop: 25.5,
      color: '#474D52',
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 15,
      height: 21,
      fontStyle: 'normal',
      fontFamily: 'Roboto-Regular',
    },
    divider: {
      marginTop: 25.5,
      borderBottomColor: '#E4E9EA',
      borderBottomWidth: 1,
      width: '80%',
    },
    bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 0,
    },
    welcomeButton: {
      height: 60,
      backgroundColor: 'red',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeText: {
      // fontWeight: '600',
      fontSize: 16,
      color: '#ffffff',
      fontFamily: 'Roboto-Medium',
    },
    blueButton: {
      height: 60,
      backgroundColor: '#163053',
      width: 400,
      justifyContent: 'center',
      alignItems: 'center',
    },
    triangle: {
      width: 10,
      height: 10,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 15,
      borderRightWidth: 15,
      borderTopWidth: 15,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: '#ffffff',
      bottom: 22,
    },
    arrowDown: {
      width: 400,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  export default styles;