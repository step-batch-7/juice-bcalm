const messages = require("./generateMessage.js");

const extractTransactionValues = function(transaction) {
  const beverageName = transaction["beverageName"];
  const qty = transaction["qty"];
  const date = transaction["date"];
  return beverageName + "," + qty + "," + date;
};

const generateQueryDetails = function(transactionRecords, userArguments) {
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
exports.generateQueryDetails = generateQueryDetails;
