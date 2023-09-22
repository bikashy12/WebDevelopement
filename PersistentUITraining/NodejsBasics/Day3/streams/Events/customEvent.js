var event = require("events");

var eventEmitter = new event.EventEmitter();

eventEmitter.on("Register", () => {
  console.log("User is registered... ");
});

eventEmitter.emit("Register");
