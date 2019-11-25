const messages = require("./generateMessage.js");
const utils = require("./utilsFunction.js");

const performAction = function(filePath, userArguments) {
  const action = userArguments[0];
  const transactionAction = whichAction(action);
  return transactionAction(filePath, userArguments);
};

const whichAction = function(action) {
  const actions = {
    "--save": saveTransactionEntry,
    "--query": generateQueryDetails
  };
  return actions[action];
};

const updateEntry = function(filePath, beverageName, empId, qty, date) {
  const fileContents = JSON.parse(utils.parseFile(filePath));
  const empIds = Object.keys(fileContents);
  if (!empIds.includes(empId)) {
    fileContents[empId] = {};
    fileContents[empId]["beverageList"] = [];
  }
  fileContents[empId]["beverageList"].push({ beverageName, qty: +qty, date });
  const count = fileContents[empId]["count"];
  fileContents[empId]["count"] = count + +qty;
  return fileContents;
};

const generateRecords = function(filePath, beverageName, empId, qty) {
  const date = JSON.stringify(utils.generateDate());
  let record = {};
  if (utils.isFileExists(filePath)) {
    record = updateEntry(filePath, beverageName, empId, qty, date);
  } else {
    record[empId] = {};
    record[empId]["beverageList"] = [];
    record[empId]["beverageList"].push({ beverageName, qty: +qty, date });
    record[empId]["count"] = +qty;
  }
  return record;
};

const saveTransactionEntry = function(filePath, userArguments) {
  const beverageName = userArguments[2];
  const empId = userArguments[4];
  const qty = userArguments[6];
  const transactions = generateRecords(filePath, beverageName, empId, qty);
  utils.writeFile(filePath, transactions);
  const date = JSON.stringify(utils.generateDate());
  const message = messages.generateSaveMessage(empId, beverageName, qty, date);
  return message;
};

const extractTransactionValues = function(transaction) {
  const beverageName = transaction["beverageName"];
  const qty = transaction["qty"];
  const date = transaction["date"];
  return beverageName + "," + qty + "," + date;
};

const generateQueryDetails = function(filePath, userArguments) {
  const transactionRecords = JSON.parse(utils.parseFile(filePath));
  const empId = userArguments[2];
  if (transactionRecords[empId] == undefined) {
    return "No Record Found";
  }
  const beverageList = transactionRecords[empId]["beverageList"];
  const queryDetails = beverageList.map(extractTransactionValues);
  const count = transactionRecords[empId]["count"];
  const message = messages.generateQueryMessage(empId, queryDetails, count);
  return message;
};

exports.extractTransactionValues = extractTransactionValues;
exports.saveTransactionEntry = saveTransactionEntry;
exports.generateQueryDetails = generateQueryDetails;
exports.generateRecords = generateRecords;
exports.whichAction = whichAction;
exports.performAction = performAction;
exports.updateEntry = updateEntry;
