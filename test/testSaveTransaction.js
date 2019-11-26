const transaction = require("../src/saveTransaction.js");
const assert = require("assert");

describe("saveTransaction", function() {
  it("should save the beverage details", function() {
    const userArgs = [
      "--save",
      " --beverage",
      "Orange ",
      "--empId",
      "11111",
      "--qty",
      "1"
    ];
    const actual = transaction.saveTransaction({}, userArgs, "26/11/2019");
    const expected = {
      11111: {
        beverageList: [
          {
            beverageName: "Orange ",
            date: "26/11/2019",
            empId: "11111",
            qty: "1",
            date: "26/11/2019"
          }
        ],
        count: 1
      }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should update the transaction detail if employee already take beverage", function() {
    const userArgs = [
      "--save",
      " --beverage",
      "Orange ",
      "--empId",
      "11111",
      "--qty",
      "1"
    ];
    const records = {
      11111: {
        beverageList: [
          {
            beverageName: "Orange ",
            date: "26/11/2019",
            empId: "11111",
            qty: "1",
            date: "26/11/2019"
          }
        ],
        count: 1
      }
    };
    const actual = transaction.saveTransaction(records, userArgs, "29/11/2019");
    const expected = {
      "11111": {
        beverageList: [
          {
            beverageName: "Orange ",
            date: "26/11/2019",
            empId: "11111",
            qty: "1"
          },
          {
            beverageName: "Orange ",
            date: "29/11/2019",
            empId: "11111",
            qty: "1"
          }
        ],
        count: 2
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("generateRecords", function() {
  it("should write beverage details in desired format", function() {
    const beverageDetail = {
      beverageName: "orange",
      empId: "25348",
      qty: "1",
      date: "26/11/2019"
    };
    const actual = transaction.generateRecords({}, beverageDetail);
    const expected = {
      "25348": {
        beverageList: [
          {
            beverageName: "orange",
            date: "26/11/2019",
            empId: "25348",
            qty: "1"
          }
        ],
        count: 1
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("addBeverageDetail", function() {
  it("should add some beverage detail", function() {
    const beverageDetail = {
      beverageName: "orange",
      empId: "25348",
      qty: "1",
      date: "26/11/2019"
    };
    const actual = transaction.addBeverageDetail(
      { "25348": { beverageList: [] } },
      beverageDetail
    );
    const expected = {
      "25348": {
        beverageList: [
          {
            beverageName: "orange",
            date: "26/11/2019",
            empId: "25348",
            qty: "1"
          }
        ],
        count: 1
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
});
