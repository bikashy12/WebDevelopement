import {StyleSheet, Platform, StatusBar, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7f6f6',
  },

  //Products
  productsHolder: {
    flexDirection: 'column',
    flex: 1,
    width: windowWidth,
    // alignItems:'center',
  },
  buttonView: {
    width: '100%',
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: '#e2e2e2',

    flexDirection: 'row-reverse',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  btnText: {
    color: 'black',
  },
  profileContainer: {
    width: '100%',
    height: 100,
    marginBottom: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  ProfileIcon: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  detail: {
    fontSize: 12,
    paddingBottom: 2,
  },
  detailsView: {
    marginHorizontal: 15,
    //height:50,
    justifyContent: 'space-between',
  },
  link: {
    fontSize: 15,
    color: 'blue',
    padding: 5,
    fontWeight: 'bold',
  },
  linkView: {
    height: 50,
    position: 'absolute',
    right: 20,
  },
  logoutBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#e2e2e2',
    borderWidth: 1,
    marginVertical: 20,
    height: 40,
    alignSelf: 'center',
    elevation: 2,
  },
  version: {
    padding: 5,
    fontSize: 11,
    alignSelf: 'center',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: '#000000a0',
    backgroundColor: '#000000ad',
  },

  modalView: {
    top: 250,
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
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
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    fontFamily: 'Roboto-Medium',
  },
  openButton: {
    backgroundColor: '#cb9b27',
    padding: 10,
    elevation: 2,
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#000000ad',
  },
});

export default styles;
