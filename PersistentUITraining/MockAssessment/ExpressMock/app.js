var express = require("express");
var app = express();
var fs = require("fs");
app.set("port", process.env.PORT || 3001);
const userData = JSON.parse(fs.readFileSync("users.json"));
console.log(userData);
//fill your code
app.get("/listUsers", (req, res) => {
  res.send(userData);
});

app.get("/showUser/:id", (req, res) => {
  const Id = req.params.id;
  let idFound = false;
  for (const key in userData) {
    if (userData[key].userId === Id) {
      idFound = true;
      res.send(userData[key]);
    }
  }
  if (!idFound) res.send("User is not found");
});

app.delete("/deleteUser/:id", (req, res) => {
  const Id = req.params.id;
  let idFound = false;
  for (const key in userData) {
    if (userData[key].userId === Id) {
      idFound = true;
      delete userData[key];
      fs.writeFileSync("users.json", JSON.stringify(userData));
      res.redirect("/listUsers");
    }
  }
  if (!idFound) res.send("User is not found");
});

app.listen(app.get("port"));
