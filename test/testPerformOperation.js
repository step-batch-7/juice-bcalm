const assert = require("assert");
const operation = require("../src/performOperation.js");

describe("generateQueryDetails", function() {
  it("should return employee's beverage Details when only empId is given", function() {
    const transactionsRecords = [
      { beverageName: "Orange", empId: "25348", qty: "2", date: "2019-11-26" }
    ];
    const actual = operation.generateQueryDetails(transactionsRecords, [
      "--operation",
      "--empId",
      "25348"
    ]);
    const expected =
      "Employee ID, Beverage, Quantity, Date\n25348,Orange,2,2019-11-26\nTotal:2Juices";
    assert.strictEqual(actual, expected);
  });

  it("should return no record when employee didn't take any beverage", function() {
    const actual = operation.generateQueryDetails(
      [],
      ["--operation", "empId", "25348"]
    );
    const expected = "Employee ID, Beverage, Quantity, Date\nTotal:0Juices";
    assert.strictEqual(actual, expected);
  });

  it("should return whole date transaction when only date is given", function() {
    const transactionsRecords = [
      { beverageName: "Orange", qty: "2", empId: "25348", date: "2019-11-27" },
      {
        beverageName: "papaya",
        qty: "1",
        empId: "2334545",
        date: "2019-11-26"
      }
    ];
    const userArgs = ["--operation", "--date", "2019-11-27"];
    const actual = operation.generateQueryDetails(
      transactionsRecords,
      userArgs
    );
    const expected =
      "Employee ID, Beverage, Quantity, Date\n25348,Orange,2,2019-11-27\nTotal:2Juices";
    assert.deepStrictEqual(actual, expected);
  });

  it("should return no record if particular date noOne take beverage", function() {
    const transactionsRecords = [
      { beverageName: "Orange", qty: "2", empId: "25348", date: "2019-11-27" },
      {
        beverageName: "papaya",
        qty: "1",
        empId: "2334545",
        date: "2019-11-26"
      }
    ];
    const userArgs = ["--operation", "--date", "2019-11-21"];
    const actual = operation.generateQueryDetails(
      transactionsRecords,
      userArgs
    );
    const expected = "Employee ID, Beverage, Quantity, Date\nTotal:0Juices";
    assert.deepStrictEqual(actual, expected);
  });

  it("should return a particular emp transaction in a particular date", function() {
    const transactionsRecords = [
      { beverageName: "Orange", qty: "2", empId: "25348", date: "2019-11-27" },
      {
        beverageName: "papaya",
        qty: "1",
        empId: "23446",
        date: "2019-11-27"
      }
    ];
    const userArgs = [
      "--operation",
      "--date",
      "2019-11-27",
      "--empId",
      "25348"
    ];
    const actual = operation.generateQueryDetails(
      transactionsRecords,
      userArgs
    );
    const expected =
      "Employee ID, Beverage, Quantity, Date\n25348,Orange,2,2019-11-27\nTotal:2Juices";
    assert.deepStrictEqual(actual, expected);
  });

  it("should return transaction detail for specific beverage", function() {
    const transactionsRecords = [
      { beverageName: "Orange", qty: "2", empId: "25348", date: "2019-11-27" },
      {
        beverageName: "papaya",
        qty: "1",
        empId: "23446",
        date: "2019-11-27"
      }
    ];
    const userArgs = ["--operation", "--beverage", "Orange"];
    const actual = operation.generateQueryDetails(
      transactionsRecords,
      userArgs
    );
    const expected =
      "Employee ID, Beverage, Quantity, Date\n25348,Orange,2,2019-11-27\nTotal:2Juices";
    assert.deepStrictEqual(actual, expected);
  });
});

describe("createUserArgumentsObject", function() {
  it("should convert user arguments in object", function() {
    const userArgs = [
      "--operation",
      "--empId",
      "25348",
      "--date",
      "26/11/2019"
    ];
    const actual = operation.createUserArgumentsObject(userArgs);
    const expected = {
      "--empId": "25348",
      "--date": "26/11/2019",
      undefined
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("matchDate", function() {
  it("should give true if given dates are same", function() {
    assert.ok(operation.matchDate("2019-11-28", "2019-11-28"));
  });
  it("should return false if given dates are not same", function() {
    assert.ok(!operation.matchDate("1-1-1", "1-2-3"));
  });
});

describe("filterList", function() {
  it("should filter transaction list with on basis of date", function() {
    const transactionRecords = [
      {
        beverageName: "hello",
        empId: "1111",
        qty: "1",
        date: "2019-11-28T04:59:25.296Z"
      },
      {
        beverageName: "hello",
        empId: "1111",
        qty: "1",
        date: "2019-11-27"
      }
    ];
    const actual = operation.filterList(
      transactionRecords,
      "2019-11-27",
      "date"
    );
    const expected = [
      { beverageName: "hello", empId: "1111", qty: "1", date: "2019-11-27" }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should filter transaction list on the basis of empId", function() {
    const transactionRecords = [
      {
        beverageName: "hello",
        empId: "1111",
        qty: "1",
        date: "2019-11-28T04:59:25.296Z"
      },
      {
        beverageName: "orange",
        empId: "25348",
        qty: "1",
        date: "2019-11-27"
      }
    ];
    const actual = operation.filterList(transactionRecords, "25348", "empId");
    const expected = [
      { beverageName: "orange", empId: "25348", qty: "1", date: "2019-11-27" }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should filter transaction list on the basis of beverageName", function() {
    const transactionRecords = [
      {
        beverageName: "hello",
        empId: "1111",
        qty: "1",
        date: "2019-11-28T04:59:25.296Z"
      },
      {
        beverageName: "orange",
        empId: "25348",
        qty: "1",
        date: "2019-11-27"
      }
    ];
    const actual = operation.filterList(
      transactionRecords,
      "orange",
      "beverageName"
    );
    const expected = [
      { beverageName: "orange", empId: "25348", qty: "1", date: "2019-11-27" }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("filterTransactionList", function() {
  it("should filter transaction list on basis of operation data(empId,date,beverage)", function() {
    const queryData = {
      date: "2019-11-28",
      empId: "1111",
      beverageName: "orange"
    };
    const transactionRecords = [
      {
        beverageName: "orange",
        empId: "1111",
        qty: "1",
        date: "2019-11-28T04:59:25.296Z"
      },
      {
        beverageName: "hello",
        empId: "1111",
        qty: "1",
        date: "2019-11-28"
      }
    ];
    const actual = operation.filterTransactionList(
      transactionRecords,
      queryData
    );
    const expected = [
      {
        beverageName: "orange",
        date: "2019-11-28T04:59:25.296Z",
        empId: "1111",
        qty: "1"
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

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
    const date = "2019-11-26";
    const actual = operation.saveTransaction([], userArgs, date);
    const expected = [
      { beverageName: "Orange ", empId: "11111", qty: "1", date: "2019-11-26" }
    ];

    assert.deepStrictEqual(actual, expected);
  });

  it("should update the transaction detail if employee already take beverage", function() {
    const userArgs = [
      "--save",
      " --beverage",
      "Orange",
      "--empId",
      "11111",
      "--qty",
      "1"
    ];
    const records = [
      { beverageName: "orange", empId: "11111", qty: "1", date: "2019-11-27" }
    ];
    const actual = operation.saveTransaction(records, userArgs, "2019-11-26");
    const expected = [
      { beverageName: "orange", empId: "11111", qty: "1", date: "2019-11-27" },
      { beverageName: "Orange", empId: "11111", qty: "1", date: "2019-11-26" }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
