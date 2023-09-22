import React from 'react';
// import React from 'react';

import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AppDrawer,{LoginStack} from './Screens';

import LoadingScreen from '../screens/LoadingScreen';
import Global_loader from '../components/Global_loader';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  console.log('Auth is ', isAuth);
  return (
    <NavigationContainer>
      <Global_loader/>
      {isAuth && <AppDrawer />}
      {!isAuth && didTryAutoLogin && <AppDrawer />}
      {!isAuth && !didTryAutoLogin && <LoadingScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
