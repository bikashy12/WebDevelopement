var event = require("events");
var eventEmitter = new event.EventEmitter();

var totalAmount = 1000;

function withdrawAmout(amount) {
  totalAmount -= amount;
  eventEmitter.emit("withdraw", totalAmount);
}

function sendSMS(amount) {
  console.log("Send SMS " + amount);
}

function sendEmail(amount) {
  console.log("Send Email " + amount);
}

function updatePassbook(amount) {
  console.log("update Passbook " + amount);
}

eventEmitter.on("withdraw", sendEmail);
eventEmitter.on("withdraw", sendSMS);

withdrawAmout(300);
