// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//  import api from '../../constants/     constants/a constants\api';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const CONTACT_UPLOAD = 'CONTACT_UPLOAD';
export const CONTACT_DETAILS = 'CONTACT_DETAILS';

import apis from '../../constants/api';
// let timer;

export const setDidTryAL = () => {
  return {type: SET_DID_TRY_AL};
};
export const setContactsUpload = () => {
  return {type: CONTACT_UPLOAD};
};

export const authenticate = (
  id,
  mobile,
  username,
  name,
  email,
  gender,
  token,
) => {
  // console.log('Authenticate ', id, mobile, name, email, token);
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId: id,
      mobile: mobile,
      username: username,
      name: name,
      email: email,
      gender: gender,
      token: token,
    });
  };
};
export const contactDetails = (contact_details) => {
  console.log('contact_details');
  return (dispatch) => {
    dispatch({
      type: CONTACT_DETAILS,
     contact_details:contact_details
    });
  };
};

export const signup = (username, name, mobile, email, gender, password) => {
  console.log('action');
  let state = false;
  let message = '';
  let token = null;
  var url = apis.api + 'customer/customerRegister';

  return async (dispatch) => {
    console.log('hiiiiiiiii');
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: username,
        name: name,
        email: email,
        mobile: mobile,
        gender: gender,
        password: password,
        returnSecureToken: true,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Result', result);
        // console.log('status', result.status);
        state = result.status;
        // message = !!result.status ? result.message : result.errors.mobile[0];
        message = result.message;
        if (state) {
          // token = result.user['api_token'];
          // console.log('Token', token);
          // dispatch(
          //   authenticate(
          //     result.customer['id'],
          //     result.customer['mobile'],
          //     result.customer['username'],
          //     result.customer['name'],
          //     result.customer['email'],
          //     result.customer['gender'],
          //     result.customer['api_token'],
          //   ),
          // );
          // console.log('ID Mobile Tokem', result.id, result.mobile, token);
          // console.log(
          //   'ID Mobile Tokem',
          //   result.customer['id'],
          //   result.customer['mobile'],
          //   result.customer['api_token'],
          // );
          // saveDataToStorage(
          //   result.customer['id'],
          //   result.customer['mobile'],
          //   result.customer['username'],
          //   result.customer['name'],
          //   result.customer['email'],
          //   result.customer['gender'],
          //   result.customer['api_token'],
          // );
        }
        // console.log('retVal', retVal);
      })
      .catch(function (error) {
        alert(error);
        console.log('Error', error);
        console.log('Error Message', error.message);
      });

    // dispatch(
    //   authenticate(
    //     resData.mobile,
    //     resData.api_token,

    //   )
    // signIn(mobile, token),
    // );
    const retVal = JSON.stringify({
      state: state,
      message: message,
      token: token,
    });

    // return {state: state, message: message, token: token};
    return retVal;
  };
  // return sign(?dispatch);
};

export const updateProfile = (
  username,
  name,
  mobile,
  email,
  gender,
  userId,
) => {
  console.log('action');
  let state = false;
  let message = '';
  let token = null;
  var url = apis.api + 'customer/UpdateProfile/' + userId;

  return async (dispatch, getState) => {
    console.log('hiiiiiiiii');
    console.log('username is---' + username);

    const currentState = getState();
    const token = currentState['auth'].token;
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        mobile: mobile,
        gender: gender,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Result customer', result.customer);
        console.log('status', result.status);
        state = result.status;
        // message = !!result.status ? result.message : result.errors.mobile[0];
        message = result.message;
        if (state) {
          // token = result.user['api_token'];
          // console.log('Token', token);
          dispatch(
            authenticate(
              result.customer['id'],
              result.customer['mobile'],
              result.customer['username'],
              result.customer['name'],
              result.customer['email'],
              result.customer['gender'],
              result.customer['api_token'],
            ),
          );
          // console.log('ID Mobile Tokem', result.id, result.mobile, token);
          // console.log(
          //   'ID Mobile Tokem',
          //   result.customer['id'],
          //   result.customer['mobile'],
          //   result.customer['api_token'],
          // );
          saveDataToStorage(
            result.customer['id'],
            result.customer['mobile'],
            result.customer['username'],
            result.customer['name'],
            result.customer['email'],
            result.customer['gender'],
            result.customer['api_token'],
          );
        }
        // console.log('retVal', retVal);
      })
      .catch(function (error) {
        alert(error);
        console.log('Error', error);
        console.log('Error Message', error.message);
      });

    // dispatch(
    //   authenticate(
    //     resData.mobile,
    //     resData.api_token,

    //   )
    // signIn(mobile, token),
    // );
    const retVal = JSON.stringify({
      state: state,
      message: message,
      token: token,
    });

    // return {state: state, message: message, token: token};
    return retVal;
  };
  // return sign(?dispatch);
};

export const login = (username, password) => {
  // const {signIn} = React.useContext(AuthContext);

  // let loggedIn = false;
  let state = false;
  let message = '';
  let token = null;

  return async (dispatch) => {
    var url = apis.api + 'customer/customerLogin';
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Result auth', result);
        // console.log('status', result.status);
        state = result.status;
        message = result.message;
        // console.log('Status ', state, 'Message ', message);

        if (state) {
          token = result.customer['api_token'];
          // token = result.token;
          // console.log('Login Tokem', token);
          dispatch(
            authenticate(
              result.customer['id'],
              result.customer['mobile'],
              result.customer['username'],
              result.customer['name'],
              result.customer['email'],
              result.customer['gender'],
              result.customer['api_token'],
            ),
          );
          // console.log('ID Mobile Tokem', result.id, result.mobile, token);
          console.log(
            'ID Mobile Tokem',
            result.customer['id'],
            result.customer['mobile'],
            result.customer['first_name'],
            result.customer['email'],
            result.customer['api_token'],
          );
          saveDataToStorage(
            result.customer['id'],
            result.customer['mobile'],
            result.customer['username'],
            result.customer['name'],
            result.customer['email'],
            result.customer['gender'],
            result.customer['api_token'],
          );

          // console.log('Token', token);
        }
      })
      .catch(function (error) {
        alert(error);
        // console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      token: token,
    });

    return retVal;
  };
};

export const resendPassword = (mobile, email) => {
  let state = false;
  let message = '';
  var url = apis.api + 'customer/sendForgotPasswordMail';
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // mobile: mobile,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Result New', result);
        state = result.status;
        message = result.message;
        // console.log('status', result.status);
      })
      .catch(function (error) {
        alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
    // return resend;
  };
};
export const otpVerification = (otp) => {
  let state = false;
  let message = '';
  var url = apis.api + 'customer/register/otpPin?otp=' + otp;
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log('Result New', result);
        state = result.status;
        message = result.message;
        console.log('status', result.status);
      })
      .catch(function (error) {
        alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
    // return resend;
  };
};

export const emailVerification = (email) => {
  let state = false;
  let message = '';
  var url = apis.api + 'customer/checkMail';
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Result New', result);
        state = result.status;
        message = result.message;
        console.log('status', result.status);
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
    // return resend;
  };
};

export const mobileVerification = (mobile) => {
  let state = false;
  let message = '';
  var url = apis.api + 'customer/checkMobile';
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile: mobile,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Result New', result);
        state = result.status;
        message = result.message;
        console.log('status', result.status);
      })
      .catch(function (error) {
        // alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
    // return resend;
  };
};

export const resetPassword = (
  currentPassword,
  newPassword,
  confirmPassword,
  userId,
  // token,
) => {
  let state = false;
  let message = '';
  console.log('P' + newPassword);
  console.log('C' + confirmPassword);
  console.log('C' + userId);
  var url = apis.api + 'customer/changePassword/' + userId;
  return async (dispatch, getState) => {
    const currentState = getState();
    const token = currentState['auth'].token;
    console.log('Token ', token);
   
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      
      body: JSON.stringify({
        currentpassword: currentPassword,
        newpassword: newPassword,
        confirmpassword: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Reset password result is', result);
        state = result.status;
        message = result.message;
        // console.log('status', result.status);
        // console.log('Message', result.message);
      })
      .catch(function (error) {
        alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
    // return resend;
  };
};

export const logout = () => {
  // clearLogoutTimer();
  AsyncStorage.removeItem('userDataMC');
  return {type: LOGOUT};
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (
  id,
  mobile,
  username,
  name,
  email,
  gender,
  token,
) => {
  console.log('SaveData', id, mobile, name, email, token);
  AsyncStorage.setItem(
    'userDataMC',
    JSON.stringify({
      token: token,
      mobile: mobile,
      username: username,
      name: name,
      email: email,
      gender: gender,
      userId: id,
    }),
  );
};

export const uploadContacts = (contacts,contact_details) => {
 // console.log(contacts);
 
 console.log(contact_details);
 console.log(JSON.stringify(contact_details));

  let state = false;
  let message = '';
 // console.log('upc');
  var url = apis.api + 'customer/usercontact';
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // mobile: mobile,
        contacts: JSON.stringify(contacts),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
      //  console.log('Result New', result);
        state = result.status;
        message = result.message;
       // console.log(contact_details);
        AsyncStorage.setItem('contact_details',JSON.stringify(contact_details));
        dispatch(contactDetails(contact_details));
        // console.log('status', result.status);
      })
      .catch(function (error) {
        alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
    });

    return retVal;
    // return resend;
  };
};