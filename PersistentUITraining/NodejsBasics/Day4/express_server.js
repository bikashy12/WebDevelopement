var express = require("express");
var morgan = require("morgan");
var app = new express();
// configure morgan for handling the logs
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Persistent");
});

app.use(function (req, res, next) {
  console.log("Welcome to the Logger");
  next();
});

app.get("/users", (req, res) => {
  var name = req.query.username;
  res.send("Sending the list of user " + name);
});

// app.post("/users", (req, res) => {
//   res.send("Creating the new user");
// });

app.get("/products", (req, res) => {
  res.send("Sending the list of product");
});

// Routing Error - To throw error in case invalid url and this will be called client related error
app.use((req, res, next) => {
  res.status(404).send("Request is not correct");
});

// Server Side Error - This will be called for internal server error
// Required to include error object in this middleware function
app.use((err, req, res, next) => {
  res.status(500).send("There is some issue at server side");
});

app.listen(3000, () => {
  console.log("Server Started....");
});
