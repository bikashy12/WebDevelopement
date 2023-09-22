var express = require("express");
var app = new express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("views"));

app.get("/", (req, res) => {
  //   res.send(); // we can send string, json, object
  //   res.sendFile(__dirname + "/views/index.ejs"); // It will give current path
  res.render("index.ejs", { username: "Bikash", id: 10 });
});

app.listen(3000, () => {
  console.log("Server Started....");
});
