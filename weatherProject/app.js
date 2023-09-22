const express = require("express"); // requiring the express module
const bodyParser = require("body-parser");
const app = express();
const https = require("https"); // including the https module which is native in the npm package

app.use(bodyParser.urlencoded({extended : true}));
app.get("/", function(req, res){ // responding to the user when a requesting is coming in our way
  // making a request to the api to get the information
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const appKey = "ef28bedb90919b194c347c7ad74af41d";
  const query = req.body.cityName;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const tempMin = weatherData.main.temp_min
      const tempMax = weatherData.main.temp_max
      const description = weatherData.weather[0].description
      const clientData = "The min and max temperature is " + tempMin+ " and " + tempMax;
      const icon = weatherData.weather[0].icon
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1> The current weather is " + description+ "</h1>")
      res.write("<h1>The min and max temperature of " + query +" is "+ tempMin + " and " + tempMax +".</h1>");
      res.write("<img src=" + imageUrl +">");
      res.send();
    })
  })
});

app.listen(3000, function(req, res){
  console.log("Server is listening to the port 3000.");
});
