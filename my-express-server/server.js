const express = require("express");

const app = express();

app.get("/", function(request, response){ // requesting data from the home page
  response.send("<h1> Heyy, there express server here!!</h1> ")
});

app.get("/contact", function(req, res){ // requesting data from the contact page
       res.send("<h1>contact me at : bikash@gmail.com</h1>");
});

app.get("/about", function(req, res){
  res.send("<h1> Heyy, I am Bikash, owner of this exress server. Feeling excited to learn express and lot of things about backend developement</h1>");
});

 app.get("/qualification", function(req, res){
   res.send("<h2>Currently, I am doing the BTech.</h2>");
 });
app.listen(3000, function(){
  console.log("listening 3000.....");
});
