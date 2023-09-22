import React, { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  const [viewClicked, setViewClicked] = useState(false);
  const [showProduct, setShowProduct] = useState({});
  function handleBack() {
    setViewClicked(false);
  }
  return (
    <div>
      {!viewClicked && (
        <>
          <h3>Product List</h3>
          <table id="table">
            <th>SNO</th>
            <th>Product Name</th>
            <th>Product Code</th>
            <th>Brand</th>
            <th>Price</th>
            <th>View</th>
            {products.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>{item.productCode}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td
                  id={`showBtn${index + 1}`}
                  onClick={() => {
                    setViewClicked(true);
                    setShowProduct(item);
                  }}
                  className="viewButton"
                >
                  <button>View</button>
                </td>
              </tr>
            ))}
          </table>
        </>
      )}
      {viewClicked && (
        <ProductCard product={showProduct} handleBack={handleBack} />
      )}
    </div>
  );
}
