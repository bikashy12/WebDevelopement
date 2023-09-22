var assert = require("assert");

var calculator = require("../UnitTesting/Calculator/cal");

//Describe: using this we will group related test cases together
describe("Calculator", () => {
  // it : it is used for individual test cases
  // We will write multiple test cases
  it("addition", () => {
    assert.equal(calculator.add(2, 3), 5);
  });
  it("subtraction", () => {
    assert.equal(calculator.sub(5, 3), 2);
  });
});
