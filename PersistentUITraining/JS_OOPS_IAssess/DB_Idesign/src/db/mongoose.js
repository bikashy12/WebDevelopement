const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

var fs = require("fs");
var obj = JSON.parse(fs.readFileSync("config.json", "utf8"));

const connectionUrl = `mongodb://${obj.host}:${obj.port}/${obj.database}`;

mongoose.connect(
  connectionUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);
