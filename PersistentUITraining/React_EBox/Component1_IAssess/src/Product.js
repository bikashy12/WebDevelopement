import React, { Component } from "react";

export default class Product extends Component {
  render() {
    let { category, country, currencyCode, id, name, price, productImage } =
      this.props.product;
    return (
      <div id="prod-section">
        <img src={productImage} id="prod-img" alt="productImage" />
        <h3 className="prod-name">{name}</h3>
        <div className="prod-category">Category : {category}</div>
        <div className="prod-price">Price : ${price}</div>
        <button>Add to card</button>
      </div>
    );
  }
}
