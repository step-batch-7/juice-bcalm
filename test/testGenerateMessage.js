const messages = require("../src/generateMessage.js");
const assert = require("assert");

describe("generateQueryMessage", function() {
  it("should generate the query message for which user wants details", function() {
    const transactionRecord = [
      {
        beverageName: "orange",
        qty: "1",
        empId: "25348",
        date: "2019-11-24"
      }
    ];
    const actual = messages.generateQueryMessage(transactionRecord);
    const expected =
      "Employee ID, Beverage, Quantity, Date\n25348,orange,1,2019-11-24\nTotal:1Juices";
    assert.strictEqual(actual, expected);
  });
});

describe("createHeader", function() {
  it("should create title which is given in returning details", function() {
    const actual = messages.createHeader();
    const expected = "Employee ID, Beverage, Quantity, Date";
    assert.strictEqual(actual, expected);
  });
});

describe("giveBeverageDetails", function() {
  it("should return beverage details", function() {
    const transactionRecord = {
      beverageName: "orange",
      qty: "1",
      empId: "25348",
      date: "24/11/2019"
    };
    const actual = messages.giveBeverageDetails(transactionRecord);
    const expected = "\n25348,orange,1,24/11/2019";
    assert.strictEqual(actual, expected);
  });
});

describe("generateSaveMessage", function() {
  it("should return transaction of specific user", function() {
    const userArguments = [
      "--save",
      "--beverage",
      "Orange",
      "--empId",
      "11111",
      "--qty",
      "1"
    ];
    const actual = messages.generateSaveMessage(userArguments, "24/11/2019");
    const expected =
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date\n11111,Orange,1,24/11/2019";
    assert.strictEqual(actual, expected);
  });
});
