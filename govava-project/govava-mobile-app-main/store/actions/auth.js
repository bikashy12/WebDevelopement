import { Platform } from 'react-native';
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
  return { type: SET_DID_TRY_AL };
};
export const setContactsUpload = () => {
  return { type: CONTACT_UPLOAD };
};

export const authenticate = (
  id,
  mobile,
  country,
  country_code,
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
      country: country,
      country_code: country_code,
      username: username,
      name: name,
      email: email,
      gender: gender,
      token: token,
      // contact_details: last_contact,
    });
  };
};
export const contactDetails = (contact_details) => {
  console.log('contact_details');
  return (dispatch) => {
    dispatch({
      type: CONTACT_DETAILS,
      contact_details: contact_details,
    });
  };
};
export const signup = (
  username,
  name,
  mobile,
  email,
  gender,
  password,
  callingCode,
  countryCode,
  login_mode,
  unique_id,
  isregistered,
  apple_id
) => {
  console.log('action');
  console.log(username,
    name,
    mobile,
    email,
    gender,
    password,
    callingCode,
    countryCode,
    login_mode,
    unique_id,
    isregistered);
  console.log(countryCode);
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
        country_code: callingCode.toString(),
        country: countryCode,
        login_mode: login_mode,
        unique_id: unique_id,
        returnSecureToken: true,
        apple_id:apple_id
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
        message = result.message;
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
  callingCode,
  countryCode,
) => {
  console.log('action');
  let state = false;
  let message = '';
  let token = null;
  let last_contactinfo = null;
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
        country_code: callingCode,
        country: countryCode,
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
          if (result.last_contact != null) {
            last_contactinfo = JSON.parse(result.last_contact);
          }
          dispatch(
            authenticate(
              result.customer['id'],
              result.customer['mobile'],
              result.customer['country'],
              result.customer['country_code'],
              result.customer['username'],
              result.customer['name'],
              result.customer['email'],
              result.customer['gender'],
              result.customer['api_token'],
              last_contactinfo,
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

export const login = (username, password, platform, fcmtoken) => {
  // const {signIn} = React.useContext(AuthContext);

  // let loggedIn = false;
  let state = false;
  let message = '';
  let token = null;
  let userId = null;
  let last_contactinfo = null;
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
      .then(async (result) => {
        console.log("pass" + password)
        console.log('Result auth', result);
        // console.log('status', result.status);
        state = result.status;
        message = result.message;
        // console.log('Status ', state, 'Message ', message);

        if (result.status) {
          token = result.customer['api_token'];
          userId = result.customer['id'];
          const newresult = await dispatch(addDeviceToken(platform, fcmtoken, userId, token));
          const newResultData = JSON.parse(newresult);
          // token = result.token;
          // console.log('Login Tokem', token);
          // if (result.customer['last_contact'] != null) {
          //   last_contactinfo = JSON.parse(result.customer['last_contact']);
          //   AsyncStorage.setItem(
          //     'contact_details',
          //     result.customer['last_contact'],
          //   );
          // }
          if (newResultData.state) {
            dispatch(
              authenticate(
                result.customer['id'],
                result.customer['mobile'],
                result.customer['country'],
                result.customer['country_code'],
                result.customer['username'],
                result.customer['name'],
                result.customer['email'],
                result.customer['gender'],
                result.customer['api_token'],
                // last_contactinfo,
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
              result.customer['country'],
              result.customer['country_code'],
              result.customer['username'],
              result.customer['name'],
              result.customer['email'],
              result.customer['gender'],
              result.customer['api_token'],
            );

            // console.log('Token', token);
          } else {
            message = newResultData.message;
            state = false;
          }
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
      user_id: userId
    });

    return retVal;
  };
};
export const authCheck = (usertoken, userId) => {
  // let loggedIn = false;
  let state = false;
  let message = '';
  let user = null;
  let token = usertoken;
console.log('vallll');
  return async (dispatch) => {
    var url = apis.api + 'customer/checkAuthToken';
    await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }
    })
      .then((res) => res.json())
      .then((result) => {
      console.log('validation',result);
        state = result.status;
        message = result.message?result.message:'';
        if (state) {
          token = result.user.api_token;
          user = result.user;
        }
      })
      .catch(function (error) {
        alert(error);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      user: user,
      token: token,
    });

    return retVal;
  };
};
// export const addDeviceToken = (platform, FcmToken, user_id) => {
//   // const {signIn} = React.useContext(AuthContext);
//   console.log('add device token+++++++++++++++++');
//   // let loggedIn = false;

//   console.log(
//     JSON.stringify({
//       device_token: FcmToken.token,
//       platform: platform,
//       user_id: user_id,
//     }),
//   );
//   let state = false;
//   let message = '';
//   let token = null;

//   return async (dispatch) => {
//     var url = apis.api + 'user/addDeviceToken';
//     await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         device_token: FcmToken.token,
//         platform: platform,
//         user_id: user_id,
//       }),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log('add device token result is', result);
//         // console.log('status', result.status);
//         state = result.status;
//         message = result.message;
//         // console.log('Status ', state, 'Message ', message);

//         if (state) {
//         }
//       })
//       .catch(function (error) {
//         alert(error);
//         // console.log('Error', error);
//         // console.log('Error Message', error.message);
//       });

//     const retVal = JSON.stringify({
//       state: state,
//       message: message,
//       token: token,
//     });

//     return retVal;
//   };
// };
export const addDeviceToken = (platform, FcmToken, user_id, token) => {
  // const {signIn} = React.useContext(AuthContext);
  console.log("add device token+++++++++++++++++" + FcmToken)
  // let loggedIn = false;
  console.log(JSON.stringify({
    device_token: FcmToken.token,
    // device_token: FcmToken,
    user_id: user_id,
  }));
  let state = false;
  let message = '';
  //let token = null;

  return async (dispatch, getState) => {
    const currentState = getState();
    //const token = currentState["auth"].token;
    var url = apis.api + 'customer/addDeviceToken';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        device_token: Platform.OS == 'ios' ? FcmToken : FcmToken.token,
        platform: platform,
        user_id: user_id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('add device token result is', result);
        // console.log('status', result.status);
        state = result.status;
        message = result.message;

      })
      .catch(function (error) {
        // alert(error);
        message = error.message;
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
export const removeDeviceToken = (user_id) => {
  // const {signIn} = React.useContext(AuthContext);
  console.log("add device token+++++++++++++++++" + user_id)
  // let loggedIn = false;
  console.log(JSON.stringify({
    user_id: user_id,
  }));
  let state = false;
  let message = '';
  let token = null;

  return async (dispatch, getState) => {
    const currentState = getState();
    const token = currentState["auth"].token;
    var url = apis.api + 'customer/removeDeviceToken';
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Remove device token result is', result);
        // console.log('status', result.status);
        state = result.status;
        message = result.message;

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
export const saveRegister = (idToken, provider, platform, fcmtoken) => {
  // const {signIn} = React.useContext(AuthContext);

  // let loggedIn = false;
  let state = false;
  let message = '';
  let token = null;
  let isregistered = false;
  let userdetails = null;
  let providers = null;
  let last_contactinfo = null;
  return async (dispatch) => {
    // console.log('dhfgdhf');
    var url = apis.api + 'customer/getLoginData';
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: idToken,
        provider: provider,
      }),
    })
      .then((res) => res.json())
      .then(async (result) => {
        console.log('Result google login', result);
        console.log('status', result.status);
        state = result.status;

        if (state) {
          isregistered = result.isregistered;
          if (isregistered == true) {

            token = result.customer['api_token'];
            let userId = result.customer['id'];
            const newresult = await dispatch(addDeviceToken(platform, fcmtoken, userId, token));
            const newResultData = JSON.parse(newresult);
            // token = result.token;
            // console.log('Login Tokem', token);
            if (newResultData.state) {
              dispatch(
                authenticate(
                  result.customer['id'],
                  result.customer['mobile'],
                  result.customer['country'],
                  result.customer['country_code'],
                  result.customer['username'],
                  result.customer['name'],
                  result.customer['email'],
                  result.customer['gender'],
                  result.customer['api_token'],
                ),
              );
              // console.log('ID Mobile Tokem', result.id, result.mobile, token);

              saveDataToStorage(
                result.customer['id'],
                result.customer['mobile'],
                result.customer['country'],
                result.customer['country_code'],
                result.customer['username'],
                result.customer['name'],
                result.customer['email'],
                result.customer['gender'],
                result.customer['api_token'],
              );
            } else {
              message = newResultData.message;
              state = false;
            }
          } else {
            providers = result.provider;
            userdetails = result.userdetail;
          }
          // console.log('Token', token);
        } else {
          // alert( result.message);
          message = result.message;
        }
        //  state = result.status;
        // message = result.message;
        // console.log('Status ', state, 'Message ', message);
      })
      .catch(function (error) {
        alert(error);
        message = error.message;
        // console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      isregistered: isregistered,
      providers: providers,
      userdetails: userdetails,
      token: token,
    });

    return retVal;
  };
};

export const resendPassword = (mobile, email) => {
  let state = false;
  let message = '';
  var url = apis.api + 'customer/password/email';
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
export const sendOtp = (email, mobile, country_code) => {
  let state = false;
  let message = '';

  console.log(
    JSON.stringify({
      email: email,
      phone: mobile,
    }),
  );
  var url = apis.api + 'customer/register/sendOtp';
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        phone: mobile,
        country_code: country_code,
      }),
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
export const otpVerification = (otp, email, mobile) => {
  let state = false;
  let message = '';
  var url = apis.api + 'customer/register/otpPin';
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        phone: mobile,
        otp: otp,
      }),
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
        console.log('Email Result ', result);
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

export const usernameVerification = (username) => {
  let state = false;
  let message = '';
  var url = apis.api + 'customer/checkUsername';
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: username,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Emauseril Result ', result);
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
        console.log('Result Mobile', result);
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

export const checkAuth = () => {
  let state = false;
  let auth_status = '';

  var url = apis.api + 'customer/checkAuth';
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
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Reset password result is', result);
        state = result.status;
        auth_status = result.auth_status;
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
      auth_status: auth_status,
    });

    return retVal;
    // return resend;
  };
};

export const logout = () => {
  // clearLogoutTimer();
  AsyncStorage.removeItem('userDataMC');
  return { type: LOGOUT };
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
  country,
  country_code,
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
      country: country,
      country_code: country_code,
      username: username,
      name: name,
      email: email,
      gender: gender,
      userId: id,
    }),
  );
};

export const uploadContacts = (contacts, contact_details, userData) => {
  // console.log(contacts);

  console.log(contact_details);
  console.log(JSON.stringify(contact_details));
  console.log('contacts in mobile =========');
  console.log(JSON.stringify(contacts));
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
        Authorization: 'Bearer ' + userData.token,
      },
      body: JSON.stringify({
        // mobile: mobile,
        contacts: JSON.stringify(contacts),
        user_id: userData.userId,
        last_contact: JSON.stringify(contact_details),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Result New++++++++++++++++++++++++++', result);
        state = result.status;
        message = result.message;
        // console.log(contact_details);
        AsyncStorage.setItem(
          'contact_details',
          JSON.stringify(contact_details),
        );
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
export const saveContactForm = (
  first_name,
  last_name,
  mobile,
  email,
  subject,
  message,
) => {
  let state = false;
  let message_op = '';

  var url = apis.api + 'customer/saveContactForm';
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        mobile: mobile,
        subject: subject,
        message: message,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('-----------');
        console.log('Result New', result);
        state = result.status;
        message_op = result.message;
        // console.log('status', result.status);
      })
      .catch(function (error) {
        alert(error);
        console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message_op: message_op,
    });

    return retVal;
    // return resend;
  };
};

export const deleteAccount = (user_id) => {
  let state = false;
  let message = '';

  var url = apis.api + 'customer/deleteAccount';
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('-----------');
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

export const getFriends = (userData) => {
  console.log('jjj');
  console.log(userData.userId);
  let state = false;
  let message = '';
  let friends = [];
  let token;
  let error = false;
  return async (dispatch) => {
    // var url = apis.api + 'medicine/getMedicins';
    var url = apis.api + 'customer/usercontact/getdata';
    /*  console.log(JSON.stringify({
       ch_type: ch_type,
       type: type,
       gender:gender
     })); */
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      },
      body: JSON.stringify({
        user_id: userData.userId,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log('resData))))))))))))))))))))))))))');
        console.log(resData);
        // state = resData.status;

        state = resData.friends ? true : false;
        if (state) {
          friends = resData.friends;
          error = false;
          message = '';
        } else {
          friends = [];
          error = true;
          message = 'Error,Please try again';
        }
      })

      .catch(function (error) {
        // alert(error);
        friends = [];
        error = true;
        message = 'Error,Please try again';
        console.log('Error', error);
        console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      friends: friends,
      error: error,
      message: message,
      token: token,
    });

    return retVal;
    // return {state: state, message: message};
    // return loggedIn;
  };
};
export const appleLogin = (appleData, provider, platform, fcmtoken) => {
  // const {signIn} = React.useContext(AuthContext);

  // let loggedIn = false;
  let state = false;
  let message = '';
  let token = null;
  let isregistered = false;
  let userdetails = null;
  let providers = null;
  let last_contactinfo = null;
  return async (dispatch) => {
    // console.log('dhfgdhf');
    var url = apis.api + 'customer/register/apple_login';
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       appleData
      }),
    })
      .then((res) => res.json())
      .then(async (result) => {
        console.log('Result google login', result);
       
        console.log('status', result.status);
        state = result.status;

        if (state) {
          isregistered = result.isregistered;
          if (isregistered == true) {

            token = result.customer['api_token'];
            let userId = result.customer['id'];
            const newresult = await dispatch(addDeviceToken(platform, fcmtoken, userId, token));
            const newResultData = JSON.parse(newresult);
            // token = result.token;
            // console.log('Login Tokem', token);
            if (newResultData.state) {
              dispatch(
                authenticate(
                  result.customer['id'],
                  result.customer['mobile'],
                  result.customer['country'],
                  result.customer['country_code'],
                  result.customer['username'],
                  result.customer['name'],
                  result.customer['email'],
                  result.customer['gender'],
                  result.customer['api_token'],
                ),
              );
              // console.log('ID Mobile Tokem', result.id, result.mobile, token);

              saveDataToStorage(
                result.customer['id'],
                result.customer['mobile'],
                result.customer['country'],
                result.customer['country_code'],
                result.customer['username'],
                result.customer['name'],
                result.customer['email'],
                result.customer['gender'],
                result.customer['api_token'],
              );
            } else {
              message = newResultData.message;
              state = false;
            }
          } else {
            providers = result.provider;
            userdetails = result.userdetail;
          }
          // console.log('Token', token);
        } else {
          // alert( result.message);
          message = result.message;
        }
        //  state = result.status;
        // message = result.message;
        // console.log('Status ', state, 'Message ', message);
      })
      .catch(function (error) {
        alert(error);
        message = error.message;
        // console.log('Error', error);
        // console.log('Error Message', error.message);
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      isregistered: isregistered,
      providers: providers,
      userdetails: userdetails,
      token: token,
    });

    return retVal;
  };
};
export const sendMobileOtp = (mobile, country_code,userData) => {
  let state = false;
  let message = '';

  var url = apis.api + 'customer/phoneNumber/sendOtp';
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      },
      body: JSON.stringify({
        phone: mobile,
        country_code: country_code,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log('Result New', result);
        state = result.status;
        message = result.message;
        console.log('status', result.status);
      })
      .catch(function (error) {
        throw error;
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
export const mobileOtpVerification = (otp,mobile,userData) => {
  let state = false;
  let message = '';
  let customer=null;
  var url = apis.api + 'customer/otp/verifyotpPin';
  console.log(JSON.stringify({
    otp: otp,
  }))
  return async (dispatch) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      },
      body: JSON.stringify({
        otp: otp,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log('Result New', result);
        state = result.status;

        message = result.message;
        console.log('status', result.status);
        if(state){
          customer=result.customer;
        }
      })
      .catch(function (error) {
        
         console.log('Error Message', error.message);
         throw error;
      });

    const retVal = JSON.stringify({
      state: state,
      message: message,
      customer:customer
    });

    return retVal;
    // return resend;
  };
};