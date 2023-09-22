const validator = require("validator");

const email = process.argv[2];

if (validator.isEmail(email)) {
  console.log("Valid");
} else {
  console.log("Invalid");
}
