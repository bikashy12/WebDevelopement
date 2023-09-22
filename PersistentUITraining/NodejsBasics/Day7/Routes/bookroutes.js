var express = require("express");
var app = new express();
var router = express.Router();
var book = require("../Model/book");
var mongoose = require("mongoose");
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/webinardb")
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

router
  .route("/books")
  .get((req, res) => {
    book
      .find({})
      .then((books) => res.json(books))
      .catch((err) => console.log(err));
  })
  .post((req, res) => {
    var newBook = new book(req.body);
    newBook
      .save()
      .then(() => {
        res.status(201).send("Hurrah! Data is saved successfully.");
      })
      .catch((err) => {
        res.send(err);
      });
    console.log(req.body);
  })
  .put((req, res) => {})
  .delete((req, res) => {});

router
  .route("/books/:isbn")
  .get((req, res) => {
    var isbn = req.params.isbn;
    book
      .find({ isbn })
      .then((data) => {
        if (data.length === 0) {
          res.send("Book not found");
        }
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .put((req, res) => {
    var isbn = req.params.isbn;
    book
      .findOneAndUpdate({ isbn }, req.body)
      .then(() => res.send("Record Update"))
      .catch((err) => res.send(err));
  })
  .delete((req, res) => {
    var isbn = req.params.isbn;
    book
      .findOneAndDelete({ isbn })
      .then(() => res.send("Record Deleted"))
      .catch((err) => res.send(err));
  });

module.exports = router;
