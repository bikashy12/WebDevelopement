var mongoose = require("mongoose");
var express = require("express");
var app = express();

var Schema = new mongoose.Schema({
  productid: { type: Number, required: true },
  productname: { type: String, required: true },
  modelyear: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});

var Product = new mongoose.model("Product", Schema, "products");
module.exports = Product;
