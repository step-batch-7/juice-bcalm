const messages = require("./generateMessage.js");

const createUserArgumentsObject = function(userArguments) {
  const structuredArgs = {};
  structuredArgs[userArguments[1]] = userArguments[2];
  structuredArgs[userArguments[3]] = userArguments[4];
  structuredArgs[userArguments[5]] = userArguments[6];
  return structuredArgs;
};

const beverageList = function(empId) {
  return function(transaction) {
    transaction.empId = empId;
    return transaction;
  };
};

const getBeverageRecordList = function(transactionRecords) {
  let beverageRecordList = [];
  for (empBevRecord in transactionRecords) {
    let empOrders = transactionRecords[empBevRecord].beverageList;
    let empId = empBevRecord;
    let beverageRecord = empOrders.map(beverageList(empId));
    beverageRecordList = beverageRecordList.concat(beverageRecord);
  }
  return beverageRecordList;
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
  const beverageRecords = getBeverageRecordList(transactionRecords);
  const queryData = { date, empId, beverageName };
  transactionRecords = filterTransactionList(beverageRecords, queryData);
  return messages.generateQueryMessage(transactionRecords);
};

exports.filterTransactionList = filterTransactionList;
exports.getBeverageRecordList = getBeverageRecordList;
exports.beverageList = beverageList;
exports.createUserArgumentsObject = createUserArgumentsObject;
exports.generateQueryDetails = generateQueryDetails;
exports.filterList = filterList;
exports.transactionList = transactionList;
exports.matchDate = matchDate;
