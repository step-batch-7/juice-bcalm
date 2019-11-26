const performAction = require("./src/beverageTransaction.js").performAction;
const fs = require("fs");

const generateDate = function() {
  return new Date();
};

const main = function() {
  const userArguments = process.argv.slice(2);
  const date = generateDate;
  const filePath = "./consumedList.json";
  const fileFunctions = {
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync,
    existsFile: fs.existsSync
  };

  const message = performAction(filePath, fileFunctions, userArguments, date);
  return message;
};

console.log(main());
