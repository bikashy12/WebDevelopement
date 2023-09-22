import React, { useState } from "react";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";

import "./DisplayCart.css";

const CheckoutItem = ({ product, removeFromCart }) => {
  const [quantity, setQuantity] = useState(0);
  return (
    <div className="cart-container">
      <p className="productName">{product.productName}</p>
      <div key={product.id} className="cart-item">
        <p>{product.quantity}</p>
        <p>&#36;{product.price}</p>
        <button
          onClick={() => removeFromCart(product)}
          className={`removeButton${product.id} removeButton`}
        >
          &#10060;
        </button>
      </div>
    </div>
  );
};

const DisplayCart = ({ cartItems, products, removeFromCart }) => {
  const totalPrice = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="cart">
      <h3 id="myCart">My Cart</h3>
      <div className="cart-items">
        {cartItems.map((product) => (
          <CheckoutItem
            key={product.id}
            product={product}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
      <div id="totalPrice">Total Price: &#36;{totalPrice}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  products: state.cart.products,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (productId) => dispatch(removeFromCart(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCart);
