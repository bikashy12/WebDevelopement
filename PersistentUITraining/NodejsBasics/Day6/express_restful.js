var express = require("express");
var app = new express();
var router = express.Router();

router
  .route("/books")
  .get((req, res) => {
    res.send({ productname: "TV", productid: 10 });
  })
  .post((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {});

router.route("/products").get((req, res) => {});

//   we have to connect app with router object
app.use("/", router);
// we can have multiple router for different urls

app.listen(3000, () => {
  console.log("Restful Server Started...");
});
