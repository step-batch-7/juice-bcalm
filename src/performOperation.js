const messages = require("./generateMessage.js");

const saveTransaction = function(records, userArguments, date) {
  const beverageDetail = {
    beverageName: userArguments[2],
    empId: userArguments[4],
    qty: userArguments[6],
    date: date
  };
  records.push(beverageDetail);
  return records;
};

const createUserArgumentsObject = function(userArguments) {
  const structuredArgs = {};
  structuredArgs[userArguments[1]] = userArguments[2];
  structuredArgs[userArguments[3]] = userArguments[4];
  structuredArgs[userArguments[5]] = userArguments[6];
  return structuredArgs;
};

const matchDate = function(oldDate, currentDate) {
  oldDate = new Date(oldDate).toLocaleDateString();
  currentDate = new Date(currentDate).toLocaleDateString();
  return oldDate == currentDate;
};

const transactionList = function(filterBy, filterWith) {
  return function(transaction) {
    if (filterWith == "date") {
      return matchDate(transaction[filterWith], filterBy);
    }
    return transaction[filterWith] == filterBy;
  };
};

const filterList = function(transactionRecords, filterBy, filterWith) {
  const filteredList = transactionRecords.filter(
    transactionList(filterBy, filterWith)
  );
  return filteredList;
};

const filterTransactionList = function(transactionRecords, queryData) {
  const date = queryData.date;
  const empId = queryData.empId;
  const beverage = queryData.beverageName;
  const filterByDate =
    (date && filterList(transactionRecords, date, "date")) ||
    transactionRecords;
  const filterByBeverage =
    (beverage && filterList(filterByDate, beverage, "beverageName")) ||
    filterByDate;
  const filterByEmpId =
    (empId && filterList(filterByBeverage, empId, "empId")) || filterByBeverage;
  return filterByEmpId;
};

const generateQueryDetails = function(transactionRecords, userArguments) {
  const structuredUserArguments = createUserArgumentsObject(userArguments);
  const empId = structuredUserArguments["--empId"];
  const date = structuredUserArguments["--date"];
  const beverageName = structuredUserArguments["--beverage"];
  const queryData = { date, empId, beverageName };
  transactionRecords = filterTransactionList(transactionRecords, queryData);
  return messages.generateQueryMessage(transactionRecords);
};

exports.saveTransaction = saveTransaction;
exports.filterTransactionList = filterTransactionList;
exports.createUserArgumentsObject = createUserArgumentsObject;
exports.generateQueryDetails = generateQueryDetails;
exports.filterList = filterList;
exports.transactionList = transactionList;
exports.matchDate = matchDate;
