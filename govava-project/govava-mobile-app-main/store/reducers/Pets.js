
  const initialState = {
   petGifts:[],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'LOAD_GIFTS':
        // console.log('Authenticate ', action);
        return {
          ...state,
          petGifts: action.pet_gifts,
         
        };
      case 'DELETE_GIFT':
        return {
          ...state,
          
        };
   
      default:
        return state;
    }
  };
  