import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AL,
  CONTACT_UPLOAD,
  CONTACT_DETAILS,
} from '../actions/auth';

const initialState = {
  token: null,
  mobile: null,
  country: null,
  country_code: null,
  userId: null,
  username: null,
  name: null,
  email: null,
  gender: null,
  didTryAutoLogin: false,
  contact_upload: false,
  contact_details: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      // console.log('Authenticate ', action);
      return {
        ...state,
        token: action.token,
        mobile: action.mobile,
        country: action.country,
        country_code: action.country_code,
        userId: action.userId,
        username: action.username,
        name: action.name,
        email: action.email,
        gender: action.gender,
        didTryAutoLogin: true,
        contact_upload: false,
        //contact_details:action.contact_details
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        mobile: null,
        country: null,
        country_code: null,
        userId: null,
        username: null,
        name: null,
        email: null,
        gender: null,
        didTryAutoLogin: true,
        contact_upload: false,
      };
    case CONTACT_UPLOAD:
      return {
        ...state,
        contact_upload: true,
      };
    case CONTACT_DETAILS:
      return {
        ...state,
        contact_details: action.contact_details,
      };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    // case GET_LOGGED_STATE:
    default:
      return state;
  }
};
