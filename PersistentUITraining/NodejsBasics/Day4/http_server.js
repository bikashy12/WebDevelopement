var http = require("http");

const server = http.createServer((req, res) => {
  res.write("Welcome to Persistent Systems Ltd");
  res.end();
});

server.listen(3000, function () {
  console.log("Server Started....");
});
