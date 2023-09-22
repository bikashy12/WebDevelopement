import React, { useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartActions";

import "./Home.css";

const Home = ({ products, addToCart }) => {
  return (
    <div className="productList">
      {products.map((product) => (
        <div
          id={`item${product.id}`}
          className={product.quantity > 0 ? "item" : "item fadeOutItem"}
        >
          <img
            src={`${product.src}`}
            id={`img${product.id}`}
            alt={`${product.productName}`}
          />
          <p>{`${product.productName}`}</p>
          <label id={`stockDetail${product.id}`} htmlFor="stockStatus">
            {product.quantity > 0 ? `In Stock` : `Out of Stock`}
          </label>
          <p id={`price${product.id}`}>&#36; {`${product.price}`}</p>
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={product.quantity === 0}
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.cart.products,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (productId) => dispatch(addToCart(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
