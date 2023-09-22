var fs = require("fs");

// fs.readFile("Data.txt", "utf-8", (error, data) => {
//   if (error) console.log(error);
//   else console.log(data);
// });

// fs.appendFile("Data.txt", "This is the best class on node Basics.", (error) => {
//   if (error) console.log(error);
//   else console.log("Data appended to the File.");
// });

// fs.stat("Data.txt", (err, status) => {
//   if (err) throw err;
//   else console.log(status.isDirectory());
// });

// fs.readdir(".", (error, content) => {
//   if (error) throw error;
//   else {
//     content.forEach((element, index) => {
//       fs.stat(`${element}`, (err, stats) => {
//         if (stats.isFile()) {
//           console.log("It is a file. Proceed further.");
//         } else {
//           console.log("It is not a file. Abort immediately.");
//         }
//       });
//       console.log(index + " " + element);
//     });
//   }
// });

// fs.mkdir("userData", (err) => {
//   if (err) console.log(err);
//   else console.log("Directory Created");
// });

// fs.rmdir("userData", (err) => {
//   console.log("Directory Removed");
// });

class CoffeeMachine {
  _waterAmount = 0;
  set waterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this._waterAmount = value;
  }
  get waterAmount() {
    return this._waterAmount;
  }
  constructor(power) {
    this._power = power;
  }
}
let coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = -10;
