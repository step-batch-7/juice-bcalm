const transactionRecorder = require("./src/beverageTransaction.js")
  .transactionRecorder;

const main = function() {
  const beverageDetails = process.argv.slice(2);
  return transactionRecorder(beverageDetails);
};

console.log(main());
