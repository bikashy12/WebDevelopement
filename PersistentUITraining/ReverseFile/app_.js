const { reverse } = require("dns");
var fs = require("fs");
//Fill your code
fs.readFile("input.txt", "utf-8", function (err, data) {
  if (err) {
    console.log(err);
  }
  var newData = data.split("").reverse().join("");
  const writeStream = fs.createWriteStream("./output.txt");
  writeStream.write(newData);
  writeStream.end();
});
