var mongoose = require("mongoose");
var express = require("express");
var app = express();

var Schema = new mongoose.Schema({
  name: { type: String, required: true },
  isbn: { type: String },
  author: { type: String },
  pages: { type: Number },
});

// model name , shcema name, collection name
// if you don't provide the collection name it will take plural form of model name
// With this model name we can perform CRUD operations
var book = new mongoose.model("book", Schema, "books");
module.exports = book;
