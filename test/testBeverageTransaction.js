const assert = require("assert");
const utils = require("../src/beverageTransaction.js");

xdescribe("transactionRecorder", function() {
  it("should give transaction recorded ", function() {
    const actual = utils.transactionRecorder(
      "[--save --beverage pomogranite --empId 25313 --qty 1]"
    );
    const expected =
      "Transaction Recorded:\
    Employee ID,Beverage,Quantity,Date\
    25313,pomogranite,1,2019-11-22T12:43:10.537Z";
    assert.strictEqual(actual, expected);
  });
});

describe("desireInput", function() {
  it("should return function reference of what we are going to do", function() {
    assert.strictEqual(utils.desireInput("--save"), utils.saveDetails);
  });
});
