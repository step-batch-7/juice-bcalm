const utils = require("../src/beverageTransaction.js");
const assert = require("assert");

describe("generateFileContents", function() {
  it("should give empty object if file is not exists", function() {
    const actualValue = utils.generateFileContents(
      "./NoFile",
      function(arg1, arg2) {
        assert.strictEqual(arg1, "./NoFile");
        assert.strictEqual(arg2, "utf8");
        return '{"key":"value"}';
      },
      function(arg) {
        assert.strictEqual(arg, "./NoFile");
        return false;
      }
    );
    const expectedValue = {};
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give content of the file with true flag if file exists", function() {
    const actualValue = utils.generateFileContents(
      "path",
      function(path, encode) {
        assert.strictEqual(path, "path");
        assert.strictEqual(encode, "utf8");
        return '{"key": "value"}';
      },
      function(path) {
        assert.strictEqual(path, "path");
        return true;
      }
    );
    const expectedValue = { key: "value" };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("writeTransactions", function() {
  it("should make JSON string version of the content and give it to write func", function() {
    let callTimes = 0;
    utils.writeTransaction("path", [{ msg: "Hi" }], function(
      path,
      content,
      encode
    ) {
      assert.strictEqual(path, "path");
      assert.deepStrictEqual(content, '[{"msg":"Hi"}]');
      assert.strictEqual(encode, "utf8");
      callTimes++;
    });
    assert.strictEqual(callTimes, 1);
  });
});

describe("performAction", function() {
  it("should return transaction recorded message when employee save something", function() {
    let callTimes = 0;
    const userArguments = [
      "--save",
      "beverage",
      "orange",
      "--empId",
      "25348",
      "qty",
      "1"
    ];
    const fileFunctions = {
      writeFile: (path, content, encode) => {
        assert.strictEqual(path, "path");
        assert.strictEqual(
          content,
          '{"25348":{"beverageList":[{"beverageName":"orange","empId":"25348","qty":"1","date":"26/11/2019"}],"count":1}}'
        );
        assert.strictEqual(encode, "utf8");
        callTimes++;
      },
      readFile: (path, encode) => {
        assert.strictEqual(path, "path");
        assert.strictEqual(encode, "utf8");
        return "{}";
      },
      existsFile: path => {
        assert.strictEqual(path, "path");
        return true;
      }
    };

    const date = "26/11/2019";

    const actual = utils.performAction(
      "path",
      fileFunctions,
      userArguments,
      date
    );
    const expected =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n25348,orange,1,26/11/2019";
    assert.strictEqual(actual, expected);
    assert.strictEqual(callTimes, 1);
  });

  it("should return transaction detail of empolyee", function() {
    const userArguments = ["--query", "--empId", "25348"];
    const fileFunctions = {
      readFile: (path, encode) => {
        assert.strictEqual(path, "path");
        assert.strictEqual(encode, "utf8");
        return '{"25348":{"beverageList":[]}}';
      },
      existsFile: path => {
        assert.strictEqual(path, "path");
        return true;
      }
    };

    const date = "26/11/2019";

    const actual = utils.performAction(
      "path",
      fileFunctions,
      userArguments,
      date
    );
    const expected =
      "Employee ID, Beverage, Quantity, Date\nTotal:undefined juices";
    assert.strictEqual(actual, expected);
  });
});
