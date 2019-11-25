const assert = require("assert");
const utils = require("../src/beverageTransaction.js");

describe("whichAction", function() {
  it("should give which action has to perform", function() {
    let actual = utils.whichAction("--save");
    let expected = utils.saveTransactionEntry;
    assert.strictEqual(actual, expected);

    actual = utils.whichAction("--query");
    expected = utils.generateQueryDetails;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("extractTransactionValues", function() {
  it("should extract the value and return needed value", function() {
    const transaction = {
      beverageName: "hello",
      qty: 1,
      date: "24/11/2019"
    };
    const actual = utils.extractTransactionValues(transaction);
    const expected = "hello,1,24/11/2019";
    assert.strictEqual(actual, expected);
  });
});
