const performAction = require("./src/beverageTransaction.js").performAction;

const main = function() {
  const filePath = "./consumedList.json";
  const userArguments = process.argv.slice(2);
  const message = performAction(filePath, userArguments);
  return message;
};

console.log(main());
