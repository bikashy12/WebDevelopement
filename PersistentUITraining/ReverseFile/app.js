//Fill your code
const fs = require("fs");
const data = fs.readFile("./books.json", "utf-8", function (err, data) {
  if (err) {
    console.log(err);
  }
  const newData = JSON.parse(data);
  for (i in newData) {
    console.log(newData[i]);
  }
});
