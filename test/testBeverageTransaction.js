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
      function() {
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
