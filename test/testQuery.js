const query = require("../src/query.js");
const assert = require("assert");

describe("generateQueryDetails", function() {
  it("should return employee's beverage Details when only empId is given", function() {
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
      "--empId",
      "25348"
    ]);
    const expected =
      "Employee ID, Beverage, Quantity, Date\n25348,undefined,2,26/11/2019\nTotal:2Juices";
    assert.strictEqual(actual, expected);
  });

  it("should return no record when employee didn't take any beverage", function() {
    const actual = query.generateQueryDetails({}, [
      "--query",
      "empId",
      "25348"
    ]);
    const expected = "Employee ID, Beverage, Quantity, Date\nTotal:0Juices";
    assert.strictEqual(actual, expected);
  });

  it("should return whole date transaction when only date is given", function() {
    const transactionsRecords = {
      "25348": {
        empId: "25348",
        beverageList: [
          { bevertageName: "orange", qty: "2", date: "2019-11-27" }
        ],
        count: 2
      }
    };
    const userArgs = ["--query", "--date", "2019-11-27"];
    const actual = query.generateQueryDetails(transactionsRecords, userArgs);
    const expected =
      "Employee ID, Beverage, Quantity, Date\n25348,undefined,2,2019-11-27\nTotal:2Juices";
    assert.deepStrictEqual(actual, expected);
  });

  it("should return no record if particular date noOne take beverage", function() {
    const transactionsRecords = {
      "25348": {
        empId: "25348",
        beverageList: [
          { bevertageName: "orange", qty: "2", date: "2019-11-26" }
        ],
        count: 2
      }
    };
    const userArgs = ["--query", "--date", "2019-11-21"];
    const actual = query.generateQueryDetails(transactionsRecords, userArgs);
    const expected = "Employee ID, Beverage, Quantity, Date\nTotal:0Juices";
    assert.deepStrictEqual(actual, expected);
  });

  it("should return a particular emp transaction in a particular date", function() {
    const transactionRecords = {
      "25348": {
        empId: "25348",
        beverageList: [
          { beverageName: "orange", qty: "2", date: "2019-11-27" },
          { beverageName: "orange", qty: "2", date: "2019-11-26" }
        ],
        count: 4
      }
    };
    const userArgs = ["--query", "--date", "2019-11-26", "--empId", "25348"];
    const actual = query.generateQueryDetails(transactionRecords, userArgs);
    const expected =
      "Employee ID, Beverage, Quantity, Date\n25348,orange,2,2019-11-26\nTotal:2Juices";
    assert.deepStrictEqual(actual, expected);
  });

  it("should return transaction detail for specific beverage", function() {
    const transactionRecords = {
      "25348": {
        empId: "25348",
        beverageList: [
          { beverageName: "papaya", qty: "2", date: "2019-11-27" },
          { beverageName: "orange", qty: "2", date: "2019-11-26" }
        ],
        count: 4
      }
    };
    const userArgs = ["--query", "--beverage", "orange"];
    const actual = query.generateQueryDetails(transactionRecords, userArgs);
    const expected =
      "Employee ID, Beverage, Quantity, Date\n25348,orange,2,2019-11-26\nTotal:2Juices";
    assert.deepStrictEqual(actual, expected);
  });
});

describe("createUserArgumentsObject", function() {
  it("should convert user arguments in object", function() {
    const userArgs = ["--query", "--empId", "25348", "--date", "26/11/2019"];
    const actual = query.createUserArgumentsObject(userArgs);
    const expected = {
      "--empId": "25348",
      "--date": "26/11/2019",
      undefined
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getBeverageRecordList", function() {
  it("should generate record list", function() {
    const transactionRecords = {
      "25348": {
        empId: "25348",
        beverageList: [
          { beverageName: "orange", qty: "2", date: "2019-11-26" }
        ],
        count: 2
      }
    };
    const actual = query.getBeverageRecordList(transactionRecords);
    const expected = [
      { beverageName: "orange", date: "2019-11-26", empId: "25348", qty: "2" }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("matchDate", function() {
  it("should return true if given dates are same", function() {
    assert.ok(query.matchDate("2019-11-28", "2019-11-28"));
  });
  it("should return false if given dates are not same", function() {
    assert.ok(!query.matchDate("1-1-1", "1-2-3"));
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
    const actual = query.filterList(transactionRecords, "2019-11-27", "date");
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
    const actual = query.filterList(transactionRecords, "25348", "empId");
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
    const actual = query.filterList(
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
  it("should filter transaction list on basis of query data(empId,date,beverage)", function() {
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
    const actual = query.filterTransactionList(transactionRecords, queryData);
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
