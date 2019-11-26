const query = require("../src/query.js");
const assert = require("assert");

describe("generateQueryDetails", function() {
  it("should return employee's beverage Details", function() {
    const transactionsRecords = {
      "25348": {
        empId: "25348",
        beverageList: [
          { bevertageName: "orange", qty: "2", date: "26/11/2019" }
        ],
        count: 2
      }
    };
    const actual = query.generateQueryDetails(transactionsRecords, [
      "--query",
      "-empId",
      "25348"
    ]);
    const expected =
      "Employee ID, Beverage, Quantity, Date\n25348,undefined,2,26/11/2019\nTotal:2 juices";
    assert.strictEqual(actual, expected);
  });
});

describe("extractTransactionValues", function() {
  it("should extract transaction values", function() {
    const transaction = {
      beverageName: "orange",
      qty: "2",
      date: "26/11/2019"
    };
    const actual = query.extractTransactionValues(transaction);
    const expected = "orange,2,26/11/2019";
    assert.strictEqual(actual, expected);
  });
});
