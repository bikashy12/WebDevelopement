import React from "react";

export default function ProductCard({ product, handleBack }) {
  return (
    <div>
      <h3>Product Card</h3>
      <div id="cardDetail">
        <img
          src={require(`./image/image${product.id}.jpeg`)}
          alt="productImage"
          id={`image${product.id}`}
        />
        <h3 id="brandName">{product.brand}</h3>
        <div id="productName">Product Name : {product.productName}</div>
        <div id="price">Price : {product.price}</div>
        <button className="back" onClick={() => handleBack()}>
          Back
        </button>
      </div>
    </div>
  );
}
