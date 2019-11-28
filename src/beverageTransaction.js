const saveTransaction = require("./saveTransaction.js").saveTransaction;
const generateQueryDetails = require("./query.js").generateQueryDetails;
const messages = require("./generateMessage.js");

const generateFileContents = function(filePath, parseFile, isFileExist) {
  let fileContents =
    isFileExist(filePath, "utf8") && parseFile(filePath, "utf8");
  return JSON.parse(fileContents) || {};
};

const writeTransaction = function(filePath, contents, writeFile) {
  const stringForm = JSON.stringify(contents);
  return writeFile(filePath, stringForm, "utf8");
};

const performAction = function(filePath, fileFunctions, userArguments, date) {
  const isFileExist = fileFunctions.existsFile;
  const parseFile = fileFunctions.readFile;
  const action = userArguments[0];
  const fileContents = generateFileContents(filePath, parseFile, isFileExist);
  if (userArguments[0] == "--save") {
    let record = saveTransaction(fileContents, userArguments, date);
    writeTransaction(filePath, record, fileFunctions.writeFile);
    return messages.generateSaveMessage(userArguments, date.toJSON());
  }
  return generateQueryDetails(fileContents, userArguments);
};

exports.performAction = performAction;
exports.writeTransaction = writeTransaction;
exports.generateFileContents = generateFileContents;
