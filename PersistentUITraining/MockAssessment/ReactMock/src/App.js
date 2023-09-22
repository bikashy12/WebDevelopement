import React, { useState } from "react";
import ProductList from "./ProductList";
import "./App.css";

export default function App() {
  const [productList, setProductList] = useState([
    {
      id: 1,
      productName: "Mobile",
      productCode: "PC001",
      brand: "VIVO",
      price: "10000",
      image: "image1",
    },
    {
      id: 2,
      productName: "Watch",
      productCode: "PC002",
      brand: "MI",
      price: "2500",
      image: "image2",
    },
    {
      id: 3,
      productName: "Laptop",
      productCode: "PC003",
      brand: "HP",
      price: "30000",
      image: "image3",
    },
    {
      id: 4,
      productName: "Computer",
      productCode: "PC004",
      brand: "HP",
      price: "50000",
      image: "image4",
    },
    {
      id: 5,
      productName: "Mobile",
      productCode: "PC005",
      brand: "Redmi",
      price: "15000",
      image: "image5",
    },
  ]);
  return (
    <div>
      <ProductList products={productList} />
    </div>
  );
}
