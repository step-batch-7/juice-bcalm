const assert = require("assert");
const utils = require("../src/utilsFunction.js");

describe("isFileExists", function() {
  it("should return true if file is present", function() {
    assert.ok(utils.isFileExists("./beverage.js"));
  });
  it("should return false if file is not there", function() {
    assert.ok(!utils.isFileExists("../helloWorld.js"));
  });
});

describe("parseFile", function() {
  it("should read the whole file contents", function() {
    const actual = utils.parseFile("./checkParsefile.json", "utf8");
    const expected = "hello\n";
    assert.deepStrictEqual(actual, expected);
  });
});
