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
    const expected = "No Record Found";
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
});

describe("createUserArgumentsObject", function() {
  it("should convert user arguments in object", function() {
    const userArgs = ["--query", "--empId", "25348", "--date", "26/11/2019"];
    const actual = query.createUserArgumentsObject(userArgs);
    const expected = { "--empId": "25348", "--date": "26/11/2019" };
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

describe("filterEmpBevDetails", function() {
  it("should return only given employee beverage details", function() {
    const transactionRecords = [
      { beverageName: "orange", date: "2019-11-26", empId: "25348", qty: "2" },
      { beverageName: "papaya", date: "23/11/2019", empId: "25347", qty: "3" }
    ];

    const actual = query.filterEmpBevDetail(transactionRecords, "25348");
    const expected = [
      { beverageName: "orange", date: "2019-11-26", empId: "25348", qty: "2" }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("filterEmpOfDate", function() {
  it("filter employees of a particular date when no empId is given", function() {
    const transactionRecords = [
      { beverageName: "orange", date: "2019-11-26", empId: "25348", qty: "2" },
      { beverageName: "papaya", date: "2019-11-27", empId: "25347", qty: "3" }
    ];
    const actual = query.filterEmpOfDate(
      transactionRecords,
      "2019-11-26",
      undefined
    );
    const expected = [
      { beverageName: "orange", date: "2019-11-26", empId: "25348", qty: "2" }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
