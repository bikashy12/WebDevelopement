var express = require("express");
var app = express();
var path = require("path");
app.use(express.static(__dirname));

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
app.get("/obtainEvent/:eventId", (req, res) => {
  var id = req.params.eventId;
  console.log(id);
  if (!isNaN(id)) {
    for (i in eventDetails.events) {
      if (eventDetails.events[i].eventId == id) {
        const eventsObject = JSON.stringify(eventDetails.events[i]);
        const infoObject = `<html><body>${eventsObject}</body></html>`;
        res.send(infoObject);
        return;
      }
    }
    const errorHtml = `<html><body>Invalid event</body></html>`;
    res.send(errorHtml);
  } else {
    var errorURL = `<html><body>Invalid event</body></html>`;
    res.send(errorURL);
  }
});

app.use((req, res, next) => {
  const errorHtml = `<html><body>Invalid event</body></html>`;
  res.send(errorHtml);
});

app.listen(3000);
