import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import Home from "./components/Home";
import DisplayCart from "./components/DisplayCart";
import "./App.css";

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer);

// const App = () => {
//   return (
//     <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
//       <Provider store={store}>
//         <h1 id="shoppingCart">Shopping Cart</h1>
//         <div className="home">
//           <Home />
//           <DisplayCart />
//         </div>
//       </Provider>
//     </BrowserRouter>
//   );
// };

// export default App;
const App = () => {
  return (
    <Provider store={store}>
      <h1 id="shoppingCart">Shopping Cart</h1>
      <div className="home">
        <Home />
        <DisplayCart />
      </div>
    </Provider>
  );
};

export default App;
