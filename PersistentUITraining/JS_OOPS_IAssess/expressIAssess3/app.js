var express = require("express");
var app = express();
app.use(express.static(__dirname));
app.set("port", process.env.PORT || 3000);

//fill your code

var events = {
  1: {
    eventName: "Marriage Event",
    eventId: "1",
  },
  2: {
    eventName: "Corporate Event",
    eventId: "2",
  },
  3: {
    eventName: "Social Event",
    eventId: "3",
  },
  4: {
    eventName: "Birthday Party",
    eventId: "4",
  },
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/event/:eventId", (req, res) => {
  var id = req.params.eventId;
  if (id >= 1 && id <= 4) {
    const htmlEvent = `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <style>
      a{
        text-decoration: none;
        color: black;
      }
      .heading{
        background-color: #fe9d9d;
        display: inline-block;
        height:50px;
        width:280px;
        margin-left:33%;
        padding-left:120px;
        padding-top: 5px;
        position: relative;
      }
      .eventList{
        margin-left:33%;
        background-color: #ffd5dd;
        width:260px;
        line-height:2.5;
        padding:15px;
        padding-left:123px;
      }
    </style>
  </head>
  <body>
    <div>
    <h1 class="heading">Event Details</h1>
    </div>
    <div class="eventList">
      <p>Event Id : ${events[id].eventId}<br>
      Event Name : ${events[id].eventName}</p>
    </div>
  </body>
</html>
`;
    res.send(htmlEvent);
    return;
  }
  const htmlEvent = `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <style>
      .heading{
        background-color: #fe9d9d;
        font-size:23px;
        font-weight:bold;
        display: inline-block;
        height:50px;
        width:320px;
        margin-left:33%;
        padding-left:120px;
        padding-top: 15px;
      }
    </style>
  </head>
  <body>
    <p class="heading">Oops! Page Not Found</p>
  </body>
</html>
`;
  res.send(htmlEvent);
});

app.listen(app.get("port"));
