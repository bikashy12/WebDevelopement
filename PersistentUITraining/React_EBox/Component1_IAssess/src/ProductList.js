import React, { Component } from "react";
import Product from "./Product";
import "./App.css";

export default class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      productsList: [
        {
          id: 1,
          name: "Samsung Galaxy Note 10",
          category: "Mobiles",
          country: "Canada",
          price: 11500,
          currencyCode: "CAD",
          productImage: require("./assets/img/product1.jpg"),
        },
        {
          id: 5,
          name: "SkullCandy BT Inkd Plus",
          category: "Bluetooth Headset",
          country: "UK",
          price: 800,
          currencyCode: "USD",
          productImage: require("./assets/img/product2.jpg"),
        },
        {
          id: 13,
          name: "Anker Soundbuds Rise",
          category: "Bluetooth Headset",
          country: "Canada",
          price: 600,
          currencyCode: "CAD",
          productImage: require("./assets/img/product3.jpg"),
        },
        {
          id: 8,
          name: "JBL Flip 3 Bluetooth speaker",
          category: "Speakers",
          country: "India",
          price: 1400,
          currencyCode: "INR",
          productImage: require("./assets/img/product4.jpg"),
        },
        {
          id: 10,
          name: "Conekt Volt Power Bank",
          category: "Power Bank",
          country: "China",
          price: 650,
          currencyCode: "CNY",
          productImage: require("./assets/img/product5.jpg"),
        },
        {
          id: 18,
          name: "Apple Watch Series",
          category: "Watch",
          country: "China",
          price: 640,
          currencyCode: "CNY",
          productImage: require("./assets/img/product6.jpg"),
        },
        {
          id: 20,
          name: "IBall Slide Spirit X2",
          category: "Tablets",
          country: "India",
          price: 9000,
          currencyCode: "INR",
          productImage: require("./assets/img/product7.jpg"),
        },
        {
          id: 22,
          name: "Skullcandy Set 2.0 ",
          category: "Headset",
          country: "China",
          price: 900,
          currencyCode: "CNY",
          productImage: require("./assets/img/product8.jpg"),
        },
      ],
      displayProduct: {},
      isVisible: false,
    };
    this.displayProduct = {};
  }
  render() {
    return (
      <div>
        <h1>Product World</h1>
        <ul className="products">
          {this.state.productsList.map((product, index) => (
            <li
              onClick={() => {
                this.setState({
                  displayProduct: product,
                  isVisible: true,
                });
              }}
              id={`product${index}`}
            >
              <img
                id={`image${index}`}
                src={product.productImage}
                alt="productImage"
              />
              {product.name}
            </li>
          ))}
        </ul>
        {this.state.isVisible && (
          <Product product={this.state.displayProduct} />
        )}
      </div>
    );
  }
}
