const assert = require("assert");
const extractTransactionValues = require("../src/query.js")
  .extractTransactionValues;
const whichAction = require("../src/beverageTransaction.js").whichAction;
const generateQueryDetails = require("../src/query.js").generateQueryDetails;
const saveTransactionEntry = require("../src/saveTransaction.js")
  .saveTransactionEntry;

describe("whichAction", function() {
  it("should give which action has to perform", function() {
    let actual = whichAction("--save");
    let expected = saveTransactionEntry;
    assert.strictEqual(actual, expected);

    actual = whichAction("--query");
    expected = generateQueryDetails;
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
    const actual = extractTransactionValues(transaction);
    const expected = "hello,1,24/11/2019";
    assert.strictEqual(actual, expected);
  });
});
