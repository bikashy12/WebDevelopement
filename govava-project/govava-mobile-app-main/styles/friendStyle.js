import {StyleSheet, Platform, StatusBar, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#cb9b2729',
  },
  card: {
    //flex: 0.8,
    //justifyContent: 'center',
    backgroundColor: 'white',
    width: windowWidth,
    height: windowHeight - 40,
    padding: 10,
    paddingBottom: 150,
  },
  //modal style
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: windowWidth / 1.2,
    height: 470,
    borderRadius: 20,
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
    // marginBottom: 20,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
   // backgroundColor:'yellow',
    alignSelf:'flex-start'
  },
});
export default styles;
