//action creators
export const addCart = (items = []) => {
  return {
    type: ADD_CART,
    items,
  };
};
export const removeCart = (items = []) => {
  return {
    type: REMOVE_CART,
    items,
  };
};

//action types
export const ADD_CART = "ADD_CART";
export const REMOVE_CART = "REMOVE_CART";
