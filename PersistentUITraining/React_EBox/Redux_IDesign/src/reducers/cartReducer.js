const initialState = {
  cartItems: [],
  products: [
    {
      id: 1,
      productName: "Lenovo Laptop",
      price: "60000",
      quantity: 0,
      src: require("../images/img1.png"),
    },
    {
      id: 2,
      productName: "Apple Laptop",
      price: "50000",
      quantity: 7,
      src: require("../images/img2.png"),
    },
    {
      id: 3,
      productName: "Asus Laptop",
      price: "40000",
      quantity: 3,
      src: require("../images/img3.png"),
    },
    {
      id: 4,
      productName: "HP NotePad",
      price: "80000",
      quantity: 10,
      src: require("../images/img4.png"),
    },
    {
      id: 5,
      productName: "MicroPhone",
      price: "55000",
      quantity: 6,
      src: require("../images/img5.png"),
    },
    {
      id: 6,
      productName: "LG Laptop",
      price: "63000",
      quantity: 8,
      src: require("../images/img6.png"),
    },
    {
      id: 7,
      productName: "Gaming Headset",
      price: "3000",
      quantity: 8,
      src: require("../images/img7.jpeg"),
    },
  ],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const productId = action.payload.id;
      const incrementItem = action.payload;
      const existingCartItem = state.cartItems.find(
        (product) => product.id === productId
      );

      if (existingCartItem) {
        var updatedCartItems = state.cartItems.filter((product) => {
          if (product.id === productId) return product;
        });
        const updatedQuantity = updatedCartItems[0].quantity + 1;
        updatedCartItems = {
          ...updatedCartItems[0],
          quantity: updatedQuantity,
        };
        let newCartItem = state.cartItems.filter(
          (product) => product.id !== productId
        );
        newCartItem.push(updatedCartItems);
        return {
          ...state,
          cartItems: newCartItem,
          products: state.products.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  quantity: product.quantity - 1,
                }
              : product
          ),
        };
      } else {
        // If the item doesn't exist in the cart, add it with quantity = 1
        const item = action.payload;
        const newItem = { ...item, quantity: 1 };
        const newCartArray = state.cartItems.push(newItem);
        console.log(state.cartItems);
        return {
          ...state,
          cartItems: state.cartItems,
          products: state.products.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  quantity: product.quantity - 1,
                }
              : product
          ),
        };
      }
    case "REMOVE_FROM_CART":
      console.log(action.payload);
      const deletedItems = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );
      return {
        ...state,
        cartItems: deletedItems,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                quantity: product.quantity + action.payload.quantity,
              }
            : product
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
