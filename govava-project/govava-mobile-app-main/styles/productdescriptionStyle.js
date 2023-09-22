import {StyleSheet, Platform, StatusBar, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: '#f7f6f6',
    height: windowHeight,
  },

  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  //details page
  body: {
    width: windowWidth,
    padding: 12,
    alignItems:'center'
  },
  product_image: {
    width: windowWidth / 1.2,
    height: windowWidth / 1.2,
    backgroundColor: 'transparent',
    padding: 10,
    margin: 10,
    resizeMode: 'contain',
  },
  detailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
    width:'100%'
  },

  iconbtn: {
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buybtn: {
    height: '100%',
    width: '100%',
    backgroundColor: '#e1ac4b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  buybtngiftee: {
    height: '100%',
    width: '50%',
    backgroundColor: '#e1ac4b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  savebtn: {
    height: '100%',
    width: '50%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  btntxt: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },
  descriptionView: {
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems:'center',
    marginVertical: 7,
  },
  //modal style
  //modal style
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    marginTop: 100,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '43%',
    height: 100,
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
    marginBottom: 10,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0,
    width: '100%',
    backgroundColor: 'green',
    height: 100,
    width: '100%',
  },
  buyButtonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#f7f6f6',
    width: windowWidth / 2,
    elevation: 20,
    height: Platform.OS == 'ios' ? 50 : 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;
