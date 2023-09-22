import { ADD_CART, REMOVE_CART } from "../actions";

const selectedItems = {
  items: [],
};

export const handleItem = (state = selectedItems, action) => {
  if (action.type === ADD_CART) {
    return { ...state, items: action.items };
  } else if (action.type === REMOVE_CART) {
    return { ...state, items: action.items };
  }
  return state;
};
