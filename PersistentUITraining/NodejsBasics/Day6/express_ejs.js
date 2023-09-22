var express = require("express");
var app = new express();
var ejs = require("ejs");

app.set("view engine", "ejs");
// We have to set body parser to read data in request body
app.use(express.urlencoded());
var users = [
  { username: "Rutuja", userid: 10 },
  { username: "Nandik", userid: 20 },
  { username: "Shubham", userid: 30 },
];
app.get("/", function (req, res) {
  //res.send()
  //res.sendFile()
  //it will search a given ejs file under Views folder
  //res.render('index.ejs',{username:'Rutuja',userid:10}) //render is used to return ejs file as response
  res.render("users.ejs", { userArray: users });
});

app.get("/adduser", function (req, res) {
  //show create user form
  res.render("createUser.ejs");
});

app.post("/postuser", (req, res) => {
  console.log(req.body);
  var username = req.body.username;
  var userid = req.body.userid;
  users.push({ username, userid });
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started...");
});
