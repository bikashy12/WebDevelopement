import {StyleSheet, Platform, StatusBar, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // height: 600,
  },
  sideMenuProfileIcon: {
    width: 30,
    height: 30,
    right: 10,
  },
  btntxt: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
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
    // marginLeft: 25.5,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 19,
    color: '#474D52',
    //marginTop: 2,
    //padding: 10,
    position: 'absolute',
    bottom: 2,
    alignSelf: 'center',
    zIndex: 100,
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
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
    width: '70%',
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 2,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    // marginBottom: 35,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0,
    width: '100%',
  },
});
export default styles;
