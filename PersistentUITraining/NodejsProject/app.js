var express = require("express");
var app = new express();
var router = require("./Routes/productroutes");
const cors = require("cors");
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(cors());
//   we have to connect app with router object
app.use("/api", router);

http: app.listen(port, () => {
  console.log("On port 3000 Server Started...");
});
