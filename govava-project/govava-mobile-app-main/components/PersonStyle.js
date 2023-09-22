import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  Modal,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from './Header';
import {Dimensions} from 'react-native';
import RenderItems from './FlatlistItem';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import * as wizardActions from '../store/actions/wizard';
import {
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import Loader from './Loader';
import {useFocusEffect} from '@react-navigation/native';
import * as loadingActions from '../store/actions/loader';

export default function PersonStyle(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [GridListItems, setgridlistItems] = React.useState([]);
  const [caricatures, setCaricatures] = React.useState(null);
  // const [p_styles, setPstyles] = React.useState([]);
  const [p_ids, setPids] = React.useState(
    props.params['styles_id'] ? props.params['styles_id'] : [],
  );

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      const getPersonas = async () => {
        await dispatch(loadingActions.setprofileloader(true));

        // console.log('style');
        const ch_style = 'active_lifestyle';
        const type = 'Occasion';
        try {
          let personaresult;
          personaresult = wizardActions.getPersonas(
            ch_style,
            props.params['type'],
            props.params['gender'],
          );
          // console.log('=====================');
          // console.log(otpaction);
          const result = await dispatch(personaresult);
          const resultData = JSON.parse(result);
          // console.log('-----------');
          //console.log(resultData);
          setCaricatures(resultData.caricatures);
          // setoccasions(resultData.occasions);
          setLoading(false);
          await dispatch(loadingActions.setprofileloader(false));

          //console.log(resultData.caricatures);
        } catch (err) {
          console.log(err);
          // alert('Error,Something went wrong');
          setLoading(false);
          dispatch(loadingActions.setprofileloader(false));

        }
      };
      getPersonas();
    }, []),
  );
  // const manageStyle =(style)=>{
  //   if(p_ids==style.id){
  //     setPstyles(null);
  //     props.onChange(null);
  //     setPids(null);
  //   }else{
  //   setPstyles(style);
  // props.onChange(style);
  // setPids(style.id);
  //  }
  // }
  const manageStyle = (style) => {
    var nwids = p_ids;
    if (p_ids.includes(style.id)) {
      //console.log('includes '+style.id);
      for (var i = 0; i < nwids.length; i++) {
        if (nwids[i] === style.id) {
          nwids.splice(i, 1);
        }
      }
    } else {
      console.log('not include');
      if (nwids.length < 3) {
        nwids.push(style.id);
      }
    }
    setPids(nwids);
    props.onChange(nwids);
  };
  return (
    <View style={{alignItems: 'center'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => alert('Hiii')}>
              <Text>hsdgshfghsfgh</Text>
            </TouchableOpacity>
            {/* <ScrollView>
              <TouchableOpacity
                onPress={() => alert('hlo')}
                style={{
                  width: '100%',
                  backgroundColor: 'red',
                  padding: 10,
                }}>
                <View>
                  <Text style={styles.modalText}>Select Occassions</Text>
                </View>
              </TouchableOpacity>
              {occasions.map((occasion, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => alert('hlo')}
                    key={index}
                    style={{
                      width: '100%',
                      //   backgroundColor: 'green',
                      marginBottom: 20,
                    }}>
                    <View>
                      <Text style={styles.modalText}>
                        {occasion.occasion_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
           */}
          </View>
        </View>
      </Modal>

      <Text
        style={{
          textAlign: 'left',
          fontFamily: 'Roboto-Regular',
          fontSize: 18,
          marginTop: 20,
          // marginBottom: 20,
        }}>
        What's the active lifestyle?
      </Text>
      <Text
        style={{
          textAlign: 'left',
          fontFamily: 'Roboto-Regular',
          fontSize: 14,
          color: 'blue',
          marginTop: 10,
          marginBottom: 20,
        }}>
        Please choose 1 to 3 active lifestye
      </Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={caricatures}
          renderItem={({item}) => (
            <RenderItems
              style={'Lifestyle'}
              item={item}
              lists={p_ids}
              img_icon={item.icon_style}
              manageItems={(nwitem) => manageStyle(nwitem)}
            />
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    width: windowWidth - 10,
    height: Platform.OS == 'ios' ? windowHeight - 300 : windowHeight - 250,
    alignItems: 'center',
    padding: 5,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
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
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: windowWidth / 1.2,
    height: 420,
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
  },
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
});
