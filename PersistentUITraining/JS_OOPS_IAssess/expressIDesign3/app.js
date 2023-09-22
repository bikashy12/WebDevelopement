var express = require("express");
var app = express();
var path = require("path");
// app.use(express.static('public'))

app.set("port", process.env.PORT || 3000);

const eventDetails = {
  events: [
    {
      eventId: 111,
      eventName: "A-Z Planning",
      eventDate: "2019-12-15",
      eventLocation: "Chennai",
    },
    {
      eventId: 112,
      eventName: "Creative Corner",
      eventDate: "2019-07-05",
      eventLocation: "Erode",
    },
    {
      eventId: 113,
      eventName: "DreamTeam",
      eventDate: "2019-06-07",
      eventLocation: "Salem",
    },
    {
      eventId: 114,
      eventName: "Unique Planners",
      eventDate: "2019-11-10",
      eventLocation: "Bangalore",
    },
    {
      eventId: 115,
      eventName: "Last Moment Savers",
      eventDate: "2019-07-05",
      eventLocation: "Erode",
    },
  ],
};

//fill your code

app.get("/events/:eventid", (req, res) => {
  // var id = req.query.eventid;
  var id = req.params.eventid;
  if (!isNaN(id)) {
    for (i in eventDetails.events) {
      if (eventDetails.events[i].eventId == id) {
        // console.log(eventDetails.events[i].events);
        const html = `<html><body><h1>Event Details </h1><br>Event Id - ${eventDetails.events[i].eventId}<br>Event Name - ${eventDetails.events[i].eventName}<br>Event Data  - ${eventDetails.events[i].eventDate}<br>Event Location - ${eventDetails.events[i].eventLocation}<br></body></html>`;
        res.send(html);
      }
    }
    const errorHtml = "<html><body>This is an invalid URL</body></html>";
    res.send(errorHtml);
  } else {
    var errorURL = "<html><body>This is an invalid URL</body></html>";
    res.send(errorURL);
  }
});

app.listen(app.get("port"));
