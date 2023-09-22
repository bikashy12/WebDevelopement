var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var fs = require("fs");
const { stringify } = require("querystring");
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const data = fs.readFileSync("users.json");
  // converting read data into javascript object
  res.send(JSON.parse(data));
});

app.get("/adduser", (req, res) => {
  res.sendFile(__dirname + "/adduser.html");
});

app.post("/adduser", (req, res) => {
  var key = "user-" + req.body.userid;
  const data = fs.readFileSync("users.json");
  var userData = JSON.parse(data);
  var newUser = {
    name: req.body.name,
    userId: req.body.userid,
    dob: req.body.dob,
    email: req.body.email,
    contactNumber: req.body.contactNumber,
  };
  var updateUserData = {
    ...userData,
    [key]: newUser,
  };
  fs.writeFileSync(
    "users.json",
    JSON.stringify(updateUserData, null, 2),
    (err) => (err ? console.log(err) : res.redirect("/"))
  );
  res.redirect("/");
});

app.get("/listUsers", (req, res) => {
  const data = fs.readFileSync("users.json");
  res.send(JSON.parse(data));
});

app.get("/showUser/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("users.json"));
  const Id = "user-" + req.params.id;
  const user = data[Id];
  if (!user) {
    res.send("User is not found");
  }
  res.send(user);
});

app.delete("/deleteUser/:id", (req, res) => {
  const data = fs.readFileSync("users.json");
  const userData = JSON.parse(data);
  const Id = "user-" + req.params.id;
  if (!userData[Id]) {
    res.send("User not found");
  } else {
    delete userData[Id];
    fs.writeFileSync("users.json", JSON.stringify(userData, null, 2));
    res.end();
  }
  res.end();
});

app.get("*", (req, res) => {
  res.send("<h1>404 Page Not Found</h1>");
});

app.listen(app.get("port"));
