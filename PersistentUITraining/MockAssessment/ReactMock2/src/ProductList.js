import React, { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  const [productClicked, setProductClicked] = useState(false);
  const [displayProduct, setDisplayProduct] = useState({});
  return (
    <div className="productList">
      {!productClicked && (
        <>
          <h3 className="table-heading">Product List</h3>
          <table id="table">
            {/* <thead> */}
            <th>SNO</th>
            <th>Product Name</th>
            <th>Product Code</th>
            <th>Brand</th>
            <th>Price</th>
            <th>View</th>
            {/* </thead> */}
            {/* <tbody> */}
            {products.map((product) => {
              const { id, productName, productCode, brand, price, image } =
                product;
              return (
                <tr>
                  <td>{id}</td>
                  <td>{productName}</td>
                  <td>{productCode}</td>
                  <td>{brand}</td>
                  <td>{price}</td>
                  <td
                    id={`showBtn${id}`}
                    onClick={() => {
                      setProductClicked(true);
                      setDisplayProduct(product);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    View
                  </td>
                </tr>
              );
            })}
            {/* </tbody> */}
          </table>
        </>
      )}
      {productClicked && (
        <ProductCard
          product={displayProduct}
          setProductClicked={setProductClicked}
        />
      )}
    </div>
  );
}
