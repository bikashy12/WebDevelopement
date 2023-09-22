var express = require("express");
var app = new express();
var router = require("./Routes/bookroutes");
app.use(express.json());

//   we have to connect app with router object
app.use("/api", router);
// we can have multiple router for different urls

app.listen(3000, () => {
  console.log("Restful Server Started...");
});
