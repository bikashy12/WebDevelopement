var express = require("express");
var app = new express();
require("../DB/productdb");
var router = express.Router();
var product = require("../Model/productmodel");
app.use(express.json());

router
  .route("/products")
  .get((req, res) => {
    product
      .find({})
      .then((products) => res.json(products))
      .catch((err) => res.send(err));
  })
  .post((req, res) => {
    var newProduct = new product(req.body);
    newProduct
      .save()
      .then(() => {
        res.status(200).send("Congrats! New Product added successfully.");
      })
      .catch((err) => res.send(err));
  });

router
  .route("/products/:productid")
  .get((req, res) => {
    var productid = req.params.productid;
    product
      .find({ productid: productid })
      .then((product) => {
        if (product.length === 0) {
          res.status(404).send("Queried Product is not found!");
        } else {
          res.json(product);
        }
      })
      .catch((err) => res.send(err));
  })
  .put((req, res) => {
    var productid = req.params.productid;
    product
      .findOneAndUpdate({ productid }, req.body)
      .then(() => res.send("Product Updated"))
      .catch((err) => res.send(err));
  })
  .delete((req, res) => {
    var productid = req.params.productid;
    product
      .findOneAndDelete({ productid })
      .then(() => res.send("Product Deleted"))
      .catch((err) => res.send(err));
  });

module.exports = router;
