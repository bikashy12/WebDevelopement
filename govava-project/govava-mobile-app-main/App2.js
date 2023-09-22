import React from 'react';
import {Platform, StatusBar, Image, Text, View} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, useDispatch} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import chatReducer from './store/reducers/chat';
import loadingReducer from './store/reducers/loader';
import petReducer from './store/reducers/pets';

import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  auth: authReducer,
  chat:chatReducer,
  loader:loadingReducer,
  pet:petReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App({navigation}) {
  return (
    <View style={{flex: 1}}>
      {Platform.OS === 'ios' && <StatusBar barStyle='light-content'/>}
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </View>
  );
}
