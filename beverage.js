const fs = require("fs");
const performAction = require("./src/beverageTransaction.js").performAction;
const { getPath, getDate } = require("./src/config.js");

const generateDate = function() {
  return new Date();
};

const main = function() {
  const userArguments = process.argv.slice(2);
  const date = getDate(process.env)();
  const filePath = getPath(process.env);
  const fileFunctions = {
    readFile: fs.readFileSync,
    writeFile: fs.writeFileSync,
    existsFile: fs.existsSync
  };

  const message = performAction(filePath, fileFunctions, userArguments, date);
  return message;
};

console.log(main());
