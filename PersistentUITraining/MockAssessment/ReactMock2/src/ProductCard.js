import React, { useNavigate } from "react";

export default function ProductCard({ product, setProductClicked }) {
  const { id, productName, productCode, brand, price, image } = product;
  return (
    <div className="card">
      <h3>Product Card</h3>
      <div id="cardDetail">
        <img src={require(`./image/${image}.jpeg`)} id={`${image}`} />
        <h3 id="brandName">{brand}</h3>
        <div id="productName">
          <b>Product Name</b> : {productName}
        </div>
        <div id="price">
          <b>Price</b> : {price}
        </div>
      </div>
      <button
        className="back"
        onClick={() => {
          setProductClicked(false);
        }}
        type="submit"
      >
        Back
      </button>
    </div>
  );
}
