var express = require("express");
var app = express();
var fs = require("fs");
app.set("port", process.env.PORT || 3000);

//fill your code
app.get("/listBooks", (req, res) => {
  var allBooks = JSON.parse(fs.readFileSync("books.json"));
  res.send(JSON.stringify(allBooks));
});

app.get("/showBook/:id", (req, res) => {
  var Id = req.params.id;
  var keyId = "book-" + Id;
  var allBooks = JSON.parse(fs.readFileSync("books.json"));
  if (allBooks[keyId]) {
    res.send(JSON.stringify(allBooks[keyId]));
  }
  res.send("Book is not found");
});

app.delete("/deleteBook/:id", (req, res) => {
  var Id = req.params.id;
  var keyId = "book-" + Id;
  var allBooks = JSON.parse(fs.readFileSync("books.json"));
  if (allBooks[keyId]) {
    delete allBooks[keyId];
    fs.writeFileSync("books.json", JSON.stringify(allBooks));
  }
});

app.listen(app.get("port"));
