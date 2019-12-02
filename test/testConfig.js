const assert = require("assert");
const { getDate, getPath } = require("../src/config.js");

describe("getDate", function() {
  it("should give configured date while using env variable", function() {
    const actual = getDate({ NOW: "2011-12-02" })();
    const expected = new Date("2011-12-02");
    assert.deepStrictEqual(actual, expected);
  });

  it("should give default date when no date is configured", function() {
    const actual = getDate({})();
    const expected = new Date();
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getPath", function() {
  it("should give configuration Path while using env variable", function() {
    const actual = getPath({ TRANSACTION_DATA: "preset path" });
    const expected = "preset path";
    assert.strictEqual(actual, expected);
  });

  it("should give default path when no path is given", function() {
    const actual = getPath({});
    const expected = "./consumedList.json";
    assert.strictEqual(actual, expected);
  });
});
