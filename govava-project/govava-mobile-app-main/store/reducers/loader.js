import {
    SETLOADING,
    SETWIZARDLOADING,
    OFFALL
  } from '../actions/loader';
  
  const initialState = {
   profile_loading:false,
   wizard_loading:false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SETLOADING:
        // console.log('Authenticate ', action);
        return {
          ...state,
          profile_loading: action.loading,
         
        };
      case SETWIZARDLOADING:
        return {
          ...state,
          wizard_loading: action.loading,
        };
      case OFFALL:
        return {
            profile_loading:false,
            wizard_loading:false,
        };
      default:
        return state;
    }
  };
  